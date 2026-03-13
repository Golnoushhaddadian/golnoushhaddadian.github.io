import { useDocumentHead } from '@/hooks/useDocumentHead';
import { motion } from 'framer-motion';
import { Award, GraduationCap, Trophy, Star } from 'lucide-react';

type AwardItem = {
  title: string;
  org: string;
  year: string;
  detail?: string;
};

type AwardCategory = {
  label: string;
  icon: React.ReactNode;
  items: AwardItem[];
};

const categories: AwardCategory[] = [
  {
    label: 'Fellowships & Grants',
    icon: <Star className="w-4 h-4" />,
    items: [
      {
        title: 'AI4ED Summer Fellowship ($12,500)',
        org: 'AI Institutes Virtual Organization (AIVO), funded by NSF & Google.org',
        year: '2025',
        detail: 'Awarded to selected graduate researchers representing five major AI in Education Institutes across the U.S.',
      },
      {
        title: 'Doctoral Student Fellowship ($15,000)',
        org: 'College of Education & Human Development, Georgia State University',
        year: '2023',
        detail: 'Given to three PhD students who demonstrate exceptional scholarship and academic potential in Learning Technologies.',
      },
      {
        title: "AIR's Quantitative Evidence Synthesis (QUEST) Program",
        org: 'American Institutes for Research (AIR)',
        year: '2024',
        detail: 'Fully-funded program for advanced quantitative research methods.',
      },
    ],
  },
  {
    label: 'Academic Excellence',
    icon: <GraduationCap className="w-4 h-4" />,
    items: [
      {
        title: 'Outstanding Ph.D. Student in Learning Technologies',
        org: 'College of Education & Human Development, Georgia State University',
        year: '2025',
        detail: 'Awarded for demonstrated potential for excellence in research, teaching, and service.',
      },
      {
        title: 'Top 1% Nationwide — M.A. Entrance Exam',
        org: 'Sharif University of Technology',
        year: '2012',
      },
      {
        title: 'Ranked 1st in GPA',
        org: "Bachelor's (2012) and Master's (2014) degrees",
        year: '2012–2014',
      },
      {
        title: 'Nominated for International Education Award',
        org: 'Georgia State University — International Initiatives',
        year: '2024',
      },
    ],
  },
  {
    label: 'Research Awards',
    icon: <Trophy className="w-4 h-4" />,
    items: [
      {
        title: 'Outstanding Conference Paper Award',
        org: 'SITE & Association for the Advancement of Computing in Education (AACE)',
        year: '2024',
        detail: 'Distinguished for exceptional quality, originality, and significant scholarly contribution.',
      },
      {
        title: 'Distinguished Student Researcher Award',
        org: 'Young Researchers and Elite Club',
        year: '2006',
      },
    ],
  },
  {
    label: 'Teaching Awards',
    icon: <Award className="w-4 h-4" />,
    items: [
      {
        title: 'Innovative and Supportive Teacher of Foreign Languages',
        org: 'Balan Language Academy',
        year: '2013',
      },
      {
        title: 'Outstanding Teacher of Foreign Languages',
        org: 'Aryana Fanavaran Institute of Technology',
        year: '2010',
      },
    ],
  },
];

const Awards = () => {
  useDocumentHead({
    title: 'Awards & Honors — Golnoush Haddadian',
    description: 'Academic awards, honors, and fellowships received by Golnoush Haddadian.',
    canonical: '/awards',
  });

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-10 sm:mb-14 text-center">
        Awards &amp; Honors
      </h1>

      <div className="space-y-10 sm:space-y-14">
        {categories.map((cat, catIdx) => (
          <motion.section
            key={cat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: catIdx * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Category header */}
            <div className="flex items-center gap-2.5 mb-5">
              <span className="text-primary/70">{cat.icon}</span>
              <h2 className="text-sm sm:text-base font-semibold uppercase tracking-wider text-foreground/70">
                {cat.label}
              </h2>
              <div className="flex-1 h-px bg-border/50" />
            </div>

            {/* Items */}
            <div className="space-y-1">
              {cat.items.map((award, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: catIdx * 0.1 + idx * 0.04 }}
                  className="group relative grid grid-cols-[auto_1fr] gap-x-4 py-3 sm:py-4 border-b border-border/20 last:border-b-0"
                >
                  {/* Year */}
                  <span className="text-xs sm:text-sm font-medium text-muted-foreground/60 pt-0.5 min-w-[4.5rem] text-right tabular-nums">
                    {award.year}
                  </span>

                  {/* Content */}
                  <div className="min-w-0">
                    <p className="text-sm sm:text-base font-semibold leading-snug text-foreground/90 group-hover:text-foreground transition-colors duration-200">
                      {award.title}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground/60 mt-0.5">
                      {award.org}
                    </p>
                    {award.detail && (
                      <p className="text-xs text-muted-foreground/45 mt-1.5 leading-relaxed">
                        {award.detail}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        ))}
      </div>
    </div>
  );
};

export default Awards;
