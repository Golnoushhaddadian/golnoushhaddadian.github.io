import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export type Strand = "all" | "ai-education" | "assessment-feedback" | "language-call" | "research-methodology";
export type PubType = "all" | "journal" | "conference" | "under-review" | "in-progress";

export const strandConfig = {
  "ai-education": {
    label: "AI in Education",
    subtitle: "AI-augmented learning & adaptive technologies",
    color: "#0D9488",
    gradientId: "grad-ai",
  },
  "assessment-feedback": {
    label: "Assessment & Feedback",
    subtitle: "Formative assessment & peer feedback",
    color: "#7C3AED",
    gradientId: "grad-assess",
  },
  "language-call": {
    label: "Language Learning & CALL",
    subtitle: "AWE systems & essay writing",
    color: "#EA580C",
    gradientId: "grad-lang",
  },
  "research-methodology": {
    label: "Research Methodology",
    subtitle: "DBR & mixed methods",
    color: "#0369A1",
    gradientId: "grad-method",
  },
} as const;

// Each dot = a publication placed on the radar
export type RadarDot = {
  id: string;
  cx: number;
  cy: number;
  strand: Exclude<Strand, "all">;
  blendStrand?: Exclude<Strand, "all">; // if it sits at an intersection
  type: Exclude<PubType, "all">;
  title: string;
  authors: string;
  venue: string;
  year: string;
};

