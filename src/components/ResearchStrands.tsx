
import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

// ── Strand definitions ──
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

const STRANDS: Record<StrandId, { label: string; subtitle: string; color: string; colorLight: string; fill: string }> = {
  adaptive: {
    label: "Personalized & Adaptive\nLearning Environments",
    subtitle: "Intelligent systems & learner-centered design",
    color: "hsl(174, 55%, 42%)",
    colorLight: "hsl(174, 60%, 52%)",
    fill: "hsl(174, 50%, 72%)",
  },
  feedback: {
    label: "Feedback",
    subtitle: "Formative assessment & peer evaluation",
    color: "hsl(15, 70%, 55%)",
    colorLight: "hsl(15, 75%, 62%)",
    fill: "hsl(15, 65%, 78%)",
  },
  writing: {
    label: "Language Education",
    subtitle: "Writing, Argumentation, AWE\nCALL & Assessment",
    color: "hsl(210, 55%, 50%)",
    colorLight: "hsl(210, 60%, 58%)",
    fill: "hsl(210, 50%, 75%)",
  },
};

const PUBLICATIONS: Publication[] = [
  { id: "j1", title: "Problem-centered post-secondary CS education: Private AI curriculum", authors: "Haddadian, G., Panzade, P., Takabi, D., & Kim, M. K.", venue: "IJTE, 8(2)", year: "2025", type: "journal", strands: ["adaptive"] },
  { id: "j2", title: "Construction and validation of a CFAL questionnaire for language teachers", authors: "Haddadian, G., Radmanesh, S., & Haddadian, N.", venue: "Language Testing in Asia, 14(33)", year: "2024", type: "journal", strands: ["feedback", "writing"] },
  { id: "j3", title: "Innovative Use of Grammarly Feedback for Improving EFL Learners' Speaking", authors: "Haddadian, G., & Haddadian, N.", venue: "JAID, 13(2)", year: "2024", type: "journal", strands: ["feedback", "writing"] },
  { id: "j4", title: "Comparing Effects of Teacher, Automated, and Integrative Feedback on Writing", authors: "Haddadian, G.", venue: "CALL-EJ, 25(3)", year: "2024", type: "journal", strands: ["feedback", "writing"] },
  { id: "j5", title: "Conversational Repairs in Persian Dramatic Discourse", authors: "Haddadian, G., & Mahmoodi-Bakhtiari, B.", venue: "Persian Literary Studies, 7(11)", year: "2018", type: "journal", strands: ["writing"] },
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
  { id: "c13", title: "Effect of Mind Mapping on EFL Learners' Self-efficacy in Vocabulary", authors: "Radmanesh, S., Haddadian, G.", venue: "WEI-ETL Barcelona 2020", year: "2020", type: "conference", strands: ["adaptive", "writing"] },
  { id: "c14", title: "Computer-Adaptive Prototype to Measure Written Receptive Vocabulary", authors: "Haddadian, G., Salehi, M.", venue: "Sharif University of Technology", year: "2015", type: "conference", strands: ["adaptive", "writing"] },
  { id: "r1", title: "Learners' Collaboration in Using AI-generated Feedback & Argumentative Writing", authors: "Haddadian, G., Haddadian, M.", venue: "Computer Assisted Language Learning", year: "2025", type: "underreview", strands: ["feedback", "writing"] },
  { id: "r2", title: "Scaffolding Value of GenAI during Peer Feedback Provision and Uptake", authors: "Noroozi, O., Haddadian, G., et al.", venue: "Int. J. Educational Technology in Higher Ed.", year: "2025", type: "underreview", strands: ["feedback"] },
  { id: "r3", title: "Promoting EFL Teachers' Self-Directed Professional Development", authors: "Mashhadi, F., Haddadian, G., et al.", venue: "Journal of Language and Education", year: "2025", type: "underreview", strands: ["writing"] },
  { id: "r4", title: "Exploring Classroom Interactions in Iranian EFL Classrooms", authors: "Kavoshian, S., Mashhadi, F., Haddadian, G.", venue: "Int. J. Language Studies", year: "2025", type: "underreview", strands: ["feedback", "writing"] },
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

const W = 800, H = 700;
const CX = 400, CY = 360;
const RING_RADII = [85, 170, 240];

const STRAND_POSITIONS: Record<StrandId, { angle: number; labelX: number; labelY: number; anchor: string }> = {
  adaptive: { angle: -90, labelX: CX, labelY: 95, anchor: "middle" },
  feedback: { angle: 30, labelX: CX + 230, labelY: CY + 135, anchor: "middle" },
  writing: { angle: 150, labelX: CX - 230, labelY: CY + 135, anchor: "middle" },
};

function getDotPosition(pub: Publication): { x: number; y: number } {
  const strands = pub.strands;
  let avgX = 0, avgY = 0;
  strands.forEach((s) => {
    const angle = (STRAND_POSITIONS[s].angle * Math.PI) / 180;
    avgX += Math.cos(angle);
    avgY += Math.sin(angle);
  });
  avgX /= strands.length;
  avgY /= strands.length;
  const baseAngle = Math.atan2(avgY, avgX);
  const seed = hashCode(pub.id);
  const radiusJitter = 0.35 + (((seed >> 4) & 0xff) / 255) * 0.6;
  const maxJitter = strands.length === 1 ? 0.4 : 0.9;
  const angleJitter = ((((seed >> 12) & 0xff) / 255) - 0.5) * maxJitter;
  const r = RING_RADII[2] * radiusJitter;
  const finalAngle = baseAngle + angleJitter;
  return { x: CX + r * Math.cos(finalAngle), y: CY + r * Math.sin(finalAngle) };
}

// Resolve overlapping dots by pushing them apart
function resolveOverlaps(pubs: Publication[], posMap: Map<string, { x: number; y: number }>) {
  const MIN_DIST = 30; // minimum distance between dot centers
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
          // Identical positions — nudge randomly
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

function getStrandColor(pub: Publication, pos: { x: number; y: number }): string {
  if (pub.strands.length === 1) return STRANDS[pub.strands[0]].color;
  // Pick color of the closest strand axis
  let closest: StrandId = pub.strands[0];
  let minDist = Infinity;
  pub.strands.forEach((sid) => {
    const angle = (STRAND_POSITIONS[sid].angle * Math.PI) / 180;
    const ax = CX + RING_RADII[2] * Math.cos(angle);
    const ay = CY + RING_RADII[2] * Math.sin(angle);
    const d = (pos.x - ax) ** 2 + (pos.y - ay) ** 2;
    if (d < minDist) { minDist = d; closest = sid; }
  });
  return STRANDS[closest].color;
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

  // Mutable drag/position state stored in refs for performance
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

  // Initialize positions with overlap resolution
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

  // Inertia animation loop
  useEffect(() => {
    let running = true;
    const decay = 0.94;
    const minV = 0.08;
    const tick = () => {
      if (!running) return;
      let anyMoving = false;
      velocities.current.forEach((vel, id) => {
        if (dragState.current.id === id) return; // skip actively dragged
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
    // Kill existing velocity
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
      vel.vx = ((svgPt.x - ds.lastMouse.x) / dt) * 16; // scale to ~60fps
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
      // If barely moved, treat as click
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

  // Build spoke connections: each dot connects to the axis endpoint of each strand it belongs to
  const strandEndpoints: Record<StrandId, { x: number; y: number }> = {} as any;
  (Object.keys(STRAND_POSITIONS) as StrandId[]).forEach((sid) => {
    const angle = (STRAND_POSITIONS[sid].angle * Math.PI) / 180;
    strandEndpoints[sid] = { x: CX + RING_RADII[1] * Math.cos(angle), y: CY + RING_RADII[1] * Math.sin(angle) };
  });

  const spokeLines: { x1: number; y1: number; x2: number; y2: number; strand: StrandId }[] = [];
  filteredPubs.forEach((pub) => {
    if (pub.strands.length > 1) {
      const pos = getPos(pub);
      pub.strands.forEach((sid) => {
        spokeLines.push({ x1: pos.x, y1: pos.y, x2: strandEndpoints[sid].x, y2: strandEndpoints[sid].y, strand: sid });
      });
    }
  });

  const isStrandHighlighted = (strandId: StrandId) => !hoveredStrand || hoveredStrand === strandId;

  const ellipseParams: Record<StrandId, { cx: number; cy: number; rx: number; ry: number }> = {
    adaptive: { cx: CX, cy: CY - 85, rx: 230, ry: 195 },
    feedback: { cx: CX + 105, cy: CY + 55, rx: 210, ry: 195 },
    writing: { cx: CX - 105, cy: CY + 55, rx: 210, ry: 195 },
  };

  return (
    <div>
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 tracking-tight">Research Strands</h2>
      <p className="text-xs sm:text-sm text-muted-foreground/70 mb-5 sm:mb-7 max-w-xl leading-relaxed">
        My work moves across three interconnected strands with <strong className="text-foreground/90">AI in Education</strong> as the shared foundation.
        Hover over each area to highlight it. Click any dot to see details.
      </p>

      {/* Strand counts — refined pills */}
      <div className="flex flex-wrap justify-center gap-2.5 mb-5">
        {(Object.keys(STRANDS) as StrandId[]).map((sid) => (
          <button
            key={sid}
            onMouseEnter={() => setHoveredStrand(sid)}
            onMouseLeave={() => setHoveredStrand(null)}
            className="px-3.5 py-1.5 rounded-full text-[11px] font-medium transition-all duration-400 border backdrop-blur-sm"
            style={{
              borderColor: hoveredStrand === sid ? STRANDS[sid].colorLight : `${STRANDS[sid].color}40`,
              color: hoveredStrand === sid ? "white" : STRANDS[sid].colorLight,
              backgroundColor: hoveredStrand === sid ? `${STRANDS[sid].color}` : "transparent",
              boxShadow: hoveredStrand === sid ? `0 4px 20px -4px ${STRANDS[sid].color}60` : "none",
            }}
          >
            {STRANDS[sid].label.replace("\n", " ")} <span className="opacity-60 ml-0.5">({countByStrand(sid)})</span>
          </button>
        ))}
      </div>

      {/* Filters — sleeker */}
      <div className="flex justify-center gap-1.5 mb-7 flex-wrap">
        {FILTER_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setFilter(opt.value)}
            className={`px-3.5 py-1.5 rounded-full text-[11px] font-medium transition-all duration-300 border ${
              filter === opt.value
                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                : "bg-transparent text-muted-foreground/60 border-border/40 hover:border-border hover:text-muted-foreground"
            }`}
          >
            {opt.label}
            {opt.value !== "all" && (
              <span className="ml-1 opacity-50">
                ({PUBLICATIONS.filter((p) => p.type === opt.value).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* SVG Visualization */}
      <div className="relative max-w-[860px] mx-auto select-none">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-auto overflow-visible block"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Refined shadow for dots */}
            <filter id="dot-shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="2.5" result="b" />
              <feOffset dy="1.5" result="o" />
              <feFlood floodOpacity="0.18" result="c" />
              <feComposite in="c" in2="o" operator="in" result="s" />
              <feMerge>
                <feMergeNode in="s" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {/* Glow filter for center hub */}
            <filter id="hub-glow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="glow" />
              <feFlood floodColor="hsl(220, 60%, 60%)" floodOpacity="0.15" />
              <feComposite in2="glow" operator="in" result="glowColor" />
              <feMerge>
                <feMergeNode in="glowColor" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {/* Radial gradients for each ellipse — inner glow fading to edge */}
            <radialGradient id="grad-adaptive" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="hsl(165, 55%, 50%)" stopOpacity="0.28" />
              <stop offset="55%" stopColor="hsl(165, 50%, 45%)" stopOpacity="0.15" />
              <stop offset="100%" stopColor="hsl(165, 45%, 40%)" stopOpacity="0.04" />
            </radialGradient>
            <radialGradient id="grad-feedback" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="hsl(270, 60%, 62%)" stopOpacity="0.28" />
              <stop offset="55%" stopColor="hsl(270, 55%, 58%)" stopOpacity="0.15" />
              <stop offset="100%" stopColor="hsl(270, 50%, 50%)" stopOpacity="0.04" />
            </radialGradient>
            <radialGradient id="grad-writing" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="hsl(210, 70%, 52%)" stopOpacity="0.28" />
              <stop offset="55%" stopColor="hsl(210, 65%, 48%)" stopOpacity="0.15" />
              <stop offset="100%" stopColor="hsl(210, 60%, 42%)" stopOpacity="0.04" />
            </radialGradient>
          </defs>

          {/* Subtle methodological label */}
          <text x={CX} y={28} textAnchor="middle" fontSize="9" fontWeight="600" fill="hsl(var(--foreground))" opacity={0.25} letterSpacing="5" fontFamily="inherit">
            DESIGN-BASED RESEARCH (DBR)
          </text>
          <line x1={CX - 155} y1={34} x2={CX - 45} y2={34} stroke="hsl(var(--foreground))" strokeWidth="0.5" strokeDasharray="4 6" opacity={0.1} />
          <line x1={CX + 45} y1={34} x2={CX + 155} y2={34} stroke="hsl(var(--foreground))" strokeWidth="0.5" strokeDasharray="4 6" opacity={0.1} />

          {/* Outer boundary — very subtle */}
          <circle cx={CX} cy={CY} r={290} fill="none" stroke="hsl(var(--border))" strokeWidth="0.3" strokeDasharray="6 8" opacity={0.3} />

          {/* Venn ellipses with radial gradients — NO blend mode, just layered opacity */}
          {(Object.keys(STRANDS) as StrandId[]).map((sid) => {
            const e = ellipseParams[sid];
            const highlighted = isStrandHighlighted(sid);
            return (
              <g key={sid}>
                {/* Soft fill */}
                <ellipse
                  cx={e.cx} cy={e.cy} rx={e.rx} ry={e.ry}
                  fill={`url(#grad-${sid})`}
                  opacity={highlighted ? 1 : 0.2}
                  style={{ transition: "opacity 0.6s ease" }}
                />
                {/* Refined stroke */}
                <ellipse
                  cx={e.cx} cy={e.cy} rx={e.rx} ry={e.ry}
                  fill="none"
                  stroke={STRANDS[sid].color}
                  strokeWidth={highlighted ? 1.2 : 0.6}
                  strokeOpacity={highlighted ? 0.5 : 0.12}
                  style={{ transition: "stroke-width 0.6s ease, stroke-opacity 0.6s ease" }}
                />
              </g>
            );
          })}

          {/* Concentric reference rings — refined */}
          {RING_RADII.map((r, i) => (
            <circle key={i} cx={CX} cy={CY} r={r} fill="none" stroke="hsl(var(--foreground))" strokeWidth="0.4" strokeDasharray="3 8" opacity={0.08} />
          ))}

          {/* Axis lines — very subtle */}
          {(Object.keys(STRAND_POSITIONS) as StrandId[]).map((sid) => {
            const angle = (STRAND_POSITIONS[sid].angle * Math.PI) / 180;
            return (
              <line key={sid} x1={CX} y1={CY} x2={CX + RING_RADII[2] * Math.cos(angle)} y2={CY + RING_RADII[2] * Math.sin(angle)}
                stroke="hsl(var(--foreground))" strokeWidth="0.4"
                opacity={isStrandHighlighted(sid) ? 0.12 : 0.04}
                style={{ transition: "opacity 0.6s ease" }}
              />
            );
          })}

          {/* Center hub — frosted glass effect */}
          <circle cx={CX} cy={CY} r={44} fill="hsl(var(--background))" opacity={0.85} filter="url(#hub-glow)" />
          <circle cx={CX} cy={CY} r={44} fill="none" stroke="hsl(var(--foreground))" strokeWidth="0.8" opacity={0.15} />
          <text x={CX} y={CY - 5} textAnchor="middle" fontSize="11" fontWeight="700" fill="hsl(var(--foreground))" opacity={0.8} letterSpacing="0.5">AI in</text>
          <text x={CX} y={CY + 11} textAnchor="middle" fontSize="11" fontWeight="700" fill="hsl(var(--foreground))" opacity={0.8} letterSpacing="0.5">Education</text>

          {/* Strand labels — refined typography */}
          {(Object.keys(STRANDS) as StrandId[]).map((sid) => {
            const pos = STRAND_POSITIONS[sid];
            const strand = STRANDS[sid];
            const lines = strand.label.split("\n");
            const subtitleLines = strand.subtitle ? strand.subtitle.split("\n") : [];
            return (
              <g key={`lbl-${sid}`}
                style={{ opacity: isStrandHighlighted(sid) ? 1 : 0.2, transition: "opacity 0.6s ease", cursor: "pointer" }}
                onMouseEnter={() => setHoveredStrand(sid)}
                onMouseLeave={() => setHoveredStrand(null)}
              >
                {lines.map((line, li) => (
                  <text key={li} x={pos.labelX} y={pos.labelY + li * 20} textAnchor={pos.anchor}
                    fontSize="14" fontWeight="700" fill={strand.colorLight} letterSpacing="0.3">{line}</text>
                ))}
                {subtitleLines.length > 0 && subtitleLines[0] !== "" && subtitleLines.map((subLine, si) => (
                  <text
                    key={`sub-${si}`}
                    x={pos.labelX}
                    y={pos.labelY + lines.length * 20 + 5 + si * 13}
                    textAnchor={pos.anchor}
                    fontSize="9.5"
                    fill={strand.colorLight}
                    opacity={0.55}
                    fontStyle="italic"
                    letterSpacing="0.2"
                    style={{ transition: "opacity 0.4s ease" }}
                  >
                    {subLine}
                  </text>
                ))}
              </g>
            );
          })}

          {/* Publication dots — refined styling */}
          {filteredPubs.map((pub) => {
            const pos = getPos(pub);
            const color = getStrandColor(pub, pos);
            const isHovered = hoveredDot?.pub.id === pub.id;
            const isDragging = dragState.current.id === pub.id;
            const strandMatch = hoveredStrand ? pub.strands.includes(hoveredStrand) : true;
            const active = isHovered || isDragging;
            return (
              <g key={pub.id}
                style={{ opacity: strandMatch ? 1 : 0.1, transition: "opacity 0.4s ease", cursor: isDragging ? "grabbing" : "grab" }}
                onPointerDown={(e) => handlePointerDown(pub, e)}
                onPointerMove={handlePointerMove}
                onPointerUp={() => handlePointerUp(pub)}
                onMouseEnter={() => setHoveredDot({ pub, x: pos.x, y: pos.y })}
                onMouseLeave={() => setHoveredDot(null)}
              >
                {/* Soft glow ring */}
                <circle cx={pos.x} cy={pos.y} r={active ? 18 : 12} fill={color} opacity={active ? 0.12 : 0.06}>
                  {!active && <animate attributeName="opacity" values="0.06;0.1;0.06" dur="4s" repeatCount="indefinite" />}
                </circle>
                {/* Main dot — glass-like */}
                <circle cx={pos.x} cy={pos.y} r={active ? 10 : 7}
                  fill="hsl(var(--background))" fillOpacity={0.7}
                  stroke={color} strokeWidth={active ? 2.5 : 1.8}
                  filter="url(#dot-shadow)"
                />
                {/* Inner marker */}
                <circle cx={pos.x} cy={pos.y} r={active ? 3 : 2} fill={color} opacity={0.6} />
              </g>
            );
          })}
        </svg>

        <AnimatePresence>
          {hoveredDot && (() => {
            const livePos = positions.current.get(hoveredDot.pub.id) || hoveredDot;
            return (
              <motion.div
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute pointer-events-none z-10 bg-popover/95 backdrop-blur-md text-popover-foreground border border-border/50 rounded-xl shadow-2xl px-4 py-3 max-w-[300px]"
                style={{ left: `${(livePos.x / W) * 100}%`, top: `${(livePos.y / H) * 100 - 5}%`, transform: "translate(-50%, -100%)" }}
              >
                <p className="text-xs font-semibold leading-tight mb-1.5">{hoveredDot.pub.title}</p>
                <p className="text-[10px] text-muted-foreground leading-snug">{hoveredDot.pub.venue} · {hoveredDot.pub.year} · {TYPE_LABELS[hoveredDot.pub.type]}</p>
              </motion.div>
            );
          })()}
        </AnimatePresence>
      </div>

      {/* Mixed Methods label below visualization */}
      <div className="flex items-center justify-center gap-3 mt-3 mb-4">
        <div className="h-px w-20" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--foreground) / 0.1), transparent)" }} />
        <span className="text-[9px] font-semibold tracking-[5px] text-foreground/20 uppercase">Mixed Methods</span>
        <div className="h-px w-20" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--foreground) / 0.1), transparent)" }} />
      </div>

      {/* Legend — minimal */}
      <div className="flex justify-center gap-8 mt-4 flex-wrap text-[11px] text-muted-foreground/60">
        {(["journal", "conference", "underreview", "inprogress"] as WorkType[]).map((type) => (
          <span key={type} className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full border border-current opacity-60" />
            {TYPE_LABELS[type]}
          </span>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedPub && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md p-4"
            onClick={() => setSelectedPub(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
              className="bg-card text-card-foreground border border-border/50 rounded-2xl shadow-2xl max-w-lg w-full p-7 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setSelectedPub(null)} className="absolute top-4 right-4 text-muted-foreground/50 hover:text-foreground transition-colors">
                <X className="h-4 w-4" />
              </button>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold text-white" style={{ backgroundColor: STRANDS[selectedPub.strands[0]].color }}>
                  {TYPE_LABELS[selectedPub.type]}
                </span>
                {selectedPub.strands.map((s) => (
                  <span key={s} className="px-2.5 py-0.5 rounded-full text-[10px] font-medium border" style={{ borderColor: `${STRANDS[s].color}60`, color: STRANDS[s].colorLight }}>
                    {STRANDS[s].label.replace("\n", " ")}
                  </span>
                ))}
              </div>
              <h3 className="text-base font-bold mb-2 leading-snug tracking-tight">{selectedPub.title}</h3>
              <p className="text-sm text-muted-foreground/80 mb-1">{selectedPub.authors}</p>
              <p className="text-sm text-muted-foreground/60">
                <span className="font-medium text-muted-foreground/80">{selectedPub.venue}</span> · {selectedPub.year}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResearchStrands;
