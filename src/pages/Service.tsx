
import { Award, Trophy, FileText, Users, Star } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Service = () => {
  const professionalService = [
    {
      year: "2025",
      role: "Scholarships Reviewer",
      organization: "ISLS/ICLS - The International Society of the Learning Sciences Travel to Helsinki Scholarships (Equity Travel Support and ILSSA Annual Meeting Scholarship)",
      description: "",
      icon: <Star className="h-10 w-10 text-primary/60 mb-2" />
    },
    {
      year: "2025",
      role: "Student Representative and Proposal Evaluator",
      organization: "Faculty Technology Initiatives, College of Education and Human Development, Georgia State University",
      description: "",
      icon: <Users className="h-10 w-10 text-primary/60 mb-2" />
    },
    {
      year: "Since 2024",
      role: "Journal Reviewer",
      organization: "Innovations in Education and Teaching International",
      description: "",
      icon: <FileText className="h-10 w-10 text-primary/60 mb-2" />
    },
    {
      year: "Since 2024",
      role: "Journal Reviewer",
      organization: "Education and Information Technologies",
      description: "",
      icon: <FileText className="h-10 w-10 text-primary/60 mb-2" />
    },
    {
      year: "Since 2024",
      role: "Journal Reviewer",
      organization: "Computer Assisted Language Learning",
      description: "",
      icon: <FileText className="h-10 w-10 text-primary/60 mb-2" />
    },
    {
      year: "Since 2024",
      role: "Journal Reviewer",
      organization: "Computer-Assisted Language Learning Electronic Journal",
      description: "",
      icon: <FileText className="h-10 w-10 text-primary/60 mb-2" />
    },
    {
      year: "Since 2024",
      role: "Program Committee Member",
      organization: "ISLS/ICLS - The International Society of the Learning Sciences",
      description: "",
      icon: <Users className="h-10 w-10 text-primary/60 mb-2" />
    },
    {
      year: "Since 2024",
      role: "Program Committee Member",
      organization: "SITE - Society for Information Technology and Teacher Education",
      description: "",
      icon: <Users className="h-10 w-10 text-primary/60 mb-2" />
    },
    {
      year: "Since 2024",
      role: "Program Committee Member",
      organization: "AECT International Convention - Association for Educational Communications & Technology",
      description: "",
      icon: <Users className="h-10 w-10 text-primary/60 mb-2" />
    },
    {
      year: "Since 2024",
      role: "Program Committee Member",
      organization: "ACM Learning @ Scale - Georgia Institute of Technology",
      description: "",
      icon: <Users className="h-10 w-10 text-primary/60 mb-2" />
    }
  ];

  return (
    <section className="space-y-8">
      <div>
        <h1 className="flex items-center gap-2">
          <Award className="h-8 w-8 text-primary" />
          Professional Service
        </h1>
        <p className="text-lg text-muted-foreground">
          Academic and professional contributions to the field.
        </p>
      </div>

      <div className="space-y-5">
        {professionalService.map((item, index) => (
          <Card key={index} className="overflow-hidden transition-shadow hover:shadow-md">
            <div className="flex flex-col md:flex-row">
              <div className="flex items-center justify-center md:justify-start p-6 bg-primary/5 md:w-48 shrink-0">
                <div className="flex flex-col items-center">
                  {item.icon}
                  <span className="text-lg font-medium">{item.year}</span>
                </div>
              </div>
              
              <div className="flex-1 p-6">
                <CardHeader className="p-0 pb-3">
                  <div className="flex flex-wrap gap-2 items-center mb-2">
                    <CardTitle>{item.role}</CardTitle>
                  </div>
                  {item.organization && (
                    <CardDescription className="text-base">
                      {item.organization}
                    </CardDescription>
                  )}
                </CardHeader>
                {item.description && (
                  <CardContent className="p-0 pt-2">
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Service;
