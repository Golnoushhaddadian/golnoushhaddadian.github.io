import { useEffect, useRef, useState, useCallback } from "react";

interface CoauthorNode {
  id: string;
  label: string;
  count: number; // number of co-authorships with Haddadian
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

const COAUTHOR_DATA: { name: string; count: number }[] = [
  { name: "Kim, M. K.", count: 10 },
  { name: "Kim, J.", count: 7 },
  { name: "Bae, Y.", count: 5 },
  { name: "Haddadian, N.", count: 4 },
  { name: "Noroozi, O.", count: 3 },
  { name: "Schunn, C. D.", count: 3 },
  { name: "Alqassab, M.", count: 3 },
  { name: "Banihashem, S. K.", count: 3 },
  { name: "Panzade, P.", count: 3 },
  { name: "Takabi, D.", count: 3 },
  { name: "Han, H.", count: 3 },
  { name: "Heidari, A.", count: 2 },
  { name: "Radmanesh, S.", count: 2 },
  { name: "Salehi, M.", count: 2 },
  { name: "Mashhadi, F.", count: 2 },
  { name: "Kavoshian, S.", count: 2 },
  { name: "Gao, X.", count: 2 },
  { name: "Abdeen, M. S.", count: 1 },
  { name: "Davis, A.", count: 1 },
  { name: "Morris, W.", count: 1 },
  { name: "Crossely, S.", count: 1 },
  { name: "Holmes, L.", count: 1 },
  { name: "Daneshvar Ghorbani, B.", count: 1 },
  { name: "Mahmoodi-Bakhtiari, B.", count: 1 },
  { name: "Masoumi, V.", count: 1 },
  { name: "Veisi, H.", count: 1 },
  { name: "Kim, N.", count: 1 },
  { name: "Haddadian, M.", count: 1 },
  { name: "Heidari, F.", count: 1 },
  { name: "Greisel, M.", count: 1 },
  { name: "Kollar, I.", count: 1 },
  { name: "Hornstein, J.", count: 1 },
  { name: "Rummel, N.", count: 1 },
  { name: "Stravelakis, J.", count: 1 },
  { name: "Ranjbar, V.", count: 1 },
  { name: "Sahebdel, M.", count: 1 },
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

  // Initialize nodes and links
  useEffect(() => {
    const { width, height } = dimensions;
    const cx = width / 2;
    const cy = height / 2;

    const center: CoauthorNode = {
      id: "haddadian",
      label: "Haddadian, G.",
      count: 0,
      x: cx,
      y: cy,
      vx: 0,
      vy: 0,
      radius: 22,
      isCenter: true,
    };

    const nodes: CoauthorNode[] = [center];
    const links: CoauthorLink[] = [];

    COAUTHOR_DATA.forEach((co, i) => {
      const angle = (2 * Math.PI * i) / COAUTHOR_DATA.length;
      const dist = 120 + Math.random() * 80;
      const r = Math.max(6, Math.min(16, 4 + co.count * 2));
      nodes.push({
        id: co.name,
        label: co.name,
        count: co.count,
        x: cx + Math.cos(angle) * dist + (Math.random() - 0.5) * 40,
        y: cy + Math.sin(angle) * dist + (Math.random() - 0.5) * 40,
        vx: 0,
        vy: 0,
        radius: r,
      });
      links.push({ source: "haddadian", target: co.name, weight: co.count });
    });

    nodesRef.current = nodes;
    linksRef.current = links;
  }, [dimensions]);

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
        animationRef.current = requestAnimationFrame(tick);
        return;
      }

      alpha *= 0.995;
      if (alpha < 0.001) alpha = 0.001;

      // Forces
      // Center gravity
      for (const n of nodes) {
        if (n.isCenter) continue;
        if (dragNode.current === n.id) continue;
        n.vx += (width / 2 - n.x) * 0.0005;
        n.vy += (height / 2 - n.y) * 0.0005;
      }

      // Link spring force
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

