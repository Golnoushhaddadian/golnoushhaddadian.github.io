
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
    <Tabs defaultValue="research" value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="mb-4 sm:mb-5 md:mb-6 w-full sm:w-auto">
        <TabsTrigger value="research">Research</TabsTrigger>
        <TabsTrigger value="teaching">Teaching</TabsTrigger>
        <TabsTrigger value="awards">Awards</TabsTrigger>
        <TabsTrigger value="community">Community</TabsTrigger>
      </TabsList>
      
      <TabsContent value="research" className="mt-0">
        <GalleryGrid images={images.filter(image => image.category === "research")} />
      </TabsContent>
      
      <TabsContent value="teaching" className="mt-0">
        <GalleryGrid images={images.filter(image => image.category === "teaching")} />
      </TabsContent>
      
      <TabsContent value="awards" className="mt-0">
        <GalleryGrid images={images.filter(image => image.category === "awards")} />
      </TabsContent>
      
      <TabsContent value="community" className="mt-0">
        <GalleryGrid images={images.filter(image => image.category === "community")} />
      </TabsContent>
    </Tabs>
  );
};
