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

function isSelf(name: string): boolean {
  const n = name.trim();
  return SELF_PATTERNS.some(p => n.startsWith(p));
}

function normalizeAuthor(name: string): string {
  return name.trim().replace(/\s+/g, " ");
}

function linkKey(a: string, b: string): string {
  return [a, b].sort().join("|||");
}

// Cluster colors — distinct, accessible palette
const CLUSTER_COLORS_LIGHT = [
  "hsl(210, 65%, 50%)",  // blue
  "hsl(340, 60%, 50%)",  // rose
  "hsl(160, 55%, 40%)",  // teal
  "hsl(35, 70%, 50%)",   // amber
  "hsl(270, 50%, 55%)",  // purple
  "hsl(190, 60%, 45%)",  // cyan
  "hsl(15, 65%, 50%)",   // orange
  "hsl(130, 45%, 45%)",  // green
];

const CLUSTER_COLORS_DARK = [
  "hsl(210, 70%, 65%)",
  "hsl(340, 65%, 65%)",
  "hsl(160, 55%, 55%)",
  "hsl(35, 75%, 60%)",
  "hsl(270, 55%, 70%)",
  "hsl(190, 65%, 60%)",
  "hsl(15, 70%, 60%)",
  "hsl(130, 50%, 55%)",
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

  // Simple community detection: group authors who frequently co-publish together
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
  const visited = new Set<string>();
  let clusterIdx = 0;

  // BFS-based clustering on inter-coauthor links
  for (const name of names) {
    if (visited.has(name)) continue;
    const queue = [name];
    visited.add(name);
    const members: string[] = [];
    while (queue.length > 0) {
      const current = queue.shift()!;
      members.push(current);
      for (const neighbor of adjacency[current]) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }
    for (const m of members) clusters[m] = clusterIdx;
    clusterIdx++;
  }

  return { coauthors, interLinks, clusters };
}

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

  const { coauthors, interLinks, clusters } = useMemo(() => buildNetworkData(), []);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const w = containerRef.current.clientWidth;
        setDimensions({ width: w, height: Math.min(w * 0.75, 600) });
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

    const center: CoauthorNode = {
      id: "haddadian", label: "Haddadian, G.", count: 0,
      x: cx, y: cy, vx: 0, vy: 0, radius: 40, isCenter: true, cluster: -1,
    };

    const nodes: CoauthorNode[] = [center];
    const allLinks: CoauthorLink[] = [];
    const nodeIds = new Set<string>(["haddadian"]);

    coauthors.forEach((co, i) => {
      const angle = (2 * Math.PI * i) / coauthors.length;
      const dist = 160 + Math.random() * 60;
      const r = Math.max(7, Math.min(18, 4 + co.count * 2));
      nodes.push({
        id: co.name, label: co.name, count: co.count,
        x: cx + Math.cos(angle) * dist + (Math.random() - 0.5) * 30,
        y: cy + Math.sin(angle) * dist + (Math.random() - 0.5) * 30,
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

      alpha *= 0.995;
      if (alpha < 0.001) alpha = 0.001;

      // Center gravity
      for (const n of nodes) {
        if (n.isCenter || dragNode.current === n.id) continue;
        n.vx += (width / 2 - n.x) * 0.0004;
        n.vy += (height / 2 - n.y) * 0.0004;
      }

      // Cluster attraction: same-cluster nodes gently attract
      for (let i = 1; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          if (a.cluster === b.cluster && a.cluster >= 0) {
            const dx = b.x - a.x, dy = b.y - a.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            if (dist > 40) {
              const force = 0.0003 * alpha;
              if (dragNode.current !== a.id) { a.vx += dx * force; a.vy += dy * force; }
              if (dragNode.current !== b.id) { b.vx -= dx * force; b.vy -= dy * force; }
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
        const targetDist = isInter ? 70 + (1 / l.weight) * 25 : 120 + (1 / l.weight) * 50;
        const strength = isInter ? 0.0015 : 0.003;
        const force = (dist - targetDist) * strength * alpha;
        const fx = (dx / dist) * force, fy = (dy / dist) * force;
        if (!s.isCenter && dragNode.current !== s.id) { s.vx += fx; s.vy += fy; }
        if (!t.isCenter && dragNode.current !== t.id) { t.vx -= fx; t.vy -= fy; }
      }

      // Repulsion
      for (let i = 1; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = b.x - a.x, dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          if (dist < 55) {
            const force = ((55 - dist) / dist) * 0.4;
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
        n.x = Math.max(n.radius + 35, Math.min(width - n.radius - 35, n.x));
        n.y = Math.max(n.radius + 20, Math.min(height - n.radius - 20, n.y));
      }

      // Draw
      ctx.clearRect(0, 0, width, height);
      const isDark = document.documentElement.classList.contains("dark");
      const colors = isDark ? CLUSTER_COLORS_DARK : CLUSTER_COLORS_LIGHT;
      const textColor = isDark ? "#e2e8f0" : "#1e293b";
      const mutedText = isDark ? "#94a3b8" : "#64748b";
      const hoverLinkColor = isDark ? "rgba(148,163,184,0.6)" : "rgba(100,116,139,0.5)";

      // Links
      for (const l of links) {
        const s = nodes.find(n => n.id === l.source);
        const t = nodes.find(n => n.id === l.target);
        if (!s || !t) continue;
        const isHovered = hoveredNode && (hoveredNode === l.source || hoveredNode === l.target);
        const isCenter = l.source === "haddadian" || l.target === "haddadian";
        // Color link by cluster of the non-center node
        const clusterNode = s.isCenter ? t : t.isCenter ? s : s;
        const clusterColor = colors[clusterNode.cluster % colors.length] || colors[0];
        const baseAlpha = isCenter ? 0.25 : 0.15;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(t.x, t.y);
        if (isHovered) {
          ctx.strokeStyle = hoverLinkColor;
        } else {
          // Parse hsl and add alpha
          ctx.strokeStyle = clusterColor.replace(")", `, ${baseAlpha})`).replace("hsl(", "hsla(");
        }
        ctx.lineWidth = isCenter ? Math.min(l.weight * 1.2, 6) : Math.min(l.weight * 0.8, 3);
        ctx.stroke();
      }

      // Nodes
      for (const n of nodes) {
        const isHovered = hoveredNode === n.id;
        const color = n.isCenter ? (isDark ? "hsl(210, 60%, 55%)" : "hsl(210, 60%, 42%)") : colors[n.cluster % colors.length];

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius + (isHovered ? 3 : 0), 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        if (isHovered) {
          ctx.strokeStyle = textColor;
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        // Labels
        if (n.isCenter) {
          ctx.font = "bold 13px system-ui, -apple-system, sans-serif";
          ctx.fillStyle = "#ffffff";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("Haddadian, G.", n.x, n.y);
        } else {
          // Name below node
          const fontSize = Math.max(8, Math.min(10, 6 + n.count));
          ctx.font = `400 ${fontSize}px system-ui, -apple-system, sans-serif`;
          ctx.fillStyle = isHovered ? textColor : mutedText;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(n.label, n.x, n.y + n.radius + 12);
          // Count inside node
          ctx.font = `600 ${Math.max(8, n.radius - 1)}px system-ui, sans-serif`;
          ctx.fillStyle = "#ffffff";
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
        Colors represent co-authorship clusters. Line width corresponds to the number of co-authorships. Drag nodes to rearrange.
      </p>
    </div>
  );
};

export default CoauthorshipNetwork;
