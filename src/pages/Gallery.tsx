
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ImageIcon } from "lucide-react";

// Image data structure
type GalleryImage = {
  src: string;
  alt: string;
  description: string;
  category: "teaching" | "professional" | "research" | "awards";
};

const galleryImages: GalleryImage[] = [
  // Professional images
  { 
    src: "/lovable-uploads/a23fd0a3-6057-45eb-ae13-68e9a74814e2.png", 
    alt: "Group photo with purple background",
    description: "",
    category: "professional"
  },
  { 
    src: "/lovable-uploads/2b19eedb-d7c2-4394-ae8e-da6b205f03c6.png", 
    alt: "Group photo in classroom",
    description: "",
    category: "professional"
  },
  { 
    src: "/lovable-uploads/9df4b996-dfd6-4dbb-aff0-9c09284b56aa.png", 
    alt: "Group selfie",
    description: "",
    category: "professional"
  },
  { 
    src: "/lovable-uploads/44fad1a1-241a-4252-b170-c397e6643fd2.png", 
    alt: "Two women holding certificates",
    description: "",
    category: "professional" 
  },
  { 
    src: "/lovable-uploads/994adcb9-9684-44d8-8238-d35f284c115c.png", 
    alt: "Group photo with blackboard",
    description: "",
    category: "professional"
  },
  { 
    src: "/lovable-uploads/1329e185-b82c-45f9-b6f5-ba2435e240b6.png", 
    alt: "Group photo with blackboard in background",
    description: "",
    category: "professional"
  },
  
  // Teaching images
  { 
    src: "/lovable-uploads/76d7583c-66c7-478b-878b-19cc3330e383.png", 
    alt: "Person holding learning materials",
    description: "",
    category: "teaching"
  },
  { 
    src: "/lovable-uploads/72e9a4cb-b5d9-47dc-8547-bc57438ce4a5.png", 
    alt: "Students with learning materials",
    description: "",
    category: "teaching"
  },
  { 
    src: "/lovable-uploads/55c11548-ffff-44ec-99aa-d725d9087aaf.png", 
    alt: "Teacher presenting educational content",
    description: "",
    category: "teaching"
  },
  { 
    src: "/lovable-uploads/6abeee9a-c3e0-447d-a533-0f82e17a98c1.png", 
    alt: "Students studying at table",
    description: "",
    category: "teaching"
  },
  { 
    src: "/lovable-uploads/2a3ce7b3-78fa-4a39-900d-484680a04ec6.png", 
    alt: "Teacher presenting to students",
    description: "",
    category: "teaching"
  },
  { 
    src: "/lovable-uploads/e68264fd-133c-403d-a73b-cca770079d9d.png",
    alt: "Students studying at blue table",
    description: "",
    category: "teaching"
  },
  
  // Research images
  {
    src: "/lovable-uploads/c8f7c099-bd71-4ca8-8021-1cfb168f9d5a.png",
    alt: "Research team at conference with orange background and artistic display",
    description: "",
    category: "research"
  },
  {
    src: "/lovable-uploads/7637ee2e-3b6b-4d7d-a6f3-86a2fcfcaba8.png",
    alt: "Research team at AECT conference with balloon decorations",
    description: "",
    category: "research"
  },
  {
    src: "/lovable-uploads/b1ad8a96-7d88-4091-a16b-575e240582ca.png",
    alt: "Research team standing in front of circular wall display",
    description: "",
    category: "research"
  },
  {
    src: "/lovable-uploads/9becac13-60f0-400f-87e6-24b2cd366c8a.png",
    alt: "AI-ALOE institute team photo",
    description: "",
    category: "research"
  },
  {
    src: "/lovable-uploads/4a4d93b3-b05c-4482-84cf-40dda6f9660c.png",
    alt: "Researcher presenting research findings and data visualization",
    description: "",
    category: "research"
  },
  // New research images
  {
    src: "/lovable-uploads/fdc1799c-3c0e-4bf5-b1d3-813b11a1ca1c.png",
    alt: "Researcher explaining Private AI curriculum poster at academic conference",
    description: "",
    category: "research"
  },
  {
    src: "/lovable-uploads/ce144f88-d4b2-4005-b6e6-156bcaf449a1.png",
    alt: "Researcher at AERA 2023 Annual Meeting registration area",
    description: "",
    category: "research"
  },
  {
    src: "/lovable-uploads/21082eac-6384-443f-8100-fe4fe60caac7.png",
    alt: "Researcher at AAAL 2025 Annual Conference in Denver",
    description: "",
    category: "research"
  },
  
  // Awards images - newly added
  {
    src: "/lovable-uploads/456f670a-3858-4253-a9f9-4acc80d81cc6.png",
    alt: "Woman in black dress holding award with Georgia State University backdrop",
    description: "",
    category: "awards"
  },
  {
    src: "/lovable-uploads/6828e63c-0d05-4394-9936-01c4542b4a79.png",
    alt: "Two women at Honors Day ceremony, one holding award and certificate",
    description: "",
    category: "awards"
  },
  {
    src: "/lovable-uploads/379682e5-e6f3-4167-8c6b-bb98ae3dcfa1.png",
    alt: "Group photo with five people in front of College of Education backdrop, woman in center holding award",
    description: "",
    category: "awards"
  },
  {
    src: "/lovable-uploads/b3903a2b-7911-42f7-a228-32eeefa770ec.png",
    alt: "Award ceremony with two men presenting award to woman on stage",
    description: "",
    category: "awards"
  }
];

const Gallery = () => {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
          <ImageIcon className="h-6 w-6 text-blue-700 dark:text-blue-300" />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-0">Photo Gallery</h1>
          <p className="text-muted-foreground">Professional and Academic Journey</p>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6 w-full sm:w-auto">
          <TabsTrigger value="all">All Photos</TabsTrigger>
          <TabsTrigger value="awards">Awards</TabsTrigger>
          <TabsTrigger value="research">Research</TabsTrigger>
          <TabsTrigger value="teaching">Teaching</TabsTrigger>
          <TabsTrigger value="professional">Professional</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <GalleryCard key={index} image={image} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="awards" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages
              .filter(image => image.category === "awards")
              .map((image, index) => (
                <GalleryCard key={index} image={image} />
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="research" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages
              .filter(image => image.category === "research")
              .map((image, index) => (
                <GalleryCard key={index} image={image} />
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="teaching" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages
              .filter(image => image.category === "teaching")
              .map((image, index) => (
                <GalleryCard key={index} image={image} />
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="professional" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages
              .filter(image => image.category === "professional")
              .map((image, index) => (
                <GalleryCard key={index} image={image} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Gallery card component
const GalleryCard = ({ image }: { image: GalleryImage }) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="p-2">
        <AspectRatio ratio={4/3} className="bg-muted rounded-md overflow-hidden">
          <img
            src={image.src}
            alt={image.alt}
            className="object-cover w-full h-full"
          />
        </AspectRatio>
      </div>
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground h-6">{image.description}</p>
      </CardContent>
    </Card>
  );
};

export default Gallery;