// Pre-computed dot positions for each publication (placed in quadrants/intersections)
const radarDots: RadarDot[] = [
  // === AI in Education quadrant (top) ===
  { id: "j1", cx: 450, cy: 220, strand: "ai-education", type: "journal", title: "Problem-centered post-secondary CS education: A study of the private AI curriculum", authors: "Haddadian, G., Panzade, P., Takabi, D., & Kim, M. K.", venue: "IJTE, 8(2)", year: "2025" },
  { id: "c3", cx: 510, cy: 190, strand: "ai-education", type: "conference", title: "Evaluating Private AI Curriculum in CS Education", authors: "Haddadian, G., Panzade, P., Takabi, D., & Kim, M. K.", venue: "ICLS 2024", year: "2024" },
  { id: "c8", cx: 390, cy: 200, strand: "ai-education", type: "conference", title: "A Comprehensive Model of AI Literacy from a Developmental Perspective", authors: "Haddadian, G., Bae, Y., Kim, J., & Kim, M.", venue: "AECT 2023", year: "2023" },
  { id: "c10", cx: 470, cy: 160, strand: "ai-education", type: "conference", title: "The impact of an AI-based educational tool", authors: "Bae, Y., Kim, J., Haddadian, G., Davis, A., & Kim, M.", venue: "AECT 2023", year: "2023" },
  { id: "c12", cx: 430, cy: 175, strand: "ai-education", type: "conference", title: "AI-augmented summarization: Impact on adult learners", authors: "Kim, J., Bae, Y., Haddadian, G., et al.", venue: "AECT 2023", year: "2023" },
  { id: "c2", cx: 520, cy: 230, strand: "ai-education", type: "conference", title: "Automated Generation of Expert Models with Generative AI", authors: "Haddadian, G., Han, H., Kim, M., Kim, J., Bae, Y.", venue: "ICLS 2025", year: "Accepted" },
  // WIP in AI
  { id: "w4", cx: 490, cy: 145, strand: "ai-education", type: "in-progress", title: "Students' Plagiarism Behaviors within AI-Enabled Introductory Physics Courses", authors: "Han, H., Haddadian, G., Kim, M., Kim, J., Bae, Y.", venue: "Journal Article", year: "" },
  { id: "w5", cx: 410, cy: 140, strand: "ai-education", type: "in-progress", title: "Generative AI for Automated Construction of Expert Models in Physics", authors: "Han, H., Kim, M., Haddadian, G.", venue: "Journal Article", year: "" },

  // === Assessment & Feedback quadrant (right) ===
  { id: "c1", cx: 640, cy: 340, strand: "assessment-feedback", type: "conference", title: "Supporting peer feedback provision and uptake with GenAI", authors: "Noroozi, O., Haddadian, G., et al.", venue: "ICLS 2025", year: "Accepted" },
  { id: "c6", cx: 620, cy: 400, strand: "assessment-feedback", type: "conference", title: "AI vs. human evaluation in academic summary evaluation", authors: "Kim, J., Haddadian, G., & Kim, M.", venue: "ICLS 2023", year: "2023" },
  { id: "c11", cx: 660, cy: 370, strand: "assessment-feedback", type: "conference", title: "Leveraging ML to evaluate cognitive engagement in online discussions", authors: "Kim, J., Bae, Y., Haddadian, G., & Kim, M.", venue: "AECT 2023", year: "2023" },
  { id: "u2", cx: 630, cy: 310, strand: "assessment-feedback", type: "under-review", title: "The Scaffolding Value of GenAI during Peer Feedback", authors: "Noroozi, O., Haddadian, G., Banihashem, K., Schunn, C., Alqassab, M.", venue: "IJETHE", year: "In revision" },
  { id: "w3", cx: 670, cy: 430, strand: "assessment-feedback", type: "in-progress", title: "Text-based Generative AI to Facilitate Peer Feedback", authors: "Alqassab, M., Noroozi, O., Haddadian, G., et al.", venue: "Book Chapter", year: "" },
  { id: "w6", cx: 650, cy: 460, strand: "assessment-feedback", type: "in-progress", title: "Examining Learner's Evaluative Judgment Supported by Technology-Enabled Feedback", authors: "Heidari, A., Kim, M., Kim, J., Bae, Y., Haddadian, G.", venue: "Journal Article", year: "" },

  // === Language Learning & CALL quadrant (bottom) ===
  { id: "j3", cx: 410, cy: 540, strand: "language-call", type: "journal", title: "Innovative Use of Grammarly Feedback for Improving EFL Learners' Speaking", authors: "Haddadian, G. & Haddadian, N.", venue: "JAID, 13(2)", year: "2024" },
  { id: "j4", cx: 490, cy: 560, strand: "language-call", type: "journal", title: "Comparing Effects of Teacher, Automated, and Integrative Feedback on EFL Writing", authors: "Haddadian, G.", venue: "CALL-EJ, 25(3)", year: "2024" },
  { id: "j5", cx: 450, cy: 590, strand: "language-call", type: "journal", title: "Conversational Repairs in Persian Dramatic Discourse", authors: "Haddadian, G. & Mahmoodi-Bakhtiari, B.", venue: "PLSJ, 7(11)", year: "2018" },
  { id: "c13", cx: 380, cy: 570, strand: "language-call", type: "conference", title: "Effect of Mind Mapping on EFL Learners' Self-efficacy in Vocabulary Learning", authors: "Radmanesh, S. & Haddadian, G.", venue: "WEI-ETL 2020", year: "2020" },
  { id: "c5", cx: 460, cy: 525, strand: "language-call", type: "conference", title: "AI-Enabled Personalized Recommendations on L2 Learners", authors: "Daneshvar Ghorbani, B. & Haddadian, G.", venue: "AIRiAL 2024", year: "2024" },
  { id: "u1", cx: 430, cy: 610, strand: "language-call", type: "under-review", title: "Learners' Collaboration in Using AI-generated Feedback, Argumentative Writing", authors: "Haddadian, G. & Haddadian, M.", venue: "CALL", year: "In revision" },
  { id: "u4", cx: 500, cy: 600, strand: "language-call", type: "under-review", title: "Exploring Classroom Interactions in Iranian EFL Classrooms", authors: "Kavoshian, S., Mashhadi, F., Haddadian, G.", venue: "IJLS", year: "Under Review" },

  // === Research Methodology quadrant (left) ===
  { id: "j2", cx: 310, cy: 360, strand: "research-methodology", type: "journal", title: "Construction and validation of a CFAL questionnaire for language teachers", authors: "Haddadian, G., Radmanesh, S., & Haddadian, N.", venue: "Language Testing in Asia, 14(33)", year: "2024" },
  { id: "c7", cx: 280, cy: 400, strand: "research-methodology", type: "conference", title: "A Design Study of Problem-Centered Instruction for Private AI Curriculum", authors: "Haddadian, G., Takabi, D., Panzade, P., Kim, M.", venue: "AECT 2023", year: "2023" },
  { id: "c9", cx: 260, cy: 350, strand: "research-methodology", type: "conference", title: "A test of learning progress models using AI-enabled knowledge representation", authors: "Kim, M., Kim, N., Haddadian, G., & Heidari, A.", venue: "ICLS 2023", year: "2023" },
  { id: "c4", cx: 290, cy: 430, strand: "research-methodology", type: "conference", title: "ELT Teachers' Online Self-efficacy: Does Teachers' Level of Agency Matter?", authors: "Haddadian, G. & Haddadian, N.", venue: "SITE 2024", year: "2024" },
  { id: "c14", cx: 250, cy: 380, strand: "research-methodology", type: "conference", title: "Design and Development of a Computer-Adaptive Prototype for Vocabulary", authors: "Haddadian, G. & Salehi, M.", venue: "Thesis, SUT 2014", year: "2015" },
  { id: "u3", cx: 240, cy: 420, strand: "research-methodology", type: "under-review", title: "Promoting EFL Teachers' Self-Directed Professional Development", authors: "Mashhadi, F., Haddadian, G., Kavoshian, S., Heidari, F.", venue: "JLE", year: "Under Review" },
  { id: "w1", cx: 320, cy: 480, strand: "research-methodology", type: "in-progress", title: "A Systematic Review of AWE in Argumentative Writing for EFL Education", authors: "Haddadian, G., Kim, M., Haddadian, N.", venue: "Journal Article", year: "" },
  { id: "w2", cx: 340, cy: 310, strand: "research-methodology", type: "in-progress", title: "Real-time Intelligent Technology for Argumentative Writing (RITA): A DBR", authors: "Haddadian, G. & Kim, M.", venue: "Journal Article", year: "" },
];

