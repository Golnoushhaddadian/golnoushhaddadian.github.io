
import React, { useState } from 'react';
import { useDocumentHead } from '@/hooks/useDocumentHead';
import { ExternalLink, Quote, Copy, Check } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { motion } from 'framer-motion';

type Resource = {
  title: string;
  description: string;
  link: string;
  citation: string;
};

const resources: Resource[] = [
  {
    title: "The Learning Theory Map",
    description:
      "A concise reference guide to major learning theories, developed by my colleague Morgan Vickery for her undergraduate course Learning Theories for Teachers. The resource is designed to provide students with a clear and accessible first introduction to key theoretical perspectives on learning.",
    link: "https://whimsical.com/s25-theory-map-dy5XNBK5mVWkAFXygFvUA",
    citation:
      "Vickery, M. (2025). The learning theory map [Interactive concept map]. Whimsical. https://whimsical.com/s25-theory-map-dy5XNBK5mVWkAFXygFvUA",
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

const linkClass =
  "inline-flex items-center gap-1 text-[hsl(175,50%,40%)] hover:text-[hsl(175,50%,30%)] underline underline-offset-2 decoration-[hsl(175,50%,40%)]/40 text-xs sm:text-sm transition-colors";

const Resources = () => {
  useDocumentHead({
    title: 'Open Resources — Golnoush Haddadian',
    description: 'A curated collection of open-access educational resources shared by Golnoush Haddadian.',
    canonical: '/resources',
  });

  return (
    <section className="space-y-6 sm:space-y-8">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center">Open Resources</h1>

      <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto text-center">
        A curated collection of resources I have found valuable for teaching, learning, and research. I share them here in hopes they may be useful to others.
      </p>

      <div className="space-y-4 max-w-3xl mx-auto">
        {resources.map((resource, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.08 }}
            className="relative border rounded-lg p-5 sm:p-6 bg-card"
          >
            <h2 className="text-base sm:text-lg font-semibold mb-2">{resource.title}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {resource.description}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                <ExternalLink size={13} />
                Visit Resource
              </a>
              <Popover>
                <PopoverTrigger asChild>
                  <button className={linkClass}>
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
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Resources;
