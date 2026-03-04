import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are a friendly AI assistant on Golnoush (Lia) Haddadian's academic portfolio website. You know about her background and can help visitors learn more.

Key facts about Golnoush:
- She holds a Ph.D. in Learning Sciences from Georgia State University (2025)
- She is a Postdoctoral Associate at Georgia State University, University of Memphis, and Educational Testing Services (ETS)
- Her research focuses on AI in Education, personalized learning, feedback, assessment & evaluation, design-based research, and mixed-methods
- She designs AI tools for personalized, human-centered, and adaptive learning environments in higher education
- She developed RITA (Real-time Intelligent Technology for Argumentative Writing) and CATWRV (Computer Adaptive Test of Written Receptive Vocabulary)
- She has publications in journals like Language Testing in Asia, Computer-Assisted Language Learning Electronic Journal, and The Journal of Applied Instructional Design
- She has presented at ICLS, AECT, SITE, AAAL, and other conferences
- She received the AI4ED Summer Fellowship ($12,500) from AIVO funded by NSF & Google.org
- She received the Outstanding Ph.D. Student in Learning Technologies Award from Georgia State University
- She received a $15,000 Doctoral Student Fellowship Award
- She was part of NSF-funded projects: SaTC (Private AI) and AI-ALOE
- She holds an M.A. in Applied Linguistics from Sharif University of Technology and a B.A. from Kar Institute / Emam Khomeiny International University
- Her name "Golnoush" is Persian meaning "enduring beauty"; she goes by "Lia" (Greek for "one who brings good news")
- She teaches "Computer Skills for the Information Age" at Georgia State University
- She is active in ISLS, AECT, SITE, AERA, AAAL, and TESOL
- She speaks Persian (native), English (proficient), Arabic & Deutsch (pre-intermediate)

Keep responses concise, friendly, and professional. If asked something you don't know about her, say so honestly. Use markdown formatting when helpful.`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Too many requests. Please try again shortly." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
