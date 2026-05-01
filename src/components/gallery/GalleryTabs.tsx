
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
      <TabsList className="mb-4 sm:mb-5 md:mb-6 w-full sm:w-auto h-auto p-1.5 gap-1 bg-muted/70">
        <TabsTrigger value="research" className="text-sm sm:text-base font-bold uppercase tracking-wider px-4 sm:px-6 py-2 data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:shadow-md transition-all">Research</TabsTrigger>
        <TabsTrigger value="teaching" className="text-sm sm:text-base font-bold uppercase tracking-wider px-4 sm:px-6 py-2 data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:shadow-md transition-all">Teaching</TabsTrigger>
        <TabsTrigger value="awards" className="text-sm sm:text-base font-bold uppercase tracking-wider px-4 sm:px-6 py-2 data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:shadow-md transition-all">Awards</TabsTrigger>
        <TabsTrigger value="community" className="text-sm sm:text-base font-bold uppercase tracking-wider px-4 sm:px-6 py-2 data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:shadow-md transition-all">Community</TabsTrigger>
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
          const isDissertation2026 = (img: GalleryImage) => img.src.includes("dissertation-award-2026") || img.description.includes("2026");
          const phd2025Sources = ["456f670a-3858-4253-a9f9-4acc80d81cc6", "6828e63c-0d05-4394-9936-01c4542b4a79", "b3903a2b-7911-42f7-a228-32eeefa770ec"];
          const isPhdStudent2025 = (img: GalleryImage) => phd2025Sources.some(s => img.src.includes(s)) || img.description.includes("2025");
          const dissertation2026 = awardImages.filter(isDissertation2026);
          const phdStudent2025 = awardImages.filter(img => !isDissertation2026(img) && isPhdStudent2025(img));
          const others = awardImages.filter(img => !isDissertation2026(img) && !isPhdStudent2025(img));
          return (
            <div className="space-y-10 sm:space-y-12">
              {dissertation2026.length > 0 && (
                <section>
                  <h2 className="text-xs sm:text-sm uppercase tracking-widest text-muted-foreground mb-4 sm:mb-5 pb-2 border-b border-border">
                    Outstanding <span className="text-foreground font-semibold">Dissertation</span> in Learning Technologies (2026)
                  </h2>
                  <GalleryGrid images={dissertation2026} />
                </section>
              )}
              {phdStudent2025.length > 0 && (
                <section>
                  <h2 className="text-xs sm:text-sm uppercase tracking-widest text-muted-foreground mb-4 sm:mb-5 pb-2 border-b border-border">
                    Outstanding <span className="text-foreground font-semibold">Ph.D. Student</span> in Learning Technologies (2025)
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
