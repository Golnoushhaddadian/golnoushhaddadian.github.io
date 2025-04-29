
import { Book, FileText, Download, Award } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const Research = () => {
  const publications = [
    {
      title: "Problem-centered post-secondary computer science education: A study of the private artificial intelligence curriculum",
      authors: "Haddadian, G., Panzade, P., Takabi, D., & Kim, M. K.",
      journal: "International Journal of Technology in Education (IJTE)",
      year: "2025",
      abstract: "This paper explores curriculum development in private artificial intelligence education, providing new insights into problem-centered learning approaches for computer science students.",
      link: "#",
    },
    {
      title: "Construction and validation of a Computerized Formative Assessment Literacy (CFAL) questionnaire for language teachers",
      authors: "Haddadian, G., Radmanesh, S., & Haddadian, N.",
      journal: "Language Testing in Asia",
      year: "2024",
      abstract: "This research introduces a validated instrument for measuring language teachers' literacy in computerized formative assessment through an exploratory sequential mixed-methods investigation.",
      link: "#",
    },
    {
      title: "Innovative Use of Grammarly Feedback for Improving EFL Learners' Speaking",
      authors: "Haddadian, G., & Haddadian, N.",
      journal: "The Journal of Applied Instructional Design",
      year: "2024",
      abstract: "This study investigates how feedback from automated writing evaluation tools can be repurposed to enhance speaking skills among English as a Foreign Language learners.",
      link: "#",
    },
  ];

  const currentProjects = [
    {
      title: "AI Institutes Virtual Organization (AIVO) – AI4Ed Summer Program",
      position: "Graduate Fellow",
      period: "Summer 2025",
      funding: "Funded by Google.org",
      description: "This collaborative program brings together graduate student researchers from five NSF-funded national AI institutes dedicated to advancing AI applications in education. The initiative fosters cross-institute partnerships to promote inclusive, ethical, and human-centered AI innovations for lifelong learning. As a selected Fellow, I will represent the AI-ALOE team at Georgia Tech, engaging in interdisciplinary research, knowledge exchange, and synergistic activities to support AIVO's mission of leveraging AI to enhance educational access, equity, and learner success across diverse communities."
    },
    {
      title: "Secure and Trustworthy Cyberspace (SaTC): Private Artificial Intelligence (AI)",
      position: "Graduate Research Associate",
      period: "August 2021 - present",
      funding: "Funded by the National Science Foundation (NSF)",
      description: "This interdisciplinary project focuses on artificial intelligence (AI) and privacy, supported by the Secure and Trustworthy Cyberspace (SaTC) program. Aligned with the Federal Cybersecurity Research and Development Strategic Plan and the National Privacy Research Strategy, it aims to protect the benefits of cyber systems while ensuring security and privacy. The project develops instructional materials and hands-on labs to train students in trustworthy AI. It addresses the fast-growing demand for skilled researchers by integrating technical knowledge with ethical and privacy-focused practices in AI."
    },
    {
      title: "AI Institute for Adult Learning and Online Education (ALOE)",
      position: "Graduate Research Associate",
      period: "January 2022 - August 2022",
      funding: "Funded by the National Science Foundation (NSF)",
      description: "This interdisciplinary project aims to transform online adult learning through AI-driven models grounded in cognitive and social learning theories. It addresses the distinct needs of adult learners by developing intelligent virtual assistants and personalized learning systems. The initiative brings together a national network of universities, nonprofits, and industry partners to advance foundational research in areas such as cognitive-based AI, scalable personalization, human-AI collaboration, and ethical AI design. Using iterative learning engineering and mixed-methods evaluation, the project seeks to deliver scalable, equitable, and effective solutions for adult education."
    },
    {
      title: "IUSE-Engaged Student Learning (Level 1): AI-Scaffolded Pre-Classroom Learning for Large/Introductory Undergraduate Physics Courses",
      position: "Researcher",
      period: "August 2024 - present",
      funding: "Funded by the National Science Foundation (NSF)",
      description: "This project designs and implements AI-augmented formative assessment and feedback systems to help students build skills for in-classroom interactive problem-solving activities. The aim is to determine whether AI in education improves students' well-being inside and outside the classroom, with a focus on those traditionally underrepresented in STEM education. Extensive data collected in the final phase will examine the relationships among pre-classroom activities, in-classroom performance, self-efficacy, interest in physics, and student backgrounds, including gender, race, ethnicity, first-generation status, and English language learning."
    },
  ];

  return (
    <section className="space-y-8">
      <div>
        <h1>Research</h1>
        <p className="text-lg text-muted-foreground mb-6">
          My research focuses on AI in Education, with particular emphasis on innovative learning technologies, formative assessment, and feedback systems.
        </p>
      </div>

      <Tabs defaultValue="projects" className="w-full">
        <TabsList className="w-full md:w-auto">
          <TabsTrigger value="projects" className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            <span>Research Projects</span>
          </TabsTrigger>
          <TabsTrigger value="publications" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Publications</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="projects" className="space-y-6 mt-6">
          {currentProjects.map((project, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader>
                <div className="flex flex-wrap gap-2 mb-2">
                  <Badge variant="outline" className="bg-primary/10">{project.position}</Badge>
                  <Badge variant="outline" className="bg-primary/5">{project.period}</Badge>
                </div>
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <CardDescription className="text-primary font-medium">{project.funding}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{project.description}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="publications" className="space-y-6 mt-6">
          {publications.map((pub, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-xl">{pub.title}</CardTitle>
                <CardDescription className="space-y-1">
                  <div>{pub.authors}</div>
                  <div className="font-medium text-primary">{pub.journal}, {pub.year}</div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{pub.abstract}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" asChild>
                  <a href={pub.link} target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 h-4 w-4" />
                    <span>Download PDF</span>
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default Research;
