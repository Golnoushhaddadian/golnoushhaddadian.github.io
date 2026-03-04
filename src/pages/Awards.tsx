import { useDocumentHead } from '@/hooks/useDocumentHead';

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

const Awards = () => {
  useDocumentHead({
    title: 'Awards & Honors — Golnoush Haddadian',
    description: 'Academic awards, honors, and fellowships received by Golnoush Haddadian.',
    canonical: '/awards',
  });

  return (
    <div className="min-h-screen flex flex-col items-center py-4 sm:py-6 md:py-8 px-2 sm:px-4 md:px-6">
      <div className="w-full max-w-4xl">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
          Selected Awards
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed mb-4 sm:mb-6">
          Academic awards, honors, and fellowships received throughout my career.
        </p>

        <ul className="list-disc list-outside pl-4 sm:pl-5 space-y-1.5 sm:space-y-2 text-xs sm:text-sm md:text-base text-muted-foreground">
          {awards.map((award, idx) => (
            <li key={idx} className="leading-relaxed">
              <span className="font-medium text-foreground">{award.title}</span>, {award.org}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Awards;
