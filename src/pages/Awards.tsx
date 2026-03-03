import { useDocumentHead } from '@/hooks/useDocumentHead';

const Awards = () => {
  useDocumentHead({
    title: 'Awards & Honors — Golnoush Haddadian',
    description: 'Academic awards, honors, and fellowships received by Golnoush Haddadian, including NSF fellowships, outstanding student awards, and conference paper awards.',
    canonical: '/awards',
  });

  const awards: { year: string; items: { title: string; org?: string; description?: string }[] }[] = [];

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
