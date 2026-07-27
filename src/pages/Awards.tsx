import { useDocumentHead } from '@/hooks/useDocumentHead';
import { motion } from 'framer-motion';

type AwardItem = {
  year: string;
  title: string;
  amount?: string;
  org: string;
  desc?: string;
};

type AwardGroup = {
  label: string;
  items: AwardItem[];
};

const groups: AwardGroup[] = [
  {
    label: 'Fellowships & Grants',
    items: [
      {
        year: '2025',
        amount: '$12,500',
        title: 'Fellowship Award (National Science Foundation & Google.org)',
        org: 'AI Institutes Virtual Organization (AIVO)',
        desc: 'Awarded to selected graduate researchers representing five major AI in Education Institutes across the United States.',
      },
      {
        year: '2024',
        title: 'Quantitative Evidence Synthesis (QUEST) Fully-Funded Program',
        org: 'American Institutes for Research (AIR)',
        desc: 'Fully funded program in advanced quantitative research methods.',
      },
      {
        year: '2023',
        amount: '$15,000',
        title: 'Doctoral Student Fellowship Award',
        org: 'Georgia State University',
        desc: 'Awarded to three PhD students demonstrating exceptional scholarship and academic potential in Learning Technologies.',
      },
    ],
  },
  {
    label: 'Academic Excellence',
    items: [
      {
        year: '2026',
        title: 'Outstanding Dissertation in Learning Technologies',
        org: 'Georgia State University',
      },
      {
        year: '2025',
        title: 'Outstanding PhD Student in Learning Technologies',
        org: 'Georgia State University',
        desc: 'Recognized for demonstrated potential for excellence in research, teaching, and service.',
      },
      {
        year: '2025',
        title: 'Outstanding Contributions to Global Engagement and Global Citizenship',
        org: 'Georgia State University',
      },
      {
        year: '2025',
        title: 'International Education Award in International Initiatives (Nominee)',
        org: 'Georgia State University',
      },
      {
        year: '',
        title: 'Ranked 11th of ~20,000',
        org: 'National University Entrance Exam in Linguistics',
      },
    ],
  },
  {
    label: 'Research Awards',
    items: [
      {
        year: '2024',
        title: 'Outstanding Conference Paper Award',
        org: 'Society for Information Technology & Teacher Education & Association for the Advancement of Computing in Education (AACE)',
        desc: 'Distinguished for exceptional quality, originality, and significant scholarly contribution.',
      },
      {
        year: '2006',
        title: 'Distinguished Student Researcher',
        org: 'Young Researchers and Elite Club',
      },
    ],
  },
  {
    label: 'Teaching Awards',
    items: [
      {
        year: '2013',
        title: 'Innovative and Supportive Teacher of Foreign Languages',
        org: 'Balan Language Academy',
      },
      {
        year: '2010',
        title: 'Outstanding Teacher of Foreign Languages',
        org: 'Aryana Fanavaran Institute of Technology',
      },
    ],
  },
];

const ease = [0.22, 0.8, 0.36, 1] as const;

const AwardRow = ({ item, delay }: { item: AwardItem; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay, ease }}
    className="group relative grid grid-cols-[52px_1fr] sm:grid-cols-[66px_1fr] gap-3 sm:gap-[22px] pl-[18px] py-[13px]"
  >
    <span
      aria-hidden="true"
      className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full bg-gradient-to-b from-blue-500 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
    />
    <div className="text-[15.5px] font-bold text-blue-400 sm:text-muted-foreground sm:group-hover:text-blue-400 tabular-nums pt-0.5 tracking-tight transition-colors duration-200">
      {item.year}
    </div>
    <div className="min-w-0">
      <div className="text-[17px] sm:text-[18.5px] font-bold leading-tight tracking-[-0.02em] text-foreground">
        {item.amount && (
          <span className="mr-2.5 inline-block align-middle font-mono text-[13.5px] sm:text-[14.5px] font-extrabold text-white bg-blue-600 px-3 py-[3px] rounded-full tracking-tight shadow-[0_2px_8px_rgba(37,99,235,0.45)]">
            {item.amount}
          </span>
        )}
        {item.title}
      </div>
      <div className="text-[13.5px] sm:text-[14.5px] text-foreground/70 font-medium mt-1 leading-snug">
        {item.org}
      </div>
      {item.desc && (
        <div className="text-[12.5px] sm:text-[13.5px] text-muted-foreground mt-1.5 leading-relaxed max-w-[78ch]">
          {item.desc}
        </div>
      )}
    </div>
  </motion.div>
);

const Awards = () => {
  useDocumentHead({
    title: 'Awards & Honors — Golnoush Haddadian',
    description:
      'Awards, honors, and fellowships received by Golnoush Haddadian across learning sciences and education.',
    canonical: '/awards',
  });

  const totalHonors = groups.reduce((sum, g) => sum + g.items.length, 0);

  return (
    <div className="max-w-5xl mx-auto">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto pt-1 sm:pt-3">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease }}
          className="text-[clamp(30px,5.6vw,46px)] font-extrabold tracking-[-0.03em] leading-[1.04] text-foreground"
        >
          Awards &amp; Honors
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease }}
          className="w-11 h-[3px] mx-auto mt-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-400"
        />
      </div>

      {/* Stat strip */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.16, ease }}
        className="grid grid-cols-3 divide-x divide-border max-w-[560px] mx-auto mt-7 sm:mt-9"
      >
        {[
          { num: String(totalHonors), lbl: 'Honors', accent: false },
          { num: '$27.5K+', lbl: 'Funding', accent: true },
          { num: String(groups.length), lbl: 'Categories', accent: false },
        ].map((s) => (
          <div key={s.lbl} className="text-center px-3 py-1">
            <div
              className={`text-[clamp(24px,4vw,32px)] font-extrabold tracking-[-0.02em] tabular-nums ${
                s.accent ? 'text-blue-400' : 'text-foreground'
              }`}
            >
              {s.num}
            </div>
            <div className="mt-1 text-[10.5px] font-semibold tracking-[0.14em] uppercase text-muted-foreground">
              {s.lbl}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Groups */}
      <div className="mt-10 sm:mt-12">
        {groups.map((group) => (
          <section key={group.label} className="mt-8 sm:mt-9 first:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
              className="flex items-baseline gap-3 mb-1.5"
            >
              <h2 className="text-[19px] sm:text-[21px] font-bold tracking-[-0.01em] text-foreground">
                {group.label}
              </h2>
              <span className="flex items-center text-[13px] font-semibold text-muted-foreground tabular-nums">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-400 mr-2" />
                {group.items.length}
              </span>
            </motion.div>
            <div className="divide-y divide-border/60">
              {group.items.map((item, idx) => (
                <AwardRow key={idx} item={item} delay={Math.min(idx * 0.05, 0.3)} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Awards;
