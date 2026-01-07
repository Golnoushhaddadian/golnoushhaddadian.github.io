import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ExternalLink, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

const AboutMe = () => {
  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-4xl">
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
          <div className="md:w-1/3 flex flex-col items-center">
            <div className="w-64 h-64">
              <AspectRatio ratio={1 / 1} className="rounded-lg overflow-hidden">
                <Avatar className="h-full w-full">
                  <AvatarImage
                    src="/lovable-uploads/e896fcf4-cdd3-4775-8e7c-da11ef961f00.png"
                    alt="Golnoush (Lia) Haddadian"
                    className="object-cover"
                  />
                  <AvatarFallback className="text-2xl">GH</AvatarFallback>
                </Avatar>
              </AspectRatio>
            </div>
            {/* Social Profile Links */}
            <div className="flex items-center gap-4 mt-4">
              <a
                href="https://www.linkedin.com/in/g-hdn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="https://scholar.google.com/citations?user=8MQCFZQAAAAJ&hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Google Scholar"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14Zm0-2a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"/>
                  <path d="M0 12L12 0l12 12h-6v12H6V12H0Z"/>
                </svg>
              </a>
              <a
                href="https://www.researchgate.net/profile/Golnoush-Haddadian?ev=hdr_xprf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="ResearchGate"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.586 0c-1.476 0-2.67.87-2.67 2.3 0 1.13.62 1.87 1.778 2.18v.03c-.78.18-1.41.87-1.41 1.78 0 1.3 1.05 2.18 2.69 2.18 1.8 0 3.03-1.2 3.03-2.95 0-1.32-.78-2.2-2.09-2.56v-.03c.7-.32 1.2-.98 1.2-1.77 0-1.14-.92-2.14-2.52-2.14Zm-.08 1.18c.67 0 1.1.38 1.1.95 0 .52-.4.93-1.04.93-.67 0-1.1-.4-1.1-.93 0-.57.42-.95 1.04-.95Zm.05 3.46c.84 0 1.34.53 1.34 1.26 0 .77-.54 1.34-1.37 1.34-.82 0-1.34-.55-1.34-1.33 0-.74.5-1.27 1.37-1.27ZM7.89 3.83C3.53 3.83 0 7.35 0 11.72c0 4.37 3.53 7.9 7.89 7.9 4.35 0 7.88-3.53 7.88-7.9 0-4.37-3.53-7.89-7.88-7.89Zm.14 2.55h2.1c2.4 0 3.8 1.1 3.8 3.17 0 1.98-1.35 3.43-3.47 3.43h-1.33v3.2H7.03V6.38h1Zm1.1 1.37v3.86h.86c1.34 0 2.17-.67 2.17-1.93 0-1.3-.77-1.93-2.14-1.93h-.89Z"/>
                </svg>
              </a>
            </div>
          </div>
          <div className="md:w-2/3">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Golnoush (Lia) Haddadian
              <Button variant="ghost" size="sm" className="ml-2" asChild>
                <a href="https://namedrop.io/golnoushhaddadian" target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={16} className="mr-1" />
                  <span className="text-sm">Pronounce my name</span>
                </a>
              </Button>
            </h1>
            <p className="text-xl text-muted-foreground mb-4">Ph.D. in Learning Sciences</p>
            <p className="mb-6">
              Postdoctoral Associate | Georgia State University, University of Memphis, and Educational Testing
              Services.
            </p>
          </div>
        </div>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Welcome to My Personal Website</h2>
          <div className="prose max-w-none text-muted-foreground space-y-4">
            <p>Hello and welcome! 😊✨ I'm Lia Haddadian.</p>
            <p>My given name is Golnoush, and I adore it, but let's keep it simple. Please call me Lia.</p>
            <p>
              From my early experiences designing interactive learning tools during my high school years to my current
              appointment as a Postdoctoral Associate, my work has been driven by a strong commitment to addressing
              educational challenges through evidence-based design and expanding access to effective learning
              opportunities.
            </p>
            <p>If you are looking for a concise overview of my work, my core focus areas include:</p>
            <p className="font-semibold text-foreground">
              # AI in Education # Personalized Learning # Feedback # Assessment & Evaluation # Higher Education # Design
              & Development # Mixed-Methods # Design-Based Research
            </p>
            <p>
              Please feel free to explore my website and reach out if you are interested in potential collaborations or
              would like to connect and learn more.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutMe;
