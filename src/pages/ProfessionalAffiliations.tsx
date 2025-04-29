
import { Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const ProfessionalAffiliations = () => {
  const affiliations = [
    {
      organization: "American Association for Applied Linguistics (AAAL)",
      since: "2024",
      color: "bg-blue-100 dark:bg-blue-950"
    },
    {
      organization: "TESOL International Association",
      since: "2024",
      color: "bg-violet-100 dark:bg-violet-950"
    },
    {
      organization: "The International Society of the Learning Sciences (ISLS/ICLS)",
      since: "2023",
      color: "bg-green-100 dark:bg-green-950"
    },
    {
      organization: "The Association for Educational Communications and Technology (AECT)",
      since: "2023",
      color: "bg-amber-100 dark:bg-amber-950"
    },
    {
      organization: "Society for Information Technology and Teacher Education (SITE)",
      since: "2023",
      color: "bg-teal-100 dark:bg-teal-950"
    },
    {
      organization: "American Educational Research Association (AERA)",
      since: "2022",
      color: "bg-pink-100 dark:bg-pink-950"
    },
    {
      organization: "Universal Scientific Education and Research Network (USERN)",
      since: "2019",
      color: "bg-indigo-100 dark:bg-indigo-950"
    },
    {
      organization: "Teaching English Language and Literature Society of Iran (TELLSI)",
      since: "2012",
      color: "bg-emerald-100 dark:bg-emerald-950"
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
        <h1 className="flex items-center gap-2">
          <Users className="h-8 w-8 text-primary" />
          Professional Affiliations
        </h1>
        <p className="text-lg text-muted-foreground">
          Memberships in academic and professional organizations.
        </p>
      </div>

      <motion.div 
        className="space-y-5"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {affiliations.map((affiliation, index) => (
          <motion.div key={index} variants={item}>
            <Card className="overflow-hidden transition-shadow hover:shadow-md border-l-4 border-primary">
              <div className="flex flex-col md:flex-row">
                <div className={`flex items-center justify-center md:justify-start p-6 ${affiliation.color} md:w-48 shrink-0`}>
                  <div className="flex flex-col items-center justify-center">
                    <div className="bg-background/90 rounded-full p-3 mb-2">
                      <Users className="h-10 w-10" />
                    </div>
                    <span className="text-lg font-medium">Since {affiliation.since}</span>
                  </div>
                </div>
                
                <div className="flex-1 flex items-center p-6">
                  <CardHeader className="p-0">
                    <CardTitle className="text-xl">{affiliation.organization}</CardTitle>
                  </CardHeader>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default ProfessionalAffiliations;
