
import { Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const ProfessionalAffiliations = () => {
  const affiliations = [
    {
      organization: "American Association for Applied Linguistics (AAAL)",
      since: "2024"
    },
    {
      organization: "TESOL International Association",
      since: "2024"
    },
    {
      organization: "The International Society of the Learning Sciences (ISLS/ICLS)",
      since: "2023"
    },
    {
      organization: "The Association for Educational Communications and Technology (AECT)",
      since: "2023"
    },
    {
      organization: "Society for Information Technology and Teacher Education (SITE)",
      since: "2023"
    },
    {
      organization: "American Educational Research Association (AERA)",
      since: "2022"
    },
    {
      organization: "Universal Scientific Education and Research Network (USERN)",
      since: "2019"
    },
    {
      organization: "Teaching English Language and Literature Society of Iran (TELLSI)",
      since: "2012"
    }
  ];

  return (
    <section className="space-y-8">
      <div className="relative mb-8">
        <div className="bg-black py-4 px-6 text-white text-center rounded-sm">
          <h1 className="text-xl font-semibold">Professional Affiliations</h1>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <Users className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-semibold">Memberships & Affiliations</h2>
      </div>
      
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <ul className="space-y-4">
            {affiliations.map((affiliation, index) => (
              <li key={index}>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <span className="font-medium text-lg">{affiliation.organization}</span>
                  <span className="text-muted-foreground">Since {affiliation.since}</span>
                </div>
                {index < affiliations.length - 1 && (
                  <Separator className="mt-4" />
                )}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </section>
  );
};

export default ProfessionalAffiliations;
