
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
    </div>
  );
};
