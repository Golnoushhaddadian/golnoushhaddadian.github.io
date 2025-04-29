
import { GraduationCap, School } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const Education = () => {
  const educationItems = [
    {
      degree: "Ph.D. Candidate in Learning Sciences",
      gpa: "4.14/4.00",
      institution: "Georgia State University",
      location: "Georgia, USA",
      period: "August 2021 - present",
      color: "bg-violet-100 dark:bg-violet-950",
      icon: <GraduationCap className="h-10 w-10" />,
      lab: "AI2 Research Laboratory",
      labDescription: "AI2 stands for Artificial intelligence (A), Interactive (I), Augmented (A), and Immersive (I) learning environments. AI2 represents the innovative learning environments we pursue to advance more adaptable, engaged, equitable, and effective teaching and learning in various educational contexts. We build on the legacy of our understanding of how people learn to answer the question, how we can scaffold people to learn better. Our endeavor to promote AI2 learning is driven by our belief that most learners can achieve learning goals if provided with appropriate instructional support. Founding director: Professor Min Kyu Kim.",
      thesis: "Design and Development of an AI-Augmented Feedback System to Enhance Argumentative Writing Proficiency Among EFL Learners",
      tool: "RITA - Real-time Intelligent Technology for Argumentative Writing (Under Development)",
      advisor: "Professor Kim, M. K.",
      committee: "Darling-Aduana, J. & Shapiro, B. R."
    },
    {
      degree: "M.A. in Applied Linguistics",
      gpa: "4.00/4.00",
      institution: "Sharif University of Technology",
      location: "Tehran, Iran",
      period: "September 2012 - September 2014",
      color: "bg-blue-100 dark:bg-blue-950",
      icon: <School className="h-10 w-10" />,
      thesis: "Design and Development of a Computerized Adaptive Software to Test Written Receptive Vocabulary Knowledge of Foreign Language Learners",
      tool: "CATWRV - Computer Adaptive Test of Written Receptive Vocabulary (Patent Application in Progress)",
      advisor: "Professor Salehi, M.",
      committee: "Alemi, M. & Khomeijani Farahani, A."
    },
    {
      degree: "B.A. in English Language Translation",
      gpa: "3.71/4.00",
      institution: "Kar Institute of Higher Education, Emam Khomeiny International University",
      location: "Qazvin, Iran",
      period: "February 2008 - June 2012",
      color: "bg-emerald-100 dark:bg-emerald-950",
      icon: <School className="h-10 w-10" />
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-2">
          <GraduationCap className="h-8 w-8 text-primary" />
          Education
        </h1>
        <p className="text-lg text-muted-foreground mb-6">
          Academic journey and qualifications
        </p>
      </div>

      <motion.div 
        className="space-y-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {educationItems.map((edu, index) => (
          <motion.div key={index} variants={item}>
            <Card className="overflow-hidden transition-shadow hover:shadow-md border-l-4 border-primary">
              <div className="flex flex-col md:flex-row">
                <div className={`flex items-center justify-center md:justify-start p-6 ${edu.color} md:w-48 shrink-0`}>
                  <div className="flex flex-col items-center">
                    <div className="bg-background/90 rounded-full p-3 mb-2">
                      {edu.icon}
                    </div>
                    <span className="text-lg font-medium">{edu.period}</span>
                  </div>
                </div>
                
                <div className="flex-1 p-6">
                  <CardHeader className="p-0 pb-3">
                    <div className="flex flex-wrap gap-2 items-center mb-2">
                      <CardTitle>{edu.degree}</CardTitle>
                      <Badge variant="outline" className="ml-2">GPA: {edu.gpa}</Badge>
                      <Badge variant="secondary">Honored Student</Badge>
                    </div>
                    <CardDescription className="text-base">
                      {edu.institution}, {edu.location}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="p-0 pt-4 space-y-4">
                    {edu.lab && (
                      <div className="space-y-2">
                        <h4 className="font-semibold">{edu.lab}</h4>
                        <p className="text-muted-foreground text-sm">{edu.labDescription}</p>
                      </div>
                    )}
                    
                    {edu.thesis && (
                      <div className="space-y-2">
                        <h4 className="font-semibold">Thesis</h4>
                        <p>{edu.thesis}</p>
                        {edu.tool && <p className="text-sm">Learning tool: {edu.tool}</p>}
                      </div>
                    )}
                    
                    {edu.advisor && (
                      <div className="space-y-1">
                        <p><span className="font-medium">Advisor:</span> {edu.advisor}</p>
                        {edu.committee && <p><span className="font-medium">Committee:</span> {edu.committee}</p>}
                      </div>
                    )}
                  </CardContent>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Education;
