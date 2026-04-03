
import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

// ── Strand definitions (3 strands: triangular Venn) ──
type StrandId = "adaptive" | "feedback" | "writing";
type WorkType = "journal" | "conference" | "inprogress" | "underreview";

interface Publication {
  id: string;
  title: string;
  authors: string;
  venue: string;
  year: string;
  type: WorkType;
  strands: StrandId[];
  url?: string;
}

const STRANDS: Record<StrandId, { label: string; subtitle: string; color: string; colorLight: string }> = {
  adaptive: {
    label: "Personalized &\nAdaptive Learning\nEnvironments",
    subtitle: "Intelligent systems & learner-centered design",
    color: "hsl(172, 66%, 30%)",
    colorLight: "hsl(172, 66%, 50%)",
  },
  feedback: {
    label: "Feedback",
    subtitle: "Formative assessment & peer evaluation",
    color: "hsl(263, 70%, 50%)",
    colorLight: "hsl(263, 70%, 65%)",
  },
  writing: {
    label: "Language Education",
    subtitle: "Writing, Argumentation, AWE\nCALL & Assessment",
    color: "hsl(205, 80%, 33%)",
    colorLight: "hsl(205, 80%, 53%)",
  },
};

const PUBLICATIONS: Publication[] = [
  // Journals
  { id: "j1", title: "Problem-centered post-secondary CS education: Private AI curriculum", authors: "Haddadian, G., Panzade, P., Takabi, D., & Kim, M. K.", venue: "IJTE, 8(2)", year: "2025", type: "journal", strands: ["adaptive"] },
  { id: "j2", title: "Construction and validation of a CFAL questionnaire for language teachers", authors: "Haddadian, G., Radmanesh, S., & Haddadian, N.", venue: "Language Testing in Asia, 14(33)", year: "2024", type: "journal", strands: ["feedback", "writing"] },
  { id: "j3", title: "Innovative Use of Grammarly Feedback for Improving EFL Learners' Speaking", authors: "Haddadian, G., & Haddadian, N.", venue: "JAID, 13(2)", year: "2024", type: "journal", strands: ["feedback", "writing"] },
  { id: "j4", title: "Comparing Effects of Teacher, Automated, and Integrative Feedback on Writing", authors: "Haddadian, G.", venue: "CALL-EJ, 25(3)", year: "2024", type: "journal", strands: ["feedback", "writing"] },
  { id: "j5", title: "Conversational Repairs in Persian Dramatic Discourse", authors: "Haddadian, G., & Mahmoodi-Bakhtiari, B.", venue: "Persian Literary Studies, 7(11)", year: "2018", type: "journal", strands: ["writing"] },
  // Conferences
  { id: "c1", title: "Supporting peer feedback provision and uptake with GenAI", authors: "Noroozi, O., Haddadian, G., et al.", venue: "ICLS/ISLS 2025", year: "2025", type: "conference", strands: ["feedback"] },
  { id: "c2", title: "Automated Generation of Expert Models with Generative AI", authors: "Haddadian, G., Han, H., Kim, M., et al.", venue: "ICLS/ISLS 2025", year: "2025", type: "conference", strands: ["adaptive"] },
  { id: "c3", title: "Evaluating Private AI Curriculum in CS Education", authors: "Haddadian, G., Panzade, P., Takabi, D., & Kim, M. K.", venue: "ICLS 2024", year: "2024", type: "conference", strands: ["adaptive"] },
  { id: "c4", title: "ELT Teachers' Online Self-efficacy: Does Agency Matter?", authors: "Haddadian, G., & Haddadian, N.", venue: "SITE 2024", year: "2024", type: "conference", strands: ["writing"] },
  { id: "c5", title: "Impact of AI-Enabled Personalized Recommendations on L2 Learners", authors: "Daneshvar Ghorbani, B., & Haddadian, G.", venue: "AIRiAL 2024, Columbia University", year: "2024", type: "conference", strands: ["adaptive", "writing"] },
  { id: "c6", title: "Knowledge-based AI vs. Human Evaluation in Academic Summary", authors: "Kim, J., Haddadian, G., & Kim, M.", venue: "ICLS 2023", year: "2023", type: "conference", strands: ["feedback"] },
  { id: "c7", title: "Design Study of PCI for Private AI Curriculum Development", authors: "Haddadian, G., Takabi, D., Panzade, P., Kim, M.", venue: "AECT 2023", year: "2023", type: "conference", strands: ["adaptive"] },
  { id: "c8", title: "A Comprehensive Model of AI Literacy from a Developmental Perspective", authors: "Haddadian, G., Bae, Y., Kim, J., & Kim, M.", venue: "AECT 2023", year: "2023", type: "conference", strands: ["adaptive"] },
  { id: "c9", title: "Learning progress models using an AI-enabled knowledge representation", authors: "Kim, M., Kim, N., Haddadian, G., & Heidari, A.", venue: "ICLS 2023", year: "2023", type: "conference", strands: ["adaptive"] },
  { id: "c10", title: "Impact of AI-based educational tool: Technology acceptance & metacognition", authors: "Bae, Y., Kim, J., Haddadian, G., et al.", venue: "AECT 2023", year: "2023", type: "conference", strands: ["adaptive"] },
  { id: "c11", title: "Leveraging ML to evaluate cognitive engagement in online discussions", authors: "Kim, J., Bae, Y., Haddadian, G., & Kim, M.", venue: "AECT 2023", year: "2023", type: "conference", strands: ["feedback"] },
  { id: "c12", title: "AI-augmented summarization: Impact on adult learners' concept learning", authors: "Kim, J., Bae, Y., Haddadian, G., et al.", venue: "AECT 2023", year: "2023", type: "conference", strands: ["adaptive"] },
  { id: "c13", title: "Effect of Mind Mapping on EFL Learners' Self-efficacy in Vocabulary", authors: "Radmanesh, S., Haddadian, G.", venue: "WEI-ETL Barcelona 2020", year: "2020", type: "conference", strands: ["writing"] },
  { id: "c14", title: "Computer-Adaptive Prototype to Measure Written Receptive Vocabulary", authors: "Haddadian, G., Salehi, M.", venue: "Sharif University of Technology", year: "2015", type: "conference", strands: ["adaptive", "writing"] },
  // Under Review
  { id: "r1", title: "Learners' Collaboration in Using AI-generated Feedback & Argumentative Writing", authors: "Haddadian, G., Haddadian, M.", venue: "Computer Assisted Language Learning", year: "2025", type: "underreview", strands: ["feedback", "writing"] },
  { id: "r2", title: "Scaffolding Value of GenAI during Peer Feedback Provision and Uptake", authors: "Noroozi, O., Haddadian, G., et al.", venue: "Int. J. Educational Technology in Higher Ed.", year: "2025", type: "underreview", strands: ["feedback"] },
  { id: "r3", title: "Promoting EFL Teachers' Self-Directed Professional Development", authors: "Mashhadi, F., Haddadian, G., et al.", venue: "Journal of Language and Education", year: "2025", type: "underreview", strands: ["writing"] },
  { id: "r4", title: "Exploring Classroom Interactions in Iranian EFL Classrooms", authors: "Kavoshian, S., Mashhadi, F., Haddadian, G.", venue: "Int. J. Language Studies", year: "2025", type: "underreview", strands: ["feedback", "writing"] },
  // In Progress
  { id: "p1", title: "Systematic Review of AWE in Argumentative Writing for EFL Education", authors: "Haddadian, G., Kim, M., Haddadian, N.", venue: "Journal Article", year: "2025", type: "inprogress", strands: ["writing", "feedback"] },
  { id: "p2", title: "RITA: Real-time Intelligent Technology for Argumentative Writing (DBR)", authors: "Haddadian, G., Kim, M.", venue: "Journal Article", year: "2025", type: "inprogress", strands: ["writing", "adaptive", "feedback"] },
  { id: "p3", title: "GenAI to Facilitate Peer Feedback: Opportunities and Challenges", authors: "Alqassab, M., Noroozi, O., Haddadian, G., et al.", venue: "Book Chapter", year: "2025", type: "inprogress", strands: ["feedback"] },
  { id: "p4", title: "Students' Plagiarism Behaviors within AI-Enabled Introductory Physics", authors: "Han, H., Haddadian, G., et al.", venue: "Journal Article", year: "2025", type: "inprogress", strands: ["adaptive"] },
  { id: "p5", title: "GenAI for Automated Construction and Evaluation of Expert Models", authors: "Han, H., Kim, M., Haddadian, G.", venue: "Journal Article", year: "2025", type: "inprogress", strands: ["adaptive"] },
  { id: "p6", title: "Examining Learner's Evaluative Judgment Supported by Technology-Enabled Feedback", authors: "Heidari, A., Kim, M., et al., Haddadian, G.", venue: "Journal Article", year: "2025", type: "inprogress", strands: ["feedback", "adaptive"] },
];

