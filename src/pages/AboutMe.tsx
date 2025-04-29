
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { BookText, FileText, Layers, FileCode } from "lucide-react";

const AboutMe = () => {
  const researchInterests = [
    {
      icon: <BookText className="h-5 w-5 text-primary" />,
      text: "1. Instructional/Educational Technology, AI in Education, AI-Augmented Learning Environments, Adaptive Learning Technologies, Personalized Learning Environments; Human-Computer Interaction"
    },
    {
      icon: <FileText className="h-5 w-5 text-primary" />,
      text: "2. Formative Assessment and Feedback, Peer Feedback, Collaborative Learning"
    },
    {
      icon: <Layers className="h-5 w-5 text-primary" />,
      text: "3. Automated Writing Evaluation (AWE) Systems, Essay Writing, Computer Assisted Language Learning (CALL)"
    },
    {
      icon: <FileCode className="h-5 w-5 text-primary" />,
      text: "4. Curriculum Design and Development; Design Based Research (DBR); Mixed-Methods Research"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-4xl">
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
          <div className="md:w-1/3 flex justify-center">
            <Avatar className="h-64 w-64 rounded-lg">
              <AvatarImage src="/lovable-uploads/e896fcf4-cdd3-4775-8e7c-da11ef961f00.png" alt="Golnoush (Lia) Haddadian" />
              <AvatarFallback className="text-2xl">GH</AvatarFallback>
            </Avatar>
          </div>
          <div className="md:w-2/3">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Golnoush (Lia) Haddadian</h1>
            <p className="text-xl text-muted-foreground mb-4">Ph.D. Candidate in Learning Sciences</p>
            <p className="mb-6">
              Graduate Research Associate at Georgia State University, College of Education and Human Development,
              Department of Learning Sciences. My research focuses on AI-augmented learning environments, 
              formative assessment systems, and educational technology.
            </p>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Research Interests</h2>
          <div className="grid gap-6">
            {researchInterests.map((interest, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">{interest.icon}</div>
                    <p>{interest.text}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">About Me</h2>
          <p className="text-muted-foreground">
            I am a Ph.D. Candidate in Learning Sciences at Georgia State University. My research 
            focuses on the design and development of AI-augmented learning environments, 
            particularly for enhancing writing instruction and feedback systems. I am part of 
            the AI2 Research Laboratory, where we work on advancing more adaptable, engaged, 
            equitable, and effective teaching and learning in various educational contexts.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutMe;
