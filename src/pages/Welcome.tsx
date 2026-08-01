import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ExternalLink, Github, Linkedin, Mail } from "lucide-react";

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

  const [scholarStats, setScholarStats] = useState({ citations: 74, publications: 17, hIndex: 5, i10Index: 2, updated: "Jul 2026" });
  useEffect(() => {
    fetch("/scholar-stats.json")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d && typeof d.citations === "number") setScholarStats(d);
      })
      .catch(() => {});
  }, []);

  const citations = useCountUp(scholarStats.citations, 800);
  const publications = useCountUp(scholarStats.publications, 800);
  const hIndex = useCountUp(scholarStats.hIndex, 500);
  const i10 = useCountUp(scholarStats.i10Index, 500);

  const pillarsRef = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      const d = e.data as { type?: string; height?: number };
      if (d && d.type === "rp-h" && typeof d.height === "number" && pillarsRef.current) {
        pillarsRef.current.style.height = `${Math.max(320, d.height)}px`;
      }
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, []);

  const iconSize = 32;
  return <div className="min-h-screen flex flex-col items-center py-4 sm:py-6 md:py-8 px-2 sm:px-4 md:px-6">
      <div className="w-full max-w-5xl">
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
            <p className="mb-2 sm:mb-3 md:mb-4 text-xs sm:text-sm md:text-base">
              Postdoctoral Associate | Georgia State University
            </p>
            {/* Contact / Social Links */}
            <div className="flex flex-col items-center md:items-start gap-y-2 text-xs sm:text-sm">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 sm:gap-x-5">
                <a href="https://scholar.google.com/citations?user=8MQCFZQAAAAJ&hl=en" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-foreground/70 hover:text-foreground transition-colors" aria-label="Google Scholar">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true"><path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z" /></svg>
                  <span>Google Scholar</span>
                </a>
                <a href="mailto:ghaddadian1@gsu.edu" className="flex items-center gap-1.5 text-foreground/70 hover:text-foreground transition-colors" aria-label="Email">
                  <Mail className="w-4 h-4" strokeWidth={1.75} />
                  <span>ghaddadian1@gsu.edu</span>
                </a>
                <a href="https://www.linkedin.com/in/g-hdn" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-foreground/70 hover:text-foreground transition-colors" aria-label="LinkedIn">
                  <Linkedin className="w-4 h-4" strokeWidth={1.75} />
                  <span>LinkedIn</span>
                </a>
              </div>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 sm:gap-x-5">
                <a href="https://www.researchgate.net/profile/Golnoush-Haddadian?ev=hdr_xprf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-foreground/70 hover:text-foreground transition-colors" aria-label="ResearchGate">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true"><path d="M19.586 0c-.818 0-1.508.19-2.073.565-.563.377-.97.936-1.213 1.68a3.193 3.193 0 0 0-.112.437 8.365 8.365 0 0 0-.078.53 9 9 0 0 0-.05.727c-.01.282-.013.621-.013 1.016a31.121 31.123 0 0 0 .014 1.017 9 9 0 0 0 .05.727 7.946 7.946 0 0 0 .077.53h-.005a3.334 3.334 0 0 0 .113.438c.245.743.65 1.303 1.214 1.68.565.376 1.256.564 2.075.564.8 0 1.536-.213 2.105-.603.57-.39.94-.916 1.175-1.65.076-.235.135-.558.177-.93a10.9 10.9 0 0 0 .043-1.207v-.82c0-.095-.047-.142-.14-.142h-3.064c-.094 0-.14.047-.14.141v.956c0 .094.046.14.14.14h1.666c.056 0 .084.03.084.086 0 .36 0 .62-.036.865-.038.244-.1.447-.147.606-.108.385-.348.664-.638.876-.29.212-.738.35-1.227.35-.545 0-.901-.15-1.21-.353-.306-.203-.517-.454-.67-.915a3.136 3.136 0 0 1-.147-.762 17.366 17.367 0 0 1-.034-.656c-.01-.26-.014-.572-.014-.939a26.401 26.403 0 0 1 .014-.938 15.821 15.822 0 0 1 .035-.656 3.19 3.19 0 0 1 .148-.76 1.89 1.89 0 0 1 .742-1.01c.344-.244.593-.352 1.137-.352.508 0 .815.096 1.144.303.33.207.528.492.764.925.047.094.111.118.198.07l1.044-.43c.075-.048.09-.115.042-.199a3.549 3.549 0 0 0-.466-.742 3 3 0 0 0-.679-.607 3.313 3.313 0 0 0-.903-.41A4.068 4.068 0 0 0 19.586 0zM8.217 5.836c-1.69 0-3.036.086-4.297.086-1.146 0-2.291 0-3.007-.029v.831l1.088.2c.744.144 1.174.488 1.174 2.264v11.288c0 1.777-.43 2.12-1.174 2.263l-1.088.2v.832c.773-.029 2.12-.086 3.465-.086 1.29 0 2.951.057 3.667.086v-.831l-1.49-.2c-.773-.115-1.174-.487-1.174-2.264v-4.784c.688.057 1.29.057 2.206.057 1.748 3.123 3.41 5.472 4.355 6.56.86 1.032 2.177 1.691 3.839 1.691.487 0 1.003-.086 1.318-.23v-.744c-1.031 0-2.063-.716-2.808-1.518-1.26-1.376-2.95-3.582-4.355-6.074 2.32-.545 4.04-2.722 4.04-4.9 0-3.208-2.492-4.698-5.758-4.698zm-.515 1.29c2.406 0 3.839 1.26 3.839 3.552 0 2.263-1.547 3.782-4.097 3.782-.974 0-1.404-.03-2.063-.086v-7.19c.66-.059 1.547-.059 2.32-.059z" /></svg>
                  <span>ResearchGate</span>
                </a>
                <a href="https://github.com/Golnoushhaddadian" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-foreground/70 hover:text-foreground transition-colors" aria-label="GitHub">
                  <Github className="w-4 h-4" strokeWidth={1.75} />
                  <span>github.com/Golnoushhaddadian</span>
                </a>
              </div>
            </div>
            <p className="text-xs text-muted-foreground/70 italic mt-4 sm:mt-5 text-center md:text-left"><span className="font-medium not-italic text-foreground/80">✦ About my name:</span> I publish under Golnoush, my legal name, the <a href="https://en.wikipedia.org/wiki/Persians" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Persian</a> name my mother gifted me and one I treasure like a gem; it means enduring beauty. In daily life I go by Lia and I am deeply connected to that, meaning one who brings good news.</p>
          </div>
        </div>

        <section>
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-1 sm:mb-2">Hello Amazing People!</h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground/60 mb-3 sm:mb-4 md:mb-6">Welcome to My Personal Website</p>
          <div className="prose max-w-none text-muted-foreground space-y-2 sm:space-y-3 md:space-y-4 text-justify text-xs sm:text-sm md:text-base">
            <p>
              I am a Postdoctoral Associate at <a href="https://education.gsu.edu/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Georgia State University</a>, where I contribute to two federally funded projects (<a href="https://ies.ed.gov/use-work/awards/scenario-based-assessment-age-generative-ai-making-space-education-market-alternative-assessment" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Transformative</a> &amp; <a href="https://www.ets.org/newsroom/ets-research-institute-awarded-department-of-education-grant-ai-ehanced-learning.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">FIPSE</a>), supported by <strong>~$8 million</strong> from the <strong>U.S. Department of Education</strong>, with the aim of reimagining learning and assessment in the age of generative AI (GenAI). My work focuses on developing scenario-based, <strong>AI-augmented learning and assessment systems</strong> that support students' reflection, metacognition, and self-regulation. These systems allow instructors to use learning and assessment data for formative support while maintaining the psychometric rigor needed to measure learning and evaluate instructional quality. This work is carried out in partnership with <a href="https://www.ets.org/about.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Educational Testing Service (ETS)</a>, the <strong>University of Memphis</strong>, and <strong>Middle Tennessee State University (MTSU)</strong>, where I collaborate with leading scholars including Drs. <a href="https://scholar.google.com/citations?user=Rm877u0AAAAJ" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Joseph Magliano</a> (my mentor), <a href="https://scholar.google.com/citations?user=GO-H2ioAAAAJ" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Jonathan D. Cohen</a>, <a href="https://scholar.google.com/citations?user=Ai4ByXMAAAAJ" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">John Sabatini</a> (Memphis), <a href="https://scholar.google.com/citations?user=H6kyrwkAAAAJ" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Paul Deane</a> (ETS), <a href="https://scholar.google.com/citations?user=ONnsYA8AAAAJ" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Tenaha O'Reilly</a> (ETS), <a href="https://scholar.google.com/citations?user=gYOVNzIAAAAJ" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Zuowei Wang</a> (ETS), and <a href="https://scholar.google.com/citations?user=6poCvZYAAAAJ" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Randy Floyd</a> (Memphis).
            </p>
            <h3 className="text-base sm:text-lg font-bold text-foreground mt-4 mb-1">My Research</h3>
            <p>
              More broadly, my research is interdisciplinary by design, integrating <strong>human-centered theories of learning</strong> and <strong>human intelligence</strong> to examine the fundamental processes underlying <strong>personalized learning, assessment, and feedback</strong> across diverse <strong>STEM</strong> and <strong>language learning contexts</strong> within <strong>higher education</strong> and <strong>lifelong learning</strong> environments. Using <strong>mixed-methods</strong> and <strong>design-based research</strong>, I engage in iterative cycles of design, implementation, and evaluation while leveraging <strong>learning analytics</strong> techniques to systematically collect, analyze, and interpret learner data. I draw on these insights to develop and refine <strong>responsible AI-augmented learning systems</strong> to address <strong>authentic educational challenges</strong> <strong>at scale</strong>. Through these efforts, I aim to contribute to <strong>meaningful societal impact</strong> through <strong>responsible AI innovation</strong> in education.
            </p>
            <p>
              At the heart of my work is a simple belief: AI should not replace humans, but at its best should serve as connective tissue that amplifies human potential, strengthens agency, deepens thinking and reasoning, and enables learners and educators to connect, create, and achieve what would not be possible alone. Human progress has never occurred in isolation; it emerges through our ability to understand one another, cultivate trust, build meaningful relationships, and collaborate toward mutual goals. As AI continues to advance in its ability to reason, generate solutions, and operate with increasing autonomy, its greatest promise lies in reinforcing such unique and fundamental human qualities and expanding the possibilities we can achieve together.
            </p>
            <div className="not-prose !mt-8 sm:!mt-12">
              <p className="text-center text-sm sm:text-base text-muted-foreground/75 max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed">My research is organized around four interconnected strands, as illustrated below. They are not separate lines of inquiry but interdependent commitments, each shaping and shaped by the others, so that together they form a single, coherent picture of how AI can support human learning.</p>
              <iframe
                ref={pillarsRef}
                src="/research-pillars.html?v=8"
                title="Four research pillars"
                loading="lazy"
                scrolling="no"
                className="w-full block"
                style={{ width: "100%", height: "360px", border: 0, overflow: "hidden" }}
              />
              <p className="text-center text-xs sm:text-sm text-muted-foreground/60 italic mt-10 sm:mt-14">Studied together, each pillar shapes how the others are designed.</p>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-foreground mt-4 mb-1">Previously</h3>
            <p>
              Previously, I was a Graduate Research Associate in the <a href="https://www.ai2researchlab.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">AI2RL Lab</a> (2021-25), where I contributed to <strong>three federally funded National Science Foundation (NSF)</strong> projects. The first was the <a href="https://www.nsf.gov/awardsearch/show-award/?AWD_ID=2054968" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">SaTC Project</a>, supported by <strong>~$400,000</strong>, in which I worked with <a href="https://scholar.google.com/citations?user=8OTNELUAAAAJ&hl=en" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Daniel Takabi</a> on the design and deployment of a Private AI curriculum using problem-centered instruction, hands-on labs, and real-world scenarios to develop students' skills in building trustworthy AI systems. The second was the National AI Research Institutes Project, supported by <strong>~$20 million</strong>, where, through <a href="https://aialoe.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">AI-ALOE</a>, I collaborated with leading scholars including <a href="https://scholar.google.com/citations?user=VjNg25EAAAAJ&hl=en" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Ashok Goel</a>, <a href="https://scholar.google.com/citations?user=dcTwIeQAAAAJ&hl=en" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Chris Dede</a>, and <a href="https://scholar.google.com/citations?user=PDzqXW4AAAAJ&hl=en" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Scott Crossley</a> on the human-centered design and deployment of AI technologies for personalized online adult learning, lifelong learning, and workforce development. The third was the <a href="https://www.nsf.gov/awardsearch/show-award?AWD_ID=2315709" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">IUSE Project</a>, supported by <strong>~$300,000</strong>, which aimed to design and deploy an AI-augmented formative assessment and feedback system to provide personalized learning support to enhance engagement, problem-solving, and self-regulated learning in large introductory physics courses.
            </p>
            <div className="mt-5 sm:mt-7 pt-5 sm:pt-7 border-t border-border">
              <p className="text-left">
                <strong>Recruiting &amp; collaborations:</strong> If you are interested in working with me, please fill out <a href="/contact" className="text-blue-600 hover:underline">this brief form</a>.
              </p>
            </div>
          </div>
        </section>

        {/* Google Scholar Stats */}
        <section className="mt-16 sm:mt-20 md:mt-28">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
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
            <div className="w-px h-12 sm:h-16 bg-border" aria-hidden="true" />
            <div ref={i10.ref} className="text-center">
              <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tabular-nums tracking-tight">
                {i10.count}
              </p>
              <p className="text-[10px] sm:text-xs font-medium text-muted-foreground mt-1 tracking-wider uppercase">i10-Index</p>
            </div>
          </div>
          <p className="text-[10px] sm:text-xs text-muted-foreground/40 mt-4 sm:mt-5 text-center">
            Via{" "}
            <a href="https://scholar.google.com/citations?user=8MQCFZQAAAAJ&hl=en" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-muted-foreground/60 transition-colors">
              Google Scholar
            </a>
            {" "}· Updated {scholarStats.updated}
          </p>
        </section>

        <section className="mt-6 sm:mt-8 md:mt-12">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4 md:mb-6">Latest Work</h2>
          <div className="prose max-w-none text-muted-foreground space-y-2 sm:space-y-3 md:space-y-4 text-justify text-[10px] sm:text-xs md:text-sm">
            <p>
              Khajooeinejad, A., Chapariniya, M., Motevali, S., & <strong>Haddadian, G.</strong> (Accepted). Agentic LLM-driven loss function search: Decomposing exploration and exploitation in closed-loop discovery [Paper presentation]. <em>4th IEEE International Conference on Artificial Intelligence, Blockchain, and Internet of Things</em> (AIBThings), Mount Pleasant, MI, United States.
            </p>
            <p>
              Khajooeinejad, A., <strong>Haddadian, G.</strong>, Chapariniya, M., & Motevali, S. (Accepted). Trustless multi-agent AI: Blockchain-based coordination for LLM agents [Paper presentation]. <em>4th IEEE International Conference on Artificial Intelligence, Blockchain, and Internet of Things</em> (AIBThings), Mount Pleasant, MI, United States.
            </p>
            <p>
              <strong>Haddadian, G.</strong>, Haddadian, N., & Soleimani, S. (Accepted). Comparing the Effects of AI-generated and Teacher-delivered Formative Assessment on EFL Learners' Writing Performance and Writing Self-Efficacy. Paper presented at AIRiAL 2026 Conference, Teachers College, Columbia University, New York, NY, United States.
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
