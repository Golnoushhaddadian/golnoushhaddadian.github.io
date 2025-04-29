
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ResearchProject } from "@/types/research";
import { motion } from "framer-motion";

interface ProjectsTabProps {
  projects: ResearchProject[];
}

export const ProjectsTab = ({ projects }: ProjectsTabProps) => {
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
    <motion.div 
      className="space-y-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {projects.map((project, index) => (
        <motion.div key={index} variants={item}>
          <Card className="overflow-hidden border-l-4 border-primary">
            <CardHeader className="bg-primary/5">
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge variant="outline" className="bg-primary/10">{project.position}</Badge>
                <Badge variant="outline" className="bg-primary/5">{project.period}</Badge>
              </div>
              <CardTitle className="text-xl">{project.title}</CardTitle>
              <CardDescription className="font-medium">{project.funding}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <p className="text-muted-foreground">{project.description}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};
