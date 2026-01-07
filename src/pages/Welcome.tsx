import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const AboutMe = () => {
  const iconSize = 32;
  
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
            <div className="flex items-center gap-5 mt-5">
              <a
                href="https://www.linkedin.com/in/g-hdn"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform duration-200"
                aria-label="LinkedIn"
              >
                <img 
                  src="/lovable-uploads/linkedin-icon.png" 
                  alt="LinkedIn" 
                  width={iconSize} 
                  height={iconSize}
                  className="rounded-full"
                />
              </a>
              <a
                href="https://scholar.google.com/citations?user=8MQCFZQAAAAJ&hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform duration-200"
                aria-label="Google Scholar"
              >
                <svg width={iconSize} height={iconSize} viewBox="0 0 512 512" fill="none">
                  <circle cx="256" cy="256" r="256" fill="#4285F4"/>
                  <path d="M256 411c-85.5 0-155-69.5-155-155s69.5-155 155-155 155 69.5 155 155-69.5 155-155 155zm0-55c55.2 0 100-44.8 100-100s-44.8-100-100-100-100 44.8-100 100 44.8 100 100 100z" fill="white"/>
                  <path d="M256 96L96 256h64v160h192V256h64L256 96z" fill="white"/>
                </svg>
              </a>
              <a
                href="https://www.researchgate.net/profile/Golnoush-Haddadian?ev=hdr_xprf"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform duration-200"
                aria-label="ResearchGate"
              >
                <svg width={iconSize} height={iconSize} viewBox="0 0 512 512" fill="none">
                  <circle cx="256" cy="256" r="256" fill="#00CCBB"/>
                  <path d="M271 285h-30v52h-32V175h62c45 0 72 25 72 55 0 35-27 55-72 55zm-2-80h-28v52h28c25 0 40-12 40-26s-15-26-40-26z" fill="white"/>
                  <path d="M355 285c0 35-25 60-60 60-15 0-28-5-38-13v-25c10 10 23 15 38 15 18 0 32-12 32-32 0-18-12-30-30-30h-15v-22h15c15 0 25-10 25-25 0-13-10-23-27-23-13 0-25 5-35 15v-27c12-8 27-13 42-13 30 0 50 18 50 45 0 18-10 32-25 40 20 8 28 25 28 35z" fill="white"/>
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
