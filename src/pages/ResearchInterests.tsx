
import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDocumentHead } from "@/hooks/useDocumentHead";
import { X } from "lucide-react";

// ── Strand definitions ──
type StrandId = "adaptive" | "feedback" | "humanai" | "writing";
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
    label: "Personalized & Adaptive\nLearning Environments",
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
  humanai: {
    label: "Human-Centered\nAI in Education",
    subtitle: "Ethics, literacy & curriculum design",
    color: "hsl(24, 85%, 48%)",
    colorLight: "hsl(24, 85%, 63%)",
  },
  writing: {
    label: "Writing",
    subtitle: "AWE, argumentative writing & CALL",
    color: "hsl(205, 80%, 33%)",
    colorLight: "hsl(205, 80%, 53%)",
  },
};

// ── Publication data mapped to strands ──
const PUBLICATIONS: Publication[] = [
  // Journals (5)
  { id: "j1", title: "Problem-centered post-secondary CS education: Private AI curriculum", authors: "Haddadian, G., Panzade, P., Takabi, D., & Kim, M. K.", venue: "IJTE, 8(2)", year: "2025", type: "journal", strands: ["humanai", "adaptive"] },
  { id: "j2", title: "Construction and validation of a CFAL questionnaire for language teachers", authors: "Haddadian, G., Radmanesh, S., & Haddadian, N.", venue: "Language Testing in Asia, 14(33)", year: "2024", type: "journal", strands: ["feedback"] },
  { id: "j3", title: "Innovative Use of Grammarly Feedback for Improving EFL Learners' Speaking", authors: "Haddadian, G., & Haddadian, N.", venue: "JAID, 13(2)", year: "2024", type: "journal", strands: ["feedback", "writing"] },
  { id: "j4", title: "Comparing Effects of Teacher, Automated, and Integrative Feedback on Writing", authors: "Haddadian, G.", venue: "CALL-EJ, 25(3)", year: "2024", type: "journal", strands: ["feedback", "writing"] },
  { id: "j5", title: "Conversational Repairs in Persian Dramatic Discourse", authors: "Haddadian, G., & Mahmoodi-Bakhtiari, B.", venue: "Persian Literary Studies, 7(11)", year: "2018", type: "journal", strands: ["writing"] },

  // Conferences (14)
  { id: "c1", title: "Supporting peer feedback provision and uptake with GenAI", authors: "Noroozi, O., Haddadian, G., et al.", venue: "ICLS/ISLS 2025", year: "2025", type: "conference", strands: ["feedback", "humanai"] },
  { id: "c2", title: "Automated Generation of Expert Models with Generative AI", authors: "Haddadian, G., Han, H., Kim, M., et al.", venue: "ICLS/ISLS 2025", year: "2025", type: "conference", strands: ["humanai", "adaptive"] },
  { id: "c3", title: "Evaluating Private AI Curriculum in CS Education", authors: "Haddadian, G., Panzade, P., Takabi, D., & Kim, M. K.", venue: "ICLS 2024", year: "2024", type: "conference", strands: ["humanai"] },
  { id: "c4", title: "ELT Teachers' Online Self-efficacy: Does Agency Matter?", authors: "Haddadian, G., & Haddadian, N.", venue: "SITE 2024", year: "2024", type: "conference", strands: ["humanai", "adaptive"] },
  { id: "c5", title: "Impact of AI-Enabled Personalized Recommendations on L2 Learners", authors: "Daneshvar Ghorbani, B., & Haddadian, G.", venue: "AIRiAL 2024, Columbia University", year: "2024", type: "conference", strands: ["adaptive", "humanai"] },
  { id: "c6", title: "Knowledge-based AI vs. Human Evaluation in Academic Summary", authors: "Kim, J., Haddadian, G., & Kim, M.", venue: "ICLS 2023", year: "2023", type: "conference", strands: ["feedback", "humanai"] },
  { id: "c7", title: "Design Study of PCI for Private AI Curriculum Development", authors: "Haddadian, G., Takabi, D., Panzade, P., Kim, M.", venue: "AECT 2023", year: "2023", type: "conference", strands: ["humanai"] },
  { id: "c8", title: "A Comprehensive Model of AI Literacy from a Developmental Perspective", authors: "Haddadian, G., Bae, Y., Kim, J., & Kim, M.", venue: "AECT 2023", year: "2023", type: "conference", strands: ["humanai", "adaptive"] },
  { id: "c9", title: "Learning progress models using an AI-enabled knowledge representation", authors: "Kim, M., Kim, N., Haddadian, G., & Heidari, A.", venue: "ICLS 2023", year: "2023", type: "conference", strands: ["adaptive", "humanai"] },
  { id: "c10", title: "Impact of AI-based educational tool: Technology acceptance & metacognition", authors: "Bae, Y., Kim, J., Haddadian, G., et al.", venue: "AECT 2023", year: "2023", type: "conference", strands: ["adaptive"] },
  { id: "c11", title: "Leveraging ML to evaluate cognitive engagement in online discussions", authors: "Kim, J., Bae, Y., Haddadian, G., & Kim, M.", venue: "AECT 2023", year: "2023", type: "conference", strands: ["humanai", "feedback"] },
  { id: "c12", title: "AI-augmented summarization: Impact on adult learners' concept learning", authors: "Kim, J., Bae, Y., Haddadian, G., et al.", venue: "AECT 2023", year: "2023", type: "conference", strands: ["adaptive", "humanai"] },
  { id: "c13", title: "Effect of Mind Mapping on EFL Learners' Self-efficacy in Vocabulary", authors: "Radmanesh, S., Haddadian, G.", venue: "WEI-ETL Barcelona 2020", year: "2020", type: "conference", strands: ["adaptive"] },
  { id: "c14", title: "Computer-Adaptive Prototype to Measure Written Receptive Vocabulary", authors: "Haddadian, G., Salehi, M.", venue: "Sharif University of Technology", year: "2015", type: "conference", strands: ["adaptive", "writing"] },

  // Under Review (4)
  { id: "r1", title: "Learners' Collaboration in Using AI-generated Feedback & Argumentative Writing", authors: "Haddadian, G., Haddadian, M.", venue: "Computer Assisted Language Learning", year: "2025", type: "underreview", strands: ["feedback", "writing"] },
  { id: "r2", title: "Scaffolding Value of GenAI during Peer Feedback Provision and Uptake", authors: "Noroozi, O., Haddadian, G., et al.", venue: "Int. J. Educational Technology in Higher Ed.", year: "2025", type: "underreview", strands: ["feedback", "humanai"] },
  { id: "r3", title: "Promoting EFL Teachers' Self-Directed Professional Development", authors: "Mashhadi, F., Haddadian, G., et al.", venue: "Journal of Language and Education", year: "2025", type: "underreview", strands: ["humanai"] },
  { id: "r4", title: "Exploring Classroom Interactions in Iranian EFL Classrooms", authors: "Kavoshian, S., Mashhadi, F., Haddadian, G.", venue: "Int. J. Language Studies", year: "2025", type: "underreview", strands: ["feedback"] },

  // In Progress (6)
  { id: "p1", title: "Systematic Review of AWE in Argumentative Writing for EFL Education", authors: "Haddadian, G., Kim, M., Haddadian, N.", venue: "Journal Article", year: "2025", type: "inprogress", strands: ["writing", "feedback"] },
  { id: "p2", title: "RITA: Real-time Intelligent Technology for Argumentative Writing (DBR)", authors: "Haddadian, G., Kim, M.", venue: "Journal Article", year: "2025", type: "inprogress", strands: ["writing", "adaptive", "humanai"] },
  { id: "p3", title: "GenAI to Facilitate Peer Feedback: Opportunities and Challenges", authors: "Alqassab, M., Noroozi, O., Haddadian, G., et al.", venue: "Book Chapter", year: "2025", type: "inprogress", strands: ["feedback", "humanai"] },
  { id: "p4", title: "Students' Plagiarism Behaviors within AI-Enabled Introductory Physics", authors: "Han, H., Haddadian, G., et al.", venue: "Journal Article", year: "2025", type: "inprogress", strands: ["humanai"] },
  { id: "p5", title: "GenAI for Automated Construction and Evaluation of Expert Models", authors: "Han, H., Kim, M., Haddadian, G.", venue: "Journal Article", year: "2025", type: "inprogress", strands: ["humanai", "adaptive"] },
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

// ── SVG layout constants ──
const W = 900, H = 800;
const CX = 450, CY = 400;
const RING_RADII = [85, 170, 260];

// Strand positions (top, right, bottom, left)
const STRAND_POSITIONS: Record<StrandId, { angle: number; labelX: number; labelY: number; anchor: string }> = {
  adaptive: { angle: -90, labelX: CX, labelY: 55, anchor: "middle" },
  feedback: { angle: 0, labelX: 750, labelY: CY - 10, anchor: "start" },
  humanai: { angle: 90, labelX: CX, labelY: H - 50, anchor: "middle" },
  writing: { angle: 180, labelX: 150, labelY: CY - 10, anchor: "end" },
};

// Position dots based on their strands
function getDotPosition(pub: Publication, index: number, total: number): { x: number; y: number } {
  const strands = pub.strands;

  // Calculate average angle from strands
  let avgX = 0, avgY = 0;
  strands.forEach((s) => {
    const angle = (STRAND_POSITIONS[s].angle * Math.PI) / 180;
    avgX += Math.cos(angle);
    avgY += Math.sin(angle);
  });
  avgX /= strands.length;
  avgY /= strands.length;

  const baseAngle = Math.atan2(avgY, avgX);

  // Distribute within the sector with some variation
  const seed = hashCode(pub.id);
  const radiusJitter = 0.6 + (((seed >> 4) & 0xff) / 255) * 0.35;
  const angleJitter = ((((seed >> 12) & 0xff) / 255) - 0.5) * 0.6;

  const r = RING_RADII[2] * radiusJitter;
  const finalAngle = baseAngle + angleJitter;

  return {
    x: CX + r * Math.cos(finalAngle),
    y: CY + r * Math.sin(finalAngle),
  };
}

function hashCode(s: string): number {
  let hash = 0;
  for (let i = 0; i < s.length; i++) {
    hash = ((hash << 5) - hash + s.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

function getStrandColor(strands: StrandId[]): string {
  return STRANDS[strands[0]].color;
}

// Count works per strand
function countByStrand(strandId: StrandId): number {
  return PUBLICATIONS.filter((p) => p.strands.includes(strandId)).length;
}

const ResearchInterests = () => {
  useDocumentHead({
    title: "Research Strands — Golnoush Haddadian",
    description: "Interactive visualization of research strands by Golnoush Haddadian spanning AI in Education, feedback, adaptive learning, and writing.",
    canonical: "/research-interests",
  });

  const [filter, setFilter] = useState<WorkType | "all">("all");
  const [hoveredStrand, setHoveredStrand] = useState<StrandId | null>(null);
  const [selectedPub, setSelectedPub] = useState<Publication | null>(null);
  const [hoveredDot, setHoveredDot] = useState<{ pub: Publication; x: number; y: number } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const filteredPubs = PUBLICATIONS.filter((p) => filter === "all" || p.type === filter);

  const dotPositions = useRef(new Map<string, { x: number; y: number }>());

  // Compute positions once
  useEffect(() => {
    PUBLICATIONS.forEach((pub, i) => {
      if (!dotPositions.current.has(pub.id)) {
        dotPositions.current.set(pub.id, getDotPosition(pub, i, PUBLICATIONS.length));
      }
    });
  }, []);

  const getPos = useCallback((pub: Publication, i: number) => {
    if (dotPositions.current.has(pub.id)) return dotPositions.current.get(pub.id)!;
    const pos = getDotPosition(pub, i, PUBLICATIONS.length);
    dotPositions.current.set(pub.id, pos);
    return pos;
  }, []);

  // Build connections: lines between pubs that share strands
  const connections: { x1: number; y1: number; x2: number; y2: number }[] = [];
  const shown = filteredPubs;
  for (let i = 0; i < shown.length; i++) {
    for (let j = i + 1; j < shown.length; j++) {
      const shared = shown[i].strands.filter((s) => shown[j].strands.includes(s));
      if (shared.length > 0) {
        const p1 = getPos(shown[i], i);
        const p2 = getPos(shown[j], j);
        const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);
        if (dist < 250) {
          connections.push({ x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y });
        }
      }
    }
  }

  const isStrandHighlighted = (strandId: StrandId) => !hoveredStrand || hoveredStrand === strandId;

  const ellipseParams: Record<StrandId, { cx: number; cy: number; rx: number; ry: number }> = {
    adaptive: { cx: CX, cy: CY - 130, rx: 250, ry: 260 },
    feedback: { cx: CX + 150, cy: CY, rx: 270, ry: 220 },
    humanai: { cx: CX, cy: CY + 130, rx: 250, ry: 260 },
    writing: { cx: CX - 150, cy: CY, rx: 270, ry: 220 },
  };

  return (
    <div className="container max-w-6xl mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3">Research Strands</h1>
        <p className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          My work moves across four interconnected strands with <strong>AI × Education</strong> as the shared foundation.
          Hover over each area to highlight it. Click any dot to see the publication details.
        </p>
      </div>

      {/* Strand counts */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {(Object.keys(STRANDS) as StrandId[]).map((sid) => (
          <button
            key={sid}
            onMouseEnter={() => setHoveredStrand(sid)}
            onMouseLeave={() => setHoveredStrand(null)}
            className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 border"
            style={{
              borderColor: STRANDS[sid].color,
              color: hoveredStrand === sid ? "white" : STRANDS[sid].color,
              backgroundColor: hoveredStrand === sid ? STRANDS[sid].color : "transparent",
            }}
          >
            {STRANDS[sid].label.replace("\n", " ")} ({countByStrand(sid)})
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex justify-center gap-2 mb-6 flex-wrap">
        {FILTER_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setFilter(opt.value)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${
              filter === opt.value
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background text-muted-foreground border-border hover:border-primary/50"
            }`}
          >
            {opt.label}
            {opt.value !== "all" && (
              <span className="ml-1 opacity-70">
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
            <radialGradient id="grad-feedback" cx="35%" cy="50%" r="70%">
              <stop offset="0%" stopColor="hsl(263,70%,65%)" stopOpacity="0.65" />
              <stop offset="50%" stopColor="hsl(263,70%,55%)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="hsl(263,70%,50%)" stopOpacity="0.08" />
            </radialGradient>
            <radialGradient id="grad-humanai" cx="50%" cy="65%" r="70%">
              <stop offset="0%" stopColor="hsl(24,85%,63%)" stopOpacity="0.65" />
              <stop offset="50%" stopColor="hsl(24,85%,53%)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="hsl(24,85%,48%)" stopOpacity="0.08" />
            </radialGradient>
            <radialGradient id="grad-writing" cx="65%" cy="50%" r="70%">
              <stop offset="0%" stopColor="hsl(205,80%,53%)" stopOpacity="0.65" />
              <stop offset="50%" stopColor="hsl(205,80%,43%)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="hsl(205,80%,33%)" stopOpacity="0.08" />
            </radialGradient>
          </defs>

          {/* Outer ring */}
          <circle cx={CX} cy={CY} r={290} fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="8 5" opacity={0.5} />

          {/* Ellipses for each strand */}
          {(Object.keys(STRANDS) as StrandId[]).map((sid) => {
            const e = ellipseParams[sid];
            return (
              <ellipse
                key={sid}
                cx={e.cx}
                cy={e.cy}
                rx={e.rx}
                ry={e.ry}
                fill={`url(#grad-${sid})`}
                opacity={isStrandHighlighted(sid) ? 0.75 : 0.15}
                style={{ transition: "opacity 0.5s", pointerEvents: "none" }}
              />
            );
          })}

          {/* Concentric rings */}
          {RING_RADII.map((r, i) => (
            <circle
              key={i}
              cx={CX}
              cy={CY}
              r={r}
              fill="none"
              stroke="hsl(var(--border))"
              strokeWidth="1"
              strokeDasharray="6 4"
              opacity={0.4}
            />
          ))}

          {/* Axis lines */}
          {(Object.keys(STRAND_POSITIONS) as StrandId[]).map((sid) => {
            const angle = (STRAND_POSITIONS[sid].angle * Math.PI) / 180;
            const endX = CX + RING_RADII[2] * Math.cos(angle);
            const endY = CY + RING_RADII[2] * Math.sin(angle);
            return (
              <line
                key={sid}
                x1={CX}
                y1={CY}
                x2={endX}
                y2={endY}
                stroke="hsl(var(--border))"
                strokeWidth="0.8"
                opacity={isStrandHighlighted(sid) ? 0.6 : 0.15}
                style={{ transition: "opacity 0.5s" }}
              />
            );
          })}

          {/* Connection lines between related publications */}
          {connections.map((c, i) => (
            <line
              key={`conn-${i}`}
              x1={c.x1}
              y1={c.y1}
              x2={c.x2}
              y2={c.y2}
              stroke="hsl(var(--muted-foreground))"
              strokeWidth="1"
              strokeDasharray="5 4"
              opacity={0.25}
              style={{ pointerEvents: "none" }}
            />
          ))}

          {/* Center hub */}
          <circle cx={CX} cy={CY} r={42} fill="hsl(var(--background))" stroke="hsl(var(--border))" strokeWidth="1.5" filter="url(#dot-shadow)" />
          <text x={CX} y={CY - 8} textAnchor="middle" fontSize="13" fontWeight="800" fill="hsl(var(--foreground))" opacity={0.85}>
            AI × Education
          </text>
          <text x={CX} y={CY + 8} textAnchor="middle" fontSize="9.5" fill="hsl(var(--muted-foreground))" opacity={0.6}>
            Shared foundation
          </text>
          <text x={CX} y={CY + 22} textAnchor="middle" fontSize="9" fontWeight="600" fill="hsl(var(--muted-foreground))" opacity={0.5}>
            {PUBLICATIONS.length} works
          </text>

          {/* Strand labels */}
          {(Object.keys(STRANDS) as StrandId[]).map((sid) => {
            const pos = STRAND_POSITIONS[sid];
            const strand = STRANDS[sid];
            const lines = strand.label.split("\n");
            return (
              <g
                key={`lbl-${sid}`}
                style={{
                  opacity: isStrandHighlighted(sid) ? 1 : 0.25,
                  transition: "opacity 0.5s",
                  cursor: "pointer",
                }}
                onMouseEnter={() => setHoveredStrand(sid)}
                onMouseLeave={() => setHoveredStrand(null)}
              >
                {lines.map((line, li) => (
                  <text
                    key={li}
                    x={pos.labelX}
                    y={pos.labelY + li * 22}
                    textAnchor={pos.anchor}
                    fontSize="16"
                    fontWeight="800"
                    fill={strand.color}
                  >
                    {line}
                  </text>
                ))}
                <text
                  x={pos.labelX}
                  y={pos.labelY + lines.length * 22 + 6}
                  textAnchor={pos.anchor}
                  fontSize="11"
                  fill={strand.color}
                  opacity={0.7}
                  fontStyle="italic"
                >
                  {strand.subtitle}
                </text>
              </g>
            );
          })}

          {/* Publication dots */}
          {filteredPubs.map((pub, i) => {
            const pos = getPos(pub, i);
            const color = getStrandColor(pub.strands);
            const isHovered = hoveredDot?.pub.id === pub.id;
            const strandMatch = hoveredStrand ? pub.strands.includes(hoveredStrand) : true;
            const dotOpacity = strandMatch ? 1 : 0.15;

            return (
              <g
                key={pub.id}
                style={{
                  opacity: dotOpacity,
                  transition: "opacity 0.35s, transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
                  cursor: "pointer",
                }}
                onClick={() => setSelectedPub(pub)}
                onMouseEnter={() => setHoveredDot({ pub, x: pos.x, y: pos.y })}
                onMouseLeave={() => setHoveredDot(null)}
              >
                {/* Pulse animation */}
                <circle cx={pos.x} cy={pos.y} r={isHovered ? 16 : 4} fill={color} opacity={isHovered ? 0.15 : 0.3}>
                  <animate attributeName="r" values={isHovered ? "12;18;12" : "3;5;3"} dur="2.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.3;0.1;0.3" dur="2.5s" repeatCount="indefinite" />
                </circle>
                {/* Main dot */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={isHovered ? 11 : 8}
                  fill="hsl(var(--background))"
                  stroke={color}
                  strokeWidth={isHovered ? 3 : 2.5}
                  filter="url(#dot-shadow)"
                  style={{ transition: "r 0.2s" }}
                />
                {/* Type indicator */}
                {pub.type === "inprogress" && (
                  <circle cx={pos.x} cy={pos.y} r={3} fill={color} opacity={0.5} />
                )}
                {pub.type === "journal" && (
                  <circle cx={pos.x} cy={pos.y} r={3.5} fill={color} opacity={0.6} />
                )}
                {pub.type === "underreview" && (
                  <rect x={pos.x - 2.5} y={pos.y - 2.5} width={5} height={5} fill={color} opacity={0.5} rx={1} />
                )}
                {pub.type === "conference" && (
                  <polygon
                    points={`${pos.x},${pos.y - 3} ${pos.x + 2.6},${pos.y + 1.5} ${pos.x - 2.6},${pos.y + 1.5}`}
                    fill={color}
                    opacity={0.5}
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* Tooltip */}
        <AnimatePresence>
          {hoveredDot && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute pointer-events-none z-10 bg-popover text-popover-foreground border border-border rounded-lg shadow-lg px-3 py-2 max-w-[280px]"
              style={{
                left: `${(hoveredDot.x / W) * 100}%`,
                top: `${(hoveredDot.y / H) * 100 - 6}%`,
                transform: "translate(-50%, -100%)",
              }}
            >
              <p className="text-xs font-semibold leading-tight mb-1">{hoveredDot.pub.title}</p>
              <p className="text-[10px] text-muted-foreground">
                {hoveredDot.pub.venue} · {hoveredDot.pub.year} · {TYPE_LABELS[hoveredDot.pub.type]}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-6 flex-wrap text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <svg width="14" height="14"><circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="7" cy="7" r="2.5" fill="currentColor" opacity={0.6} /></svg>
          Journal
        </span>
        <span className="flex items-center gap-1.5">
          <svg width="14" height="14"><circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" strokeWidth="2" /><polygon points="7,4 9.6,8.5 4.4,8.5" fill="currentColor" opacity={0.5} /></svg>
          Conference
        </span>
        <span className="flex items-center gap-1.5">
          <svg width="14" height="14"><circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" strokeWidth="2" /><rect x="5" y="5" width="4" height="4" fill="currentColor" opacity={0.5} rx={1} /></svg>
          Under Review
        </span>
        <span className="flex items-center gap-1.5">
          <svg width="14" height="14"><circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="7" cy="7" r="2" fill="currentColor" opacity={0.4} /></svg>
          In Progress
        </span>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedPub && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
            onClick={() => setSelectedPub(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card text-card-foreground border border-border rounded-xl shadow-2xl max-w-lg w-full p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPub(null)}
                className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="flex flex-wrap gap-2 mb-3">
                <span
                  className="px-2.5 py-0.5 rounded-full text-xs font-semibold text-white"
                  style={{ backgroundColor: getStrandColor(selectedPub.strands) }}
                >
                  {TYPE_LABELS[selectedPub.type]}
                </span>
                {selectedPub.strands.map((s) => (
                  <span
                    key={s}
                    className="px-2.5 py-0.5 rounded-full text-xs font-medium border"
                    style={{ borderColor: STRANDS[s].color, color: STRANDS[s].color }}
                  >
                    {STRANDS[s].label.replace("\n", " ")}
                  </span>
                ))}
              </div>
              <h3 className="text-lg font-bold mb-2 leading-tight">{selectedPub.title}</h3>
              <p className="text-sm text-muted-foreground mb-1">{selectedPub.authors}</p>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">{selectedPub.venue}</span> · {selectedPub.year}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResearchInterests;
