import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import {
  journalPublications,
  conferenceProceedings,
  otherPresentations,
  nonRefereedPublications,
  workUnderReview,
  workInProgress,
} from "@/data/researchData";

interface Node {
  id: string;
  label: string;
  count: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  isCenter?: boolean;
  cluster: number;
}

interface Link {
  source: string;
  target: string;
  weight: number;
}

const SELF = ["Haddadian, G.", "Haddadian, G"];
const EXCLUDED = ["Kavoshian, S.", "Mashhadi, F."];
const isSelf = (n: string) => SELF.some(p => n.trim().startsWith(p));
const isExcluded = (n: string) => EXCLUDED.some(p => n.trim().startsWith(p));
const lk = (a: string, b: string) => [a, b].sort().join("|||");

// Merge name variants to canonical form
const NAME_ALIASES: Record<string, string> = {
  "Schunn, C": "Schunn, C. D.",
  "Schunn, C.": "Schunn, C. D.",
  "Schunn, C, Alqassab, M.": "Schunn, C. D.", // data artifact
  "Kim, M.": "Kim, M. K.",
  "Kim, M": "Kim, M. K.",
  "Kim, M. Kim, J.": "Kim, M. K.", // data artifact — will also add Kim, J. separately
  "Kim, M. Haddadian, G.": "Kim, M. K.",
  "Banihashem, K.": "Banihashem, S. K.",
};

function norm(name: string): string {
  const n = name.trim().replace(/\s+/g, " ");
  return NAME_ALIASES[n] || n;
}

// Fix malformed author entries in data
function cleanAuthors(authors: string[]): string[] {
  const result: string[] = [];
  for (const a of authors) {
    const trimmed = a.trim().replace(/\s+/g, " ");
    // Handle "Kim, M. Kim, J." → two authors
    if (trimmed === "Kim, M. Kim, J.") {
      result.push("Kim, M. K.");
      result.push("Kim, J.");
    } else if (trimmed === "Kim, M. Haddadian, G.") {
      result.push("Kim, M. K.");
      result.push("Haddadian, G.");
    } else if (trimmed === "Schunn, C, Alqassab, M.") {
      result.push("Schunn, C. D.");
      result.push("Alqassab, M.");
    } else {
      result.push(norm(trimmed));
    }
  }
  return result;
}

// Pillar-family palette: matches the four research pillars (blue, teal, pink,
// gold) plus complementary hues from the site's accent set.
const PAL = [
  { l: "hsl(224,84%,63%)", d: "hsl(224,84%,72%)", bg_l: "hsla(224,84%,63%,0.10)", bg_d: "hsla(224,84%,72%,0.12)" }, // pillar blue
  { l: "hsl(174,72%,40%)", d: "hsl(174,66%,52%)", bg_l: "hsla(174,72%,40%,0.10)", bg_d: "hsla(174,66%,52%,0.12)" }, // pillar teal
  { l: "hsl(336,78%,60%)", d: "hsl(336,78%,70%)", bg_l: "hsla(336,78%,60%,0.10)", bg_d: "hsla(336,78%,70%,0.12)" }, // pillar pink
  { l: "hsl(43,86%,50%)",  d: "hsl(43,86%,60%)",  bg_l: "hsla(43,86%,50%,0.10)",  bg_d: "hsla(43,86%,60%,0.12)" },  // pillar gold
  { l: "hsl(262,72%,64%)", d: "hsl(262,72%,74%)", bg_l: "hsla(262,72%,64%,0.10)", bg_d: "hsla(262,72%,74%,0.12)" }, // lavender/violet
  { l: "hsl(196,76%,46%)", d: "hsl(196,70%,58%)", bg_l: "hsla(196,76%,46%,0.10)", bg_d: "hsla(196,70%,58%,0.12)" }, // sky
  { l: "hsl(150,58%,42%)", d: "hsl(150,52%,54%)", bg_l: "hsla(150,58%,42%,0.10)", bg_d: "hsla(150,52%,54%,0.12)" }, // green
  { l: "hsl(20,88%,56%)",  d: "hsl(20,84%,64%)",  bg_l: "hsla(20,88%,56%,0.10)",  bg_d: "hsla(20,84%,64%,0.12)" },  // orange
];

