import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ExternalLink } from "lucide-react";
import CoauthorshipNetwork from "@/components/CoauthorshipNetwork";
import { Button } from "@/components/ui/button";
import { useDocumentHead } from "@/hooks/useDocumentHead";
import { useEffect, useRef, useState } from "react";

const useCountUp = (end: number, duration = 1800, startOnView = true) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startOnView) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted, startOnView]);

  useEffect(() => {
    if (!hasStarted) return;
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [hasStarted, end, duration]);

  return { count, ref };
};

const AboutMe = () => {
  useDocumentHead({
    title: 'Golnoush (Lia) Haddadian — AI in Education & Argumentative Writing Researcher',
    description: 'Academic portfolio of Dr. Golnoush (Lia) Haddadian. Postdoctoral Associate researching AI in Education, argumentative writing, automated writing evaluation, personalized learning, and formative assessment.',
    canonical: '/',
  });

  const citations = useCountUp(44, 800);
  const publications = useCountUp(28, 800);
  const hIndex = useCountUp(5, 500);

  const iconSize = 32;
  return <div className="min-h-screen flex flex-col items-center py-4 sm:py-6 md:py-8 px-2 sm:px-4 md:px-6">
      <div className="w-full max-w-4xl">
        <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-10 md:mb-12">
          <div className="md:w-1/3 flex flex-col items-center">
            <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64">
              <AspectRatio ratio={1 / 1} className="rounded-lg overflow-hidden">
                <Avatar className="h-full w-full">
                  <AvatarImage src="/lovable-uploads/e896fcf4-cdd3-4775-8e7c-da11ef961f00.png" alt="Golnoush (Lia) Haddadian" className="object-cover" width={256} height={256} loading="eager" decoding="async" />
                  <AvatarFallback className="text-2xl">GH</AvatarFallback>
                </Avatar>
              </AspectRatio>
            </div>
            {/* Social Profile Links */}
            <div className="flex items-center gap-3 sm:gap-5 mt-3 sm:mt-5">
              <a href="https://www.linkedin.com/in/g-hdn" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-200" aria-label="LinkedIn">
                <img src="/lovable-uploads/linkedin-icon.png" alt="LinkedIn" width={32} height={32} loading="lazy" decoding="async" className="rounded-full w-6 h-6 sm:w-8 sm:h-8" />
              </a>
              <a href="https://scholar.google.com/citations?user=8MQCFZQAAAAJ&hl=en" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-200" aria-label="Google Scholar">
                <img src="/lovable-uploads/google-scholar-icon.png" alt="Google Scholar" width={32} height={32} loading="lazy" decoding="async" className="w-6 h-6 sm:w-8 sm:h-8" />
              </a>
              <a href="https://www.researchgate.net/profile/Golnoush-Haddadian?ev=hdr_xprf" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-200" aria-label="ResearchGate">
                <img src="/lovable-uploads/researchgate-icon.png" alt="ResearchGate" width={32} height={32} loading="lazy" decoding="async" className="rounded-full w-6 h-6 sm:w-8 sm:h-8" />
              </a>
              <a href="mailto:ghaddadian1@gsu.edu" className="hover:scale-110 transition-transform duration-200" aria-label="Email">
                
              </a>
            </div>
          </div>
          <div className="md:w-2/3 text-center md:text-left">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 md:mb-4 flex flex-col sm:flex-row items-center sm:items-baseline gap-1 sm:gap-2">
              <span>Golnoush (Lia) Haddadian</span>
              <Button variant="ghost" size="sm" className="text-[10px] sm:text-xs h-6 sm:h-8 px-2" asChild>
                <a href="https://namedrop.io/golnoushhaddadian" target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={12} className="mr-0.5 sm:mr-1" />
                  <span>Pronounce my name</span>
                </a>
              </Button>
            </h1>
            <p className="text-sm sm:text-lg md:text-xl text-muted-foreground mb-2 sm:mb-3 md:mb-4">Ph.D. in Learning Sciences</p>
            <p className="mb-3 sm:mb-4 md:mb-6 text-xs sm:text-sm md:text-base">
              Postdoctoral Associate | Georgia State University, University of Memphis, and Educational Testing
              Services (ETS).
            </p>
          </div>
        </div>

        <section>
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-1 sm:mb-2">Hello Amazing People!</h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground/60 mb-3 sm:mb-4 md:mb-6">Welcome to My Personal Website</p>
          <div className="prose max-w-none text-muted-foreground space-y-2 sm:space-y-3 md:space-y-4 text-xs sm:text-sm md:text-base">
            <p>
              My name is <em>Golnoush</em>, a{" "}
              <a href="https://en.wikipedia.org/wiki/Persians" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Persian</a>
              {" "}name that metaphorically means <em>enduring beauty</em>. Since its pronunciation can be challenging for non-Persian speakers, people often call me <em>Lia</em>, a name with Greek origins meaning <em>one who brings good news</em>.
            </p>
            <p
              className="cursor-default text-muted-foreground transition-all duration-700 hover:text-primary hover:[text-shadow:0_0_8px_hsl(var(--primary)/0.4),0_0_20px_hsl(var(--primary)/0.2)]"
            >
              I believe technology exists to expand human potential, to amplify abilities, deepen thinking, and empower what humans can become, never to replace them.
            </p>
            <p>
              As a researcher, teacher, designer, and innovator, my work sits at the intersection of AI and learning, focusing on the design of human-centered AI systems that enhance student learning, strengthen teaching practices, and support personalized learning and teaching experiences. Grounded in theories of learning and guided by design-based research and mixed-methods approaches, my work aims to develop responsible AI innovations that address real-world challenges in education and create meaningful societal impact.
            </p>
            <p>My core research areas include:</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-1">
              {[
                'AI in Education',
                'Personalized Learning',
                'Feedback',
                'Assessment & Evaluation',
                'Higher Education',
                'Design & Development',
                'Mixed-Methods',
                'Design-Based Research',
              ].map((keyword) => (
                <span
                  key={keyword}
                  className="inline-block border border-primary/60 text-primary text-[10px] sm:text-xs md:text-sm font-medium px-2.5 py-1 rounded-md hover:bg-primary/10 transition-colors duration-200"
                >
                  {keyword}
                </span>
              ))}
            </div>
            <p>
              Please feel free to explore my website and reach out if you are interested in potential collaborations or
              would like to connect and learn more.
            </p>
          </div>
        </section>

        <section className="mt-6 sm:mt-8 md:mt-12">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4 md:mb-6">Latest Publications</h2>
          <div className="prose max-w-none text-muted-foreground space-y-2 sm:space-y-3 md:space-y-4 text-[10px] sm:text-xs md:text-sm">
            <p>
              <strong>Haddadian, G.</strong>, Kim, M. K., & Haddadian, N. (2025). A Systematic Review of Automated Writing Evaluation Tools in Argumentative Writing for English as Foreign Language Education. <em>Research Synthesis in Applied Linguistics</em>, 1-51.{" "}
              <a href="https://doi.org/10.1080/29984475.2025.2598266" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                https://doi.org/10.1080/29984475.2025.2598266
              </a>
            </p>
            <p>
              Noroozi, O., <strong>Haddadian, G.</strong>, Gao, X., Schunn, C., Alqassab, M., & Banihashem, S. K. (2025). The value of GenAI for peer feedback provision: student perceptions and impacts. <em>International Journal of Educational Technology in Higher Education</em>, 22(1), 61.{" "}
              <a href="https://doi.org/10.1186/s41239-025-00558-6" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                https://doi.org/10.1186/s41239-025-00558-6
              </a>
            </p>
            <p>
              <strong>Haddadian, G.</strong>, Panzade, P., Takabi, D., & Kim, M. K. (2025). Problem-centered post-secondary computer science education: A study of the private artificial intelligence curriculum. <em>International Journal of Technology in Education</em>, 8(2), 220-245.{" "}
              <a href="https://doi.org/10.46328/ijte.1071" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                https://doi.org/10.46328/ijte.1071
              </a>
            </p>
            <p>
              <strong>Haddadian, G.</strong>, Han, H., Kim, J., Abdeen, M. S., & Kim, M. K. (2025). Exploring AI-Generated Expert Models: Instructor Interaction and Learner Perceptions in a Physics Class. In <em>Proceedings of the 19th International Conference of the Learning Sciences-ICLS 2025</em>, pp. 1684-1688. International Society of the Learning Sciences.{" "}
              <a href="https://doi.org/10.22318/icls2025.213524" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                https://doi.org/10.22318/icls2025.213524
              </a>
            </p>
            <p>
              Greisel, M., Hornstein, J., Kollar, I., Noroozi, O., <strong>Haddadian, G.</strong>, Gao, X., ... & Rummel, N. (2025). Enhancing Peer Feedback Practices with Generative AI. In <em>Proceedings of the 18th International Conference on Computer-Supported Collaborative Learning-CSCL 2025</em>, pp. 490-498. International Society of the Learning Sciences.{" "}
              <a href="https://doi.org/10.22318/cscl2025.921873" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                https://doi.org/10.22318/cscl2025.921873
              </a>
            </p>
          </div>
        </section>

        {/* Google Scholar Stats */}
        <section className="mt-16 sm:mt-20 md:mt-28">
          <div className="flex items-center justify-between max-w-xl mx-auto">
            <div ref={citations.ref} className="text-center">
              <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tabular-nums tracking-tight">
                {citations.count}
              </p>
              <p className="text-[10px] sm:text-xs font-medium text-muted-foreground mt-1 tracking-wider uppercase">Citations</p>
            </div>
            <div className="w-px h-12 sm:h-16 bg-border" aria-hidden="true" />
            <div ref={publications.ref} className="text-center">
              <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tabular-nums tracking-tight">
                {publications.count}
              </p>
              <p className="text-[10px] sm:text-xs font-medium text-muted-foreground mt-1 tracking-wider uppercase">Publications</p>
            </div>
            <div className="w-px h-12 sm:h-16 bg-border" aria-hidden="true" />
            <div ref={hIndex.ref} className="text-center">
              <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tabular-nums tracking-tight">
                {hIndex.count}
              </p>
              <p className="text-[10px] sm:text-xs font-medium text-muted-foreground mt-1 tracking-wider uppercase">H-Index</p>
            </div>
          </div>
          <p className="text-[10px] sm:text-xs text-muted-foreground/40 mt-4 sm:mt-5 text-center">
            Via{" "}
            <a href="https://scholar.google.com/citations?user=8MQCFZQAAAAJ&hl=en" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-muted-foreground/60 transition-colors">
              Google Scholar
            </a>
            {" "}· Updated Mar 2026
          </p>
        </section>

        {/* Co-authorship Network */}
        <section className="mt-12 sm:mt-16 md:mt-20">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2">Collaboration Network</h2>
          <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">
            Each <strong>circle</strong> represents a co-author · <strong>Numbers</strong> inside show total shared publications · <strong>Line thickness</strong> reflects frequency of collaboration · <strong>Colors</strong> indicate research clusters identified by shared co-authorships
          </p>
          <CoauthorshipNetwork />
        </section>


      </div>
    </div>;
};
export default AboutMe;