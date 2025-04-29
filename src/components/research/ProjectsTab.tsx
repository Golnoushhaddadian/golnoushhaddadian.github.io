
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ResearchProject } from "@/types/research";

interface ProjectsTabProps {
  projects: ResearchProject[];
}

export const ProjectsTab = ({ projects }: ProjectsTabProps) => {
  return (
    <div className="space-y-6">
      {projects.map((project, index) => (
        <Card key={index} className="overflow-hidden border-l-4 border-blue-500 dark:border-blue-400">
          <CardHeader className="bg-blue-50/70 dark:bg-blue-900/20">
            <div className="flex flex-wrap gap-2 mb-2">
              <Badge variant="outline" className="bg-blue-500/10 border-blue-200 dark:border-blue-700 text-blue-800 dark:text-blue-300">{project.position}</Badge>
              <Badge variant="outline" className="bg-blue-500/5 border-blue-100 dark:border-blue-800 text-blue-700 dark:text-blue-400">{project.period}</Badge>
            </div>
            <CardTitle className="text-xl text-blue-900 dark:text-blue-100">{project.title}</CardTitle>
            <CardDescription className="text-blue-600 dark:text-blue-400 font-medium">{project.funding}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <p className="text-muted-foreground">{project.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
