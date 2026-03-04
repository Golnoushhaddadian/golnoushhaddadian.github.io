import { useDocumentHead } from '@/hooks/useDocumentHead';
import { Award } from 'lucide-react';

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
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-center">
          Selected Awards
        </h1>

        <div className="relative border-l-2 border-primary/30 pl-6 sm:pl-8 space-y-4 sm:space-y-5">
          {awards.map((award, idx) => (
            <div key={idx} className="relative">
              <div className="absolute -left-[calc(1.5rem+5px)] sm:-left-[calc(2rem+5px)] top-0.5 w-[10px] h-[10px] rounded-full bg-primary/10 border-2 border-primary" />
              <p className="text-xs sm:text-sm md:text-base leading-relaxed">
                <span className="font-semibold text-foreground">{award.title}</span>
                <span className="text-muted-foreground">, {award.org}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Awards;
