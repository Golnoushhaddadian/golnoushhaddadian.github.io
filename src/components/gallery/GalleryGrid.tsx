
import { GalleryCard } from "./GalleryCard";
import { GalleryImage } from "@/types/gallery";

interface GalleryGridProps {
  images: GalleryImage[];
}

export const GalleryGrid = ({ images }: GalleryGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
      {images.map((image, index) => (
        <GalleryCard key={index} image={image} />
      ))}
    </div>
  );
};
