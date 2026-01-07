
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, Lightbulb } from "lucide-react";

interface Project {
  title: string;
  position: string;
  period: string;
  mentors: string;
  description: string;
  image: string;
  funding?: string;
}

const projects: Project[] = [
  {
    title: "RITA – Real-Time Intelligent Technology for Argumentative Writing",
    position: "Lead Researcher (Dissertation Project)",
    period: "Ongoing",
    mentors: "Drs. Kim, M. K., Motevali, S.",
    description: "RITA is an AI-powered Automated Writing Evaluation (AWE) system designed and developed to assess and scaffold students' argumentative writing. As the initial phase of DBR, we are centering our efforts on the development and validation of RITA's automated essay scoring (AES) engine, which is a fundamental step in any AWE development. This stage serves as the foundation for subsequent system components. Building on this, the next phase will empirically validate RITA's formative feedback mechanisms, examining how they can become increasingly responsive to and adapted to the evolving needs of each individual learner across different stages of argumentative writing development. This line of research will be extended to additional empirical lines of research. This involves, but is not limited to, advancing RITA's adaptive feedback mechanisms, investigating learners' feedback‐uptake processes, examining longitudinal patterns of writing development supported by AI-powered scaffolds, and conducting classroom-based deployment to understand how RITA integrates into authentic instructional ecologies. Together, these interconnected strands aim to advance a robust, theoretically grounded, and methodologically rigorous line of research to inform the next generation of AI-powered writing support systems.",
    image: "/lovable-uploads/rita-placeholder.png"
  },
  {
    title: "LANGCASTX: An AI-Augmented Personalized Podcast Platform to Advance Language-science Competence for Speech-language Pathologists",
    position: "Graduate Research Fellow",
    period: "May 2025 – August 2025",
    mentors: "Drs. Kim, M. K., Xiong, J., Hadley, P., Lane, H. C.",
    funding: "Google.org (2025), NSF AI Institutes Virtual Organization (AIVO), AI4Ed Summer Program",
    description: "As part of a larger initiative involving five national AI research institutes in the United States (i.e., AI-ALOE, AI4ExceptionalEd, ENGAGE AI, iSAT, and INVITE), our interdisciplinary team brought together researchers from two of them—the National AI Institute for Exceptional Education (AI4ExceptionalEd) and the National AI Institute for Adult Learning and Online Education (AI-ALOE)—to advance the shared vision and mission of both AI institutes and to foster innovation at the intersection of AI and education. Through this collaboration, we aimed to address a real-world problem experienced by practicing Speech-Language Pathologists (SLPs) who treat children with language disorders. Existing research highlights a critical gap in language science knowledge among SLPs, which poses a substantial barrier to the effective implementation of evidence-based assessment and intervention practices. Thus, we designed and developed an AI-augmented platform to offer personalized learning episodes adapted to the daily questions and challenges of Speech-Language Pathologists (SLPs).",
    image: "/lovable-uploads/langcastx-logo.png"
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
    image: "/lovable-uploads/nsf2-aloe.png"
  },
  {
    title: "IUSE-Engaged Student Learning (Level 1): AI-Scaffolded Pre-Classroom Learning for Large/Introductory Undergraduate Physics Courses",
    position: "Graduate Student Researcher",
    period: "August 2024 - present",
    mentors: "Drs. Kim, M. K., Abdeen, M. S.",
    funding: "National Science Foundation (NSF)",
    description: "This project designs and implements AI-augmented formative assessment and feedback systems to help students build skills for in-classroom interactive problem-solving activities. The aim is to determine whether AI in education improves students' well-being inside and outside the classroom, with a focus on those traditionally underrepresented in STEM education. Extensive data collected in the final phase will examine the relationships among pre-classroom activities, in-classroom performance, self-efficacy, interest in physics, and student backgrounds, including gender, race, ethnicity, first-generation status, and English language learning.",
    image: "/lovable-uploads/nsf2.png"
  }
];

const Projects = () => {
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
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
          Research Projects
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Exploring innovative approaches to AI in education, learning technologies, and formative assessment systems.
        </p>
      </motion.div>

      {/* Projects Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-8"
      >
        {projects.map((project, index) => (
          <motion.div key={index} variants={item}>
            <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card">
              <CardContent className="p-0">
                <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  {/* Image Section */}
                  <div className="lg:w-2/5 relative">
                    <div className="aspect-[4/3] lg:aspect-auto lg:h-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover lg:absolute lg:inset-0"
                        style={{ minHeight: '300px', maxHeight: '400px' }}
                      />
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="lg:w-3/5 p-6 lg:p-8 flex flex-col justify-center">
                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="default" className="bg-primary/90 hover:bg-primary">
                        <Lightbulb className="w-3 h-3 mr-1" />
                        {project.position}
                      </Badge>
                      <Badge variant="outline" className="border-primary/30">
                        <Calendar className="w-3 h-3 mr-1" />
                        {project.period}
                      </Badge>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl lg:text-2xl font-bold mb-3 text-foreground leading-tight">
                      {project.title}
                    </h2>

                    {/* Funding */}
                    {project.funding && (
                      <p className="text-sm text-primary font-medium mb-3">
                        Funded by {project.funding}
                      </p>
                    )}

                    {/* Mentors */}
                    <div className="flex items-center gap-2 mb-4 text-muted-foreground">
                      <Users className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">Mentors: {project.mentors}</span>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed text-sm lg:text-base">
                      {project.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

    </div>
  );
};

export default Projects;