const TYPE_LABELS: Record<WorkType, string> = {
  journal: "Journal",
  conference: "Conference",
  inprogress: "In Progress",
  underreview: "Under Review",
};

const FILTER_OPTIONS: { label: string; value: WorkType | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Journals", value: "journal" },
  { label: "Conferences", value: "conference" },
  { label: "Under Review", value: "underreview" },
  { label: "In Progress", value: "inprogress" },
];

const W = 900, H = 820;
const CX = 450, CY = 420;
const RING_RADII = [85, 170, 260];

// Triangular layout: adaptive top, writing bottom-left, feedback bottom-right
// Labels positioned INSIDE the circles near the outer edges
const STRAND_POSITIONS: Record<StrandId, { angle: number; labelX: number; labelY: number; anchor: string }> = {
  adaptive: { angle: -90, labelX: CX, labelY: CY - 170, anchor: "middle" },
  writing: { angle: 210, labelX: CX - 140, labelY: CY + 40, anchor: "middle" },
  feedback: { angle: 330, labelX: CX + 140, labelY: CY + 50, anchor: "middle" },
};

// Circle centers for positioning (must match circleParams below)
const CIRCLE_CENTERS: Record<StrandId, { cx: number; cy: number }> = {
  adaptive: { cx: CX, cy: CY - 160 },
  writing: { cx: CX - 180, cy: CY + 110 },
  feedback: { cx: CX + 180, cy: CY + 110 },
};

