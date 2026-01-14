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
                <img 
                  src="/lovable-uploads/google-scholar-icon.png" 
                  alt="Google Scholar" 
                  width={iconSize} 
                  height={iconSize}
                />
              </a>
              <a
                href="https://www.researchgate.net/profile/Golnoush-Haddadian?ev=hdr_xprf"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform duration-200"
                aria-label="ResearchGate"
              >
                <img 
                  src="/lovable-uploads/researchgate-icon.png" 
                  alt="ResearchGate" 
                  width={iconSize} 
                  height={iconSize}
                  className="rounded-full"
                />
              </a>
              <a
                href="mailto:ghaddadian1@gsu.edu"
                className="hover:scale-110 transition-transform duration-200"
                aria-label="Email"
              >
                <img 
                  " 
                  alt="Email" 
                  width={iconSize} 
                  height={iconSize}
                />
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
            <p>My core research areas include:</p>
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

        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Latest Publications</h2>
          <div className="prose max-w-none text-muted-foreground space-y-4">
            <p>
              <strong>Haddadian, G.</strong>, Kim, M. K., & Haddadian, N. (2025). A Systematic Review of Automated Writing Evaluation Tools in Argumentative Writing for English as Foreign Language Education. <em>Research Synthesis in Applied Linguistics</em>, 1-51.{" "}
              <a href="https://doi.org/10.1080/29984475.2025.2598266" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                https://doi.org/10.1080/29984475.2025.2598266
              </a>
            </p>
            <p>
              Noroozi, O., <strong>Haddadian, G.</strong>, Gao, X., Schunn, C., Alqassab, M., & Banihashem, S. K. (2025). The value of GenAI for peer feedback provision: student perceptions and impacts. <em>International Journal of Educational Technology in Higher Education</em>, 22(1), 61.{" "}
              <a href="https://doi.org/10.1186/s41239-025-00558-6" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                https://doi.org/10.1186/s41239-025-00558-6
              </a>
            </p>
            <p>
              <strong>Haddadian, G.</strong>, Panzade, P., Takabi, D., & Kim, M. K. (2025). Problem-centered post-secondary computer science education: A study of the private artificial intelligence curriculum. <em>International Journal of Technology in Education</em>, 8(2), 220-245.{" "}
              <a href="https://doi.org/10.46328/ijte.1071" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                https://doi.org/10.46328/ijte.1071
              </a>
            </p>
            <p>
              <strong>Haddadian, G.</strong>, Han, H., Kim, J., Abdeen, M. S., & Kim, M. K. (2025). Exploring AI-Generated Expert Models: Instructor Interaction and Learner Perceptions in a Physics Class. In <em>Proceedings of the 19th International Conference of the Learning Sciences-ICLS 2025</em>, pp. 1684-1688. International Society of the Learning Sciences.{" "}
              <a href="https://doi.org/10.22318/icls2025.213524" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                https://doi.org/10.22318/icls2025.213524
              </a>
            </p>
            <p>
              Greisel, M., Hornstein, J., Kollar, I., Noroozi, O., <strong>Haddadian, G.</strong>, Gao, X., ... & Rummel, N. (2025). Enhancing Peer Feedback Practices with Generative AI. In <em>Proceedings of the 18th International Conference on Computer-Supported Collaborative Learning-CSCL 2025</em>, pp. 490-498. International Society of the Learning Sciences.{" "}
              <a href="https://doi.org/10.22318/cscl2025.921873" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                https://doi.org/10.22318/cscl2025.921873
              </a>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutMe;
