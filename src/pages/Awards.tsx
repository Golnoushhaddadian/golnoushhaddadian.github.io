
import { Award } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const Awards = () => {
  const awards = [
    {
      year: "2023",
      title: "Distinguished Research Award",
      organization: "National Science Foundation",
      description: "Awarded for exceptional contributions to the field of [your research area]."
    },
    {
      year: "2022",
      title: "Excellence in Teaching",
      organization: "University Teaching Center",
      description: "Recognized for innovative teaching methods and exceptional student feedback."
    },
    {
      year: "2021",
      title: "Best Paper Award",
      organization: "International Conference on [Your Field]",
      description: "For the paper titled \"[Your Paper Title]\" which presented groundbreaking research on [topic]."
    },
    {
      year: "2020",
      title: "Research Grant",
      organization: "Industry Research Foundation",
      description: "$250,000 grant to support research on [specific project or topic]."
    },
    {
      year: "2019",
      title: "Early Career Achievement Award",
      organization: "Professional Association of [Your Field]",
      description: "Recognizing promising contributions to the advancement of knowledge in [field]."
    }
  ];

  return (
    <section className="space-y-8">
      <div>
        <h1>Awards & Recognition</h1>
        <p className="text-lg text-muted-foreground">
          Recognition for contributions to research, teaching, and service.
        </p>
      </div>

      <div className="space-y-4">
        {awards.map((award, index) => (
          <Card key={index} className="overflow-hidden transition-shadow hover:shadow-md">
            <div className="flex flex-col md:flex-row">
              <div className="flex items-center justify-center md:justify-start p-6 bg-primary/5 md:w-1/5">
                <div className="flex flex-col items-center">
                  <Award className="h-10 w-10 text-primary/60 mb-2" />
                  <span className="text-lg font-medium">{award.year}</span>
                </div>
              </div>
              
              <div className="flex-1 p-6">
                <CardHeader className="p-0 pb-4">
                  <CardTitle>{award.title}</CardTitle>
                  <CardDescription>{award.organization}</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <p>{award.description}</p>
                </CardContent>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Awards;
