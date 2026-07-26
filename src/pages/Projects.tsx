
import { motion } from "framer-motion";
import { ProjectCard } from "@/components/projects/ProjectCard";
import catwrvImage from "@/assets/catwrv-project.png";
import { useDocumentHead } from "@/hooks/useDocumentHead";

interface Project {
  title: string;
  position: string;
  period: string;
  mentors: string;
  description: string;
  image: string;
  funding?: string;
  link?: { label: string; url: string };
  link2?: { label: string; url: string };
  imageCaption?: string;
  imageCaptionUrl?: string;
}

const projects: Project[] = [
  {
    title: "Scenario-Based Assessment in the Age of Generative AI: Making Space in the Education Market for Alternative Assessment Paradigm",
    position: "Postdoctoral Associate (Start Date: Mid-February 2026)",
    period: "Starting Mid-February 2026",
    mentors: "Drs. Cohen, J., & Magliano, J.",
    funding: "Institute of Education Sciences (IES)",
    description: "The purpose of this project is to create a Generative artificial intelligence (Gen-AI) enhanced authoring tool for scenario-based assessments (SBAs). Because SBAs are difficult to develop, college instructors struggle to develop and deploy SBAs in their courses. Recent advances in Gen-AI make it possible to scale up and democratize SBA development, enabling instructors to design and administer localized, personalized, and discipline-appropriate performance assessments that provide better feedback, higher levels of adaptivity, and richer diagnostic information.",
    image: "/lovable-uploads/scenario-based-assessment-logo.png",
    imageCaption: "Image from https://www.sabatiniliteracy.com",
    imageCaptionUrl: "https://www.sabatiniliteracy.com",
    link: { label: "Learn More about the Grant", url: "https://ies.ed.gov/use-work/awards/scenario-based-assessment-age-generative-ai-making-space-education-market-alternative-assessment" },
    link2: { label: "Watch in the News", url: "https://www.11alive.com/video/news/georgia-state-researchers-receive-federal-funding/85-2aeae8f3-b4b6-4e49-9e62-72218ce8bc08?fbclid=PAdGRleAQW3ipleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA8xMjQwMjQ1NzQyODc0MTQAAad_Z0LGiZ9H6LUBF-aI4-Eb-2fzvvOMNXHigFj_aVDWYjorPKyNIZGTjL_NWw_aem_JkV1KjBDq7jy8VZR23QhLQ" }
  },
  {
    title: "RITA – Real-Time Intelligent Technology for Argumentative Writing",
    position: "Lead Researcher (Dissertation Project)",
    period: "Ongoing",
    mentors: "Drs. Kim, M. K., Motevali, S.",
    description: "RITA is an AI-powered Automated Writing Evaluation (AWE) system designed and developed to assess and scaffold students' argumentative writing. As the initial phase of DBR, we are centering our efforts on the development and validation of RITA's automated essay scoring (AES) engine, which is a fundamental step in any AWE development. This stage serves as the foundation for subsequent system components. Building on this, the next phase will empirically validate RITA's formative feedback mechanisms, examining how they can become increasingly responsive to and adapted to the evolving needs of each individual learner across different stages of argumentative writing development. This line of research will be extended to additional empirical lines of research. This involves, but is not limited to, advancing RITA's adaptive feedback mechanisms, investigating learners' feedback‐uptake processes, examining longitudinal patterns of writing development supported by AI-powered scaffolds, and conducting classroom-based deployment to understand how RITA integrates into authentic instructional ecologies. Together, these interconnected strands aim to advance a robust, theoretically grounded, and methodologically rigorous line of research to inform the next generation of AI-powered writing support systems.",
    image: "/lovable-uploads/rita-mark-color.svg"
  },
  {
    title: "LANGCASTX: An AI-Augmented Personalized Podcast Platform to Advance Language-science Competence for Speech-language Pathologists",
    position: "Graduate Research Fellow",
    period: "May 2025 – August 2025",
    mentors: "Drs. Kim, M. K., Xiong, J., Hadley, P., Lane, H. C.",
    funding: "Google.org (2025), NSF AI Institutes Virtual Organization (AIVO), AI4Ed Summer Program",
    description: "As part of a larger initiative involving five national AI research institutes in the United States (i.e., AI-ALOE, AI4ExceptionalEd, ENGAGE AI, iSAT, and INVITE), our interdisciplinary team brought together researchers from two of them—the National AI Institute for Exceptional Education (AI4ExceptionalEd) and the National AI Institute for Adult Learning and Online Education (AI-ALOE)—to advance the shared vision and mission of both AI institutes and to foster innovation at the intersection of AI and education. Through this collaboration, we aimed to address a real-world problem experienced by practicing Speech-Language Pathologists (SLPs) who treat children with language disorders. Existing research highlights a critical gap in language science knowledge among SLPs, which poses a substantial barrier to the effective implementation of evidence-based assessment and intervention practices. Thus, we designed and developed an AI-augmented platform to offer personalized learning episodes adapted to the daily questions and challenges of Speech-Language Pathologists (SLPs).",
    image: "/lovable-uploads/langcastx-logo.png",
    link: { label: "Learn More about AIVO", url: "http://aiinstitutes.org/ai-for-education/" }
  },
  {
    title: "Secure and Trustworthy Cyberspace (SaTC): Private Artificial Intelligence (AI)",
    position: "Graduate Research Associate",
    period: "August 2021 – May 2025",
    mentors: "Drs. Kim, M. K., Takabi, D.",
    funding: "National Science Foundation (NSF)",
    description: "This interdisciplinary project focused on AI and privacy (private AI), supported by the Secure and Trustworthy Cyberspace (SaTC) program. Aligned with the Federal Cybersecurity Research and Development Strategic Plan and the National Privacy Research Strategy, it aimed to protect the benefits of cyber systems while ensuring security and privacy. The project developed instructional materials and hands-on labs to train students in trustworthy AI. It aimed to address the fast-growing demand for skilled researchers by integrating technical knowledge with ethical and privacy-focused practices in AI.",
    image: "/lovable-uploads/nsf2-satc.png"
  },
  {
    title: "AI Institute for Adult Learning and Online Education (ALOE)",
    position: "Graduate Research Associate",
    period: "January 2022 – December 2025",
    mentors: "Drs. Kim, M. K., Goel, A. K., Dede, C.",
    funding: "National Science Foundation (NSF)",
    description: "This interdisciplinary project aims to transform online adult learning through AI-driven models grounded in cognitive and social learning theories. It addresses the distinct needs of adult learners by developing intelligent virtual assistants and personalized learning systems. The initiative brings together a national network of universities, nonprofits, and industry partners to advance foundational research in areas such as cognitive-based AI, scalable personalization, human-AI collaboration, and ethical AI design. Using iterative learning engineering and mixed-methods evaluation, the project seeks to deliver scalable, equitable, and effective solutions for adult education.",
    image: "/lovable-uploads/nsf2-aloe.png",
    link: { label: "Learn More about AI-ALOE", url: "https://aialoe.org/" }
  },
  {
    title: "IUSE-Engaged Student Learning (Level 1): AI-Scaffolded Pre-Classroom Learning for Large/Introductory Undergraduate Physics Courses",
    position: "Graduate Student Researcher",
    period: "Aug 2024 – Aug 2025",
    mentors: "Drs. Kim, M. K., Abdeen, M. S.",
    funding: "National Science Foundation (NSF)",
    description: "This project designs and implements AI-augmented formative assessment and feedback systems to help students build skills for in-classroom interactive problem-solving activities. The aim is to determine whether AI in education improves students' well-being inside and outside the classroom, with a focus on those traditionally underrepresented in STEM education. Extensive data collected in the final phase will examine the relationships among pre-classroom activities, in-classroom performance, self-efficacy, interest in physics, and student backgrounds, including gender, race, ethnicity, first-generation status, and English language learning.",
    image: "/lovable-uploads/nsf2.png"
  },
  {
    title: "Design and Development of a Computer-Adaptive Prototype to Measure Written Receptive Vocabulary Knowledge of English Language Learners",
    position: "Lead Researcher (Master's Thesis)",
    period: "October 2012 – October 2014",
    mentors: "Dr. Salehi, M.",
    description: "This project focuses on the design and development of a Computerized Adaptive Test (CAT) version of the paper-based Vocabulary Size Test (VST; Nation & Beglar, 2007) to measure the written receptive vocabulary knowledge of English as a foreign language learners. The system, referred to as CATWRV, is intended to serve as an alternative mode of administration to the traditional paper-and-pencil VST. Using Item Response Theory (IRT), the system selects subsequent items of appropriate difficulty based on learners' responses. Through this process, the system dynamically adapts to each examinee's estimated ability level in real time, enabling more precise scoring with fewer test items and reduced testing time. The project aims to support more efficient and personalized estimation of learners' vocabulary size.",
    image: catwrvImage
  }
];

const Projects = () => {
  useDocumentHead({
    title: 'Research Projects — Golnoush Haddadian',
    description: 'Research projects by Golnoush Haddadian including NSF-funded AI in Education initiatives, private AI curriculum development, and adaptive learning technologies.',
    canonical: '/projects',
    noindex: true,
  });
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8 sm:mb-12 px-2"
      >
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">
          Research Projects
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-5xl mx-auto leading-relaxed">
          Throughout my academic training, I have engaged in a range of research projects, some of which were federally funded by the National Science Foundation (NSF) and the Institute of Education Sciences (IES). Below is a selected list of these projects.
        </p>
      </motion.div>

      {/* Projects Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        {projects.map((project, index) => (
          <motion.div key={index} variants={item}>
            <ProjectCard project={project} index={index} />
          </motion.div>
        ))}
      </motion.div>

    </div>
  );
};

export default Projects;
