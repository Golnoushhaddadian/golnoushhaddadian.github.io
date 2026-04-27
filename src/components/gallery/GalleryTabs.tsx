
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
        {(() => {
          const awardImages = images.filter(image => image.category === "awards");
          const dissertation2026 = awardImages.filter(img => img.description.includes("2026"));
          const phdStudent2025 = awardImages.filter(img => img.description.includes("2025"));
          const others = awardImages.filter(img => !img.description.includes("2026") && !img.description.includes("2025"));
          return (
            <div className="space-y-10 sm:space-y-12">
              {dissertation2026.length > 0 && (
                <section>
                  <h2 className="text-xs sm:text-sm uppercase tracking-widest text-muted-foreground mb-4 sm:mb-5 pb-2 border-b border-border">
                    Outstanding Dissertation in Learning Technologies (2026)
                  </h2>
                  <GalleryGrid images={dissertation2026} />
                </section>
              )}
              {phdStudent2025.length > 0 && (
                <section>
                  <h2 className="text-xs sm:text-sm uppercase tracking-widest text-muted-foreground mb-4 sm:mb-5 pb-2 border-b border-border">
                    Outstanding Ph.D. Student in Learning Technologies (2025)
                  </h2>
                  <GalleryGrid images={phdStudent2025} />
                </section>
              )}
              {others.length > 0 && <GalleryGrid images={others} />}
            </div>
          );
        })()}
      </TabsContent>
      
      <TabsContent value="community" className="mt-0">
        <GalleryGrid images={images.filter(image => image.category === "community")} />
      </TabsContent>
    </Tabs>
  );
};
