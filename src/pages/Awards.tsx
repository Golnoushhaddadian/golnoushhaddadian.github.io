import { useDocumentHead } from '@/hooks/useDocumentHead';
import { motion } from 'framer-motion';

type AwardItem = {
  title: string;
  org: string;
  year: number | number[];
  detail?: string;
  category: string;
};

const awards: AwardItem[] = [
  // Fellowships & Grants
  {
    category: 'Fellowship',
    title: 'AI4ED Summer Fellowship ($12,500)',
    org: 'AI Institutes Virtual Organization (AIVO), funded by NSF & Google.org',
    year: 2025,
    detail: 'Awarded to selected graduate researchers representing five major AI in Education Institutes across the U.S.',
  },
  {
    category: 'Fellowship',
    title: 'Doctoral Student Fellowship ($15,000)',
    org: 'College of Education & Human Development, Georgia State University',
    year: 2023,
    detail: 'Given to three PhD students who demonstrate exceptional scholarship and academic potential in Learning Technologies.',
  },
  {
    category: 'Fellowship',
    title: "AIR's Quantitative Evidence Synthesis (QUEST) Program",
    org: 'American Institutes for Research (AIR)',
    year: 2024,
    detail: 'Fully-funded program for advanced quantitative research methods.',
  },
  // Academic Excellence
  {
    category: 'Academic Excellence',
    title: 'Outstanding Dissertation in Learning Technologies',
    org: 'Department of Learning Sciences, College of Education & Human Development, Georgia State University',
    year: 2026,
  },
  {
    category: 'Academic Excellence',
    title: 'Outstanding Ph.D. Student in Learning Technologies',
    org: 'College of Education & Human Development, Georgia State University',
    year: 2025,
    detail: 'Awarded for demonstrated potential for excellence in research, teaching, and service.',
  },
  {
    category: 'Academic Excellence',
    title: 'Outstanding Contributions to Global Engagement and Global Citizenship',
    org: 'Georgia State University',
    year: 2025,
    detail: 'Nominated for the 2025 International Education Award in International Initiatives.',
  },
  {
    category: 'Academic Excellence',
    title: 'Top 1% Nationwide — M.A. Entrance Exam',
    org: 'Sharif University of Technology',
    year: 2012,
  },
  {
    category: 'Academic Excellence',
    title: 'Admitted as Exceptionally Talented Student',
    org: 'Sharif University of Technology, supported by the National Organization for Development of Exceptional Talents',
    year: 2012,
  },
  {
    category: 'Academic Excellence',
    title: 'Honored Student — All Three Degrees',
    org: 'B.A. (3.71/4.00), M.A. (4.00/4.00), Ph.D. (4.14/4.00)',
    year: [2012, 2014, 2025],
  },
  // Research Awards
  {
    category: 'Research Award',
    title: 'Outstanding Conference Paper Award',
    org: 'SITE & Association for the Advancement of Computing in Education (AACE)',
    year: 2024,
    detail: 'Distinguished for exceptional quality, originality, and significant scholarly contribution.',
  },
  {
    category: 'Research Award',
    title: 'Distinguished Student Researcher Award',
    org: 'Young Researchers and Elite Club',
    year: 2006,
  },
  {
    category: 'Research Award',
    title: 'Outstanding Student Researcher Award',
    org: 'Shahid Shamloo High School',
    year: 2005,
  },
  // Teaching Awards
  {
    category: 'Teaching Award',
    title: 'Innovative and Supportive Teacher of Foreign Languages',
    org: 'Balan Language Academy',
    year: 2013,
  },
  {
    category: 'Teaching Award',
    title: 'Outstanding Teacher of Foreign Languages',
    org: 'Aryana Fanavaran Institute of Technology',
    year: 2010,
  },
];

const sortYear = (year: number | number[]) =>
  Array.isArray(year) ? Math.max(...year) : year;

const groupByYear = (items: AwardItem[]) => {
  const grouped: Record<number, AwardItem[]> = {};
  items.forEach((item) => {
    const y = sortYear(item.year);
    if (!grouped[y]) grouped[y] = [];
    grouped[y].push(item);
  });
  return Object.entries(grouped)
    .sort(([a], [b]) => Number(b) - Number(a))
    .map(([year, items]) => ({ year: Number(year), items }));
};

const Awards = () => {
  useDocumentHead({
    title: 'Awards & Honors — Golnoush Haddadian',
    description: 'Academic awards, honors, and fellowships received by Golnoush Haddadian.',
    canonical: '/awards',
  });

  const grouped = groupByYear(awards);

  const yearColors = [
    'text-[hsl(200,60%,65%)]',   // soft blue
    'text-[hsl(340,50%,65%)]',   // soft rose
    'text-[hsl(160,45%,55%)]',   // soft teal
    'text-[hsl(270,45%,65%)]',   // soft lavender
    'text-[hsl(30,60%,60%)]',    // soft amber
  ];
  const lineColors = [
    'from-[hsl(200,60%,65%)]/30',
    'from-[hsl(340,50%,65%)]/30',
    'from-[hsl(160,45%,55%)]/30',
    'from-[hsl(270,45%,65%)]/30',
    'from-[hsl(30,60%,60%)]/30',
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-center">
        Awards &amp; Honors
      </h1>

      <section className="mb-12">
        {grouped.map(({ year, items }, groupIdx) => {
          const colorClass = yearColors[groupIdx % yearColors.length];
          const lineClass = lineColors[groupIdx % lineColors.length];

          return (
            <div key={year} className="mb-8 last:mb-0">
              <div className="flex items-center gap-4 mb-2">
                <h3 className={`text-3xl sm:text-4xl font-black tracking-tighter select-none ${colorClass}`}>
                  {year}
                </h3>
                <div className={`flex-1 h-px bg-gradient-to-r ${lineClass} to-transparent`} />
              </div>

              <div>
                {items.map((award, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: idx * 0.04 }}
                    className="group py-2.5 sm:py-3 border-b border-border/20 last:border-b-0"
                  >
                    <div className="flex items-baseline justify-between gap-3 sm:gap-4">
                      <p className="text-sm sm:text-base font-semibold leading-snug text-foreground/90 group-hover:text-foreground transition-colors duration-200">
                        {award.title}
                      </p>
                      <span className="shrink-0 text-[10px] sm:text-xs font-medium uppercase tracking-wider text-muted-foreground/45 pt-1">
                        {award.category}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground/70 leading-snug mt-1">
                      {award.org}
                      {award.detail && (
                        <span className="text-muted-foreground/50"> · {award.detail}</span>
                      )}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default Awards;
