import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import {
  journalPublications,
  conferenceProceedings,
  nonRefereedPublications,
  workUnderReview,
  workInProgress,
} from "@/data/researchData";

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
  cluster: number;
}

interface CoauthorLink {
  source: string;
  target: string;
  weight: number;
}

const SELF_PATTERNS = ["Haddadian, G.", "Haddadian, G"];
function isSelf(name: string) { return SELF_PATTERNS.some(p => name.trim().startsWith(p)); }
function normalizeAuthor(name: string) { return name.trim().replace(/\s+/g, " "); }
function linkKey(a: string, b: string) { return [a, b].sort().join("|||"); }

// Refined, muted but distinguishable academic palette
const PALETTE = [
  { fill: "#3B6B9E", glow: "rgba(59,107,158,0.18)" },   // steel blue
  { fill: "#C06858", glow: "rgba(192,104,88,0.18)" },    // terracotta
  { fill: "#5A9E78", glow: "rgba(90,158,120,0.18)" },    // sage green
  { fill: "#B08D57", glow: "rgba(176,141,87,0.18)" },    // warm gold
  { fill: "#8B6BB0", glow: "rgba(139,107,176,0.18)" },   // muted violet
  { fill: "#4A9B9B", glow: "rgba(74,155,155,0.18)" },    // teal
  { fill: "#C87D5A", glow: "rgba(200,125,90,0.18)" },    // copper
  { fill: "#6B8EAE", glow: "rgba(107,142,174,0.18)" },   // slate
];

const PALETTE_DARK = [
  { fill: "#6BA3D6", glow: "rgba(107,163,214,0.2)" },
  { fill: "#E08878", glow: "rgba(224,136,120,0.2)" },
  { fill: "#7CC09A", glow: "rgba(124,192,154,0.2)" },
  { fill: "#D4AD6F", glow: "rgba(212,173,111,0.2)" },
  { fill: "#B090D0", glow: "rgba(176,144,208,0.2)" },
  { fill: "#6CC0C0", glow: "rgba(108,192,192,0.2)" },
  { fill: "#E09A74", glow: "rgba(224,154,116,0.2)" },
  { fill: "#8EB0D0", glow: "rgba(142,176,208,0.2)" },
];