      // Repulsion between non-center nodes
      for (let i = 1; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          if (dist < 60) {
            const force = ((60 - dist) / dist) * 0.5;
            const fx = dx * force;
            const fy = dy * force;
            if (dragNode.current !== a.id) { a.vx -= fx; a.vy -= fy; }
            if (dragNode.current !== b.id) { b.vx += fx; b.vy += fy; }
          }
        }
      }

      // Apply velocity
      for (const n of nodes) {
        if (n.isCenter) {
          n.x = width / 2;
          n.y = height / 2;
          continue;
        }
        if (dragNode.current === n.id) continue;
        n.vx *= 0.85;
        n.vy *= 0.85;
        n.x += n.vx;
        n.y += n.vy;
        // Bounds
        n.x = Math.max(n.radius + 30, Math.min(width - n.radius - 30, n.x));
        n.y = Math.max(n.radius + 15, Math.min(height - n.radius - 15, n.y));
      }

      // Draw
      ctx.clearRect(0, 0, width, height);

      // Get computed styles for theme awareness
      const style = getComputedStyle(document.documentElement);
      const isDark = document.documentElement.classList.contains("dark");
      const primaryColor = isDark ? "hsl(210, 60%, 60%)" : "hsl(210, 60%, 45%)";
      const textColor = isDark ? "#e2e8f0" : "#1e293b";
      const mutedText = isDark ? "#94a3b8" : "#64748b";
      const linkColor = isDark ? "rgba(148,163,184,0.25)" : "rgba(100,116,139,0.2)";
      const hoverLinkColor = isDark ? "rgba(148,163,184,0.6)" : "rgba(100,116,139,0.5)";
      const nodeBg = isDark ? "#1e293b" : "#ffffff";
      const nodeBorder = isDark ? "#334155" : "#cbd5e1";

      // Links
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

      // Nodes
      for (const n of nodes) {
        const isHovered = hoveredNode === n.id;

        // Node circle
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius + (isHovered ? 2 : 0), 0, Math.PI * 2);
        if (n.isCenter) {
          ctx.fillStyle = primaryColor;
        } else {
          ctx.fillStyle = nodeBg;
        }
        ctx.fill();
        ctx.strokeStyle = n.isCenter ? primaryColor : isHovered ? primaryColor : nodeBorder;
        ctx.lineWidth = n.isCenter ? 2 : isHovered ? 2 : 1;
        ctx.stroke();

        // Label
        const fontSize = n.isCenter ? 11 : Math.max(8, Math.min(10, 6 + n.count));
        ctx.font = `${n.isCenter ? "600" : "400"} ${fontSize}px system-ui, -apple-system, sans-serif`;
        ctx.fillStyle = n.isCenter ? "#ffffff" : isHovered ? textColor : mutedText;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        if (n.isCenter) {
          ctx.fillText(n.label, n.x, n.y);
        } else {
          ctx.fillText(n.label, n.x, n.y + n.radius + 12);
          // Count inside node
          ctx.font = `600 ${Math.max(8, n.radius - 1)}px system-ui, sans-serif`;
          ctx.fillStyle = n.isCenter ? "#ffffff" : isHovered ? primaryColor : mutedText;
          ctx.fillText(String(n.count), n.x, n.y);
        }
      }

      animationRef.current = requestAnimationFrame(tick);
    };

    animationRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationRef.current);
  }, [dimensions, hoveredNode]);

  const getNodeAt = useCallback(
    (mx: number, my: number): CoauthorNode | null => {
      for (const n of nodesRef.current) {
        const dx = mx - n.x;
        const dy = my - n.y;
        if (dx * dx + dy * dy < (n.radius + 4) ** 2) return n;
      }
      return null;
    },
    []
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      if (isDragging.current && dragNode.current) {
        const node = nodesRef.current.find((n) => n.id === dragNode.current);
        if (node) {
          node.x = mx;
          node.y = my;
          node.vx = 0;
          node.vy = 0;
        }
        return;
      }

      const node = getNodeAt(mx, my);
      setHoveredNode(node?.id || null);
      if (canvasRef.current) {
        canvasRef.current.style.cursor = node ? "grab" : "default";
      }
    },
    [getNodeAt]
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
    },
    [getNodeAt]
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
        Line width corresponds to the number of co-authorships. Drag nodes to rearrange.
      </p>
    </div>
  );
};

export default CoauthorshipNetwork;
