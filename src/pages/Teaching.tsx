
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const Teaching = () => {
  const courses = [
    {
      code: "COURSE 101",
      title: "Introduction to [Subject]",
      term: "Fall 2023",
      description: "This foundational course introduces students to key concepts in [subject area]. Topics include [topic 1], [topic 2], and [topic 3]. Students develop skills in [skill area] through hands-on projects and problem-solving activities.",
      highlights: [
        "Designed interactive learning materials that improved student engagement by 30%",
        "Implemented innovative assessment strategies focused on practical application",
        "Mentored 5 undergraduate teaching assistants"
      ]
    },
    {
      code: "COURSE 201",
      title: "Intermediate [Subject]",
      term: "Spring 2023",
      description: "Building on foundational knowledge, this course explores advanced topics in [subject area]. Students engage with current research and develop [specific skills] through a semester-long project.",
      highlights: [
        "Created a project-based curriculum that received outstanding student evaluations",
        "Developed open educational resources now used by other instructors",
        "Guided 3 student research projects that resulted in conference presentations"
      ]
    },
    {
      code: "COURSE 305",
      title: "Advanced Topics in [Subject]",
      term: "Winter 2022",
      description: "This seminar course examines cutting-edge research and advanced methodologies in [subject area]. Students critically analyze current literature and develop independent research proposals.",
      highlights: [
        "Facilitated weekly discussions of current research papers",
        "Organized guest lectures from industry experts and academic researchers",
        "Supervised capstone projects with real-world applications"
      ]
    }
  ];

  const philosophy = [
    "I believe in creating an inclusive learning environment that encourages critical thinking and intellectual curiosity. My teaching approach emphasizes active learning strategies that engage students in the material beyond memorization.",
    "My courses integrate theoretical foundations with practical applications, preparing students for real-world challenges in the field. I incorporate current research and emerging trends to ensure relevance.",
    "I strive to meet diverse learning needs by providing multiple pathways to understanding complex concepts. This includes visual learning aids, hands-on activities, and opportunities for collaborative problem-solving."
  ];

  return (
    <section className="space-y-8">
      <div>
        <h1>Teaching</h1>
        <p className="text-lg text-muted-foreground">
          My teaching philosophy and course offerings.
        </p>
      </div>

      <div className="space-y-6">
        <h2>Teaching Philosophy</h2>
        <div className="space-y-4">
          {philosophy.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <h2>Courses Taught</h2>
        <div className="space-y-6">
          {courses.map((course, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <CardTitle>{course.title}</CardTitle>
                    <CardDescription className="mt-1">{course.code} • {course.term}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>{course.description}</p>
                <div>
                  <h4 className="text-sm font-medium mb-2">Highlights:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {course.highlights.map((highlight, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground">{highlight}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Teaching;
