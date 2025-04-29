
import { Award, BookText, FileText, Users } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const Service = () => {
  const professionalService = [
    {
      role: "Scholarships Reviewer",
      organization: "ISLS/ICLS - The International Society of the Learning Sciences Travel to Helsinki Scholarships (Equity Travel Support and ILSSA Annual Meeting Scholarship)",
      period: "2025",
      description: ""
    },
    {
      role: "Student Representative and Proposal Evaluator",
      organization: "Faculty Technology Initiatives, College of Education and Human Development, Georgia State University",
      period: "2025",
      description: ""
    },
    {
      role: "Journal Reviewer",
      organization: "Innovations in Education and Teaching International",
      period: "Since 2024",
      description: ""
    },
    {
      role: "Journal Reviewer",
      organization: "Education and Information Technologies",
      period: "Since 2024",
      description: ""
    },
    {
      role: "Journal Reviewer",
      organization: "Computer Assisted Language Learning",
      period: "Since 2024",
      description: ""
    },
    {
      role: "Journal Reviewer",
      organization: "Computer-Assisted Language Learning Electronic Journal",
      period: "Since 2024",
      description: ""
    },
    {
      role: "Program Committee Member",
      organization: "ISLS/ICLS - The International Society of the Learning Sciences",
      period: "Since 2024",
      description: ""
    },
    {
      role: "Program Committee Member",
      organization: "SITE - Society for Information Technology and Teacher Education",
      period: "Since 2024",
      description: ""
    },
    {
      role: "Program Committee Member",
      organization: "AECT International Convention - Association for Educational Communications & Technology",
      period: "Since 2024",
      description: ""
    },
    {
      role: "Program Committee Member",
      organization: "ACM Learning @ Scale - Georgia Institute of Technology",
      period: "Since 2024",
      description: ""
    }
  ];

  return (
    <section className="space-y-8">
      <div className="relative mb-8">
        <div className="bg-black py-4 px-6 text-white text-center rounded-sm">
          <h1 className="text-xl font-semibold">Professional Service</h1>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <FileText className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-semibold">Academic & Professional Service</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {professionalService.map((item, index) => (
          <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardHeader className="bg-muted/30">
              <CardTitle className="text-xl">{item.role}</CardTitle>
              <CardDescription className="line-clamp-2 text-foreground/70">{item.organization}</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-sm font-medium text-primary">{item.period}</p>
              {item.description && <p className="mt-2 text-muted-foreground">{item.description}</p>}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Service;
