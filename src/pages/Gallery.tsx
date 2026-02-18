
import { useState } from "react";
import { GalleryHeader } from "@/components/gallery/GalleryHeader";
import { GalleryTabs } from "@/components/gallery/GalleryTabs";
import { galleryImages } from "@/data/galleryImages";
import { useDocumentHead } from "@/hooks/useDocumentHead";

const Gallery = () => {
  useDocumentHead({
    title: 'Gallery — Golnoush Haddadian',
    description: 'Photo gallery showcasing research activities, conferences, teaching moments, and academic life of Golnoush Haddadian.',
    canonical: '/gallery',
  });
  const [activeTab, setActiveTab] = useState("research");

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
