
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
};

const resources: Resource[] = [
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
    title: "Interactive Literature Database for JLS",
    subtitle: "Web Application",
    description:
      "An interactive repository of JLS publications identified through a systematic review, with search and filtering options by research method, theoretical perspective, pedagogical approach, construct, context, technology, content domain, and population.",
    link: "https://morganavickery.github.io/JLS-interactive-database/",
    citation:
      "Vickery, M. (2025). Journal of the Learning Sciences: Interactive literature database [Web application]. https://morganavickery.github.io/JLS-interactive-database/",
  },
  {
    title: "Publication Venue Guide",
    subtitle: "Notion Board",
    description:
      "Having difficulty identifying an appropriate journal for a manuscript? This resource provides a searchable, tagged database (Notion board) of publication outlets relevant to education researchers, particularly those in the learning sciences.",
    link: "https://publication-guide.notion.site/",
    citation:
      "Vickery, M. (2025). Publication venue guide [Web application]. https://publication-guide.notion.site/",
    image: "/lovable-uploads/publication-venue-guide-preview.png",
  },
  {
    title: "Academic Website Template",
    subtitle: "GitHub Pages Template",
    description:
      "Looking to create an academic website but unsure where to start? This template provides a free, simple, and easily editable option designed specifically for scholars seeking a low-maintenance web presence.",
    link: "https://github.com/morganavickery/academic-website-template",
    citation:
      "Vickery, M. (n.d.). Academic website template [GitHub Pages template]. GitHub. https://github.com/morganavickery/academic-website-template",
    image: "/lovable-uploads/academic-website-template.jpg",
    imageAttribution: { text: "Image Attribution", url: "https://www.freepik.com/free-photo/3d-rendering-website-hosting-concept_28645200.htm" },
  },
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
      <div className="text-center space-y-2">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Open-Access Resources</h1>
        <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
          A curated collection of resources I have found valuable for teaching, learning, and research. I share them here in hopes they may be useful to others.
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
              <h2 className="text-base sm:text-lg font-semibold text-primary mb-1 group-hover:underline underline-offset-2">
                {resource.title}
              </h2>
              <p className="text-xs text-muted-foreground mb-3">{resource.subtitle}</p>
              {resource.embedUrl && (
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
              {resource.image && !resource.embedUrl && (
                <div className="mb-3 rounded-lg overflow-hidden border border-border/50 aspect-video">
                  <img
                    src={resource.image}
                    alt={resource.title}
                    className="w-full h-full object-cover"
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
