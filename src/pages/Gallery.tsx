
import { useState } from "react";
import { GalleryHeader } from "@/components/gallery/GalleryHeader";
import { GalleryTabs } from "@/components/gallery/GalleryTabs";
import { galleryImages } from "@/data/galleryImages";

const Gallery = () => {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="space-y-8">
      <GalleryHeader />
      <GalleryTabs 
        images={galleryImages} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />
    </div>
  );
};

export default Gallery;
