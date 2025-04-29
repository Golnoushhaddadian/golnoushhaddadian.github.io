
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
    <Tabs defaultValue="awards" value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="mb-6 w-full sm:w-auto">
        <TabsTrigger value="awards">Awards</TabsTrigger>
        <TabsTrigger value="research">Research</TabsTrigger>
        <TabsTrigger value="teaching">Teaching</TabsTrigger>
      </TabsList>
      
      <TabsContent value="awards" className="mt-0">
        <GalleryGrid images={images.filter(image => image.category === "awards")} />
      </TabsContent>
      
      <TabsContent value="research" className="mt-0">
        <GalleryGrid images={images.filter(image => image.category === "research")} />
      </TabsContent>
      
      <TabsContent value="teaching" className="mt-0">
        <GalleryGrid images={images.filter(image => image.category === "teaching")} />
      </TabsContent>
    </Tabs>
  );
};
