import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Lock, Mail } from "lucide-react";
import { useDocumentHead } from "@/hooks/useDocumentHead";

const CurriculumVitae = () => {
  useDocumentHead({
    title: 'Curriculum Vitae — Golnoush Haddadian',
    description: 'Request access to the curriculum vitae of Golnoush Haddadian.',
    canonical: '/cv',
    noindex: true,
  });

  return (
    <section className="space-y-4 sm:space-y-6">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Curriculum Vitae</h1>

      <Card className="max-w-xl mx-auto mt-6 sm:mt-8 md:mt-12">
        <CardContent className="p-5 sm:p-8 md:p-10 text-center space-y-4 sm:space-y-5">
          <div className="flex justify-center">
            <div className="rounded-full bg-primary/10 p-4">
              <Lock className="h-8 w-8 text-primary" />
            </div>
          </div>

          <h2 className="text-base sm:text-lg md:text-xl font-semibold">Private Access Only</h2>

          <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
            My CV is available upon request. If you'd like to view or receive a copy, 
            please reach out through the contact form and I'll be happy to share it with you.
          </p>

          <Button asChild className="mt-2">
            <Link to="/contact">
              <Mail className="mr-2 h-4 w-4" />
              Request Access
            </Link>
          </Button>
        </CardContent>
      </Card>
    </section>
  );
};

export default CurriculumVitae;
