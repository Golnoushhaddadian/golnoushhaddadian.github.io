
import { Button } from "@/components/ui/button";
import { Download, FileText, Award, Users, BookText, Laptop, Globe, Mail, GraduationCap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const CurriculumVitae = () => {
  const education = [
    {
      degree: "Ph.D. Candidate in Learning Sciences",
      institution: "Georgia State University",
      location: "Georgia, USA",
      period: "August 2021 - present",
      gpa: "GPA: 4.14/4.00 (Honored Student)",
      details: [
        "Thesis: Design and Development of an AI-Augmented Feedback System to Enhance Argumentative Writing Proficiency Among EFL Learners",
        "Learning tool: RITA - Real-time Intelligent Technology for Argumentative Writing (Under Development)",
        "Advisor: Professor Kim, M. K.",
        "Committee: Darling-Aduana, J. & Shapiro, B. R.",
        "AI2 Research Laboratory: AI2 stands for Artificial intelligence (A), Interactive (I), Augmented (A), and Immersive (I) learning environments."
      ]
    },
    {
      degree: "M.A. in Applied Linguistics",
      institution: "Sharif University of Technology",
      location: "Tehran, Iran",
      period: "September 2012 - September 2014",
      gpa: "GPA: 4.00/4.00 (Honored Student)",
      details: [
        "Thesis: Design and Development of a Computerized Adaptive Software to Test Written Receptive Vocabulary Knowledge of Foreign Language Learners",
        "Learning tool: CATWRV - Computer Adaptive Test of Written Receptive Vocabulary (Patent Application in Progress)",
        "Advisor: Professor Salehi, M.",
        "Committee: Alemi, M. & Khomeijani Farahani, A."
      ]
    },
    {
      degree: "B.A. in English Language Translation",
      institution: "Kar Institute of Higher Education, Emam Khomeiny International University",
      location: "Qazvin, Iran",
      period: "February 2008 - June 2012",
      gpa: "GPA: 3.71/4.00 (Honored Student)",
      details: []
    }
  ];

  const research = [
    {
      title: "AI Institutes Virtual Organization (AIVO) – AI4Ed Summer Program",
      position: "Graduate Fellow",
      period: "Summer 2025",
      funder: "Funded by Google.org",
      description: "This collaborative program brings together graduate student researchers from five NSF-funded national AI institutes dedicated to advancing AI applications in education."
    },
    {
      title: "Secure and Trustworthy Cyberspace (SaTC): Private Artificial Intelligence (AI)",
      position: "Graduate Research Associate",
      period: "August 2021 - present",
      funder: "Funded by the National Science Foundation (NSF)",
      description: "This interdisciplinary project focuses on artificial intelligence (AI) and privacy, supported by the Secure and Trustworthy Cyberspace (SaTC) program."
    },
    {
      title: "AI Institute for Adult Learning and Online Education (ALOE)",
      position: "Graduate Research Associate",
      period: "January 2022 - August 2022",
      funder: "Funded by the National Science Foundation (NSF)",
      description: "This interdisciplinary project aims to transform online adult learning through AI-driven models grounded in cognitive and social learning theories."
    },
    {
      title: "IUSE-Engaged Student Learning (Level 1): AI-Scaffolded Pre-Classroom Learning for Large/Introductory Undergraduate Physics Courses",
      position: "Researcher",
      period: "August 2024 - present",
      funder: "Funded by the National Science Foundation (NSF)",
      description: "This project designs and implements AI-augmented formative assessment and feedback systems to help students build skills for in-classroom interactive problem-solving activities."
    }
  ];

  const publications = [
    {
      type: "Journal Articles",
      items: [
        "Haddadian, G., Panzade, P., Takabi, D., & Kim, M. K. (2025). Problem-centered post-secondary computer science education: A study of the private artificial intelligence curriculum. International Journal of Technology in Education (IJTE), 8(2), 1-26.",
        "Haddadian, G., Radmanesh, S., & Haddadian, N. (2024). Construction and validation of a Computerized Formative Assessment Literacy (CFAL) questionnaire for language teachers: An exploratory sequential mixed-methods investigation. Language Testing in Asia, 14(33).",
        "Haddadian, G., & Haddadian, N. (2024). Innovative Use of Grammarly Feedback for Improving EFL Learners' Speaking: Learners' Perceptions and Transformative Engagement Experiences in Focus. The Journal of Applied Instructional Design, 13(2).",
        "Haddadian, G. (2024). Comparing the Effects of Teacher Feedback, Automated Feedback, and Integrative Feedback on EFL Learners' Writing Accuracy and Writing Apprehension. Computer-Assisted Language Learning Electronic Journal, 25(3), 124-147.",
        "Haddadian, G., & Mahmoodi-Bakhtiari, B. (2018). Conversational Repairs in Persian Dramatic Discourse: Akbar Radi's Pellekân (The Steps). Persian Literary Studies Journal, 7(11), 65-82."
      ]
    },
    {
      type: "Conference Proceedings",
      items: [
        "Noroozi, O., Haddadian, G., Gao, X., Schunn, C. D., Alqassab, M., & Banihashem, S. K. (Accepted). Supporting peer feedback provision and uptake with GenAI. International Conference of the Learning Sciences – ICLS/ISLS 2025.",
        "Haddadian, G., Han, H., Kim, M. Kim, J., Bae, Y. (Accepted). Automated Generation of Expert Models with Generative AI. International Conference of the Learning Sciences – ICLS/ISLS 2025.",
        "Haddadian, G., Panzade, P., Takabi, D., & Kim, M. K. (2024). Evaluating Private Artificial Intelligence (AI) Curriculum in Computer Science (CS) Education: Insights for Advancing Student-Centered CS Learning. In Proceedings of the 18th International Conference of the Learning Sciences-ICLS 2024, pp. 2271-2272."
      ]
    }
  ];

  const skills = [
    {
      category: "Quantitative Analysis",
      items: ["SPSS", "RapidMiner", "Power Automate (in Process Mining)"]
    },
    {
      category: "Qualitative Analysis",
      items: ["Dedoose", "NVivo", "Transana", "ATLAS.ti", "MAXQDA"]
    },
    {
      category: "Visualization",
      items: ["Tableau", "Infranodus", "Social Worker", "Gephi (in Social Network Analysis)"]
    },
    {
      category: "Web & Programming",
      items: ["WordPress", "HTML/CSS", "Python", "R"]
    },
    {
      category: "Multimedia & Design",
      items: ["Premiere", "Audition", "Director", "Flash", "Lightroom", "Publisher", "Multimedia Builder", "Photoshop"]
    },
    {
      category: "Languages",
      items: ["Persian: Native", "English: Proficient", "Arabic & Deutsch: pre-intermediate"]
    }
  ];

  const teaching = [
    {
      position: "Instructor for "Computer Skills for the Information Age" Course",
      institution: "Georgia State University",
      period: "Fall 2022 to present",
      audience: "Undergraduate Students",
      description: "In this course, students learn essential computer skills for organizing, analyzing, and communicating data. The focus is on empowering students to excel in various areas, including using word processing tools, spreadsheets, and databases."
    },
    {
      position: "TOEFL coach, TESOL trainer, EFL Instructor",
      institution: "RadGuyesh Haddadian International Institute",
      period: "January 2019 to 2021",
      audience: "Adult Learners, Teachers",
      description: "Several courses were taught by me at this institute. The institute is a multidisciplinary educational center specializing in English language learning and computer science."
    },
    {
      position: "Adjunct Instructor for "English for Master of Business Administration (MBA)"",
      institution: "Andisheh Moein Institute of Higher Education",
      period: "Fall 2019",
      audience: "Graduate Students",
      description: "In this course, students develop the language skills required for success in business-related academic and professional settings."
    }
  ];

  return (
    <section className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1>Curriculum Vitae</h1>
          <p className="text-lg text-muted-foreground">
            Academic and professional background of Golnoush (Lia) Haddadian.
          </p>
        </div>
        <Button className="w-full sm:w-auto" asChild>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <Download className="mr-2 h-4 w-4" />
            <span>Download Full CV (PDF)</span>
          </a>
        </Button>
      </div>

      {/* Education Section */}
      <Card className="overflow-hidden border-none shadow-md">
        <div className="bg-gradient-to-r from-purple-100 to-indigo-50 dark:from-indigo-950 dark:to-purple-900 p-4 flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-xl font-semibold text-indigo-700 dark:text-indigo-300">Education</h2>
        </div>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-6">
            {education.map((item, index) => (
              <div key={index} className="pl-4 border-l-2 border-indigo-200 dark:border-indigo-800">
                <h3 className="font-semibold text-lg">{item.degree}</h3>
                <div className="text-sm text-muted-foreground mb-1">
                  {item.institution}, {item.location} | {item.period}
                </div>
                <div className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-2">{item.gpa}</div>
                {item.details.length > 0 && (
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    {item.details.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Research Projects */}
      <Card className="overflow-hidden border-none shadow-md">
        <div className="bg-gradient-to-r from-blue-100 to-cyan-50 dark:from-blue-950 dark:to-cyan-900 p-4 flex items-center gap-2">
          <Laptop className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl font-semibold text-blue-700 dark:text-blue-300">Research Projects</h2>
        </div>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-6">
            {research.map((item, index) => (
              <div key={index} className="pl-4 border-l-2 border-blue-200 dark:border-blue-800">
                <h3 className="font-semibold">{item.title}</h3>
                <div className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">
                  {item.position} | {item.period}
                </div>
                <div className="text-sm text-muted-foreground mb-2">{item.funder}</div>
                <p className="text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Publications */}
      <Card className="overflow-hidden border-none shadow-md">
        <div className="bg-gradient-to-r from-green-100 to-emerald-50 dark:from-green-950 dark:to-emerald-900 p-4 flex items-center gap-2">
          <BookText className="h-5 w-5 text-green-600 dark:text-green-400" />
          <h2 className="text-xl font-semibold text-green-700 dark:text-green-300">Publications</h2>
        </div>
        <CardContent className="p-6 space-y-6">
          {publications.map((section, i) => (
            <div key={i} className="space-y-4">
              <h3 className="font-semibold text-lg">{section.type}</h3>
              <ul className="pl-5 space-y-4">
                {section.items.map((item, idx) => (
                  <li key={idx} className="text-sm pb-2 border-b border-green-100 dark:border-green-800 last:border-0">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Teaching Experience */}
      <Card className="overflow-hidden border-none shadow-md">
        <div className="bg-gradient-to-r from-amber-100 to-yellow-50 dark:from-amber-950 dark:to-yellow-900 p-4 flex items-center gap-2">
          <Users className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          <h2 className="text-xl font-semibold text-amber-700 dark:text-amber-300">Teaching Experience</h2>
        </div>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-6">
            {teaching.map((item, index) => (
              <div key={index} className="pl-4 border-l-2 border-amber-200 dark:border-amber-800">
                <h3 className="font-semibold">{item.position}</h3>
                <div className="text-sm text-amber-600 dark:text-amber-400 font-medium mb-1">
                  {item.institution} | {item.period}
                </div>
                <div className="text-sm text-muted-foreground mb-2">Audience: {item.audience}</div>
                <p className="text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Skills */}
      <Card className="overflow-hidden border-none shadow-md">
        <div className="bg-gradient-to-r from-rose-100 to-pink-50 dark:from-rose-950 dark:to-pink-900 p-4 flex items-center gap-2">
          <Award className="h-5 w-5 text-rose-600 dark:text-rose-400" />
          <h2 className="text-xl font-semibold text-rose-700 dark:text-rose-300">Skills</h2>
        </div>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((category, index) => (
              <div key={index} className="space-y-2">
                <h3 className="font-semibold text-rose-600 dark:text-rose-400">{category.category}</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {category.items.map((item, idx) => (
                    <li key={idx} className="text-sm">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* References */}
      <Card className="overflow-hidden border-none shadow-md">
        <div className="bg-gradient-to-r from-violet-100 to-purple-50 dark:from-violet-950 dark:to-purple-900 p-4 flex items-center gap-2">
          <Mail className="h-5 w-5 text-violet-600 dark:text-violet-400" />
          <h2 className="text-xl font-semibold text-violet-700 dark:text-violet-300">References</h2>
        </div>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="pl-4 border-l-2 border-violet-200 dark:border-violet-800">
              <h3 className="font-semibold">Min Kyu Kim, Ph.D., Associate Professor</h3>
              <div className="text-sm mb-1">Relationship: Academic Advisor</div>
              <div className="text-sm text-muted-foreground">
                Department of Learning Sciences, Georgia State University<br />
                238 College of Education and Human Development, 30 Pryor St SW, Atlanta, GA 30303<br />
                Tel: 404-413-8157, E-mail: mkim120@gsu.edu
              </div>
            </div>
            <p className="text-sm text-center text-muted-foreground italic mt-4">
              Further references are available upon request.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="text-center text-sm text-muted-foreground mt-8">
        <p>This CV was last updated on April 29, 2025.</p>
      </div>
    </section>
  );
};

export default CurriculumVitae;
