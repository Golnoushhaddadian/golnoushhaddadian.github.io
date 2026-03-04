import { useEffect, useRef, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

interface CoauthorNode {
  id: string;
  label: string;
  count: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  isCenter?: boolean;
}

interface CoauthorLink {
  source: string;
  target: string;
  weight: number;
}

interface CoauthorData {
  name: string;
  count: number;
}

// Fallback data in case Google Scholar is unreachable
const FALLBACK_DATA: CoauthorData[] = [
  { name: "MK Kim", count: 10 }, { name: "J Kim", count: 7 }, { name: "Y Bae", count: 5 },
  { name: "N Haddadian", count: 4 }, { name: "O Noroozi", count: 3 }, { name: "CD Schunn", count: 3 },
  { name: "M Alqassab", count: 3 }, { name: "SK Banihashem", count: 3 }, { name: "P Panzade", count: 3 },
  { name: "D Takabi", count: 3 }, { name: "H Han", count: 3 }, { name: "A Heidari", count: 2 },
  { name: "S Radmanesh", count: 2 }, { name: "M Salehi", count: 2 }, { name: "F Mashhadi", count: 2 },
  { name: "S Kavoshian", count: 2 }, { name: "X Gao", count: 2 },
];

const CoauthorshipNetwork = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const nodesRef = useRef<CoauthorNode[]>([]);
  const linksRef = useRef<CoauthorLink[]>([]);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ width: 700, height: 500 });
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragNode = useRef<string | null>(null);
  const [coauthorData, setCoauthorData] = useState<CoauthorData[]>([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<"live" | "cached" | "fallback">("fallback");

  // Fetch co-author data from edge function
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check localStorage cache (cache for 24 hours)
        const cached = localStorage.getItem("coauthor-network-cache");
        if (cached) {
          const { data, timestamp } = JSON.parse(cached);
          const age = Date.now() - timestamp;
          if (age < 24 * 60 * 60 * 1000 && data?.length > 0) {
            setCoauthorData(data);
            setSource("cached");
            setLoading(false);
            // Still try to refresh in background
            fetchFromEdge(data);
            return;
          }
        }

        await fetchFromEdge();
      } catch (err) {
        console.error("Failed to load coauthor data:", err);
        setCoauthorData(FALLBACK_DATA);
        setSource("fallback");
        setLoading(false);
      }
    };

    const fetchFromEdge = async (currentData?: CoauthorData[]) => {
      try {
        const { data, error } = await supabase.functions.invoke("google-scholar-coauthors");
        if (error) throw error;
        if (data?.success && data.coauthors?.length > 0) {
          setCoauthorData(data.coauthors);
          setSource("live");
          localStorage.setItem("coauthor-network-cache", JSON.stringify({
            data: data.coauthors,
            timestamp: Date.now(),
          }));
        } else if (!currentData) {
          setCoauthorData(FALLBACK_DATA);
          setSource("fallback");
        }
      } catch (err) {
        console.error("Edge function error:", err);
        if (!currentData) {
          setCoauthorData(FALLBACK_DATA);
          setSource("fallback");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Responsive sizing
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const w = containerRef.current.clientWidth;
        setDimensions({ width: w, height: Math.min(w * 0.7, 550) });
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Initialize nodes and links when data changes
  useEffect(() => {
    if (coauthorData.length === 0) return;
    const { width, height } = dimensions;
    const cx = width / 2;
    const cy = height / 2;

    const center: CoauthorNode = {
      id: "haddadian",
      label: "Haddadian, G.",
      count: 0,
      x: cx, y: cy, vx: 0, vy: 0,
      radius: 22,
      isCenter: true,
    };

    const nodes: CoauthorNode[] = [center];
    const links: CoauthorLink[] = [];

    coauthorData.forEach((co, i) => {
      const angle = (2 * Math.PI * i) / coauthorData.length;
      const dist = 120 + Math.random() * 80;
      const r = Math.max(6, Math.min(16, 4 + co.count * 2));
      nodes.push({
        id: co.name,
        label: co.name,
        count: co.count,
        x: cx + Math.cos(angle) * dist + (Math.random() - 0.5) * 40,
        y: cy + Math.sin(angle) * dist + (Math.random() - 0.5) * 40,
        vx: 0, vy: 0,
        radius: r,
      });
      links.push({ source: "haddadian", target: co.name, weight: co.count });
    });

    nodesRef.current = nodes;
    linksRef.current = links;
  }, [coauthorData, dimensions]);

  // Force simulation + render
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = dimensions;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    let alpha = 1;

    const tick = () => {
      const nodes = nodesRef.current;
      const links = linksRef.current;
      if (nodes.length === 0) {
        // Draw loading state
        ctx.clearRect(0, 0, width, height);
        if (loading) {
          ctx.font = "14px system-ui, sans-serif";
          ctx.fillStyle = "#94a3b8";
          ctx.textAlign = "center";
          ctx.fillText("Loading from Google Scholar...", width / 2, height / 2);
        }
        animationRef.current = requestAnimationFrame(tick);
        return;
      }

      alpha *= 0.995;
      if (alpha < 0.001) alpha = 0.001;

      // Forces
      for (const n of nodes) {
        if (n.isCenter || dragNode.current === n.id) continue;
        n.vx += (width / 2 - n.x) * 0.0005;
        n.vy += (height / 2 - n.y) * 0.0005;
      }

      for (const l of links) {
        const s = nodes.find((n) => n.id === l.source)!;
        const t = nodes.find((n) => n.id === l.target)!;
        const dx = t.x - s.x;
        const dy = t.y - s.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const targetDist = 100 + (1 / l.weight) * 60;
        const force = (dist - targetDist) * 0.003 * alpha;
        const fx = (dx / dist) * force;
        const fy = (dy / dist) * force;
        if (!s.isCenter) { s.vx += fx; s.vy += fy; }
        if (!t.isCenter) { t.vx -= fx; t.vy -= fy; }
      }

      for (let i = 1; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = b.x - a.x, dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          if (dist < 60) {
            const force = ((60 - dist) / dist) * 0.5;
            if (dragNode.current !== a.id) { a.vx -= dx * force; a.vy -= dy * force; }
            if (dragNode.current !== b.id) { b.vx += dx * force; b.vy += dy * force; }
          }
        }
      }

      for (const n of nodes) {
        if (n.isCenter) { n.x = width / 2; n.y = height / 2; continue; }
        if (dragNode.current === n.id) continue;
        n.vx *= 0.85; n.vy *= 0.85;
        n.x += n.vx; n.y += n.vy;
        n.x = Math.max(n.radius + 30, Math.min(width - n.radius - 30, n.x));
        n.y = Math.max(n.radius + 15, Math.min(height - n.radius - 15, n.y));
      }

      // Draw
      ctx.clearRect(0, 0, width, height);
      const isDark = document.documentElement.classList.contains("dark");
      const primaryColor = isDark ? "hsl(210, 60%, 60%)" : "hsl(210, 60%, 45%)";
      const textColor = isDark ? "#e2e8f0" : "#1e293b";
      const mutedText = isDark ? "#94a3b8" : "#64748b";
      const linkColor = isDark ? "rgba(148,163,184,0.25)" : "rgba(100,116,139,0.2)";
      const hoverLinkColor = isDark ? "rgba(148,163,184,0.6)" : "rgba(100,116,139,0.5)";
      const nodeBg = isDark ? "#1e293b" : "#ffffff";
      const nodeBorder = isDark ? "#334155" : "#cbd5e1";

      for (const l of links) {
        const s = nodes.find((n) => n.id === l.source)!;
        const t = nodes.find((n) => n.id === l.target)!;
        const isHovered = hoveredNode === l.source || hoveredNode === l.target;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(t.x, t.y);
        ctx.strokeStyle = isHovered ? hoverLinkColor : linkColor;
        ctx.lineWidth = Math.min(l.weight * 1.2, 6);
        ctx.stroke();
      }

      for (const n of nodes) {
        const isHovered = hoveredNode === n.id;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius + (isHovered ? 2 : 0), 0, Math.PI * 2);
        ctx.fillStyle = n.isCenter ? primaryColor : nodeBg;
        ctx.fill();
        ctx.strokeStyle = n.isCenter ? primaryColor : isHovered ? primaryColor : nodeBorder;
        ctx.lineWidth = n.isCenter ? 2 : isHovered ? 2 : 1;
        ctx.stroke();

        const fontSize = n.isCenter ? 11 : Math.max(8, Math.min(10, 6 + n.count));
        ctx.font = `${n.isCenter ? "600" : "400"} ${fontSize}px system-ui, -apple-system, sans-serif`;
        ctx.fillStyle = n.isCenter ? "#ffffff" : isHovered ? textColor : mutedText;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        if (n.isCenter) {
          ctx.fillText(n.label, n.x, n.y);
        } else {
          ctx.fillText(n.label, n.x, n.y + n.radius + 12);
          ctx.font = `600 ${Math.max(8, n.radius - 1)}px system-ui, sans-serif`;
          ctx.fillStyle = isHovered ? primaryColor : mutedText;
          ctx.fillText(String(n.count), n.x, n.y);
        }
      }

      animationRef.current = requestAnimationFrame(tick);
    };

    animationRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationRef.current);
  }, [dimensions, hoveredNode, loading, coauthorData]);

  const getNodeAt = useCallback(
    (mx: number, my: number): CoauthorNode | null => {
      for (const n of nodesRef.current) {
        const dx = mx - n.x, dy = my - n.y;
        if (dx * dx + dy * dy < (n.radius + 4) ** 2) return n;
      }
      return null;
    }, []
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      const mx = e.clientX - rect.left, my = e.clientY - rect.top;
      if (isDragging.current && dragNode.current) {
        const node = nodesRef.current.find((n) => n.id === dragNode.current);
        if (node) { node.x = mx; node.y = my; node.vx = 0; node.vy = 0; }
        return;
      }
      const node = getNodeAt(mx, my);
      setHoveredNode(node?.id || null);
      if (canvasRef.current) canvasRef.current.style.cursor = node ? "grab" : "default";
    }, [getNodeAt]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      const node = getNodeAt(e.clientX - rect.left, e.clientY - rect.top);
      if (node && !node.isCenter) {
        isDragging.current = true;
        dragNode.current = node.id;
        if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
      }
    }, [getNodeAt]
  );

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
    dragNode.current = null;
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        style={{ width: dimensions.width, height: dimensions.height }}
        className="w-full rounded-xl border border-border bg-card"
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
      <p className="text-[10px] text-muted-foreground/50 mt-2 text-center">
        {source === "live" && "Live data from Google Scholar. "}
        {source === "cached" && "Cached data (updates daily). "}
        {source === "fallback" && !loading && "Using offline data. "}
        Line width corresponds to the number of co-authorships. Drag nodes to rearrange.
      </p>
    </div>
  );
};

export default CoauthorshipNetwork;