function build() {
  const all: string[][] = [];
  for (const a of [
    ...journalPublications.map(p => p.authors),
    ...conferenceProceedings.map(p => p.authors),
    ...otherPresentations.map(p => p.authors),
    ...nonRefereedPublications.map(p => p.authors),
    ...workUnderReview.map(p => p.authors),
    ...workInProgress.map(p => p.authors),
  ]) {
    if (a?.length) all.push(cleanAuthors(a));
  }

  const counts: Record<string, number> = {};
  const pairs: Record<string, number> = {};

  for (const authors of all) {
    if (!authors.some(isSelf)) continue;
    const cas = authors.filter(a => !isSelf(a) && !isExcluded(a) && a.length > 1);
    for (const c of cas) counts[c] = (counts[c] || 0) + 1;
    for (let i = 0; i < cas.length; i++)
      for (let j = i + 1; j < cas.length; j++)
        pairs[lk(cas[i], cas[j])] = (pairs[lk(cas[i], cas[j])] || 0) + 1;
  }

  const coauthors = Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  const interLinks = Object.entries(pairs).map(([k, w]) => {
    const [s, t] = k.split("|||");
    return { source: s, target: t, weight: w };
  });

  // BFS clustering
  const adj: Record<string, Set<string>> = {};
  for (const c of coauthors) adj[c.name] = new Set();
  for (const il of interLinks) {
    adj[il.source]?.add(il.target);
    adj[il.target]?.add(il.source);
  }
  const clusters: Record<string, number> = {};
  const vis = new Set<string>();
  let ci = 0;
  for (const { name } of coauthors) {
    if (vis.has(name)) continue;
    const q = [name]; vis.add(name);
    while (q.length) {
      const cur = q.shift()!;
      clusters[cur] = ci;
      for (const nb of adj[cur]) { if (!vis.has(nb)) { vis.add(nb); q.push(nb); } }
    }
    ci++;
  }

  return { coauthors, interLinks, clusters };
}

