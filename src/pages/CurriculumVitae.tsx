
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const CurriculumVitae = () => {
  // Google Drive direct download link
  const cvFileUrl = "https://docs.google.com/document/d/1viqbhhMz-tldpIW7cALV3XDMsQT9O2AY/edit?usp=sharing&ouid=114168757246374587176&rtpof=true&sd=true";

  return (
    <section className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1>Curriculum Vitae</h1>
          <p className="text-lg text-muted-foreground">
            Download my complete CV document
          </p>
        </div>
      </div>

      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-100 dark:border-blue-900">
        <CardContent className="p-8 flex flex-col items-center justify-center space-y-6">
          <div className="flex items-center justify-center bg-blue-100/50 dark:bg-blue-900/50 rounded-full p-6">
            <FileText className="h-12 w-12 text-blue-600 dark:text-blue-400" />
          </div>
          
          <div className="text-center space-y-2">
            <h2 className="text-xl font-semibold">Golnoush (Lia) Haddadian</h2>
            <p className="text-muted-foreground">Ph.D. Candidate in Learning Sciences</p>
            <p className="text-muted-foreground">Georgia State University</p>
          </div>
          
          <Button size="lg" className="mt-4 bg-blue-600 hover:bg-blue-700 text-white" asChild>
            <a href={cvFileUrl} target="_blank" rel="noopener noreferrer">
              <Download className="mr-2 h-5 w-5" />
              Download Full CV
            </a>
          </Button>
          
          <p className="text-sm text-muted-foreground max-w-md text-center">
            This document contains my complete academic background, research publications, 
            teaching experience, awards, and professional affiliations.
          </p>
        </CardContent>
      </Card>

      <div className="text-center text-sm text-muted-foreground">
        <p>Last updated: April 2025</p>
      </div>
    </section>
  );
};

export default CurriculumVitae;
