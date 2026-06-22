import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ExternalLink } from "lucide-react";

import ResearchStrands from "@/components/ResearchStrands";
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
    title: 'Golnoush (Lia) Haddadian — AI in Education, Personalized Learning',
    description: 'Academic portfolio of Dr. Golnoush (Lia) Haddadian. Postdoctoral Associate researching AI in Education, argumentative writing, automated writing evaluation, personalized learning, and formative assessment.',
    canonical: '/',
  });

  const citations = useCountUp(63, 800);
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
              Services (ETS)
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
              {" "}name that metaphorically means <em>enduring beauty</em>. Since its pronunciation can be challenging for non-Persian speakers, people often call me <em>Lia</em>, a name with Greek origins meaning <em>one who brings good news</em>. So, somewhere between complexity and simplicity lies a belief that consistently guides my work:
            </p>
            <p>
              Technology exists to expand human potential, to amplify abilities, deepen critical thinking, and empower what people can become, never to replace them.
            </p>
            <p>
              As a researcher, teacher, designer, and innovator, my work sits at the intersection of AI and learning, focusing on the design, deployment, and study of human-centered AI-augmented systems that enhance student learning, strengthen teaching practices, and support personalized learning and teaching experiences. Grounded in theories of learning and guided by design-based research and mixed-methods approaches, my work aims to develop responsible AI innovations that address real-world challenges in education and create meaningful societal impact.
            </p>
            <p>My core research areas include:</p>
            <div className="flex flex-wrap justify-center gap-2.5 mt-2">
              {[
                { label: 'AI in Education', bg: 'bg-[hsl(217,91%,60%)] border-[hsl(217,91%,50%)] shadow-[0_6px_16px_-3px_hsl(217,91%,60%/0.45)]' },
                { label: 'Personalized Learning', bg: 'bg-[hsl(271,76%,53%)] border-[hsl(271,76%,45%)] shadow-[0_6px_16px_-3px_hsl(271,76%,53%/0.45)]' },
                { label: 'Feedback', bg: 'bg-[hsl(160,84%,39%)] border-[hsl(160,84%,32%)] shadow-[0_6px_16px_-3px_hsl(160,84%,39%/0.45)]' },
                { label: 'Assessment & Evaluation', bg: 'bg-[hsl(20,90%,55%)] border-[hsl(20,90%,47%)] shadow-[0_6px_16px_-3px_hsl(20,90%,55%/0.45)]' },
                { label: 'Higher Education', bg: 'bg-[hsl(340,82%,55%)] border-[hsl(340,82%,47%)] shadow-[0_6px_16px_-3px_hsl(340,82%,55%/0.45)]' },
                { label: 'Design & Development', bg: 'bg-[hsl(190,90%,42%)] border-[hsl(190,90%,35%)] shadow-[0_6px_16px_-3px_hsl(190,90%,42%/0.45)]' },
                { label: 'Mixed-Methods', bg: 'bg-[hsl(38,92%,50%)] border-[hsl(38,92%,42%)] shadow-[0_6px_16px_-3px_hsl(38,92%,50%/0.45)]' },
                { label: 'Design-Based Research', bg: 'bg-[hsl(142,71%,40%)] border-[hsl(142,71%,33%)] shadow-[0_6px_16px_-3px_hsl(142,71%,40%/0.45)]' },
                { label: 'Responsible AI', bg: 'bg-[hsl(0,72%,51%)] border-[hsl(0,72%,43%)] shadow-[0_6px_16px_-3px_hsl(0,72%,51%/0.45)]' },
                { label: 'Human-centered Design', bg: 'bg-[hsl(250,70%,55%)] border-[hsl(250,70%,47%)] shadow-[0_6px_16px_-3px_hsl(250,70%,55%/0.45)]' },
              ].map(({ label, bg }, i) => (
                <span
                  key={label}
                  className={`badge-float inline-block border ${bg} text-white text-[10px] sm:text-xs md:text-sm font-medium px-3 py-1.5 rounded-full`}
                  style={{ animationDelay: `${i * 0.35}s` }}
                >
                  {label}
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
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4 md:mb-6">Latest Work</h2>
          <div className="prose max-w-none text-muted-foreground space-y-2 sm:space-y-3 md:space-y-4 text-[10px] sm:text-xs md:text-sm">
            <p>
              <strong>Haddadian, G.</strong>, Haddadian, N., & Soleimani, S. (Accepted). Comparing the Effects of AI-generated and Teacher-delivered Formative Assessment on EFL Learners' Writing Performance and Writing Self-Efficacy. Paper presented at AIRiAL <span className="text-blue-600 font-medium">2026</span> Conference, Teachers College, Columbia University, New York, NY, United States.
            </p>
            <p>
              Cohen, J. D., O'Reilly, T., Magliano, J., <strong>Haddadian, G.</strong>, Dobar, E. B., Ari, O., Tinker Sachs, G., & Sabatini, J. (Accepted, <span className="text-blue-600 font-medium">2026</span>). Scenario-based learning and assessment design principles for the AI age. International Conference on Education and New Learning Technologies (EDULEARN), Palma de Mallorca, Spain.
            </p>
            <p>
              Dobar, E. B., <strong>Haddadian, G.</strong>, Ari, O., Cohen, J. D., Tinker Sachs, G., & Magliano, J. (Accepted, <span className="text-blue-600 font-medium">2026</span>). Navigating complexity in interdisciplinary problem solving: Insights from a scenario-based assessment. International Conference on Education and New Learning Technologies (EDULEARN), Palma de Mallorca, Spain.
            </p>
            <p>
              Cohen, J. D., Sabatini, J., <strong>Haddadian, G.</strong>, O'Reilly, T., & Magliano, J. (Accepted, <span className="text-blue-600 font-medium">2026</span>). Developing authentic learning and assessment through scenarios. EdMedia <span className="text-blue-600 font-medium">2026</span>, Edinburgh, Scotland.
            </p>
            <p>
              Malcolm, B., Vickery, M., Louis-Strakes Lopez, J., Siciliano, L. M., Simon, S., Xing, G. (Y.), Kim, J., Kim, C., Zhao, Y., Desai, A., Gadong, E. S., Mabadeje, Y., Mhungu, B., <strong>Haddadian, G.</strong>, Eloy, A., Soodhani, N., Prasad, R., & Bae, Y. (Accepted, <span className="text-blue-600 font-medium">2026</span>). Fostering educational intimacy: ILSSA intergenerational partnerships for purposeful community building. Session presented at the International Society of the Learning Sciences (ISLS).
            </p>
            <p>
              Noroozi, O., <strong>Haddadian, G.</strong>, Banihashem, K., & Schunn, C. (<span className="text-blue-600 font-medium">2026</span>). How students perceive and respond to GenAI for peer feedback uptake. In <em>Understanding and supporting feedback uptake: Bridging research and practice in educational contexts</em>. American Educational Research Association (AERA) Annual Meeting, Los Angeles, CA, United States.
            </p>
            <p>
              <strong>Haddadian, G.</strong>, Kim, M. K., & Haddadian, N. (<span className="text-blue-600 font-medium">2026</span>). Synthesizing Research on Automated Writing Evaluation Tools in EFL Argumentative Writing Context. American Association for Applied Linguistics (AAAL), Chicago, IL, United States.
            </p>
            <p>
              Motevali, S., <strong>Haddadian, G.</strong>, Desai, P., Seelam, N., & Kim, M. K. (<span className="text-blue-600 font-medium">2026</span>). The potential of artificial intelligence for automated scoring of argumentative essays. American Association for Applied Linguistics (AAAL), Chicago, IL, United States.
            </p>
            <p>
              Haddadian, N., <strong>Haddadian, G.</strong>, & Haddadian, M. (<span className="text-blue-600 font-medium">2026</span>). Collaborative use of AI-generated feedback in EFL argumentative writing: Impacts on writing quality and self-efficacy. American Association for Applied Linguistics (AAAL), Chicago, IL, United States.
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