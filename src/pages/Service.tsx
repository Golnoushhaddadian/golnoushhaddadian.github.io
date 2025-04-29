
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const Service = () => {
  const academicService = [
    {
      role: "Journal Reviewer",
      organization: "Journal of [Your Field]",
      period: "2020 - Present",
      description: "Review manuscripts in the areas of [specific sub-fields]. Evaluated approximately 15 manuscripts annually, providing detailed feedback to authors and editors."
    },
    {
      role: "Conference Program Committee",
      organization: "International Conference on [Your Field]",
      period: "2021 - Present",
      description: "Serve on the program committee reviewing conference submissions and helping organize conference sessions."
    },
    {
      role: "Faculty Senate Representative",
      organization: "University Academic Council",
      period: "2022 - Present",
      description: "Represent department interests at university-level governance meetings. Serve on the curriculum committee reviewing proposed academic programs."
    }
  ];

  const professionalService = [
    {
      role: "Committee Member",
      organization: "Professional Association of [Your Field]",
      period: "2019 - Present",
      description: "Member of the education committee working to develop professional development resources for early-career researchers."
    },
    {
      role: "Workshop Organizer",
      organization: "Annual Summer School on [Topic]",
      period: "2021, 2022",
      description: "Co-organized a week-long workshop for graduate students and early-career researchers. Developed curriculum and recruited guest lecturers."
    }
  ];

  const communityService = [
    {
      role: "Mentor",
      organization: "Community Science Education Program",
      period: "2020 - Present",
      description: "Work with high school students from underrepresented backgrounds interested in [your field]. Provide guidance on college applications and career paths in STEM fields."
    },
    {
      role: "Volunteer",
      organization: "Regional Science Fair",
      period: "2018 - Present",
      description: "Judge student projects and provide constructive feedback to encourage interest in [your field]."
    }
  ];

  return (
    <section className="space-y-8">
      <div>
        <h1>Service</h1>
        <p className="text-lg text-muted-foreground">
          Contributions to academic, professional, and community organizations.
        </p>
      </div>

      <div className="space-y-6">
        <h2>Academic Service</h2>
        <div className="space-y-4">
          {academicService.map((item, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-xl">{item.role}</CardTitle>
                <CardDescription>{item.organization} • {item.period}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <h2>Professional Service</h2>
        <div className="space-y-4">
          {professionalService.map((item, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-xl">{item.role}</CardTitle>
                <CardDescription>{item.organization} • {item.period}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <h2>Community Service</h2>
        <div className="space-y-4">
          {communityService.map((item, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-xl">{item.role}</CardTitle>
                <CardDescription>{item.organization} • {item.period}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Service;
