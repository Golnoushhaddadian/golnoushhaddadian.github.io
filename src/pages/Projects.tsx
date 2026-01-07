
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
    title: "IUSE-Engaged Student Learning (Level 1): AI-Scaffolded Pre-Classroom Learning for Large/Introductory Undergraduate Physics Courses",
    position: "Graduate Student Researcher",
    period: "August 2024 - present",
    mentors: "Drs. Kim, M. K., Abdeen, M. S.",
    funding: "National Science Foundation (NSF)",
    description: "This project designs and implements AI-augmented formative assessment and feedback systems to help students build skills for in-classroom interactive problem-solving activities. The aim is to determine whether AI in education improves students' well-being inside and outside the classroom, with a focus on those traditionally underrepresented in STEM education. Extensive data collected in the final phase will examine the relationships among pre-classroom activities, in-classroom performance, self-efficacy, interest in physics, and student backgrounds, including gender, race, ethnicity, first-generation status, and English language learning.",
    image: "/placeholder.svg"
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

      {/* Empty State for Future Projects */}
      {projects.length === 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 py-8 border-2 border-dashed border-muted-foreground/20 rounded-xl"
        >
          <p className="text-muted-foreground italic">More projects coming soon...</p>
        </motion.div>
      )}
    </div>
  );
};

export default Projects;