function getDotPosition(pub: Publication): { x: number; y: number } {
  const strands = pub.strands;
  const seed = hashCode(pub.id);

  // Compute target center: average of all strand circle centers
  let targetX = 0, targetY = 0;
  strands.forEach((s) => {
    targetX += CIRCLE_CENTERS[s].cx;
    targetY += CIRCLE_CENTERS[s].cy;
  });
  targetX /= strands.length;
  targetY /= strands.length;

  // For multi-strand pubs, place closer to the overlap center
  // For single-strand pubs, spread within the circle
  const spreadRadius = strands.length === 1 ? 140 : 80;
  const angle = ((seed >> 4) & 0xff) / 255 * Math.PI * 2;
  const r = spreadRadius * (0.2 + (((seed >> 12) & 0xff) / 255) * 0.7);
  
  return { x: targetX + r * Math.cos(angle), y: targetY + r * Math.sin(angle) };
}

function resolveOverlaps(pubs: Publication[], posMap: Map<string, { x: number; y: number }>) {
  const MIN_DIST = 30;
  const iterations = 15;
  for (let iter = 0; iter < iterations; iter++) {
    let moved = false;
    for (let i = 0; i < pubs.length; i++) {
      for (let j = i + 1; j < pubs.length; j++) {
        const a = posMap.get(pubs[i].id);
        const b = posMap.get(pubs[j].id);
        if (!a || !b) continue;
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MIN_DIST && dist > 0) {
          const push = (MIN_DIST - dist) / 2;
          const nx = dx / dist;
          const ny = dy / dist;
          a.x -= nx * push;
          a.y -= ny * push;
          b.x += nx * push;
          b.y += ny * push;
          moved = true;
        } else if (dist === 0) {
          a.x += (Math.random() - 0.5) * MIN_DIST;
          a.y += (Math.random() - 0.5) * MIN_DIST;
          moved = true;
        }
      }
    }
    if (!moved) break;
  }
}

