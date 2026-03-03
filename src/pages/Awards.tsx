import { useDocumentHead } from '@/hooks/useDocumentHead';
import { Separator } from '@/components/ui/separator';

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
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 md:mb-6">
          Awards & Honors
        </h1>
        <p className="text-muted-foreground text-xs sm:text-sm md:text-base mb-4 sm:mb-6 md:mb-8">
          A selection of academic awards, fellowships, and honors received throughout my career.
        </p>

        <ul className="space-y-0">
          {awards.map((award, idx) => (
            <li key={idx}>
              <div className="py-2.5 sm:py-3 md:py-4 pl-3 sm:pl-4 border-l-2 border-primary/30">
                <p className="text-xs sm:text-sm md:text-base font-medium text-foreground leading-snug">
                  {award.title}
                </p>
                <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground mt-0.5">
                  {award.org}
                </p>
              </div>
              {idx < awards.length - 1 && <Separator />}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Awards;
