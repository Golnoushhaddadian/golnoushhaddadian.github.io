import { useDocumentHead } from '@/hooks/useDocumentHead';
import { Card, CardContent } from '@/components/ui/card';
import { Award } from 'lucide-react';

const awards = [
  {
    title: '$12,500 Fellowship Award (NSF & Google.org)',
    org: 'AI Institutes Virtual Organization (AIVO)',
  },
  {
    title: '$15,000 Doctoral Student Fellowship Award',
    org: 'Georgia State University',
  },
  {
    title: 'Outstanding Ph.D. Student in Learning Technologies',
    org: 'Georgia State University',
  },
  {
    title: 'Outstanding Contributions to Global Engagement and Global Citizenship',
    org: 'Georgia State University',
  },
  {
    title: "AIR's Quantitative Evidence Synthesis (QUEST) Fully-Funded Program",
    org: 'American Institutes for Research (AIR)',
  },
  {
    title: 'Outstanding Conference Paper Award',
    org: 'Society for Information Technology & Teacher Education & Association for the Advancement of Computing in Education (AACE)',
  },
  {
    title: 'Top 1% Nationwide, M.A. Entrance Exam',
    org: 'Sharif University of Technology',
  },
  {
    title: 'Nominated for International Education Award in International Initiatives',
    org: 'Georgia State University',
  },
  {
    title: 'Innovative and Supportive Teacher of Foreign Languages Award',
    org: 'Balan Language Academy',
  },
  {
    title: 'Outstanding Teacher of Foreign Languages Award',
    org: 'Aryana Fanavaran Institute of Technology',
  },
  {
    title: 'Distinguished Student Researcher Award',
    org: 'Young Researchers and Elite Club',
  },
];

const Awards = () => {
  useDocumentHead({
    title: 'Awards & Honors — Golnoush Haddadian',
    description: 'Academic awards, honors, and fellowships received by Golnoush Haddadian, including NSF fellowships, outstanding student awards, and conference paper awards.',
    canonical: '/awards',
  });

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-10">
      {/* Header */}
      <div className="text-center space-y-2 sm:space-y-3">
        <h1 className="text-xl sm:text-2xl md:text-4xl font-bold tracking-tight">Awards & Honors</h1>
        <p className="text-muted-foreground text-xs sm:text-sm md:text-base max-w-2xl mx-auto">
          A selection of academic awards, fellowships, and honors received throughout my career.
        </p>
      </div>

      {/* Awards List */}
      <div className="space-y-3 sm:space-y-4">
        {awards.map((award, idx) => (
          <Card key={idx} className="overflow-hidden">
            <CardContent className="p-3 sm:p-4 md:p-6 flex items-start gap-3 sm:gap-4">
              <div className="p-1.5 sm:p-2 bg-primary/10 rounded-lg shrink-0 mt-0.5">
                <Award className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xs sm:text-sm md:text-base font-semibold text-foreground leading-snug">
                  {award.title}
                </h2>
                {award.org && (
                  <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground mt-0.5 sm:mt-1">
                    {award.org}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Awards;
