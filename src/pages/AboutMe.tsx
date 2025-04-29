
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const AboutMe = () => {
  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-4xl">
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
          <div className="md:w-1/3 flex justify-center">
            <div className="w-64 h-64">
              <AspectRatio ratio={1/1} className="rounded-lg overflow-hidden">
                <Avatar className="h-full w-full">
                  <AvatarImage src="/lovable-uploads/e896fcf4-cdd3-4775-8e7c-da11ef961f00.png" alt="Golnoush (Lia) Haddadian" className="object-cover" />
                  <AvatarFallback className="text-2xl">GH</AvatarFallback>
                </Avatar>
              </AspectRatio>
            </div>
          </div>
          <div className="md:w-2/3">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Golnoush (Lia) Haddadian</h1>
            <p className="text-xl text-muted-foreground mb-4">Ph.D. Candidate in Learning Sciences</p>
            <p className="mb-6">
              Graduate Research Associate at Georgia State University, College of Education and Human Development,
              Department of Learning Sciences.
            </p>
          </div>
        </div>

        <section>
          <h2 className="text-2xl font-semibold mb-6">About Me</h2>
          <div className="prose max-w-none text-muted-foreground">
            <p>
              I am Golnoush (Lia) Haddadian, and I am thrilled to share my journey with you. As a passionate advocate for the transformative power of education and technology, I have dedicated my career to creating inclusive, innovative learning environments that empower all learners. From my early days designing interactive learning tools in high school to my current work as a Ph.D. candidate in Educational Technology at Georgia State University, my mission has always been to bridge gaps in education and open new pathways to success.
            </p>
            <p>
              Here, you will find insights into my work at the intersection of learning sciences, artificial intelligence, and educational access. My research focuses on developing personalized, AI-augmented learning tools designed to support diverse learners and foster meaningful, lasting growth. I am especially committed to supporting adult learners, advancing global literacy, and building scalable, accessible learning solutions for all.
            </p>
            <p>
              I invite you to explore my projects, publications, and initiatives aimed at making education more equitable and effective worldwide. Thank you for visiting and joining me on this journey of learning, innovation, and positive change. I hope my work inspires you as much as the pursuit of knowledge continues to inspire me.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutMe;
