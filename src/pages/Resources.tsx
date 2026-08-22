
import React, { useState } from 'react';
import { useDocumentHead } from '@/hooks/useDocumentHead';
import { ExternalLink, Quote, Copy, Check, ArrowRight, ImageIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { motion } from 'framer-motion';

type Resource = {
  title: string;
  subtitle: string;
  description: string;
  link: string;
  citation: string;
  embedUrl?: string;
  image?: string;
  imageAttribution?: { text: string; url: string };
  disclaimer?: string;
  note?: string;
};

const resources: Resource[] = [
  {
    title: "Learning Theories Atlas",
    subtitle: "Interactive Concept Map",
    note: "This educational artifact was developed with AI assistance, a useful starting point for exploration, not a substitute for the original sources.",
    description:
      "A visual atlas of how learning has been theorized: six research philosophies, twelve major paradigms, and hundreds of theories, frameworks, and concepts, with connecting lines showing who influenced, agreed with, or challenged whom.",
    link: "https://golnoushhaddadian.github.io/learning-theories-atlas/",
    citation:
      "Haddadian, G. (2026). Learning Theories Atlas. Zenodo. https://doi.org/10.5281/zenodo.22052032",
    image: "/uploads/learning-theories-atlas-preview.png",
  },
  {
    title: "Argumentative Writing & Feedback Interactive Concept Map",
    subtitle: "",
    note: "This concept map was developed with AI assistance, a useful starting point for exploration, not a substitute for the original sources.",
    description:
      "An interactive concept map of argumentative writing and feedback in the age of AI, spanning six connected clusters from feedback sources to learning theories, philosophical stances, and the AI dimension, with each concept offering a definition, key references, and open debates.",
    link: "https://golnoushhaddadian.github.io/argumentative_writing_feedback_interactive_concept_map/",
    citation:
      "Haddadian, G. (2026). Argumentative Writing & Feedback: An Interactive Concept Map. Zenodo. https://doi.org/10.5281/zenodo.22036882",
    image: "/uploads/argumentative-writing-feedback-preview.png",
  },
  {
    title: "Hiring Lens: Research Statement",
    subtitle: "Faculty Application Lens Series",
    note: "This educational artifact was developed with AI assistance, a useful starting point for exploration, not a substitute for expert feedback and independent judgment.",
    description:
      "An interactive rubric for evaluating research statements for tenure-track R1 jobs across seven weighted dimensions, from research identity and funding potential to departmental fit and path to tenure, scored criterion by criterion into an exportable report meant as feedback for revision, not a prediction.",
    link: "https://golnoushhaddadian.github.io/lens-series-research-statement/",
    citation:
      "Haddadian, G. (2026). LENS Series, Research Statement. Zenodo. https://doi.org/10.5281/zenodo.22051000",
    image: "/uploads/rubric-preview.png",
  },

  {
    title: "The Learning Theory Map",
    subtitle: "Made via Whimsical",
    description:
      "A concise reference guide to major learning theories, developed by my colleague Morgan Vickery for her undergraduate course Learning Theories for Teachers. The resource is designed to provide students with a clear and accessible first introduction to key theoretical perspectives on learning.",
    link: "https://whimsical.com/s25-theory-map-dy5XNBK5mVWkAFXygFvUA",
    citation:
      "Vickery, M. (2025). The learning theory map [Interactive concept map]. Whimsical. https://whimsical.com/s25-theory-map-dy5XNBK5mVWkAFXygFvUA",
    embedUrl: "https://whimsical.com/embed/dy5XNBK5mVWkAFXygFvUA",
  },
  {
    title: "Learning Sciences: What I Wish I Knew",
    subtitle: "Living Document",
    description:
      "A practical guide grounded in research that introduces key theories, frameworks, and influential scholars in the learning sciences—well suited for newcomers seeking foundational concepts, major citations, and methodological overviews in education research.",
    link: "https://docs.google.com/document/d/1FJQ4H9y1M8vuPmn6oCDm8T_fZRFQplm4Lmce-2ZlhOM",
    citation:
      "Vickery, M. (2019–present). Things I wish I knew about the learning sciences [Living document].",
    image: "/uploads/things-i-wish-i-knew-preview.png",
  },
  {
    title: "Interactive Literature Database for JLS",
    subtitle: "Web Application",
    description:
      "An interactive repository of JLS publications identified through a systematic review, with search and filtering options by research method, theoretical perspective, pedagogical approach, construct, context, technology, content domain, and population.",
    link: "https://morganavickery.github.io/JLS-interactive-database/",
    citation:
      "Vickery, M. (2025). Journal of the Learning Sciences: Interactive literature database [Web application]. https://morganavickery.github.io/JLS-interactive-database/",
    image: "/uploads/jls-database-preview.png",
  },
  {
    title: "Publication Venue Guide",
    subtitle: "Notion Board",
    description:
      "Having difficulty identifying an appropriate journal for a manuscript? This resource provides a searchable, tagged database (Notion board) of publication outlets relevant to education researchers, particularly those in the learning sciences.",
    link: "https://publication-guide.notion.site/",
    citation:
      "Vickery, M. (2025). Publication venue guide [Web application]. https://publication-guide.notion.site/",
    image: "/uploads/publication-venue-guide-preview.png",
  },
  {
    title: "Academic Website Template",
    subtitle: "GitHub Pages Template",
    description:
      "Looking to create an academic website but unsure where to start? This template provides a free, simple, and easily editable option designed specifically for scholars seeking a low-maintenance web presence.",
    link: "https://github.com/morganavickery/academic-website-template",
    citation:
      "Vickery, M. (n.d.). Academic website template [GitHub Pages template]. GitHub. https://github.com/morganavickery/academic-website-template",
    image: "/uploads/academic-website-template.jpg",
    imageAttribution: { text: "Image Attribution", url: "https://www.freepik.com/free-photo/3d-rendering-website-hosting-concept_28645200.htm" },
  }
];

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="shrink-0 p-1 rounded hover:bg-muted transition-colors"
      aria-label="Copy citation"
    >
      {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} className="text-muted-foreground" />}
    </button>
  );
};

