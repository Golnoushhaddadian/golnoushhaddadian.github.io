
import { Card } from "@/components/ui/card";

const AboutMe = () => {
  return (
    <section className="space-y-8">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <div className="aspect-square bg-muted rounded-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="w-full md:w-2/3">
          <h1>About Me</h1>
          
          <p className="text-lg mb-4">
            I am a researcher/academic focused on [your field]. My work explores the intersection of [topic] and [topic], with applications in [area].
          </p>
          
          <p className="mb-4">
            Currently, I am a [position] at [institution/company], where I lead research on [topic]. Prior to this role, I worked at [previous experience].
          </p>
          
          <p>
            I received my [degree] in [field] from [university], where I was advised by [advisor name]. My thesis explored [topic], which laid the groundwork for my current research interests.
          </p>
        </div>
      </div>
      
      <div className="space-y-6">
        <h2>Research Interests</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4">
            <h3 className="text-base font-medium mb-2">Primary Focus</h3>
            <p className="text-sm text-muted-foreground">Description of your primary research area and its significance in the broader field.</p>
          </Card>
          
          <Card className="p-4">
            <h3 className="text-base font-medium mb-2">Secondary Interest</h3>
            <p className="text-sm text-muted-foreground">Details about another area that complements your main research focus.</p>
          </Card>
          
          <Card className="p-4">
            <h3 className="text-base font-medium mb-2">Interdisciplinary Work</h3>
            <p className="text-sm text-muted-foreground">How your work bridges multiple disciplines for innovative outcomes.</p>
          </Card>
          
          <Card className="p-4">
            <h3 className="text-base font-medium mb-2">Future Directions</h3>
            <p className="text-sm text-muted-foreground">Emerging questions or technologies you're interested in exploring in upcoming work.</p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
