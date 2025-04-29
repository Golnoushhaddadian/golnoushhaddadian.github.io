
import { Award, Trophy, Medal, GraduationCap, Star } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Awards = () => {
  const awards = [
    {
      year: "2025",
      title: "AI4ED Summer Fellowship ($12,500)",
      organization: "AI in Education Interest Group, The AI Institutes Virtual Organization (AIVO)",
      description: "Awarded to selected graduate researchers representing five major AI in Education Institutes across U.S. (iSAT, AI-ALOE, EngageAI, AI4ExceptionalEd, and INVITE). AIVO acts as a central hub connecting the 27 major AI Institutes across U.S., supporting research that advances U.S. innovation and well-being. Funded by the National Science Foundation and Google.org.",
      location: "AIVO, Washington, DC",
      icon: <Medal className="h-10 w-10 text-primary/60 mb-2" />
    },
    {
      year: "2025",
      title: "Outstanding Ph.D. Student in Learning Technologies (LT) Award",
      organization: "College of Education & Human Development (CEHD)",
      description: "Given to a student who has demonstrated potential for excellence in research, teaching and service in instructional technology.",
      location: "Georgia State University, Atlanta, GA",
      icon: <Trophy className="h-10 w-10 text-primary/60 mb-2" />
    },
    {
      year: "2025",
      title: "Graduate Student Travel Award ($500)",
      organization: "College of Education & Human Development (CEHD), Learning Technology Department",
      description: "",
      location: "Georgia State University, Atlanta, GA",
      icon: <Award className="h-10 w-10 text-primary/60 mb-2" />
    },
    {
      year: "2024",
      title: "Graduate Student Travel Award ($500)",
      organization: "College of Education & Human Development (CEHD), Learning Technology Department",
      description: "",
      location: "Georgia State University, Atlanta, GA",
      icon: <Award className="h-10 w-10 text-primary/60 mb-2" />
    },
    {
      year: "2024",
      title: "Conference Paper Award",
      organization: "Association for the Advancement of Computing in Education (AACE)",
      description: "Awarded to papers distinguished as outstanding by the AACE Program Committee for exceptional quality, originality, and significant scholarly contribution.",
      location: "Society for Information Technology & Teacher Education, Las Vegas, Nevada & Waynesville, NC",
      icon: <Star className="h-10 w-10 text-primary/60 mb-2" />
    },
    {
      year: "2023",
      title: "Doctoral Student Fellowship Award ($15,000)",
      organization: "College of Education & Human Development (CEHD), Learning Technology Department",
      description: "Given to three PhD students who demonstrate exceptional scholarship and academic potential in the Learning Technologies (LT) department.",
      location: "Georgia State University, Atlanta, GA",
      icon: <Medal className="h-10 w-10 text-primary/60 mb-2" />
    },
    {
      year: "2023",
      title: "Graduate Student Travel Award ($500)",
      organization: "College of Education & Human Development (CEHD), Learning Technology Department",
      description: "",
      location: "Georgia State University, Atlanta, GA",
      icon: <Award className="h-10 w-10 text-primary/60 mb-2" />
    },
    {
      year: "2014",
      title: "Ranked 1st in GPA for Master's Degree",
      organization: "",
      description: "",
      location: "",
      icon: <GraduationCap className="h-10 w-10 text-primary/60 mb-2" />
    },
    {
      year: "2013",
      title: "Innovative and Supportive Teacher of Foreign Languages Award",
      organization: "Balan Language Academy",
      description: "",
      location: "Tehran, Iran",
      icon: <Award className="h-10 w-10 text-primary/60 mb-2" />
    },
    {
      year: "2012",
      title: "Admitted to the M.A. program at Sharif University of Technology as Exceptional Talented Student",
      organization: "National Organization for Development of Exceptional Talents",
      description: "",
      location: "Tehran, Iran",
      icon: <Star className="h-10 w-10 text-primary/60 mb-2" />
    },
    {
      year: "2012",
      title: "Ranked in Top 1% among all participants in the Master's Degree Nationwide University Entrance Exam",
      organization: "",
      description: "",
      location: "Tehran, Iran",
      icon: <Medal className="h-10 w-10 text-primary/60 mb-2" />
    },
    {
      year: "2012",
      title: "Ranked 1st in GPA for Bachelor's Degree",
      organization: "",
      description: "",
      location: "",
      icon: <GraduationCap className="h-10 w-10 text-primary/60 mb-2" />
    },
    {
      year: "2010",
      title: "Outstanding Teacher of Foreign Languages Award",
      organization: "Aryana Fanavaran Institute of Technology",
      description: "",
      location: "Tehran, Iran",
      icon: <Award className="h-10 w-10 text-primary/60 mb-2" />
    },
    {
      year: "2006",
      title: "Distinguished Student Researcher Award",
      organization: "Young Researchers and Elite Club",
      description: "",
      location: "Tehran, Iran",
      icon: <Star className="h-10 w-10 text-primary/60 mb-2" />
    },
    {
      year: "2005",
      title: "Outstanding Student Researcher Award",
      organization: "Shahid Shamloo High School",
      description: "",
      location: "Tehran, Iran",
      icon: <Star className="h-10 w-10 text-primary/60 mb-2" />
    }
  ];

  return (
    <section className="space-y-8">
      <div>
        <h1 className="flex items-center gap-2">
          <Trophy className="h-8 w-8 text-primary" />
          Awards & Recognition
        </h1>
        <p className="text-lg text-muted-foreground">
          Recognition for contributions to research, teaching, and service.
        </p>
      </div>

      <div className="space-y-5">
        {awards.map((award, index) => (
          <Card key={index} className="overflow-hidden transition-shadow hover:shadow-md">
            <div className="flex flex-col md:flex-row">
              <div className="flex items-center justify-center md:justify-start p-6 bg-primary/5 md:w-48 shrink-0">
                <div className="flex flex-col items-center">
                  {award.icon}
                  <span className="text-lg font-medium">{award.year}</span>
                </div>
              </div>
              
              <div className="flex-1 p-6">
                <CardHeader className="p-0 pb-3">
                  <div className="flex flex-wrap gap-2 items-center mb-2">
                    <CardTitle>{award.title}</CardTitle>
                  </div>
                  {award.organization && (
                    <CardDescription className="text-base">
                      {award.organization}
                    </CardDescription>
                  )}
                  {award.location && (
                    <Badge variant="outline" className="mt-1">
                      {award.location}
                    </Badge>
                  )}
                </CardHeader>
                {award.description && (
                  <CardContent className="p-0 pt-2">
                    <p className="text-sm text-muted-foreground">{award.description}</p>
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

export default Awards;
