
import { Briefcase, ArrowRightIcon, ExternalLink } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Projects = () => {
  const projects = [
    {
      title: "Project Title 1",
      type: "Research Project",
      period: "2022 - Present",
      description: "This project investigates [research question] using [methodological approach]. Key outcomes include the development of [outcome 1] and [outcome 2] with applications in [field].",
      technologies: ["Technology 1", "Technology 2", "Technology 3"],
      link: "#",
      imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
    },
    {
      title: "Project Title 2",
      type: "Collaborative Research",
      period: "2021 - 2022",
      description: "A collaborative effort with [collaborator] to address [problem statement]. This work resulted in [significant outcome] that improved [metric] by [percentage].",
      technologies: ["Technology 4", "Technology 5", "Technology 6"],
      link: "#",
      imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475"
    },
    {
      title: "Project Title 3",
      type: "Industry Partnership",
      period: "2020 - 2021",
      description: "Partnered with [industry partner] to develop [solution] for [industry need]. The project successfully delivered [outcome] that is now being used in [application].",
      technologies: ["Technology 7", "Technology 8", "Technology 9"],
      link: "#",
      imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
    }
  ];

  return (
    <section className="space-y-8">
      <div>
        <h1>Projects</h1>
        <p className="text-lg text-muted-foreground">
          Significant research projects and collaborations.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {projects.map((project, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 h-48 md:h-auto">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 flex flex-col">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                      <CardDescription className="mt-1">{project.type} • {project.period}</CardDescription>
                    </div>
                    <Briefcase className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="mb-4">{project.description}</p>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Technologies & Methods:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, idx) => (
                        <span 
                          key={idx} 
                          className="inline-block text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
                      <span>View Project</span>
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardFooter>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Projects;