function buildNetworkData() {
  const allAuthorLists: string[][] = [];
  const sources = [
    ...journalPublications.map(p => p.authors),
    ...conferenceProceedings.map(p => p.authors),
    ...nonRefereedPublications.map(p => p.authors),
    ...workUnderReview.map(p => p.authors),
    ...workInProgress.map(p => p.authors),
  ];
  for (const authors of sources) {
    if (authors?.length > 0) allAuthorLists.push(authors.map(normalizeAuthor));
  }

  const coauthorCounts: Record<string, number> = {};
  const pairCounts: Record<string, number> = {};

  for (const authors of allAuthorLists) {
    if (!authors.some(isSelf)) continue;
    const coauthors = authors.filter(a => !isSelf(a) && a.length > 1);
    for (const ca of coauthors) coauthorCounts[ca] = (coauthorCounts[ca] || 0) + 1;
    for (let i = 0; i < coauthors.length; i++) {
      for (let j = i + 1; j < coauthors.length; j++) {
        const key = linkKey(coauthors[i], coauthors[j]);
        pairCounts[key] = (pairCounts[key] || 0) + 1;
      }
    }
  }

  const coauthors = Object.entries(coauthorCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  const interLinks = Object.entries(pairCounts)
    .map(([key, weight]) => {
      const [source, target] = key.split("|||");
      return { source, target, weight };
    });

  // Community detection via BFS on inter-coauthor links
  const names = coauthors.map(c => c.name);
  const adjacency: Record<string, Set<string>> = {};
  for (const n of names) adjacency[n] = new Set();
  for (const il of interLinks) {
    if (adjacency[il.source] && adjacency[il.target]) {
      adjacency[il.source].add(il.target);
      adjacency[il.target].add(il.source);
    }
  }

  const clusters: Record<string, number> = {};
  const clusterSizes: number[] = [];
  const visited = new Set<string>();
  let clusterIdx = 0;

  // Sort by most connected first for better color assignment
  const sortedNames = [...names].sort((a, b) => (adjacency[b]?.size || 0) - (adjacency[a]?.size || 0));
  for (const name of sortedNames) {
    if (visited.has(name)) continue;
    const queue = [name];
    visited.add(name);
    const members: string[] = [];
    while (queue.length > 0) {
      const current = queue.shift()!;
      members.push(current);
      for (const neighbor of adjacency[current]) {
        if (!visited.has(neighbor)) { visited.add(neighbor); queue.push(neighbor); }
      }
    }
    for (const m of members) clusters[m] = clusterIdx;
    clusterSizes.push(members.length);
    clusterIdx++;
  }

  return { coauthors, interLinks, clusters, clusterSizes };
}

const CoauthorshipNetwork = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const nodesRef = useRef<CoauthorNode[]>([]);
  const linksRef = useRef<CoauthorLink[]>([]);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ width: 700, height: 550 });
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragNode = useRef<string | null>(null);
  const { coauthors, interLinks, clusters } = useMemo(() => buildNetworkData(), []);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const w = containerRef.current.clientWidth;
        setDimensions({ width: w, height: Math.min(Math.max(w * 0.7, 400), 620) });
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    if (coauthors.length === 0) return;
    const { width, height } = dimensions;
    const cx = width / 2, cy = height / 2;

    const centerRadius = Math.max(48, Math.min(60, width * 0.07));
    const center: CoauthorNode = {
      id: "haddadian", label: "Golnoush Haddadian", count: 0,
      x: cx, y: cy, vx: 0, vy: 0, radius: centerRadius, isCenter: true, cluster: -1,
    };

    const nodes: CoauthorNode[] = [center];
    const allLinks: CoauthorLink[] = [];
    const nodeIds = new Set<string>(["haddadian"]);

    coauthors.forEach((co, i) => {
      const angle = (2 * Math.PI * i) / coauthors.length;
      const dist = centerRadius + 100 + Math.random() * 50;
      const r = Math.max(8, Math.min(20, 5 + co.count * 2.5));
      nodes.push({
        id: co.name, label: co.name, count: co.count,
        x: cx + Math.cos(angle) * dist + (Math.random() - 0.5) * 20,
        y: cy + Math.sin(angle) * dist + (Math.random() - 0.5) * 20,
        vx: 0, vy: 0, radius: r,
        cluster: clusters[co.name] ?? 0,
      });
      nodeIds.add(co.name);
      allLinks.push({ source: "haddadian", target: co.name, weight: co.count });
    });

    for (const il of interLinks) {
      if (nodeIds.has(il.source) && nodeIds.has(il.target)) allLinks.push(il);
    }

    nodesRef.current = nodes;
    linksRef.current = allLinks;
  }, [coauthors, interLinks, clusters, dimensions]);

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
      if (nodes.length === 0) { animationRef.current = requestAnimationFrame(tick); return; }

      alpha *= 0.994;
      if (alpha < 0.0005) alpha = 0.0005;

      // Forces
      for (const n of nodes) {
        if (n.isCenter || dragNode.current === n.id) continue;
        n.vx += (width / 2 - n.x) * 0.00035;
        n.vy += (height / 2 - n.y) * 0.00035;
      }

      // Cluster cohesion
      for (let i = 1; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          if (a.cluster === b.cluster && a.cluster >= 0) {
            const dx = b.x - a.x, dy = b.y - a.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            if (dist > 35) {
              const f = 0.00025 * alpha;
              if (dragNode.current !== a.id) { a.vx += dx * f; a.vy += dy * f; }
              if (dragNode.current !== b.id) { b.vx -= dx * f; b.vy -= dy * f; }
            }
          }
        }
      }

      // Link spring
      for (const l of links) {
        const s = nodes.find(n => n.id === l.source);
        const t = nodes.find(n => n.id === l.target);
        if (!s || !t) continue;
        const dx = t.x - s.x, dy = t.y - s.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const isInter = l.source !== "haddadian" && l.target !== "haddadian";
        const targetDist = isInter ? 65 + (1 / l.weight) * 20 : (s.radius + t.radius) + 60 + (1 / l.weight) * 40;
        const strength = isInter ? 0.0012 : 0.0025;
        const force = (dist - targetDist) * strength * alpha;
        const fx = (dx / dist) * force, fy = (dy / dist) * force;
        if (!s.isCenter && dragNode.current !== s.id) { s.vx += fx; s.vy += fy; }
        if (!t.isCenter && dragNode.current !== t.id) { t.vx -= fx; t.vy -= fy; }
      }

      // Repulsion
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = b.x - a.x, dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const minDist = a.radius + b.radius + 15;
          if (dist < minDist) {
            const force = ((minDist - dist) / dist) * 0.5;
            if (!a.isCenter && dragNode.current !== a.id) { a.vx -= dx * force; a.vy -= dy * force; }
            if (!b.isCenter && dragNode.current !== b.id) { b.vx += dx * force; b.vy += dy * force; }
          }
        }
      }

      for (const n of nodes) {
        if (n.isCenter) { n.x = width / 2; n.y = height / 2; continue; }
        if (dragNode.current === n.id) continue;
        n.vx *= 0.86; n.vy *= 0.86;
        n.x += n.vx; n.y += n.vy;
        n.x = Math.max(n.radius + 40, Math.min(width - n.radius - 40, n.x));
        n.y = Math.max(n.radius + 25, Math.min(height - n.radius - 25, n.y));
      }

      // ── RENDER ──
      ctx.clearRect(0, 0, width, height);
      const isDark = document.documentElement.classList.contains("dark");
      const pal = isDark ? PALETTE_DARK : PALETTE;
      const bgCard = isDark ? "#0f172a" : "#fafbfd";
      const textMain = isDark ? "#e2e8f0" : "#1e293b";
      const textMuted = isDark ? "#7c8da6" : "#7a8599";
      const centerFill = isDark ? "#2563eb" : "#1d4ed8";
      const centerGlow = isDark ? "rgba(37,99,235,0.25)" : "rgba(29,78,216,0.15)";

      // Subtle background
      ctx.fillStyle = bgCard;
      ctx.fillRect(0, 0, width, height);

      // ── LINKS ──
      for (const l of links) {
        const s = nodes.find(n => n.id === l.source);
        const t = nodes.find(n => n.id === l.target);
        if (!s || !t) continue;
        const isCenter = l.source === "haddadian" || l.target === "haddadian";
        const isHovered = hoveredNode && (hoveredNode === l.source || hoveredNode === l.target);
        const dimmed = hoveredNode && !isHovered;

        const clusterNode = s.isCenter ? t : t.isCenter ? s : s;
        const ci = clusterNode.cluster % pal.length;

        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(t.x, t.y);

        if (dimmed) {
          ctx.strokeStyle = isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)";
          ctx.lineWidth = 1;
        } else if (isHovered) {
          ctx.strokeStyle = pal[ci].fill + (isDark ? "99" : "77");
          ctx.lineWidth = isCenter ? Math.min(l.weight * 1.8, 7) : Math.min(l.weight * 1.2, 4);
        } else {
          const baseOpacity = isCenter ? (isDark ? "22" : "1A") : (isDark ? "15" : "10");
          ctx.strokeStyle = pal[ci].fill + baseOpacity;
          ctx.lineWidth = isCenter ? Math.min(l.weight * 1.2, 5) : Math.min(l.weight * 0.7, 2.5);
        }
        ctx.stroke();
      }

      // ── NODES ──
      for (const n of nodes) {
        const isHovered = hoveredNode === n.id;
        const dimmed = hoveredNode && !isHovered &&
          !links.some(l => (l.source === hoveredNode && l.target === n.id) || (l.target === hoveredNode && l.source === n.id)) &&
          hoveredNode !== "haddadian" && n.id !== "haddadian";

        if (n.isCenter) {
          // Glow ring
          const grad = ctx.createRadialGradient(n.x, n.y, n.radius * 0.8, n.x, n.y, n.radius * 1.6);
          grad.addColorStop(0, centerGlow);
          grad.addColorStop(1, "transparent");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius * 1.6, 0, Math.PI * 2);
          ctx.fill();

          // Main circle
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
          ctx.fillStyle = centerFill;
          ctx.fill();

          // Subtle border
          ctx.strokeStyle = isDark ? "rgba(96,165,250,0.4)" : "rgba(29,78,216,0.3)";
          ctx.lineWidth = 2;
          ctx.stroke();

          // Name — two lines
          ctx.fillStyle = "#ffffff";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.font = "bold 13px system-ui, -apple-system, sans-serif";
          ctx.fillText("Golnoush", n.x, n.y - 7);
          ctx.font = "600 12px system-ui, -apple-system, sans-serif";
          ctx.fillText("Haddadian", n.x, n.y + 9);
          continue;
        }

        const ci = n.cluster % pal.length;
        const color = pal[ci];
        const opacity = dimmed ? 0.2 : 1;

        ctx.globalAlpha = opacity;

        // Hover glow
        if (isHovered) {
          const hGrad = ctx.createRadialGradient(n.x, n.y, n.radius * 0.6, n.x, n.y, n.radius * 2);
          hGrad.addColorStop(0, color.glow);
          hGrad.addColorStop(1, "transparent");
          ctx.fillStyle = hGrad;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius * 2, 0, Math.PI * 2);
          ctx.fill();
        }

        // Node fill
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius + (isHovered ? 2 : 0), 0, Math.PI * 2);
        ctx.fillStyle = color.fill;
        ctx.fill();

        // Subtle border on hover
        if (isHovered) {
          ctx.strokeStyle = isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.15)";
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        // Count inside
        const countSize = Math.max(8, Math.min(12, n.radius - 1));
        ctx.font = `600 ${countSize}px system-ui, sans-serif`;
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(String(n.count), n.x, n.y);

        // Name label below
        const labelSize = Math.max(8, Math.min(11, 7 + n.count * 0.5));
        ctx.font = `${isHovered ? "500" : "400"} ${labelSize}px system-ui, -apple-system, sans-serif`;
        ctx.fillStyle = isHovered ? textMain : textMuted;
        ctx.fillText(n.label, n.x, n.y + n.radius + 13);

        ctx.globalAlpha = 1;
      }

      animationRef.current = requestAnimationFrame(tick);
    };

    animationRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationRef.current);
  }, [dimensions, hoveredNode]);

  const getNodeAt = useCallback(
    (mx: number, my: number): CoauthorNode | null => {
      for (const n of nodesRef.current) {
        const dx = mx - n.x, dy = my - n.y;
        if (dx * dx + dy * dy < (n.radius + 5) ** 2) return n;
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
        const node = nodesRef.current.find(n => n.id === dragNode.current);
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

  // Build legend from unique clusters
  const legendItems = useMemo(() => {
    const seen = new Map<number, string>();
    for (const co of coauthors) {
      const c = clusters[co.name] ?? 0;
      if (!seen.has(c)) seen.set(c, co.name);
    }
    return Array.from(seen.entries())
      .slice(0, 8)
      .map(([cluster]) => ({ cluster, color: PALETTE[cluster % PALETTE.length].fill }));
  }, [coauthors, clusters]);

  return (
    <div ref={containerRef} className="w-full space-y-3">
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        style={{ width: dimensions.width, height: dimensions.height }}
        className="w-full rounded-xl border border-border"
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => { handleMouseUp(); setHoveredNode(null); }}
      />
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 px-1">
        <p className="text-[10px] text-muted-foreground/40">
          Node size = co-authorships · Line width = shared publications · Colors = research clusters · Drag to rearrange
        </p>
      </div>
    </div>
  );
};

export default CoauthorshipNetwork;
