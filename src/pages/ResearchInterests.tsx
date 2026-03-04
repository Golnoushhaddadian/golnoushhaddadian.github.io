
import { 
  BookText, FileText, FileSearch, Layers, BookOpen, 
  GraduationCap, Users, Search, FileCode
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDocumentHead } from "@/hooks/useDocumentHead";

const ResearchInterests = () => {
  useDocumentHead({
    title: 'Research Interests — Golnoush Haddadian',
    description: 'Research interests of Golnoush Haddadian spanning educational technology, AI in education, assessment, and language learning.',
    canonical: '/research-interests',
  });
  const interestCategories = [
    {
      title: "Educational Technology",
      interests: [
        {
          icon: <BookText className="h-8 w-8 text-primary" />,
          title: "Instructional/Educational Technology",
          description: "Exploring innovative approaches to enhance learning through technology."
        },
        {
          icon: <GraduationCap className="h-8 w-8 text-primary" />,
          title: "AI in Education",
          description: "Investigating the role of AI in transforming educational practices."
        },
        {
          icon: <FileCode className="h-8 w-8 text-primary" />,
          title: "AI-Augmented Learning Environments",
          description: "Creating intelligent learning systems that adapt to learners' needs."
        },
        {
          icon: <Search className="h-8 w-8 text-primary" />,
          title: "Personalized Learning Environments",
          description: "Crafting tailored educational experiences for diverse learners."
        }
      ]
    },
    {
      title: "Assessment & Collaboration",
      interests: [
        {
          icon: <FileText className="h-8 w-8 text-primary" />,
          title: "Formative Assessment and Feedback",
          description: "Enhancing learning through strategic assessment and feedback processes."
        },
        {
          icon: <Users className="h-8 w-8 text-primary" />,
          title: "Peer Feedback",
          description: "Fostering student growth through structured peer evaluation systems."
        },
        {
          icon: <BookOpen className="h-8 w-8 text-primary" />,
          title: "Collaborative Learning",
          description: "Studying how learners co-construct knowledge and develop skills together."
        }
      ]
    },
    {
      title: "Language Learning & CALL",
      interests: [
        {
          icon: <Layers className="h-8 w-8 text-primary" />,
          title: "Automated Writing Evaluation Systems",
          description: "Developing tools to provide timely feedback on written assignments."
        },
        {
          icon: <FileSearch className="h-8 w-8 text-primary" />,
          title: "Essay Writing",
          description: "Improving argumentative and academic writing skills through technology."
        },
        {
          icon: <FileCode className="h-8 w-8 text-primary" />,
          title: "Computer Assisted Language Learning",
          description: "Using technology to enhance language acquisition and proficiency."
        }
      ]
    },
    {
      title: "Research Methodology",
      interests: [
        {
          icon: <BookText className="h-8 w-8 text-primary" />,
          title: "Curriculum Design and Development",
          description: "Creating innovative educational experiences that align with learning goals."
        },
        {
          icon: <FileSearch className="h-8 w-8 text-primary" />,
          title: "Design Based Research",
          description: "Iteratively improving educational interventions through systematic study."
        },
        {
          icon: <Layers className="h-8 w-8 text-primary" />,
          title: "Mixed-Methods Research",
          description: "Combining qualitative and quantitative approaches for comprehensive analysis."
        }
      ]
    }
  ];

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="container max-w-6xl mx-auto py-8 px-4">
      <div className="text-center mb-12">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">Research Interests</h1>
        <p className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-5xl mx-auto leading-relaxed">
          My research spans across educational technology, assessment methods, language learning, and innovative research methodologies, all aimed at creating more effective and equitable learning experiences.
        </p>
      </div>

      <Tabs defaultValue="Educational Technology" className="w-full">
        <TabsList className="flex justify-center mb-8 overflow-x-auto max-w-3xl mx-auto">
          {interestCategories.map((category) => (
            <TabsTrigger 
              key={category.title} 
              value={category.title}
              className="px-4 py-2 text-base"
            >
              {category.title}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {interestCategories.map((category) => (
          <TabsContent key={category.title} value={category.title} className="mt-0">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {category.interests.map((interest, index) => (
                <motion.div key={index} variants={item}>
                  <Card className="h-full overflow-hidden border border-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                    <CardContent className="p-6 flex flex-col gap-3">
                      <div className="bg-primary/5 rounded-full p-4 w-16 h-16 flex items-center justify-center mb-2">
                        {interest.icon}
                      </div>
                      <h3 className="text-lg font-semibold">{interest.title}</h3>
                      <p className="text-muted-foreground">{interest.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ResearchInterests;
