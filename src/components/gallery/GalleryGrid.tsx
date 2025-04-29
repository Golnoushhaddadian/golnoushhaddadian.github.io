
import { GalleryCard } from "./GalleryCard";
import { GalleryImage } from "@/types/gallery";

interface GalleryGridProps {
  images: GalleryImage[];
}

export const GalleryGrid = ({ images }: GalleryGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((image, index) => (
        <GalleryCard key={index} image={image} />
      ))}
    </div>
  );
};
