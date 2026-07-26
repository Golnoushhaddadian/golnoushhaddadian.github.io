import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Calendar, Lightbulb, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

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

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="overflow-hidden border border-primary/10 shadow-lg hover:shadow-2xl hover:border-primary/30 transition-all duration-500 bg-gradient-to-br from-card via-card to-accent/5 group hover:scale-[1.005]">
      <CardContent className="p-0">
        <div className={`flex flex-col ${project.image ? (index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse') : ''}`}>
          {/* Image Section */}
          {project.image && (
            <div className="md:w-1/3 relative overflow-hidden flex flex-col">
              <div className="aspect-video sm:aspect-square md:aspect-auto md:flex-1 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-contain md:absolute md:inset-0 p-4 transition-transform duration-500 group-hover:scale-110"
                  style={{ minHeight: '150px', maxHeight: '220px', objectPosition: 'center center' }}
                />
              </div>
              {(project.imageCaption || project.imageCaptionUrl) && (
                <div className="px-3 py-2 text-center border-t border-primary/5 bg-muted/20">
                  {project.imageCaptionUrl ? (
                    <a
                      href={project.imageCaptionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] text-muted-foreground/70 hover:text-muted-foreground transition-colors"
                    >
                      {project.imageCaption || project.imageCaptionUrl}
                    </a>
                  ) : (
                    <span className="text-[10px] text-muted-foreground/70">
                      {project.imageCaption}
                    </span>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Content Section */}
          <div className={`${project.image ? 'md:w-2/3' : 'w-full'} p-3 sm:p-4 md:p-5 lg:p-6 flex flex-col justify-center`}>
            {/* Badges */}
            <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-2">
              <Badge variant="default" className="bg-primary/90 hover:bg-primary text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5">
                <Lightbulb className="w-2 h-2 sm:w-2.5 sm:h-2.5 mr-0.5 sm:mr-1" />
                <span className="truncate max-w-[120px] sm:max-w-[150px] lg:max-w-none">{project.position}</span>
              </Badge>
              <Badge variant="outline" className="border-primary/30 text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5">
                <Calendar className="w-2 h-2 sm:w-2.5 sm:h-2.5 mr-0.5 sm:mr-1" />
                {project.period}
              </Badge>
            </div>

            {/* Title */}
            <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-1.5 sm:mb-2 text-foreground leading-tight">
              {project.title}
            </h2>

            {/* Funding */}
            {project.funding && (
              <p className="text-[10px] sm:text-xs text-primary font-medium mb-1.5 sm:mb-2">
                Funded by {project.funding}
              </p>
            )}

            {/* Mentors */}
            <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3 text-muted-foreground">
              <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary flex-shrink-0" />
              <span className="text-[10px] sm:text-xs font-medium">Mentors: {project.mentors}</span>
            </div>

            {/* Description */}
            <div className="relative">
              <p 
                className={cn(
                  "text-muted-foreground leading-relaxed text-[10px] sm:text-xs md:text-sm",
                  !isExpanded && "line-clamp-3 sm:line-clamp-4 md:line-clamp-6 lg:line-clamp-none"
                )}
              >
                {project.description}
              </p>
              
              {/* Read more button - only show on mobile/tablet */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="lg:hidden mt-1 h-6 px-2 text-[10px] sm:text-xs md:text-xs text-primary hover:text-primary/80 p-0"
              >
                {isExpanded ? (
                  <>
                    Show less <ChevronUp className="w-3 h-3 ml-0.5" />
                  </>
                ) : (
                  <>
                    Read more <ChevronDown className="w-3 h-3 ml-0.5" />
                  </>
                )}
              </Button>
            </div>

            {/* Learn More Link */}
            {project.link && (
              <a
                href={project.link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-2 sm:mt-3 text-[10px] sm:text-xs text-primary hover:text-primary/80 hover:underline transition-colors font-medium"
              >
                {project.link.label} →
              </a>
            )}
            {project.link2 && (
              <a
                href={project.link2.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-1 sm:mt-1.5 text-[10px] sm:text-xs text-primary hover:text-primary/80 hover:underline transition-colors font-medium"
              >
                {project.link2.label} →
              </a>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