const CoauthorshipNetwork = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef(0);
  const nodesRef = useRef<Node[]>([]);
  const linksRef = useRef<Link[]>([]);
  const [hovered, setHovered] = useState<string | null>(null);
  const [dims, setDims] = useState({ w: 700, h: 550 });
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const dragId = useRef<string | null>(null);

  const { coauthors, interLinks, clusters } = useMemo(build, []);

  // Responsive scale factor based on container width
  // Smaller scale on mobile/tablet for a more compact, user-friendly graph
  const scale = useMemo(() => {
    if (dims.w < 500) return Math.max(0.35, dims.w / 900);   // mobile
    if (dims.w < 700) return Math.max(0.45, dims.w / 800);   // tablet
    return Math.max(0.55, Math.min(1, dims.w / 700));         // desktop (unchanged)
  }, [dims.w]);

  useEffect(() => {
    const up = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      // Taller aspect ratio on mobile for more vertical room
      const aspectRatio = w < 500 ? 1.0 : w < 700 ? 0.85 : 0.72;
      setDims({ w, h: Math.min(Math.max(w * aspectRatio, 380), 640) });
    };
    up();
    window.addEventListener("resize", up);
    return () => window.removeEventListener("resize", up);
  }, []);

  // Init graph
  useEffect(() => {
    if (!coauthors.length) return;
    const { w, h } = dims;
    const cx = w / 2, cy = h / 2;
    const cR = Math.max(36 * scale, Math.min(72, w * 0.09));

    const nodes: Node[] = [{
      id: "_center", label: "Collaborators", count: 0,
      x: cx, y: cy, vx: 0, vy: 0, r: cR, isCenter: true, cluster: -1,
    }];
    const links: Link[] = [];
    const ids = new Set(["_center"]);

    // Scale coauthor node sizes with screen
    coauthors.forEach((co, i) => {
      const a = (2 * Math.PI * i) / coauthors.length;
      const d = cR + (50 + Math.random() * 20) * scale + 30;
      const r = (10 + Math.min(co.count, 8) * 2.5) * Math.max(0.7, scale);
      nodes.push({
        id: co.name, label: co.name, count: co.count,
        x: cx + Math.cos(a) * d + (Math.random() - 0.5) * 15,
        y: cy + Math.sin(a) * d + (Math.random() - 0.5) * 15,
        vx: 0, vy: 0, r, cluster: clusters[co.name] ?? 0,
      });
      ids.add(co.name);
      links.push({ source: "_center", target: co.name, weight: co.count });
    });

    for (const il of interLinks) {
      if (ids.has(il.source) && ids.has(il.target)) links.push(il);
    }

    nodesRef.current = nodes;
    linksRef.current = links;
  }, [coauthors, interLinks, clusters, dims, scale]);

  // Simulation + render
  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext("2d")!;
    const { w, h } = dims;
    const dpr = window.devicePixelRatio || 1;
    cvs.width = w * dpr;
    cvs.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    let alpha = 1;

    const tick = () => {
      const ns = nodesRef.current;
      const ls = linksRef.current;
      if (!ns.length) { animRef.current = requestAnimationFrame(tick); return; }

      alpha *= 0.993;
      if (alpha < 0.0003) alpha = 0.0003;

      // Gravity
      for (const n of ns) {
        if (n.isCenter || dragId.current === n.id) continue;
        n.vx += (w / 2 - n.x) * 0.0003;
        n.vy += (h / 2 - n.y) * 0.0003;
      }

      // Cluster cohesion
      for (let i = 1; i < ns.length; i++) {
        for (let j = i + 1; j < ns.length; j++) {
          if (ns[i].cluster !== ns[j].cluster || ns[i].cluster < 0) continue;
          const dx = ns[j].x - ns[i].x, dy = ns[j].y - ns[i].y;
          const d = Math.sqrt(dx * dx + dy * dy) || 1;
          if (d > 30) {
            const f = 0.0002 * alpha;
            if (dragId.current !== ns[i].id) { ns[i].vx += dx * f; ns[i].vy += dy * f; }
            if (dragId.current !== ns[j].id) { ns[j].vx -= dx * f; ns[j].vy -= dy * f; }
          }
        }
      }

      // Spring
      for (const l of ls) {
        const s = ns.find(n => n.id === l.source);
        const t = ns.find(n => n.id === l.target);
        if (!s || !t) continue;
        const dx = t.x - s.x, dy = t.y - s.y;
        const d = Math.sqrt(dx * dx + dy * dy) || 1;
        const inter = l.source !== "_center" && l.target !== "_center";
        const td = inter ? 55 : (s.r + t.r) + 50 + (1 / l.weight) * 35;
        const str = inter ? 0.001 : 0.002;
        const f = (d - td) * str * alpha;
        if (!s.isCenter && dragId.current !== s.id) { s.vx += (dx / d) * f; s.vy += (dy / d) * f; }
        if (!t.isCenter && dragId.current !== t.id) { t.vx -= (dx / d) * f; t.vy -= (dy / d) * f; }
      }

      // Repulsion — generous min distance to prevent label overlap
      for (let i = 0; i < ns.length; i++) {
        for (let j = i + 1; j < ns.length; j++) {
          const a = ns[i], b = ns[j];
          const dx = b.x - a.x, dy = b.y - a.y;
          const d = Math.sqrt(dx * dx + dy * dy) || 1;
          const minD = a.r + b.r + 28 * scale + 10; // scaled spacing for labels
          if (d < minD) {
            const f = ((minD - d) / d) * 0.45;
            if (!a.isCenter && dragId.current !== a.id) { a.vx -= dx * f; a.vy -= dy * f; }
            if (!b.isCenter && dragId.current !== b.id) { b.vx += dx * f; b.vy += dy * f; }
          }
        }
      }

      // Apply
      for (const n of ns) {
        if (n.isCenter) { n.x = w / 2; n.y = h / 2; continue; }
        if (dragId.current === n.id) continue;
        n.vx *= 0.86; n.vy *= 0.86;
        n.x += n.vx; n.y += n.vy;
        n.x = Math.max(n.r + 20, Math.min(w - n.r - 20, n.x));
        n.y = Math.max(n.r + 16, Math.min(h - n.r - 16, n.y));
      }

      // ── DRAW ──
      ctx.clearRect(0, 0, w, h);
      const dk = document.documentElement.classList.contains("dark");
      const bg = dk ? "#0c1425" : "transparent";
      const txt = dk ? "#c8d6e5" : "#374151";
      const txtMuted = dk ? "#6b7d95" : "#9ca3af";

      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      const pal = (ci: number) => dk ? PAL[ci % PAL.length].d : PAL[ci % PAL.length].l;
      const palBg = (ci: number) => dk ? PAL[ci % PAL.length].bg_d : PAL[ci % PAL.length].bg_l;

      // ── CLUSTER HULLS ── draw soft background blobs behind each cluster
      const clusterMap = new Map<number, Node[]>();
      for (const n of ns) {
        if (n.isCenter) continue;
        const arr = clusterMap.get(n.cluster) || [];
        arr.push(n);
        clusterMap.set(n.cluster, arr);
      }
      for (const [ci, members] of clusterMap) {
        if (members.length < 2) continue; // no hull for singletons
        // Compute centroid
        let cx2 = 0, cy2 = 0;
        for (const m of members) { cx2 += m.x; cy2 += m.y; }
        cx2 /= members.length; cy2 /= members.length;
        // Sort by angle from centroid for convex-ish blob
        const sorted = [...members].sort((a, b) =>
          Math.atan2(a.y - cy2, a.x - cx2) - Math.atan2(b.y - cy2, b.x - cx2)
        );
        // Draw smooth blob with padding
        const pad = 32;
        ctx.beginPath();
        for (let i = 0; i < sorted.length; i++) {
          const curr = sorted[i];
          const next = sorted[(i + 1) % sorted.length];
          const dx = curr.x - cx2, dy = curr.y - cy2;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const px = curr.x + (dx / dist) * pad;
          const py = curr.y + (dy / dist) * pad;
          if (i === 0) ctx.moveTo(px, py);
          const ndx = next.x - cx2, ndy = next.y - cy2;
          const ndist = Math.sqrt(ndx * ndx + ndy * ndy) || 1;
          const npx = next.x + (ndx / ndist) * pad;
          const npy = next.y + (ndy / ndist) * pad;
          const cpx = cx2 + ((px + npx) / 2 - cx2) * 1.1;
          const cpy = cy2 + ((py + npy) / 2 - cy2) * 1.1;
          ctx.quadraticCurveTo(cpx, cpy, npx, npy);
        }
        ctx.closePath();
        ctx.fillStyle = palBg(ci);
        ctx.fill();
        // Subtle border
        ctx.strokeStyle = pal(ci).replace("hsl(", "hsla(").replace(")", ",0.12)");
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Connected to hovered
      const hovLinks = new Set<string>();
      if (hovered) {
        for (const l of ls) {
          if (l.source === hovered) hovLinks.add(l.target);
          if (l.target === hovered) hovLinks.add(l.source);
        }
        hovLinks.add(hovered);
      }

      // ── EDGES ──
      for (const l of ls) {
        const s = ns.find(n => n.id === l.source);
        const t = ns.find(n => n.id === l.target);
        if (!s || !t) continue;
        const isCtr = l.source === "_center" || l.target === "_center";
        const connected = !hovered || (hovLinks.has(l.source) && hovLinks.has(l.target));

        const coNode = s.isCenter ? t : t.isCenter ? s : s;
        const c = pal(coNode.cluster);

        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(t.x, t.y);

        if (!connected) {
          ctx.strokeStyle = dk ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)";
          ctx.lineWidth = 0.5;
        } else {
          const lw = isCtr
            ? 1 + l.weight * 0.8
            : 0.5 + l.weight * 0.5;
          ctx.lineWidth = Math.min(lw, isCtr ? 5 : 3);
          const opac = hovered ? (isCtr ? 0.5 : 0.35) : (isCtr ? 0.2 : 0.1);
          // Parse HSL and apply opacity
          ctx.strokeStyle = c.replace("hsl(", "hsla(").replace(")", `,${opac})`);
        }
        ctx.stroke();
      }

      // ── NODES ──
      for (const n of ns) {
        const isHov = hovered === n.id;
        const connected = !hovered || hovLinks.has(n.id) || n.isCenter;
        const opacity = connected ? 1 : 0.15;

        ctx.globalAlpha = opacity;

        if (n.isCenter) {
          // Glow
          const g = ctx.createRadialGradient(n.x, n.y, n.r * 0.7, n.x, n.y, n.r * 1.8);
          g.addColorStop(0, dk ? "rgba(59,130,246,0.12)" : "rgba(37,99,235,0.08)");
          g.addColorStop(1, "transparent");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * 1.8, 0, Math.PI * 2);
          ctx.fill();

          // Circle
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
          ctx.fillStyle = dk ? "hsl(220,55%,38%)" : "hsl(220,18%,28%)";
          ctx.fill();
          ctx.strokeStyle = dk ? "rgba(96,165,250,0.3)" : "rgba(37,99,235,0.2)";
          ctx.lineWidth = 2;
          ctx.stroke();

          // Label
          ctx.fillStyle = "#ffffff";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          const centerLabel = "Collaborators";
          let centerFont = Math.max(10, Math.round(14 * scale));
          ctx.font = `bold ${centerFont}px system-ui, -apple-system, sans-serif`;
          const centerMaxW = n.r * 1.6;
          while (ctx.measureText(centerLabel).width > centerMaxW && centerFont > 8) {
            centerFont -= 1;
            ctx.font = `bold ${centerFont}px system-ui, -apple-system, sans-serif`;
          }
          ctx.fillText(centerLabel, n.x, n.y);

          ctx.globalAlpha = 1;
          continue;
        }

        const c = pal(n.cluster);

        // Hover glow
        if (isHov) {
          const hg = ctx.createRadialGradient(n.x, n.y, n.r * 0.5, n.x, n.y, n.r * 2.2);
          hg.addColorStop(0, c.replace("hsl(", "hsla(").replace(")", ",0.15)"));
          hg.addColorStop(1, "transparent");
          ctx.fillStyle = hg;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * 2.2, 0, Math.PI * 2);
          ctx.fill();
        }

        // Circle
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = c;
        ctx.fill();

        // Count inside — white
        const countFont = Math.max(8, Math.round(10 * scale));
        ctx.font = `600 ${countFont}px system-ui, sans-serif`;
        ctx.fillStyle = "#fff";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(String(n.count), n.x, n.y);

        // Label below — positioned to avoid overlap
        const labelFont = Math.max(8, Math.round(11 * scale));
        ctx.font = `${isHov ? "600" : "500"} ${labelFont}px system-ui, -apple-system, sans-serif`;
        ctx.fillStyle = isHov ? txt : txtMuted;
        ctx.fillText(n.label, n.x, n.y + n.r + 10 * scale + 3);

        ctx.globalAlpha = 1;
      }

      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [dims, hovered]);

  const nodeAt = useCallback((mx: number, my: number) => {
    for (const n of nodesRef.current) {
      const dx = mx - n.x, dy = my - n.y;
      if (dx * dx + dy * dy < (n.r + 6) ** 2) return n;
    }
    return null;
  }, []);

  const onMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const r = canvasRef.current?.getBoundingClientRect();
    if (!r) return;
    const mx = e.clientX - r.left, my = e.clientY - r.top;
    if (dragging.current && dragId.current) {
      const n = nodesRef.current.find(n => n.id === dragId.current);
      if (n) { n.x = mx; n.y = my; n.vx = 0; n.vy = 0; }
      return;
    }
    const n = nodeAt(mx, my);
    setHovered(n?.id || null);
    if (canvasRef.current) canvasRef.current.style.cursor = n ? "grab" : "default";
  }, [nodeAt]);

  const onDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const r = canvasRef.current?.getBoundingClientRect();
    if (!r) return;
    const n = nodeAt(e.clientX - r.left, e.clientY - r.top);
    if (n && !n.isCenter) {
      dragging.current = true;
      dragId.current = n.id;
      if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
    }
  }, [nodeAt]);

  const onUp = useCallback(() => { dragging.current = false; dragId.current = null; }, []);

  // Touch event handlers for mobile/tablet
  const getTouch = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    const r = canvasRef.current?.getBoundingClientRect();
    if (!r || !e.touches.length) return null;
    return { mx: e.touches[0].clientX - r.left, my: e.touches[0].clientY - r.top };
  }, []);

  const onTouchStart = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    const pos = getTouch(e);
    if (!pos) return;
    const n = nodeAt(pos.mx, pos.my);
    if (n && !n.isCenter) {
      e.preventDefault();
      dragging.current = true;
      dragId.current = n.id;
    }
    setHovered(n?.id || null);
  }, [nodeAt, getTouch]);

  const onTouchMove = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!dragging.current || !dragId.current) return;
    e.preventDefault();
    const pos = getTouch(e);
    if (!pos) return;
    const n = nodesRef.current.find(n => n.id === dragId.current);
    if (n) { n.x = pos.mx; n.y = pos.my; n.vx = 0; n.vy = 0; }
  }, [getTouch]);

  const onTouchEnd = useCallback(() => {
    dragging.current = false;
    dragId.current = null;
    setHovered(null);
  }, []);

  // Build cluster legend data
  const clusterLegend = useMemo(() => {
    if (!coauthors.length) return [];
    const clusterMap: Record<number, string[]> = {};
    coauthors.forEach(co => {
      const ci = clusters[co.name] ?? 0;
      if (!clusterMap[ci]) clusterMap[ci] = [];
      clusterMap[ci].push(co.name.split(",")[0]);
    });
    return Object.entries(clusterMap)
      .map(([ci, members]) => ({
        index: Number(ci),
        label: `Cluster ${Number(ci) + 1}`,
        members,
      }))
      .slice(0, PAL.length);
  }, [coauthors, clusters]);

  const dk = typeof document !== "undefined" && document.documentElement.classList.contains("dark");

  return (
    <div ref={containerRef} className="w-full space-y-3">
      <canvas
        ref={canvasRef}
        style={{ width: dims.w, height: dims.h, touchAction: "none" }}
        className="w-full rounded-xl border border-border"
        onMouseMove={onMove}
        onMouseDown={onDown}
        onMouseUp={onUp}
        onMouseLeave={() => { onUp(); setHovered(null); }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      />

      {/* Visual Legend */}
      <div className="flex flex-col gap-3 px-1">
        {/* Interaction hints */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[10px] sm:text-xs text-muted-foreground/60">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-5 h-5 rounded-full border-2 border-muted-foreground/30 bg-muted/40 text-[8px] flex items-center justify-center font-bold text-muted-foreground/50">3</span>
            <span>Number = shared publications</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-6 h-0.5 bg-muted-foreground/30 rounded" />
            <span>Line thickness = collaboration frequency</span>
          </span>
          <span className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 14 14" className="opacity-50"><path d="M7 1l2 4h4l-3 3 1 4-4-2-4 2 1-4-3-3h4z" fill="currentColor"/></svg>
            <span>Hover to explore · Drag to rearrange</span>
          </span>
        </div>

        <p className="text-[9px] sm:text-[10px] text-muted-foreground/40 mt-1">
          (The visualization was generated using data collected through Google Scholar crawling; therefore, its coverage and accuracy may be limited.)
        </p>
      </div>
    </div>
  );
};

export default CoauthorshipNetwork;
