
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GalleryGrid } from "./GalleryGrid";
import { GalleryImage } from "@/types/gallery";

interface GalleryTabsProps {
  images: GalleryImage[];
  activeTab: string;
  setActiveTab: (value: string) => void;
}

export const GalleryTabs = ({ images, activeTab, setActiveTab }: GalleryTabsProps) => {
  return (
    <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="mb-6 w-full sm:w-auto">
        <TabsTrigger value="all">All Photos</TabsTrigger>
        <TabsTrigger value="awards">Awards</TabsTrigger>
        <TabsTrigger value="research">Research</TabsTrigger>
        <TabsTrigger value="teaching_professional">Teaching & Professional</TabsTrigger>
      </TabsList>
      
      <TabsContent value="all" className="mt-0">
        <GalleryGrid images={images} />
      </TabsContent>
      
      <TabsContent value="awards" className="mt-0">
        <GalleryGrid images={images.filter(image => image.category === "awards")} />
      </TabsContent>
      
      <TabsContent value="research" className="mt-0">
        <GalleryGrid images={images.filter(image => image.category === "research")} />
      </TabsContent>
      
      <TabsContent value="teaching_professional" className="mt-0">
        <GalleryGrid images={images.filter(image => image.category === "teaching_professional")} />
      </TabsContent>
    </Tabs>
  );
};