const citeClass =
  "inline-flex items-center gap-1 text-[hsl(175,50%,40%)] hover:text-[hsl(175,50%,30%)] underline underline-offset-2 decoration-[hsl(175,50%,40%)]/40 text-xs sm:text-sm transition-colors";

const Resources = () => {
  useDocumentHead({
    title: 'Open Resources — Golnoush Haddadian',
    description: 'A curated collection of open-access educational resources shared by Golnoush Haddadian.',
    canonical: '/resources',
  });

  return (
    <section className="space-y-6 sm:space-y-8">
      <div className="text-center mb-8 sm:mb-12 px-2">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">Open-Access Resources</h1>
        <p className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-5xl mx-auto leading-relaxed">
          This page presents a curated collection of resources valuable for teaching, learning, and research. Please ensure that the original sources are properly cited if these materials are used.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {resources.map((resource, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.07 }}
            className="group relative flex flex-col justify-between rounded-xl border bg-card p-5 sm:p-6 hover:shadow-md hover:border-primary/30 transition-all duration-300"
          >
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h2 className="text-base sm:text-lg font-semibold text-primary group-hover:underline underline-offset-2">
                  {resource.title}
                </h2>
              </div>
              {(resource.subtitle || resource.disclaimer) && (
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  {resource.subtitle && (
                    <p className="text-xs text-muted-foreground">{resource.subtitle}</p>
                  )}
                  {resource.disclaimer && (
                    <span className="text-[11px] italic text-muted-foreground/70">
                      — {resource.disclaimer}
                    </span>
                  )}
                </div>
              )}
              {resource.note && (
                <p className="text-[11px] italic text-muted-foreground/60 mb-3">
                  {resource.note}
                </p>
              )}
              {resource.image && (
                <div className="mb-3 rounded-lg overflow-hidden border border-border/50 aspect-video">
                  <img
                    src={resource.image}
                    alt={resource.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              )}
              {!resource.image && resource.embedUrl && (
                <div className="mb-3 rounded-lg overflow-hidden border border-border/50 aspect-video">
                  <iframe
                    src={resource.embedUrl}
                    title={resource.title}
                    className="w-full h-full"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              )}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {resource.description}
              </p>
            </div>

            <div className="flex items-center justify-between mt-5 pt-4 border-t border-border/50 flex-wrap gap-2">
              {resource.imageAttribution && (
                <a
                  href={resource.imageAttribution.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={citeClass}
                >
                  <ImageIcon size={13} />
                  {resource.imageAttribution.text}
                </a>
              )}
              <Popover>
                <PopoverTrigger asChild>
                  <button className={citeClass}>
                    <Quote size={13} />
                    Cite
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-[min(24rem,calc(100vw-2rem))] text-xs sm:text-sm leading-relaxed text-muted-foreground border-primary/20"
                  side="top"
                  align="start"
                >
                  <div className="flex items-start gap-2">
                    <p className="flex-1 select-all">{resource.citation}</p>
                    <CopyButton text={resource.citation} />
                  </div>
                </PopoverContent>
              </Popover>

              <a
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all duration-200"
              >
                Visit <ArrowRight size={15} />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Resources;
