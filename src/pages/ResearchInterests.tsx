
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDocumentHead } from "@/hooks/useDocumentHead";
import ResearchStrandsVenn, { type Strand, strandConfig } from "@/components/research/ResearchStrandsVenn";
import { matchesStrand, getStrands } from "@/data/strandMappings";
import {
  journalPublications,
  conferenceProceedings,
  nonRefereedPublications,
  workUnderReview,
  workInProgress,
} from "@/data/researchData";

type PublicationItem = {
  authors: string[];
  year: string;
  title: string;
  venue: string;
  type: "journal" | "conference" | "non-refereed" | "under-review" | "in-progress";
  url?: string;
  keywords?: string[];
};

const ResearchInterests = () => {
  useDocumentHead({
    title: "Research Interests — Golnoush Haddadian",
    description:
      "Research interests of Golnoush Haddadian spanning educational technology, AI in education, assessment, and language learning.",
    canonical: "/research-interests",
  });

  const [activeStrand, setActiveStrand] = useState<Strand>("all");
  const [activeType, setActiveType] = useState<string>("all");

  // Combine all publications into a flat list
  const allPublications: PublicationItem[] = [
    ...journalPublications.map((p) => ({
      authors: p.authors,
      year: p.year,
      title: p.title,
      venue: p.journal,
      type: "journal" as const,
      url: p.url,
      keywords: p.keywords,
    })),
    ...conferenceProceedings.map((p) => ({
      authors: p.authors,
      year: p.year,
      title: p.title,
      venue: p.conference,
      type: "conference" as const,
      url: p.url,
      keywords: p.keywords,
    })),
    ...nonRefereedPublications.map((p) => ({
      authors: p.authors,
      year: p.year,
      title: p.title,
      venue: p.journal,
      type: "non-refereed" as const,
      url: p.url,
      keywords: p.keywords,
    })),
    ...workUnderReview.map((p) => ({
      authors: p.authors,
      year: p.year,
      title: p.title,
      venue: p.journal || "",
      type: "under-review" as const,
      keywords: p.keywords,
    })),
    ...workInProgress.map((p) => ({
      authors: p.authors,
      year: p.year || "",
      title: p.title,
      venue: p.type,
      type: "in-progress" as const,
      keywords: p.keywords,
    })),
  ];

  const typeFilters = [
    { key: "all", label: "All" },
    { key: "journal", label: "Journals" },
    { key: "conference", label: "Conferences" },
    { key: "under-review", label: "Under Review" },
    { key: "in-progress", label: "In Progress" },
  ];

  const filtered = allPublications.filter((p) => {
    const strandMatch = matchesStrand(p.title, activeStrand);
    const typeMatch = activeType === "all" || p.type === activeType;
    return strandMatch && typeMatch;
  });

  const typeLabel: Record<string, string> = {
    journal: "Journal",
    conference: "Conference",
    "non-refereed": "Non-Refereed",
    "under-review": "Under Review",
    "in-progress": "In Progress",
  };

  const strandBadgeColor = (title: string) => {
    const strands = getStrands(title);
    if (strands.length === 0) return undefined;
    return strandConfig[strands[0]]?.color;
  };

  return (
    <div className="container max-w-6xl mx-auto py-8 px-4">
      <div className="text-center mb-10">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
          Research Strands
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          My research moves across four interconnected strands. Click on each
          area to filter related publications.
        </p>
      </div>

      {/* Venn Diagram */}
      <ResearchStrandsVenn
        activeStrand={activeStrand}
        onStrandChange={setActiveStrand}
      />

      {/* Type filter tabs */}
      <div className="flex flex-wrap justify-center gap-2 mt-10 mb-6">
        {typeFilters.map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveType(f.key)}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-all border ${
              activeType === f.key
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-transparent text-muted-foreground border-border hover:border-foreground/40"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-center text-sm text-muted-foreground mb-6">
        Showing {filtered.length} publication{filtered.length !== 1 ? "s" : ""}
        {activeStrand !== "all" && (
          <span>
            {" "}
            in{" "}
            <span
              className="font-medium"
              style={{ color: strandConfig[activeStrand as Exclude<Strand, "all">]?.color }}
            >
              {strandConfig[activeStrand as Exclude<Strand, "all">]?.label}
            </span>
          </span>
        )}
      </p>

      {/* Publications list */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((pub, index) => (
            <motion.div
              key={pub.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2, delay: index * 0.03 }}
              layout
            >
              <Card className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <Badge variant="secondary" className="text-[10px] uppercase tracking-wider">
                      {typeLabel[pub.type]}
                    </Badge>
                    {getStrands(pub.title).map((s) => (
                      <span
                        key={s}
                        className="inline-block w-2 h-2 rounded-full"
                        style={{ backgroundColor: strandConfig[s]?.color }}
                        title={strandConfig[s]?.label}
                      />
                    ))}
                    {pub.year && (
                      <span className="text-xs text-muted-foreground ml-auto">
                        {pub.year}
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold mb-1.5 leading-snug">
                    {pub.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-1">
                    {pub.authors.join(", ")}
                  </p>
                  <CardDescription className="text-xs text-muted-foreground">
                    {pub.venue}
                  </CardDescription>
                </CardContent>
                {pub.url && (
                  <CardFooter className="bg-muted/50 px-5 py-2">
                    <Button variant="outline" size="sm" className="ml-auto gap-1 text-xs" asChild>
                      <a href={pub.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3" />
                        View
                      </a>
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-12">
            No publications match the current filters.
          </p>
        )}
      </div>
    </div>
  );
};

export default ResearchInterests;
