
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Gallery as GalleryIcon } from "lucide-react";

// Image data structure
type GalleryImage = {
  src: string;
  alt: string;
  description: string;
};

const galleryImages: GalleryImage[] = [
  { 
    src: "/lovable-uploads/a23fd0a3-6057-45eb-ae13-68e9a74814e2.png", 
    alt: "Group photo with purple background",
    description: "" 
  },
  { 
    src: "/lovable-uploads/76d7583c-66c7-478b-878b-19cc3330e383.png", 
    alt: "Person holding learning materials",
    description: "" 
  },
  { 
    src: "/lovable-uploads/2b19eedb-d7c2-4394-ae8e-da6b205f03c6.png", 
    alt: "Group photo in classroom",
    description: "" 
  },
  { 
    src: "/lovable-uploads/9df4b996-dfd6-4dbb-aff0-9c09284b56aa.png", 
    alt: "Group selfie",
    description: "" 
  },
  { 
    src: "/lovable-uploads/44fad1a1-241a-4252-b170-c397e6643fd2.png", 
    alt: "Two women holding certificates",
    description: "" 
  },
  { 
    src: "/lovable-uploads/72e9a4cb-b5d9-47dc-8547-bc57438ce4a5.png", 
    alt: "Students with learning materials",
    description: "" 
  },
  { 
    src: "/lovable-uploads/994adcb9-9684-44d8-8238-d35f284c115c.png", 
    alt: "Group photo with blackboard",
    description: "" 
  },
  { 
    src: "/lovable-uploads/55c11548-ffff-44ec-99aa-d725d9087aaf.png", 
    alt: "Teacher presenting educational content",
    description: "" 
  },
  { 
    src: "/lovable-uploads/6abeee9a-c3e0-447d-a533-0f82e17a98c1.png", 
    alt: "Students studying at table",
    description: "" 
  },
  { 
    src: "/lovable-uploads/2a3ce7b3-78fa-4a39-900d-484680a04ec6.png", 
    alt: "Teacher presenting to students",
    description: "" 
  },
];

const Gallery = () => {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
          <GalleryIcon className="h-6 w-6 text-blue-700 dark:text-blue-300" />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-0">Photo Gallery</h1>
          <p className="text-muted-foreground">Professional and Teaching Journey</p>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6 w-full sm:w-auto">
          <TabsTrigger value="all">All Photos</TabsTrigger>
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
        
        <TabsContent value="teaching" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages
              .filter((_, i) => [1, 5, 7, 8, 9].includes(i))
              .map((image, index) => (
                <GalleryCard key={index} image={image} />
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="professional" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages
              .filter((_, i) => [0, 2, 3, 4, 6].includes(i))
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