function hashCode(s: string): number {
  let hash = 0;
  for (let i = 0; i < s.length; i++) hash = ((hash << 5) - hash + s.charCodeAt(i)) | 0;
  return Math.abs(hash);
}

function countByStrand(strandId: StrandId): number {
  return PUBLICATIONS.filter((p) => p.strands.includes(strandId)).length;
}

const ResearchStrands = () => {
  const [filter, setFilter] = useState<WorkType | "all">("all");
  const [hoveredStrand, setHoveredStrand] = useState<StrandId | null>(null);
  const [selectedPub, setSelectedPub] = useState<Publication | null>(null);
  const [hoveredDot, setHoveredDot] = useState<{ pub: Publication; x: number; y: number } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [, forceRender] = useState(0);

  const positions = useRef<Map<string, { x: number; y: number }>>(new Map());
  const velocities = useRef<Map<string, { vx: number; vy: number }>>(new Map());
  const dragState = useRef<{
    id: string | null;
    startMouseSVG: { x: number; y: number };
    startPos: { x: number; y: number };
    lastMouse: { x: number; y: number };
    lastTime: number;
  }>({ id: null, startMouseSVG: { x: 0, y: 0 }, startPos: { x: 0, y: 0 }, lastMouse: { x: 0, y: 0 }, lastTime: 0 });
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    PUBLICATIONS.forEach((pub) => {
      if (!positions.current.has(pub.id)) {
        positions.current.set(pub.id, getDotPosition(pub));
        velocities.current.set(pub.id, { vx: 0, vy: 0 });
      }
    });
    resolveOverlaps(PUBLICATIONS, positions.current);
    forceRender((n) => n + 1);
  }, []);

  useEffect(() => {
    let running = true;
    const decay = 0.94;
    const minV = 0.08;
    const tick = () => {
      if (!running) return;
      let anyMoving = false;
      velocities.current.forEach((vel, id) => {
        if (dragState.current.id === id) return;
        if (Math.abs(vel.vx) > minV || Math.abs(vel.vy) > minV) {
          anyMoving = true;
          vel.vx *= decay;
          vel.vy *= decay;
          const pos = positions.current.get(id);
          if (pos) {
            pos.x += vel.vx;
            pos.y += vel.vy;
          }
        } else {
          vel.vx = 0;
          vel.vy = 0;
        }
      });
      if (anyMoving) forceRender((n) => n + 1);
      animFrameRef.current = requestAnimationFrame(tick);
    };
    animFrameRef.current = requestAnimationFrame(tick);
    return () => { running = false; cancelAnimationFrame(animFrameRef.current); };
  }, []);

  const screenToSVG = useCallback((clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return { x: 0, y: 0 };
    const svgPt = pt.matrixTransform(ctm.inverse());
    return { x: svgPt.x, y: svgPt.y };
  }, []);

  const handlePointerDown = useCallback((pub: Publication, e: React.PointerEvent) => {
    e.preventDefault();
    (e.target as Element).setPointerCapture(e.pointerId);
    const svgPt = screenToSVG(e.clientX, e.clientY);
    const pos = positions.current.get(pub.id) || { x: 0, y: 0 };
    dragState.current = {
      id: pub.id,
      startMouseSVG: svgPt,
      startPos: { ...pos },
      lastMouse: svgPt,
      lastTime: performance.now(),
    };
    const vel = velocities.current.get(pub.id);
    if (vel) { vel.vx = 0; vel.vy = 0; }
  }, [screenToSVG]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    const ds = dragState.current;
    if (!ds.id) return;
    const svgPt = screenToSVG(e.clientX, e.clientY);
    const pos = positions.current.get(ds.id);
    if (pos) {
      pos.x = ds.startPos.x + (svgPt.x - ds.startMouseSVG.x);
      pos.y = ds.startPos.y + (svgPt.y - ds.startMouseSVG.y);
    }
    const now = performance.now();
    const dt = Math.max(now - ds.lastTime, 1);
    const vel = velocities.current.get(ds.id);
    if (vel) {
      vel.vx = ((svgPt.x - ds.lastMouse.x) / dt) * 16;
      vel.vy = ((svgPt.y - ds.lastMouse.y) / dt) * 16;
    }
    ds.lastMouse = svgPt;
    ds.lastTime = now;
    forceRender((n) => n + 1);
  }, [screenToSVG]);

  const handlePointerUp = useCallback((pub: Publication) => {
    if (dragState.current.id === pub.id) {
      const ds = dragState.current;
      const pos = positions.current.get(pub.id);
      const startPos = ds.startPos;
      if (pos && Math.abs(pos.x - startPos.x) < 3 && Math.abs(pos.y - startPos.y) < 3) {
        setSelectedPub(pub);
      }
      dragState.current.id = null;
    }
  }, []);

  const filteredPubs = PUBLICATIONS.filter((p) => filter === "all" || p.type === filter);

  const getPos = useCallback((pub: Publication) => {
    return positions.current.get(pub.id) || getDotPosition(pub);
  }, []);

  // Build peer connections: connect each publication to its nearest neighbors sharing a strand
  const connectionLines = useMemo(() => {
    const lines: { a: string; b: string }[] = [];
    const MAX_NEIGHBORS = 2;
    for (const pub of filteredPubs) {
      const pos = positions.current.get(pub.id);
      if (!pos) continue;
      const neighbors = filteredPubs
        .filter(other => other.id !== pub.id && other.strands.some(s => pub.strands.includes(s)))
        .map(other => {
          const oPos = positions.current.get(other.id);
          if (!oPos) return { id: other.id, dist: Infinity };
          return { id: other.id, dist: Math.hypot(pos.x - oPos.x, pos.y - oPos.y) };
        })
        .sort((a, b) => a.dist - b.dist)
        .slice(0, MAX_NEIGHBORS);
      for (const n of neighbors) {
        const key = [pub.id, n.id].sort().join("-");
        if (!lines.some(l => [l.a, l.b].sort().join("-") === key)) {
          lines.push({ a: pub.id, b: n.id });
        }
      }
    }
    return lines;
  }, [filteredPubs]);

  const isStrandHighlighted = (strandId: StrandId) => !hoveredStrand || hoveredStrand === strandId;

  // Triangular layout: 3 circles
  const circleParams: Record<StrandId, { cx: number; cy: number; r: number }> = {
    adaptive: { cx: CX, cy: CY - 120, r: 170 },
    writing: { cx: CX - 140, cy: CY + 80, r: 170 },
    feedback: { cx: CX + 140, cy: CY + 80, r: 170 },
  };

  return (
    <div>
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2">Research Strands</h2>
      <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">
        My work moves across three interconnected strands with <strong>AI in Education</strong> as the shared foundation.
        Hover over each area to highlight it. Click any dot to see the publication details.
      </p>







      {/* SVG Visualization */}
      <div className="relative max-w-[860px] mx-auto select-none">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-auto overflow-visible block"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="dot-shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="b" />
              <feOffset dy="2" result="o" />
              <feFlood floodOpacity="0.12" result="c" />
              <feComposite in="c" in2="o" operator="in" result="s" />
              <feMerge>
                <feMergeNode in="s" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id="grad-adaptive" cx="50%" cy="35%" r="70%">
              <stop offset="0%" stopColor="hsl(172,66%,50%)" stopOpacity="0.65" />
              <stop offset="50%" stopColor="hsl(172,66%,40%)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="hsl(172,66%,30%)" stopOpacity="0.08" />
            </radialGradient>
            <radialGradient id="grad-feedback" cx="35%" cy="60%" r="70%">
              <stop offset="0%" stopColor="hsl(263,70%,65%)" stopOpacity="0.65" />
              <stop offset="50%" stopColor="hsl(263,70%,55%)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="hsl(263,70%,50%)" stopOpacity="0.08" />
            </radialGradient>
            <radialGradient id="grad-writing" cx="65%" cy="60%" r="70%">
              <stop offset="0%" stopColor="hsl(205,80%,53%)" stopOpacity="0.65" />
              <stop offset="50%" stopColor="hsl(205,80%,43%)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="hsl(205,80%,33%)" stopOpacity="0.08" />
            </radialGradient>
          </defs>


          {/* Three circles */}
          {(Object.keys(STRANDS) as StrandId[]).map((sid) => {
            const c = circleParams[sid];
            return (
              <circle key={sid} cx={c.cx} cy={c.cy} r={c.r}
                fill={`url(#grad-${sid})`}
                opacity={isStrandHighlighted(sid) ? 0.75 : 0.15}
                style={{ transition: "opacity 0.5s", pointerEvents: "none" }}
              />
            );
          })}







          {/* Center hub */}
          <circle cx={CX} cy={CY} r={65} fill="hsl(var(--background))" stroke="hsl(var(--border))" strokeWidth="1.5" filter="url(#dot-shadow)" />
          <text x={CX} y={CY - 6} textAnchor="middle" fontSize="14" fontWeight="800" fill="hsl(var(--foreground))" opacity={0.85}>AI in</text>
          <text x={CX} y={CY + 12} textAnchor="middle" fontSize="14" fontWeight="800" fill="hsl(var(--foreground))" opacity={0.85}>Education</text>

          {/* Strand labels */}
          {(Object.keys(STRANDS) as StrandId[]).map((sid) => {
            const pos = STRAND_POSITIONS[sid];
            const strand = STRANDS[sid];
            const lines = strand.label.split("\n");
            const isHovered = hoveredStrand === sid;
            const subtitleLines = strand.subtitle ? strand.subtitle.split("\n") : [];
            return (
              <g key={`lbl-${sid}`}
                style={{ opacity: isStrandHighlighted(sid) ? 1 : 0.25, transition: "opacity 0.5s", cursor: "pointer" }}
                onMouseEnter={() => setHoveredStrand(sid)}
                onMouseLeave={() => setHoveredStrand(null)}
              >
                {lines.map((line, li) => (
                  <text key={li} x={pos.labelX} y={pos.labelY + li * 22} textAnchor={pos.anchor} fontSize="16" fontWeight="800" fill={strand.color}>{line}</text>
                ))}
                {subtitleLines.length > 0 && subtitleLines[0] !== "" && subtitleLines.map((subLine, si) => (
                  <text
                    key={`sub-${si}`}
                    x={pos.labelX}
                    y={pos.labelY + lines.length * 22 + 6 + si * 14}
                    textAnchor={pos.anchor}
                    fontSize="11"
                    fill={strand.color}
                    opacity={0.7}
                    fontStyle="italic"
                  >
                    {subLine}
                  </text>
                ))}
              </g>
            );
          })}

        </svg>
      </div>

      {/* Mixed Methods label */}
      <div className="flex items-center justify-center gap-3 mt-2 mb-4">
        <div className="h-px w-16 bg-foreground/15" style={{ backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 4px, hsl(var(--foreground) / 0.15) 4px, hsl(var(--foreground) / 0.15) 10px)" }} />
        <span className="text-[10px] font-semibold tracking-[4px] text-foreground/30 uppercase">Mixed Methods</span>
        <div className="h-px w-16 bg-foreground/15" style={{ backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 4px, hsl(var(--foreground) / 0.15) 4px, hsl(var(--foreground) / 0.15) 10px)" }} />
      </div>
    </div>
  );
};

export default ResearchStrands;
