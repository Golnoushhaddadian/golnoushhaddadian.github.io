
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { GalleryImage } from "@/types/gallery";

interface GalleryCardProps {
  image: GalleryImage;
}

export const GalleryCard = ({ image }: GalleryCardProps) => {
  return (
    <Card className="overflow-visible transition-shadow duration-300 hover:shadow-2xl cursor-pointer group relative hover:z-10">
      <div className="p-2">
        <AspectRatio ratio={4/3} className="bg-muted rounded-md overflow-visible">
          <img
            src={image.src}
            alt={image.alt}
            className="object-cover w-full h-full rounded-md transition-transform duration-500 ease-out group-hover:scale-150 group-hover:shadow-2xl relative"
          />
        </AspectRatio>
      </div>
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground">{image.description}</p>
      </CardContent>
    </Card>
  );
};
