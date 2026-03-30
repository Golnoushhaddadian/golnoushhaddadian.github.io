
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDocumentHead } from "@/hooks/useDocumentHead";
import ResearchStrandsVenn, { type Strand, type PubType, type RadarDot, strandConfig, radarDots } from "@/components/research/ResearchStrandsVenn";
import { cn } from "@/lib/utils";

const ResearchInterests = () => {
  useDocumentHead({
    title: "Research Strands — Golnoush Haddadian",
    description:
      "Research strands of Golnoush Haddadian spanning AI in education, assessment & feedback, language learning, and research methodology.",
    canonical: "/research-interests",
  });

  const [activeStrand, setActiveStrand] = useState<Strand>("all");
  const [activeType, setActiveType] = useState<PubType>("all");
  const [selectedDot, setSelectedDot] = useState<RadarDot | null>(null);

  const strandFilters: { key: PubType; label: string }[] = [
    { key: "all", label: "All" },
    { key: "journal", label: "Publications" },
    { key: "conference", label: "Conferences" },
    { key: "in-progress", label: "In Progress" },
  ];

  const typeLabels: Record<string, string> = {
    journal: "Journal",
    conference: "Conference",
    "under-review": "Under Review",
    "in-progress": "In Progress",
  };

  return (
    <div className="container max-w-5xl mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 tracking-tight">Research Strands</h1>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          My work moves across four interconnected strands. Hover over each area to see how they relate:
        </p>
      </div>

      {/* Type filter buttons */}
      <div className="flex justify-center gap-2 mb-6 flex-wrap">
        {strandFilters.map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveType(f.key)}
            className={cn(
              "px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all border",
              activeType === f.key
                ? "bg-foreground text-background border-foreground"
                : "bg-transparent text-muted-foreground border-border hover:border-foreground/40"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Venn Radar Diagram */}
      <ResearchStrandsVenn
        activeStrand={activeStrand}
        activeType={activeType}
        onStrandChange={setActiveStrand}
        onDotClick={setSelectedDot}
      />

      {/* Modal for clicked dot */}
      <AnimatePresence>
        {selectedDot && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setSelectedDot(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-card border rounded-xl shadow-xl max-w-lg w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedDot(null)}
                className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-2 mb-3">
                <Badge
                  variant="secondary"
                  className="text-[10px] uppercase tracking-wider"
                  style={{ backgroundColor: strandConfig[selectedDot.strand].color + "20", color: strandConfig[selectedDot.strand].color }}
                >
                  {typeLabels[selectedDot.type]}
                </Badge>
                <span
                  className="text-xs font-medium"
                  style={{ color: strandConfig[selectedDot.strand].color }}
                >
                  {strandConfig[selectedDot.strand].label}
                </span>
                {selectedDot.year && (
                  <span className="text-xs text-muted-foreground ml-auto">{selectedDot.year}</span>
                )}
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-2 leading-snug">{selectedDot.title}</h3>
              <p className="text-sm text-muted-foreground mb-1">{selectedDot.authors}</p>
              <p className="text-xs text-muted-foreground italic">{selectedDot.venue}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResearchInterests;
