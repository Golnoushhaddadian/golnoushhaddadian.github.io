import { useDocumentHead } from '@/hooks/useDocumentHead';

const Awards = () => {
  useDocumentHead({
    title: 'Awards & Honors — Golnoush Haddadian',
    description: 'Academic awards, honors, and fellowships received by Golnoush Haddadian, including NSF fellowships, outstanding student awards, and conference paper awards.',
    canonical: '/awards',
  });

  const awards = [
    {
      year: '2025',
      items: [
        {
          title: 'AI4ED Summer Fellowship ($12,500)',
          org: 'AI in Education Interest Group, The AI Institutes Virtual Organization (AIVO)',
          description: 'Awarded to selected graduate researchers representing five major AI in Education Institutes across U.S. (iSAT, AI-ALOE, EngageAI, AI4ExceptionalEd, and INVITE). AIVO acts as a central hub connecting the 27 major AI Institutes across U.S., supporting research that advances U.S. innovation and well-being. Funded by the National Science Foundation and Google.org.',
        },
        {
          title: 'Outstanding Ph.D. Student in Learning Technologies (LT) Award',
          org: 'College of Education & Human Development (CEHD), Georgia State University',
          description: 'Given to a student who has demonstrated potential for excellence in research, teaching and service in instructional technology.',
        },
        {
          title: 'Graduate Student Travel Award ($500)',
          org: 'College of Education & Human Development (CEHD), Georgia State University',
        },
      ],
    },
    {
      year: '2024',
      items: [
        {
          title: 'AACE Conference Paper Award',
          org: 'Society for Information Technology & Teacher Education (SITE) & Association for the Advancement of Computing in Education (AACE)',
          description: 'Awarded to papers distinguished as outstanding by the AACE Program Committee for exceptional quality, originality, and significant scholarly contribution.',
        },
        {
          title: 'Graduate Student Travel Award ($500)',
          org: 'College of Education & Human Development (CEHD), Georgia State University',
        },
      ],
    },
    {
      year: '2023',
      items: [
        {
          title: 'Doctoral Student Fellowship Award ($15,000)',
          org: 'College of Education & Human Development (CEHD), Georgia State University',
          description: 'Given to three PhD students who demonstrate exceptional scholarship and academic potential in the Learning Technologies (LT) department.',
        },
        {
          title: 'Graduate Student Travel Award ($500)',
          org: 'College of Education & Human Development (CEHD), Georgia State University',
        },
      ],
    },
    {
      year: '2012–2014',
      items: [
        {
          title: 'Admitted to M.A. at Sharif University of Technology as Exceptional Talented Student',
          org: 'Supported by the National Organization for Development of Exceptional Talents, Tehran, Iran',
        },
        {
          title: 'Ranked in Top 1% — Master\'s Nationwide University Entrance Exam',
          org: 'Tehran, Iran',
        },
        {
          title: 'Ranked 1st in GPA for Bachelor\'s (2012) and Master\'s (2014) Degrees',
        },
      ],
    },
    {
      year: '2004–2013',
      items: [
        {
          title: 'Innovative and Supportive Teacher of Foreign Languages Award',
          org: 'Balan Language Academy, Tehran, Iran (2013)',
        },
        {
          title: 'Outstanding Teacher of Foreign Languages Award',
          org: 'Aryana Fanavaran Institute of Technology, Tehran, Iran (2010)',
        },
        {
          title: 'Distinguished Student Researcher Award',
          org: 'Young Researchers and Elite Club, Tehran, Iran (2006)',
        },
        {
          title: 'Outstanding Student Researcher Award',
          org: 'Shahid Shamloo High School, Tehran, Iran (2005)',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center py-4 sm:py-6 md:py-8 px-2 sm:px-4 md:px-6">
      <div className="w-full max-w-4xl">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 md:mb-8">
          Awards & Honors
        </h1>
        <p className="text-muted-foreground text-xs sm:text-sm md:text-base mb-6 sm:mb-8 md:mb-10">
          A selection of academic awards, fellowships, and honors received throughout my career.
        </p>

        <div className="space-y-6 sm:space-y-8 md:space-y-10">
          {awards.map((group) => (
            <section key={group.year}>
              <h2 className="text-base sm:text-lg md:text-xl font-semibold text-primary mb-3 sm:mb-4 border-b border-border pb-2">
                {group.year}
              </h2>
              <div className="space-y-3 sm:space-y-4">
                {group.items.map((item, idx) => (
                  <div key={idx} className="pl-3 sm:pl-4 border-l-2 border-muted-foreground/20">
                    <h3 className="text-xs sm:text-sm md:text-base font-medium text-foreground">
                      {item.title}
                    </h3>
                    {item.org && (
                      <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground mt-0.5">
                        {item.org}
                      </p>
                    )}
                    {item.description && (
                      <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground/80 mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Awards;
