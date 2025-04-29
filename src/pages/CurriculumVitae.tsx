
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const CurriculumVitae = () => {
  const education = [
    {
      degree: "Ph.D. in [Field]",
      institution: "University Name",
      location: "City, State",
      period: "2015 - 2020",
      details: "Thesis: \"[Thesis Title]\" - Advisor: Professor [Name]"
    },
    {
      degree: "M.S. in [Field]",
      institution: "University Name",
      location: "City, State",
      period: "2013 - 2015",
      details: "Thesis: \"[Thesis Title]\" - Advisor: Professor [Name]"
    },
    {
      degree: "B.S. in [Field]",
      institution: "University Name",
      location: "City, State",
      period: "2009 - 2013",
      details: "Graduated with honors, GPA: 3.9/4.0"
    }
  ];

  const employment = [
    {
      position: "Assistant Professor",
      institution: "University Name",
      location: "City, State",
      period: "2020 - Present",
      responsibilities: [
        "Conduct research in [research area]",
        "Teach undergraduate and graduate courses",
        "Mentor graduate students",
        "Serve on departmental and university committees"
      ]
    },
    {
      position: "Postdoctoral Researcher",
      institution: "Research Institute",
      location: "City, State",
      period: "2018 - 2020",
      responsibilities: [
        "Led research project on [topic]",
        "Collaborated with international research teams",
        "Published findings in top-tier journals",
        "Presented at international conferences"
      ]
    },
    {
      position: "Graduate Research Assistant",
      institution: "University Name",
      location: "City, State",
      period: "2015 - 2018",
      responsibilities: [
        "Assisted with experimental design and data analysis",
        "Developed new methodologies for [specific task]",
        "Contributed to grant proposals and reports"
      ]
    }
  ];

  const skills = [
    {
      category: "Research Methods",
      items: ["Method 1", "Method 2", "Method 3", "Method 4"]
    },
    {
      category: "Technical Skills",
      items: ["Skill 1", "Skill 2", "Skill 3", "Skill 4", "Skill 5"]
    },
    {
      category: "Languages",
      items: ["Language 1 (Native)", "Language 2 (Fluent)", "Language 3 (Intermediate)"]
    },
    {
      category: "Software & Tools",
      items: ["Software 1", "Software 2", "Software 3", "Software 4"]
    }
  ];

  return (
    <section className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1>CV</h1>
          <p className="text-lg text-muted-foreground">
            Academic and professional background.
          </p>
        </div>
        <Button className="w-full sm:w-auto" asChild>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <Download className="mr-2 h-4 w-4" />
            <span>Download Full CV (PDF)</span>
          </a>
        </Button>
      </div>

      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Education</h2>
            </div>
            <Separator />
            <div className="space-y-4">
              {education.map((item, index) => (
                <div key={index} className="pl-4 border-l-2 border-muted">
                  <h3 className="font-semibold">{item.degree}</h3>
                  <div className="text-sm text-muted-foreground mb-1">
                    {item.institution}, {item.location} | {item.period}
                  </div>
                  <p className="text-sm">{item.details}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Employment</h2>
            </div>
            <Separator />
            <div className="space-y-6">
              {employment.map((item, index) => (
                <div key={index} className="pl-4 border-l-2 border-muted">
                  <h3 className="font-semibold">{item.position}</h3>
                  <div className="text-sm text-muted-foreground mb-2">
                    {item.institution}, {item.location} | {item.period}
                  </div>
                  <ul className="list-disc pl-5 space-y-1">
                    {item.responsibilities.map((resp, idx) => (
                      <li key={idx} className="text-sm">{resp}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Skills</h2>
            </div>
            <Separator />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((category, index) => (
                <div key={index}>
                  <h3 className="font-semibold mb-2">{category.category}</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {category.items.map((item, idx) => (
                      <li key={idx} className="text-sm">{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center text-sm text-muted-foreground">
        <p>This is an abbreviated version. Download the full CV for complete details including publications, presentations, grants, and more.</p>
      </div>
    </section>
  );
};

export default CurriculumVitae;
