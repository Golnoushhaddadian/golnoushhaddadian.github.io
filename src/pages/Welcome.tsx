import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ExternalLink, Mail } from "lucide-react";

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

  const citations = useCountUp(73, 800);
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
                <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-foreground/80" strokeWidth={1.75} />
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
              Postdoctoral Associate | Georgia State University
            </p>
          </div>
        </div>

        <section>
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-1 sm:mb-2">Hello Amazing People!</h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground/60 mb-3 sm:mb-4 md:mb-6">Welcome to My Personal Website</p>
          <div className="prose max-w-none text-muted-foreground space-y-2 sm:space-y-3 md:space-y-4 text-xs sm:text-sm md:text-base">
            <p>
              I am a Postdoctoral Associate at Georgia State University, where I contribute to two federally funded projects, supported by ~$8 million from the U.S. Department of Education, with the aim of reimagining learning and assessment in the age of generative AI (GenAI). My work focuses on developing scenario-based, AI-augmented learning and assessment systems that support students' reflection, metacognition, and self-regulation. These systems allow instructors to use learning and assessment data for formative support while maintaining the psychometric rigor needed to measure learning and evaluate instructional quality. This work is carried out in partnership with Educational Testing Service (ETS), the University of Memphis, and Middle Tennessee State University (MTSU).
            </p>
            <h3 className="text-base sm:text-lg font-bold text-foreground mt-4 mb-1">My Research</h3>
            <p>
              More broadly, my research is interdisciplinary by design, integrating human-centered theories of learning and human intelligence to examine the fundamental processes underlying personalized learning, assessment, and feedback across diverse STEM and language learning contexts within higher education and lifelong learning environments. As a mixed-methods design-based researcher, I engage in iterative cycles of design, implementation, and empirical investigation to develop and refine responsible AI-augmented systems that address complex educational challenges and contribute to meaningful societal impact at scale.
            </p>
            <h3 className="text-base sm:text-lg font-bold text-foreground mt-4 mb-1">My Vision</h3>
            <p>
              At the heart of my work is a simple belief: AI should not replace humans, but at its best should serve as connective tissue that amplifies human potential, strengthens agency, deepens thinking and reasoning, and enables learners and educators to connect, create, and achieve what would not be possible alone. Human progress has never occurred in isolation; it emerges through our ability to understand one another, cultivate trust, build meaningful relationships, and collaborate toward mutual goals. As AI continues to advance in its ability to reason, generate solutions, and operate with increasing autonomy, its greatest promise lies in reinforcing such unique and fundamental human qualities and expanding the possibilities we can achieve together.
            </p>
            <p>My core research areas include:</p>
            <div className="flex flex-wrap justify-center gap-2.5 mt-2">
              {[
                { label: 'AI in Education', bg: 'bg-[hsl(217,91%,60%)] border-[hsl(217,91%,50%)] shadow-[0_6px_16px_-3px_hsl(217,91%,60%/0.45)]' },
                { label: 'Personalized Learning', bg: 'bg-[hsl(271,76%,53%)] border-[hsl(271,76%,45%)] shadow-[0_6px_16px_-3px_hsl(271,76%,53%/0.45)]' },
                { label: 'Feedback', bg: 'bg-[hsl(160,84%,39%)] border-[hsl(160,84%,32%)] shadow-[0_6px_16px_-3px_hsl(160,84%,39%/0.45)]' },
                { label: 'Assessment & Evaluation', bg: 'bg-[hsl(20,90%,55%)] border-[hsl(20,90%,47%)] shadow-[0_6px_16px_-3px_hsl(20,90%,55%/0.45)]' },
                { label: 'Higher Education', bg: 'bg-[hsl(340,82%,55%)] border-[hsl(340,82%,47%)] shadow-[0_6px_16px_-3px_hsl(340,82%,55%/0.45)]' },
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
              would like to connect.
            </p>
            <p className="text-xs text-muted-foreground/70 italic mt-4"><span className="font-medium not-italic text-foreground/80">✦ About my name:</span> I publish under Golnoush, my legal name, the Persian name my mother gifted me and one I treasure like a gem; it means enduring beauty. In daily life I go by Lia and I am deeply connected to that, meaning one who brings good news.</p>
          </div>
        </section>

        <section className="mt-6 sm:mt-8 md:mt-12">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4 md:mb-6">Latest Work</h2>
          <div className="prose max-w-none text-muted-foreground space-y-2 sm:space-y-3 md:space-y-4 text-[10px] sm:text-xs md:text-sm">
            <p>
              <strong>Haddadian, G.</strong>, Haddadian, N., & Soleimani, S. (Accepted). Comparing the Effects of AI-generated and Teacher-delivered Formative Assessment on EFL Learners' Writing Performance and Writing Self-Efficacy. Paper presented at AIRiAL <span className="text-blue-600 font-medium">2026</span> Conference, Teachers College, Columbia University, New York, NY, United States.
            </p>
            <p>
              Cohen, J. D., O'Reilly, T., Magliano, J. P., <strong>Haddadian, G.</strong>, Dobar, E. B., Ari, O., Tinker-Sachs, G., & Sabatini, J. (<span className="text-blue-600 font-medium">2026</span>). Scenario-based learning and assessment design principles for the AI age. <em>EDULEARN26 Proceedings</em>, Article 1753. <a href="https://doi.org/10.21125/edulearn.2026.1753" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://doi.org/10.21125/edulearn.2026.1753</a>
            </p>
            <p>
              Dobar, E. B., <strong>Haddadian, G.</strong>, Ari, O., Cohen, J. D., Tinker-Sachs, G., & Magliano, J. P. (<span className="text-blue-600 font-medium">2026</span>). Navigating complexity in interdisciplinary problem solving: Insights from a scenario-based assessment. <em>EDULEARN26 Proceedings</em>, Article 1668. <a href="https://doi.org/10.21125/edulearn.2026.1668" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://doi.org/10.21125/edulearn.2026.1668</a>
            </p>
            <p>
              Cohen, J. D., Sabatini, J., <strong>Haddadian, G.</strong>, O'Reilly, T., Pierce, B., & Magliano, J. (<span className="text-blue-600 font-medium">2026</span>). Developing authentic learning and assessment through scenarios. In <em>Proceedings of EdMedia 2026 Edinburgh</em> (pp. 1716–1717). Waynesville, NC: Association for the Advancement of Computing in Education (AACE). <a href="https://www.learntechlib.org/primary/p/2129763" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://www.learntechlib.org/primary/p/2129763</a>
            </p>
            <p>
              Malcolm, B., Vickery, M., Louis-Strakes Lopez, J., Siciliano, L. M., Simon, S., Xing, G. (Y.), Kim, J., Kim, C., Zhao, Y., Desai, A., Gadong, E. S., Mabadeje, Y., Mhungu, B., <strong>Haddadian, G.</strong>, Eloy, A., Soodhani, N., Prasad, R., & Bae, Y. (Accepted, <span className="text-blue-600 font-medium">2026</span>). Fostering educational intimacy: ILSSA intergenerational partnerships for purposeful community building. Session presented at the International Society of the Learning Sciences (ISLS).
            </p>
            <p>
              de Kleijn, R., Brouwer, R., <strong>Haddadian, G.</strong>, van den Beemt, A., & Noroozi, O. (Accepted, <span className="text-blue-600 font-medium">2026</span>). Peer, AI, and teacher feedback: Features, perceptions and uptake. EARLI SIG 1 Conference 2026, Utrecht, The Netherlands.
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
