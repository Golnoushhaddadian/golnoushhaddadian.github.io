import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export type Strand = "all" | "ai-education" | "assessment-feedback" | "language-call" | "research-methodology";

const strandConfig = {
  "ai-education": {
    label: "AI in Education",
    subtitle: "AI-augmented learning & adaptive technologies",
    color: "hsl(210, 70%, 55%)",
    lightColor: "hsl(210, 70%, 55%, 0.12)",
  },
  "assessment-feedback": {
    label: "Assessment & Feedback",
    subtitle: "Formative assessment & peer feedback",
    color: "hsl(160, 55%, 45%)",
    lightColor: "hsl(160, 55%, 45%, 0.12)",
  },
  "language-call": {
    label: "Language Learning & CALL",
    subtitle: "AWE systems & essay writing",
    color: "hsl(280, 50%, 55%)",
    lightColor: "hsl(280, 50%, 55%, 0.12)",
  },
  "research-methodology": {
    label: "Research Methodology",
    subtitle: "DBR & mixed methods",
    color: "hsl(30, 65%, 50%)",
    lightColor: "hsl(30, 65%, 50%, 0.12)",
  },
};

type Props = {
  activeStrand: Strand;
  onStrandChange: (strand: Strand) => void;
};

const ResearchStrandsVenn = ({ activeStrand, onStrandChange }: Props) => {
  const [hoveredStrand, setHoveredStrand] = useState<string | null>(null);

  const isHighlighted = (strand: string) => {
    if (activeStrand === "all" && !hoveredStrand) return true;
    if (hoveredStrand) return hoveredStrand === strand;
    return activeStrand === strand;
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative w-full max-w-[500px] aspect-square mx-auto">
        <svg viewBox="0 0 500 500" className="w-full h-full">
          {/* AI in Education - top */}
          <motion.g
            onMouseEnter={() => setHoveredStrand("ai-education")}
            onMouseLeave={() => setHoveredStrand(null)}
            onClick={() => onStrandChange("ai-education")}
            className="cursor-pointer"
            animate={{ opacity: isHighlighted("ai-education") ? 1 : 0.25 }}
            transition={{ duration: 0.3 }}
          >
            <circle cx="250" cy="175" r="130" fill="hsl(210, 70%, 55%)" fillOpacity={0.18} stroke="hsl(210, 70%, 55%)" strokeWidth={activeStrand === "ai-education" ? 3 : 1.5} strokeOpacity={0.6} />
            <text x="250" y="120" textAnchor="middle" className="fill-foreground text-[13px] font-semibold" style={{ pointerEvents: "none" }}>AI in</text>
            <text x="250" y="138" textAnchor="middle" className="fill-foreground text-[13px] font-semibold" style={{ pointerEvents: "none" }}>Education</text>
          </motion.g>

          {/* Assessment & Feedback - left */}
          <motion.g
            onMouseEnter={() => setHoveredStrand("assessment-feedback")}
            onMouseLeave={() => setHoveredStrand(null)}
            onClick={() => onStrandChange("assessment-feedback")}
            className="cursor-pointer"
            animate={{ opacity: isHighlighted("assessment-feedback") ? 1 : 0.25 }}
            transition={{ duration: 0.3 }}
          >
            <circle cx="175" cy="310" r="130" fill="hsl(160, 55%, 45%)" fillOpacity={0.18} stroke="hsl(160, 55%, 45%)" strokeWidth={activeStrand === "assessment-feedback" ? 3 : 1.5} strokeOpacity={0.6} />
            <text x="130" y="360" textAnchor="middle" className="fill-foreground text-[12px] font-semibold" style={{ pointerEvents: "none" }}>Assessment</text>
            <text x="130" y="378" textAnchor="middle" className="fill-foreground text-[12px] font-semibold" style={{ pointerEvents: "none" }}>& Feedback</text>
          </motion.g>

          {/* Language Learning & CALL - right */}
          <motion.g
            onMouseEnter={() => setHoveredStrand("language-call")}
            onMouseLeave={() => setHoveredStrand(null)}
            onClick={() => onStrandChange("language-call")}
            className="cursor-pointer"
            animate={{ opacity: isHighlighted("language-call") ? 1 : 0.25 }}
            transition={{ duration: 0.3 }}
          >
            <circle cx="325" cy="310" r="130" fill="hsl(280, 50%, 55%)" fillOpacity={0.18} stroke="hsl(280, 50%, 55%)" strokeWidth={activeStrand === "language-call" ? 3 : 1.5} strokeOpacity={0.6} />
            <text x="370" y="360" textAnchor="middle" className="fill-foreground text-[12px] font-semibold" style={{ pointerEvents: "none" }}>Language</text>
            <text x="370" y="378" textAnchor="middle" className="fill-foreground text-[12px] font-semibold" style={{ pointerEvents: "none" }}>Learning & CALL</text>
          </motion.g>

          {/* Research Methodology - center bottom */}
          <motion.g
            onMouseEnter={() => setHoveredStrand("research-methodology")}
            onMouseLeave={() => setHoveredStrand(null)}
            onClick={() => onStrandChange("research-methodology")}
            className="cursor-pointer"
            animate={{ opacity: isHighlighted("research-methodology") ? 1 : 0.25 }}
            transition={{ duration: 0.3 }}
          >
            <circle cx="250" cy="260" r="80" fill="hsl(30, 65%, 50%)" fillOpacity={0.2} stroke="hsl(30, 65%, 50%)" strokeWidth={activeStrand === "research-methodology" ? 3 : 1.5} strokeOpacity={0.6} />
            <text x="250" y="255" textAnchor="middle" className="fill-foreground text-[11px] font-semibold" style={{ pointerEvents: "none" }}>Research</text>
            <text x="250" y="271" textAnchor="middle" className="fill-foreground text-[11px] font-semibold" style={{ pointerEvents: "none" }}>Methodology</text>
          </motion.g>

          {/* Connection dots at intersections */}
          {[
            [210, 230], [290, 230], [250, 330], [215, 290], [285, 290], [250, 200]
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r={4} className="fill-muted-foreground/30" />
          ))}
        </svg>
      </div>

      {/* Strand filter pills */}
      <div className="flex flex-wrap justify-center gap-2">
        <button
          onClick={() => onStrandChange("all")}
          className={cn(
            "px-4 py-1.5 rounded-full text-sm font-medium transition-all border",
            activeStrand === "all"
              ? "bg-foreground text-background border-foreground"
              : "bg-transparent text-muted-foreground border-border hover:border-foreground/40"
          )}
        >
          All
        </button>
        {(Object.keys(strandConfig) as Exclude<Strand, "all">[]).map((strand) => {
          const config = strandConfig[strand];
          return (
            <button
              key={strand}
              onClick={() => onStrandChange(strand)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium transition-all border",
                activeStrand === strand
                  ? "text-background border-transparent"
                  : "bg-transparent text-muted-foreground border-border hover:border-foreground/40"
              )}
              style={activeStrand === strand ? { backgroundColor: config.color, borderColor: config.color } : {}}
            >
              {config.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export { strandConfig };
export default ResearchStrandsVenn;
