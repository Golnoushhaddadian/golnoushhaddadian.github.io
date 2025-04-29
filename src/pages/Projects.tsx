
import { BookOpen, FileText, FileCode, Book, GraduationCap, Clock } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const Projects = () => {
  const projects = [
    {
      title: "Module on Responsible Use of Generative Artificial Intelligence",
      type: "Curriculum Development",
      period: "Summer 2024",
      description: "This module is a part of the Computer Skills for the Information Age course (LT2010) offered at Georgia State University. It is an intensive 2-week asynchronous module delivered in iCollege platform designed to provide undergraduate students with an understanding of the responsible use of GenAI. In this module, students understand and explore GenAI, doing hands-on activities. They will further explore the ethical considerations regarding the use of GenAI and further learn about how to implement responsible AI and act responsibly. The module emphasizes hands-on experience and real-world applications of GenAI.",
      audience: "Undergraduate Students",
      icon: <FileCode className="h-10 w-10" />,
      color: "bg-blue-100 dark:bg-blue-950"
    },
    {
      title: "Private Artificial Intelligence Curriculum",
      type: "Curriculum Development",
      period: "2021 to 2023",
      description: "This advanced course is designed to provide graduate students with a deep understanding of private artificial intelligence. It covers a range of topics, including modules on privacy attacks, data and model privacy, privacy-preserving machine learning based on different techniques such differential privacy (DP). The curriculum is modular, allowing instructors to adapt the entire course or select specific modules to integrate into their existing courses.",
      audience: "Graduate Students",
      modules: "10 modules",
      icon: <Book className="h-10 w-10" />,
      color: "bg-violet-100 dark:bg-violet-950"
    },
    {
      title: "TOEFL Standard/Intensive Courses",
      type: "Curriculum Development",
      period: "Since 2015, updated regularly",
      description: "These courses provide a comprehensive study of all four language skills—reading, writing, listening, and speaking—alongside grammar and vocabulary. The 5-week version is an accelerated and modified course designed to maximize learning in a shorter time frame.",
      audience: "Undergraduate and Graduate Students",
      duration: "10-Week/5-Week Curriculum",
      icon: <BookOpen className="h-10 w-10" />,
      color: "bg-green-100 dark:bg-green-950"
    },
    {
      title: "GRE Standard Course",
      type: "Curriculum Development",
      period: "Since 2019, updated regularly",
      description: "This course is designed to equip students with the essential skills needed to excel in the GRE exam. With a focus on the analytical writing and verbal reasoning sections, students are guided through a comprehensive curriculum that covers key strategies, techniques, and practice exercises.",
      audience: "Undergraduate and Graduate Students",
      duration: "10-Week Curriculum",
      icon: <GraduationCap className="h-10 w-10" />,
      color: "bg-amber-100 dark:bg-amber-950"
    }
  ];

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
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="space-y-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-4">Projects</h1>
        <p className="text-lg text-muted-foreground">
          Curriculum development and educational projects I've designed and implemented.
        </p>
      </div>

      <motion.div 
        className="grid grid-cols-1 gap-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {projects.map((project, index) => (
          <motion.div key={index} variants={item}>
            <Card className="overflow-hidden border-l-4 border-primary">
              <CardHeader className={`${project.color} p-6`}>
                <div className="flex justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold mb-2">{project.title}</CardTitle>
                    <CardDescription className="text-base opacity-90">
                      <div className="flex items-center gap-2 mb-1">
                        <FileText className="h-4 w-4" />
                        <span>{project.type}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{project.period}</span>
                      </div>
                    </CardDescription>
                  </div>
                  <div className="bg-background/90 rounded-full p-4">
                    {project.icon}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <p className="mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge variant="outline" className="bg-primary/5">
                    Audience: {project.audience}
                  </Badge>
                  {project.modules && (
                    <Badge variant="outline" className="bg-primary/5">
                      {project.modules}
                    </Badge>
                  )}
                  {project.duration && (
                    <Badge variant="outline" className="bg-primary/5">
                      {project.duration}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Projects;