type Props = {
  activeStrand: Strand;
  activeType: PubType;
  onStrandChange: (s: Strand) => void;
  onDotClick: (dot: RadarDot) => void;
};

const ResearchStrandsVenn = ({ activeStrand, activeType, onStrandChange, onDotClick }: Props) => {
  const [hovered, setHovered] = useState<string | null>(null);
  const [hoveredStrand, setHoveredStrand] = useState<Strand | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; dot: RadarDot } | null>(null);

  const isDotVisible = useCallback((dot: RadarDot) => {
    const strandMatch = activeStrand === "all" || dot.strand === activeStrand || dot.blendStrand === activeStrand;
    const typeMatch = activeType === "all" || dot.type === activeType;
    return strandMatch && typeMatch;
  }, [activeStrand, activeType]);

  const isStrandHighlighted = useCallback((s: Exclude<Strand, "all">) => {
    if (hoveredStrand) return hoveredStrand === s;
    if (activeStrand === "all") return true;
    return activeStrand === s;
  }, [activeStrand, hoveredStrand]);

  const getDotColor = (dot: RadarDot) => {
    return strandConfig[dot.strand].color;
  };

  return (
    <div className="relative w-full max-w-[680px] mx-auto select-none">
      <svg viewBox="0 0 900 760" className="w-full h-auto overflow-visible block">
        <defs>
          {/* Shadow filter */}
          <filter id="rdr-shd" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="b" />
            <feOffset dy="2" result="o" />
            <feFlood floodOpacity="0.1" result="c" />
            <feComposite in="c" in2="o" operator="in" result="s" />
            <feMerge>
              <feMergeNode in="s" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Radial gradients */}
          <radialGradient id="grad-ai" cx="50%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#5eead4" stopOpacity="0.75" />
            <stop offset="45%" stopColor="#2dd4bf" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#0D9488" stopOpacity="0.12" />
          </radialGradient>
          <radialGradient id="grad-assess" cx="35%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#c4b5fd" stopOpacity="0.75" />
            <stop offset="45%" stopColor="#8b5cf6" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.12" />
          </radialGradient>
          <radialGradient id="grad-lang" cx="50%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#fdba74" stopOpacity="0.75" />
            <stop offset="45%" stopColor="#f97316" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#EA580C" stopOpacity="0.12" />
          </radialGradient>
          <radialGradient id="grad-method" cx="65%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.75" />
            <stop offset="45%" stopColor="#0ea5e9" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#0369A1" stopOpacity="0.12" />
          </radialGradient>
          <radialGradient id="grad-outer" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f0f4ff" stopOpacity="0.5" />
            <stop offset="70%" stopColor="#e8ecf4" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#dde3ee" stopOpacity="0.08" />
          </radialGradient>
        </defs>

        {/* Outer circle */}
        <circle cx="450" cy="380" r="280" fill="url(#grad-outer)" stroke="#e2e8f0" strokeWidth=".5" strokeDasharray="8 5" opacity=".6" />

        {/* Quadrant ellipses */}
        <ellipse cx="450" cy="260" rx="240" ry="250" fill="url(#grad-ai)"
          style={{ pointerEvents: "none", transition: "opacity 0.6s" }}
          opacity={isStrandHighlighted("ai-education") ? 0.75 : 0.15} />
        <ellipse cx="590" cy="380" rx="260" ry="210" fill="url(#grad-assess)"
          style={{ pointerEvents: "none", transition: "opacity 0.6s" }}
          opacity={isStrandHighlighted("assessment-feedback") ? 0.75 : 0.15} />
        <ellipse cx="450" cy="500" rx="240" ry="250" fill="url(#grad-lang)"
          style={{ pointerEvents: "none", transition: "opacity 0.6s" }}
          opacity={isStrandHighlighted("language-call") ? 0.75 : 0.15} />
        <ellipse cx="310" cy="380" rx="260" ry="210" fill="url(#grad-method)"
          style={{ pointerEvents: "none", transition: "opacity 0.6s" }}
          opacity={isStrandHighlighted("research-methodology") ? 0.75 : 0.15} />

        {/* Concentric rings */}
        {[80, 160, 240].map(r => (
          <circle key={r} cx="450" cy="380" r={r} fill="none" stroke="#d1d5db" strokeWidth="1" strokeDasharray="6 4" opacity=".45" />
        ))}

        {/* Axis lines */}
        <line x1="450" y1="380" x2="450" y2="100" stroke="#cbd5e1" strokeWidth=".8" opacity=".6" />
        <line x1="450" y1="380" x2="730" y2="380" stroke="#cbd5e1" strokeWidth=".8" opacity=".6" />
        <line x1="450" y1="380" x2="450" y2="660" stroke="#cbd5e1" strokeWidth=".8" opacity=".6" />
        <line x1="450" y1="380" x2="170" y2="380" stroke="#cbd5e1" strokeWidth=".8" opacity=".6" />

        {/* Center hub */}
        <g>
          <circle cx="450" cy="380" r="38" fill="#fff" stroke="#e2e8f0" strokeWidth="1.5" filter="url(#rdr-shd)" />
          <text x="450" y="374" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e1b4b" opacity=".8">AI × Education</text>
          <text x="450" y="390" textAnchor="middle" fontSize="9" fill="#64748b" opacity=".6">Shared foundation</text>
        </g>

        {/* Strand labels - Top (AI in Education) */}
        <g
          style={{ cursor: "pointer", transition: "opacity 0.5s" }}
          opacity={isStrandHighlighted("ai-education") ? 1 : 0.35}
          onMouseEnter={() => setHoveredStrand("ai-education")}
          onMouseLeave={() => setHoveredStrand(null)}
          onClick={() => onStrandChange(activeStrand === "ai-education" ? "all" : "ai-education")}
        >
          <rect x="350" y="47" width="200" height="75" fill="transparent" />
          <text x="450" y="65" textAnchor="middle" fontSize="17" fontWeight="800" fill="#0D9488">AI in</text>
          <text x="450" y="87" textAnchor="middle" fontSize="17" fontWeight="800" fill="#0D9488">Education</text>
          <text x="450" y="113" textAnchor="middle" fontSize="12" fill="#0D9488" opacity=".75" fontStyle="italic">AI-augmented learning &amp; adaptive tech</text>
        </g>

        {/* Right (Assessment & Feedback) */}
        <g
          style={{ cursor: "pointer", transition: "opacity 0.5s" }}
          opacity={isStrandHighlighted("assessment-feedback") ? 1 : 0.35}
          onMouseEnter={() => setHoveredStrand("assessment-feedback")}
          onMouseLeave={() => setHoveredStrand(null)}
          onClick={() => onStrandChange(activeStrand === "assessment-feedback" ? "all" : "assessment-feedback")}
        >
          <rect x="730" y="352" width="200" height="75" fill="transparent" />
          <text x="740" y="370" textAnchor="start" fontSize="17" fontWeight="800" fill="#7C3AED">Assessment &amp;</text>
          <text x="740" y="392" textAnchor="start" fontSize="17" fontWeight="800" fill="#7C3AED">Feedback</text>
          <text x="740" y="418" textAnchor="start" fontSize="12" fill="#7C3AED" opacity=".75" fontStyle="italic">Formative assessment &amp; peer feedback</text>
        </g>

        {/* Bottom (Language Learning & CALL) */}
        <g
          style={{ cursor: "pointer", transition: "opacity 0.5s" }}
          opacity={isStrandHighlighted("language-call") ? 1 : 0.35}
          onMouseEnter={() => setHoveredStrand("language-call")}
          onMouseLeave={() => setHoveredStrand(null)}
          onClick={() => onStrandChange(activeStrand === "language-call" ? "all" : "language-call")}
        >
          <rect x="350" y="677" width="200" height="75" fill="transparent" />
          <text x="450" y="695" textAnchor="middle" fontSize="17" fontWeight="800" fill="#EA580C">Language Learning</text>
          <text x="450" y="717" textAnchor="middle" fontSize="17" fontWeight="800" fill="#EA580C">&amp; CALL</text>
          <text x="450" y="743" textAnchor="middle" fontSize="12" fill="#EA580C" opacity=".75" fontStyle="italic">AWE systems &amp; essay writing</text>
        </g>

        {/* Left (Research Methodology) */}
        <g
          style={{ cursor: "pointer", transition: "opacity 0.5s" }}
          opacity={isStrandHighlighted("research-methodology") ? 1 : 0.35}
          onMouseEnter={() => setHoveredStrand("research-methodology")}
          onMouseLeave={() => setHoveredStrand(null)}
          onClick={() => onStrandChange(activeStrand === "research-methodology" ? "all" : "research-methodology")}
        >
          <rect x="-30" y="352" width="200" height="75" fill="transparent" />
          <text x="160" y="370" textAnchor="end" fontSize="17" fontWeight="800" fill="#0369A1">Research</text>
          <text x="160" y="392" textAnchor="end" fontSize="17" fontWeight="800" fill="#0369A1">Methodology</text>
          <text x="160" y="418" textAnchor="end" fontSize="12" fill="#0369A1" opacity=".75" fontStyle="italic">DBR &amp; mixed methods</text>
        </g>

        {/* Connection lines between visible dots */}
        {radarDots.filter(isDotVisible).map((dot, i, arr) => {
          if (i === 0) return null;
          const prev = arr[i - 1];
          if (dot.strand !== prev.strand && !dot.blendStrand) return null;
          return (
            <line
              key={`conn-${dot.id}-${prev.id}`}
              x1={prev.cx} y1={prev.cy}
              x2={dot.cx} y2={dot.cy}
              stroke="#475569" strokeWidth="1.2" strokeDasharray="6 4" opacity=".3"
              style={{ pointerEvents: "none", transition: "opacity .5s" }}
            />
          );
        })}

        {/* Publication dots */}
        {radarDots.map(dot => {
          const visible = isDotVisible(dot);
          const color = getDotColor(dot);
          const isHovered = hovered === dot.id;
          return (
            <g
              key={dot.id}
              style={{
                transition: "opacity 0.35s, transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
                opacity: visible ? 1 : 0.08,
                cursor: visible ? "pointer" : "default",
                transformOrigin: `${dot.cx}px ${dot.cy}px`,
                transform: isHovered ? "scale(1.3)" : "scale(1)",
              }}
              onMouseEnter={() => { if (visible) { setHovered(dot.id); setTooltip({ x: dot.cx, y: dot.cy, dot }); } }}
              onMouseLeave={() => { setHovered(null); setTooltip(null); }}
              onClick={() => { if (visible) onDotClick(dot); }}
            >
              <circle cx={dot.cx} cy={dot.cy} r="9" fill="#fff" stroke={color} strokeWidth="2.5" />
              {/* Pulse animation */}
              <circle cx={dot.cx} cy={dot.cy} r="3.5" fill={color} opacity=".4">
                <animate attributeName="r" values="3.5;6;3.5" dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.4;0.1;0.4" dur="3s" repeatCount="indefinite" />
              </circle>
            </g>
          );
        })}

        {/* Tooltip */}
        {tooltip && (
          <g style={{ pointerEvents: "none" }}>
            <rect
              x={tooltip.x - 130}
              y={tooltip.y - 55}
              width="260"
              height="40"
              rx="6"
              fill="#1e293b"
              opacity=".92"
            />
            <text x={tooltip.x} y={tooltip.y - 32} textAnchor="middle" fontSize="10" fill="#fff" fontWeight="500">
              {tooltip.dot.title.length > 55 ? tooltip.dot.title.slice(0, 55) + "…" : tooltip.dot.title}
            </text>
            <text x={tooltip.x} y={tooltip.y - 20} textAnchor="middle" fontSize="9" fill="#94a3b8">
              Click for details
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};

export { radarDots };
export default ResearchStrandsVenn;
