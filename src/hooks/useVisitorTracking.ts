import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

function generateSessionId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

const SESSION_KEY = "visitor_session_id";
const SESSION_START_KEY = "visitor_session_start";

export function useVisitorTracking() {
  const location = useLocation();
  const sessionIdRef = useRef<string>("");
  const startTimeRef = useRef<number>(0);
  const initialized = useRef(false);

  // Initialize session
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    let sessionId = sessionStorage.getItem(SESSION_KEY);
    const isNew = !sessionId;

    if (!sessionId) {
      sessionId = generateSessionId();
      sessionStorage.setItem(SESSION_KEY, sessionId);
      sessionStorage.setItem(SESSION_START_KEY, Date.now().toString());
    }

    sessionIdRef.current = sessionId;
    startTimeRef.current = parseInt(sessionStorage.getItem(SESSION_START_KEY) || Date.now().toString());

    if (isNew) {
      // New session — notify backend
      supabase.functions.invoke("track-visitor", {
        body: {
          session_id: sessionId,
          action: "start",
          page: location.pathname,
        },
      }).catch(console.error);
    }

    // Send end event when tab closes
    const handleUnload = () => {
      const duration = Math.round((Date.now() - startTimeRef.current) / 1000);
      const body = JSON.stringify({
        session_id: sessionIdRef.current,
        action: "end",
        duration_seconds: duration,
      });
      // Use sendBeacon for reliable delivery on page close
      const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/track-visitor`;
      navigator.sendBeacon(
        url,
        new Blob([body], { type: "application/json" })
      );
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, []);

  // Track page changes
  useEffect(() => {
    if (!sessionIdRef.current || !initialized.current) return;

    const duration = Math.round((Date.now() - startTimeRef.current) / 1000);

    supabase.functions.invoke("track-visitor", {
      body: {
        session_id: sessionIdRef.current,
        action: "update",
        page: location.pathname,
        duration_seconds: duration,
      },
    }).catch(console.error);
  }, [location.pathname]);
}
