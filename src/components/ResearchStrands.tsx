
import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

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
}

const STRANDS: Record<StrandId, { label: string; color: string }> = {
  adaptive: { label: "Personalized &\nAdaptive Learning", color: "hsl(172, 66%, 35%)" },
  feedback: { label: "Feedback", color: "hsl(263, 70%, 50%)" },
  humanai: { label: "Human-Centered\nAI in Education", color: "hsl(24, 85%, 48%)" },
  writing: { label: "Writing", color: "hsl(205, 80%, 38%)" },
};

const PUBLICATIONS: Publication[] = [
  { id: "j1", title: "Problem-centered post-secondary CS education: Private AI curriculum", authors: "Haddadian, G., Panzade, P., Takabi, D., & Kim, M. K.", venue: "IJTE, 8(2)", year: "2025", type: "journal", strands: ["humanai", "adaptive"] },
  { id: "j2", title: "Construction and validation of a CFAL questionnaire for language teachers", authors: "Haddadian, G., Radmanesh, S., & Haddadian, N.", venue: "Language Testing in Asia, 14(33)", year: "2024", type: "journal", strands: ["feedback"] },
  { id: "j3", title: "Innovative Use of Grammarly Feedback for Improving EFL Learners' Speaking", authors: "Haddadian, G., & Haddadian, N.", venue: "JAID, 13(2)", year: "2024", type: "journal", strands: ["feedback", "writing"] },
  { id: "j4", title: "Comparing Effects of Teacher, Automated, and Integrative Feedback on Writing", authors: "Haddadian, G.", venue: "CALL-EJ, 25(3)", year: "2024", type: "journal", strands: ["feedback", "writing"] },
  { id: "j5", title: "Conversational Repairs in Persian Dramatic Discourse", authors: "Haddadian, G., & Mahmoodi-Bakhtiari, B.", venue: "Persian Literary Studies, 7(11)", year: "2018", type: "journal", strands: ["writing"] },
  { id: "j6", title: "A Systematic Review of AWE Tools in Argumentative Writing for EFL Education", authors: "Haddadian, G., Kim, M. K., & Haddadian, N.", venue: "Research Synthesis in Applied Linguistics", year: "2025", type: "journal", strands: ["writing", "feedback"] },
  { id: "j7", title: "The value of GenAI for peer feedback provision: student perceptions and impacts", authors: "Noroozi, O., Haddadian, G., et al.", venue: "IJETHE, 22(1)", year: "2025", type: "journal", strands: ["feedback", "humanai"] },
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
  { id: "c15", title: "Exploring AI-Generated Expert Models: Instructor Interaction and Learner Perceptions", authors: "Haddadian, G., Han, H., Kim, J., et al.", venue: "ICLS 2025", year: "2025", type: "conference", strands: ["humanai", "adaptive"] },
  { id: "c16", title: "Enhancing Peer Feedback Practices With Generative AI", authors: "Greisel, M., Hornstein, J., ..., Haddadian, G., et al.", venue: "CSCL 2025", year: "2025", type: "conference", strands: ["feedback", "humanai"] },
  { id: "c17", title: "How students perceive and respond to GenAI for peer feedback uptake", authors: "Noroozi, O., Haddadian, G., et al.", venue: "AERA 2026", year: "2026", type: "conference", strands: ["feedback", "humanai"] },
  { id: "c18", title: "Synthesizing Research on AWE Tools in EFL Argumentative Writing", authors: "Haddadian, G., Kim, M. K., Haddadian, N.", venue: "AAAL 2026", year: "2026", type: "conference", strands: ["writing", "feedback"] },
  { id: "c19", title: "AI for automated scoring of argumentative essays", authors: "Motevali, S., Haddadian, G., et al.", venue: "AAAL 2026", year: "2026", type: "conference", strands: ["writing", "humanai"] },
  { id: "c20", title: "Collaborative use of AI-generated feedback in EFL argumentative writing", authors: "Haddadian, N., Haddadian, G., Haddadian, M.", venue: "AAAL 2026", year: "2026", type: "conference", strands: ["feedback", "writing"] },
  { id: "r1", title: "Learners' Collaboration in Using AI-generated Feedback & Argumentative Writing", authors: "Haddadian, G., Haddadian, M.", venue: "Computer Assisted Language Learning", year: "2025", type: "underreview", strands: ["feedback", "writing"] },
  { id: "r2", title: "Scaffolding Value of GenAI during Peer Feedback Provision and Uptake", authors: "Noroozi, O., Haddadian, G., et al.", venue: "Int. J. Educational Technology in Higher Ed.", year: "2025", type: "underreview", strands: ["feedback", "humanai"] },
  { id: "r3", title: "Promoting EFL Teachers' Self-Directed Professional Development", authors: "Mashhadi, F., Haddadian, G., et al.", venue: "Journal of Language and Education", year: "2025", type: "underreview", strands: ["humanai"] },
  { id: "r4", title: "Exploring Classroom Interactions in Iranian EFL Classrooms", authors: "Kavoshian, S., Mashhadi, F., Haddadian, G.", venue: "Int. J. Language Studies", year: "2025", type: "underreview", strands: ["feedback"] },
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

const W = 960, H = 700;
const CX = W / 2, CY = H / 2;

// Strand node positions — arranged in a diamond around the center
const STRAND_NODES: Record<StrandId, { x: number; y: number; r: number }> = {
  adaptive: { x: CX, y: 120, r: 50 },
  feedback: { x: W - 130, y: CY, r: 50 },
  humanai: { x: CX, y: H - 120, r: 50 },
  writing: { x: 130, y: CY, r: 50 },
};

function hashCode(s: string): number {
  let hash = 0;
  for (let i = 0; i < s.length; i++) hash = ((hash << 5) - hash + s.charCodeAt(i)) | 0;
  return Math.abs(hash);
}

// Position dots around their strand nodes; multi-strand dots sit between strand nodes
function computeDotPosition(pub: Publication): { x: number; y: number } {
  const strands = pub.strands;
  // Average position of all strands the pub belongs to
  let tx = 0, ty = 0;
  strands.forEach((s) => {
    tx += STRAND_NODES[s].x;
    ty += STRAND_NODES[s].y;
  });
  tx /= strands.length;
  ty /= strands.length;

  // Pull towards center slightly for multi-strand
  const pullToCenter = strands.length > 1 ? 0.15 : 0;
  tx = tx + (CX - tx) * pullToCenter;
  ty = ty + (CY - ty) * pullToCenter;

  // Add deterministic jitter based on id
  const seed = hashCode(pub.id);
  const jitterAngle = ((seed & 0xff) / 255) * Math.PI * 2;
  const jitterR = 25 + ((seed >> 8) & 0xff) / 255 * 55;
  return {
    x: tx + Math.cos(jitterAngle) * jitterR,
    y: ty + Math.sin(jitterAngle) * jitterR,
  };
}

function countByStrand(strandId: StrandId): number {
  return PUBLICATIONS.filter((p) => p.strands.includes(strandId)).length;
}

const ResearchStrands = () => {
  const [filter, setFilter] = useState<WorkType | "all">("all");
  const [hoveredStrand, setHoveredStrand] = useState<StrandId | null>(null);
  const [selectedPub, setSelectedPub] = useState<Publication | null>(null);
  const [hoveredDot, setHoveredDot] = useState<{ pub: Publication; x: number; y: number } | null>(null);

  const filteredPubs = PUBLICATIONS.filter((p) => filter === "all" || p.type === filter);

  const dotPositions = useMemo(() => {
    const map = new Map<string, { x: number; y: number }>();
    PUBLICATIONS.forEach((pub) => map.set(pub.id, computeDotPosition(pub)));
    return map;
  }, []);

  const getPos = useCallback((pub: Publication) => dotPositions.get(pub.id)!, [dotPositions]);

  // Build connection lines: each dot connects to its strand nodes
  const connectionLines = useMemo(() => {
    const lines: { x1: number; y1: number; x2: number; y2: number; color: string; strand: StrandId }[] = [];
    filteredPubs.forEach((pub) => {
      const pos = dotPositions.get(pub.id)!;
      pub.strands.forEach((sid) => {
        const node = STRAND_NODES[sid];
        lines.push({
          x1: pos.x, y1: pos.y,
          x2: node.x, y2: node.y,
          color: STRANDS[sid].color,
          strand: sid,
        });
      });
    });
    return lines;
  }, [filteredPubs, dotPositions]);

  const isActive = (sid: StrandId) => !hoveredStrand || hoveredStrand === sid;

  return (
    <div>
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2">Research Strands</h2>
      <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">
        My work moves across four interconnected strands with <strong>AI × Education</strong> as the shared foundation.
        Hover a strand node to highlight. Click any dot to see publication details.
      </p>

      {/* Strand count chips */}
      <div className="flex flex-wrap justify-center gap-3 mb-4">
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

      {/* SVG */}
      <div className="relative max-w-[900px] mx-auto select-none">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto overflow-visible block">
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Connection lines: dot → strand node */}
          {connectionLines.map((line, i) => (
            <line
              key={`line-${i}`}
              x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
              stroke={line.color}
              strokeWidth={hoveredStrand === line.strand ? 1.8 : 0.8}
              strokeDasharray={hoveredStrand === line.strand ? "none" : "4 3"}
              opacity={hoveredStrand ? (hoveredStrand === line.strand ? 0.55 : 0.04) : 0.18}
              style={{ transition: "all 0.4s ease", pointerEvents: "none" }}
            />
          ))}

          {/* Lines from strand nodes to center */}
          {(Object.keys(STRAND_NODES) as StrandId[]).map((sid) => {
            const n = STRAND_NODES[sid];
            return (
              <line key={`axis-${sid}`} x1={CX} y1={CY} x2={n.x} y2={n.y}
                stroke={STRANDS[sid].color}
                strokeWidth={1.2}
                strokeDasharray="6 4"
                opacity={isActive(sid) ? 0.3 : 0.06}
                style={{ transition: "opacity 0.4s", pointerEvents: "none" }}
              />
            );
          })}

          {/* Strand nodes (large circles with labels) */}
          {(Object.keys(STRAND_NODES) as StrandId[]).map((sid) => {
            const n = STRAND_NODES[sid];
            const strand = STRANDS[sid];
            const lines = strand.label.split("\n");
            const active = isActive(sid);
            return (
              <g key={`node-${sid}`}
                style={{ cursor: "pointer", transition: "opacity 0.4s" }}
                opacity={active ? 1 : 0.2}
                onMouseEnter={() => setHoveredStrand(sid)}
                onMouseLeave={() => setHoveredStrand(null)}
              >
                {/* Outer glow */}
                <circle cx={n.x} cy={n.y} r={n.r + 8} fill={strand.color} opacity={hoveredStrand === sid ? 0.12 : 0} style={{ transition: "opacity 0.3s" }} />
                {/* Main node */}
                <circle cx={n.x} cy={n.y} r={n.r} fill="hsl(var(--background))" stroke={strand.color} strokeWidth={hoveredStrand === sid ? 3 : 2} />
                {/* Count badge */}
                <circle cx={n.x + n.r - 8} cy={n.y - n.r + 8} r={12} fill={strand.color} />
                <text x={n.x + n.r - 8} y={n.y - n.r + 12} textAnchor="middle" fontSize="10" fontWeight="700" fill="white">{countByStrand(sid)}</text>
                {/* Label */}
                {lines.map((l, li) => (
                  <text key={li} x={n.x} y={n.y - (lines.length - 1) * 7 + li * 15} textAnchor="middle" fontSize="11" fontWeight="700" fill={strand.color}>{l}</text>
                ))}
              </g>
            );
          })}

          {/* Center hub */}
          <circle cx={CX} cy={CY} r={40} fill="hsl(var(--background))" stroke="hsl(var(--border))" strokeWidth={2} />
          <text x={CX} y={CY - 6} textAnchor="middle" fontSize="12" fontWeight="800" fill="hsl(var(--foreground))">AI × Education</text>
          <text x={CX} y={CY + 10} textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))" opacity={0.6}>{PUBLICATIONS.length} works</text>

          {/* Publication dots */}
          {filteredPubs.map((pub) => {
            const pos = getPos(pub);
            const color = STRANDS[pub.strands[0]].color;
            const isHovered = hoveredDot?.pub.id === pub.id;
            const strandMatch = hoveredStrand ? pub.strands.includes(hoveredStrand) : true;
            const r = isHovered ? 10 : 6;
            return (
              <g key={pub.id}
                style={{ opacity: strandMatch ? 1 : 0.08, transition: "opacity 0.35s", cursor: "pointer" }}
                onClick={() => setSelectedPub(pub)}
                onMouseEnter={() => setHoveredDot({ pub, x: pos.x, y: pos.y })}
                onMouseLeave={() => setHoveredDot(null)}
              >
                {/* Pulse ring */}
                <circle cx={pos.x} cy={pos.y} r={r + 4} fill={color} opacity={0}>
                  <animate attributeName="r" values={`${r};${r + 10};${r}`} dur="3s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.2;0;0.2" dur="3s" repeatCount="indefinite" />
                </circle>
                {/* Dot */}
                <circle cx={pos.x} cy={pos.y} r={r} fill="hsl(var(--background))" stroke={color} strokeWidth={isHovered ? 3 : 2} />
                {/* Inner shape by type */}
                {pub.type === "journal" && <circle cx={pos.x} cy={pos.y} r={2.5} fill={color} />}
                {pub.type === "conference" && <polygon points={`${pos.x},${pos.y - 2.5} ${pos.x + 2.2},${pos.y + 1.3} ${pos.x - 2.2},${pos.y + 1.3}`} fill={color} />}
                {pub.type === "underreview" && <rect x={pos.x - 2} y={pos.y - 2} width={4} height={4} fill={color} rx={0.5} />}
                {pub.type === "inprogress" && <circle cx={pos.x} cy={pos.y} r={2} fill="none" stroke={color} strokeWidth={1.5} />}
                {/* Multi-strand indicator */}
                {pub.strands.length > 1 && (
                  <g>
                    {pub.strands.slice(1).map((sid, i) => (
                      <circle key={sid} cx={pos.x + 5 + i * 5} cy={pos.y - 5} r={2} fill={STRANDS[sid].color} stroke="hsl(var(--background))" strokeWidth={1} />
                    ))}
                  </g>
                )}
              </g>
            );
          })}
        </svg>

        {/* Tooltip */}
        <AnimatePresence>
          {hoveredDot && (
            <motion.div
              initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="absolute pointer-events-none z-10 bg-popover text-popover-foreground border border-border rounded-lg shadow-lg px-3 py-2 max-w-[280px]"
              style={{
                left: `${(hoveredDot.x / W) * 100}%`,
                top: `${(hoveredDot.y / H) * 100 - 5}%`,
                transform: "translate(-50%, -100%)",
              }}
            >
              <p className="text-xs font-semibold leading-tight mb-1">{hoveredDot.pub.title}</p>
              <p className="text-[10px] text-muted-foreground">{hoveredDot.pub.venue} · {hoveredDot.pub.year} · {TYPE_LABELS[hoveredDot.pub.type]}</p>
              <div className="flex gap-1 mt-1">
                {hoveredDot.pub.strands.map((s) => (
                  <span key={s} className="text-[9px] px-1.5 py-0.5 rounded-full border" style={{ borderColor: STRANDS[s].color, color: STRANDS[s].color }}>
                    {STRANDS[s].label.replace("\n", " ")}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-6 flex-wrap text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <svg width="14" height="14"><circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="7" cy="7" r="2.5" fill="currentColor" /></svg>
          Journal
        </span>
        <span className="flex items-center gap-1.5">
          <svg width="14" height="14"><circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" strokeWidth="2" /><polygon points="7,4.5 9.2,8.5 4.8,8.5" fill="currentColor" /></svg>
          Conference
        </span>
        <span className="flex items-center gap-1.5">
          <svg width="14" height="14"><circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" strokeWidth="2" /><rect x="5" y="5" width="4" height="4" fill="currentColor" rx={0.5} /></svg>
          Under Review
        </span>
        <span className="flex items-center gap-1.5">
          <svg width="14" height="14"><circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="7" cy="7" r="2" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
          In Progress
        </span>
        <span className="flex items-center gap-1.5">
          <svg width="18" height="14">
            <circle cx="9" cy="7" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="14" cy="4" r="2" fill="hsl(263,70%,50%)" stroke="white" strokeWidth="1" />
          </svg>
          Multi-strand
        </span>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedPub && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
            onClick={() => setSelectedPub(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card text-card-foreground border border-border rounded-xl shadow-2xl max-w-lg w-full p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setSelectedPub(null)} className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors">
                <X className="h-5 w-5" />
              </button>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold text-white" style={{ backgroundColor: STRANDS[selectedPub.strands[0]].color }}>
                  {TYPE_LABELS[selectedPub.type]}
                </span>
                {selectedPub.strands.map((s) => (
                  <span key={s} className="px-2.5 py-0.5 rounded-full text-xs font-medium border" style={{ borderColor: STRANDS[s].color, color: STRANDS[s].color }}>
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

export default ResearchStrands;
