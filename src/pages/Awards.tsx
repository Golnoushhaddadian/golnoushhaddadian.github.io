import { useDocumentHead } from '@/hooks/useDocumentHead';
import { motion } from 'framer-motion';

const awards = [
  { title: '$12,500 Fellowship Award (NSF & Google.org)', org: 'AI Institutes Virtual Organization (AIVO)' },
  { title: '$15,000 Doctoral Student Fellowship Award', org: 'Georgia State University' },
  { title: 'Outstanding Ph.D. Student in Learning Technologies', org: 'Georgia State University' },
  { title: 'Outstanding Contributions to Global Engagement and Global Citizenship', org: 'Georgia State University' },
  { title: "AIR's Quantitative Evidence Synthesis (QUEST) Fully-Funded Program", org: 'American Institutes for Research (AIR)' },
  { title: 'Outstanding Conference Paper Award', org: 'Society for Information Technology & Teacher Education & Association for the Advancement of Computing in Education (AACE)' },
  { title: 'Top 1% Nationwide, M.A. Entrance Exam', org: 'Sharif University of Technology' },
  { title: 'Nominated for International Education Award in International Initiatives', org: 'Georgia State University' },
  { title: 'Innovative and Supportive Teacher of Foreign Languages Award', org: 'Balan Language Academy' },
  { title: 'Outstanding Teacher of Foreign Languages Award', org: 'Aryana Fanavaran Institute of Technology' },
  { title: 'Distinguished Student Researcher Award', org: 'Young Researchers and Elite Club' },
];

const accentColors = [
  'hsl(200, 60%, 65%)',
  'hsl(340, 50%, 65%)',
  'hsl(160, 45%, 55%)',
  'hsl(270, 45%, 65%)',
  'hsl(30, 60%, 60%)',
];

const Awards = () => {
  useDocumentHead({
    title: 'Awards & Honors — Golnoush Haddadian',
    description: 'Academic awards, honors, and fellowships received by Golnoush Haddadian.',
    canonical: '/awards',
  });

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-8 sm:mb-10 text-center">
        Selected Awards
      </h1>

      <div className="divide-y divide-border/30">
        {awards.map((award, idx) => {
          const color = accentColors[idx % accentColors.length];
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.04, ease: [0.25, 0.1, 0.25, 1] }}
              className="group flex items-start gap-3 sm:gap-4 py-3.5 sm:py-4"
            >
              {/* Dot accent */}
              <div
                className="shrink-0 mt-[7px] w-2 h-2 rounded-full opacity-50 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300"
                style={{ backgroundColor: color }}
              />

              {/* Content */}
              <div className="min-w-0">
                <p className="text-xs sm:text-sm md:text-base font-semibold leading-snug text-foreground/90 group-hover:text-foreground transition-colors duration-300">
                  {award.title}
                </p>
                <p className="text-[11px] sm:text-xs text-muted-foreground/60 mt-0.5">
                  {award.org}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Awards;
