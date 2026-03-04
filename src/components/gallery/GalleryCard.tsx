
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { GalleryImage } from "@/types/gallery";

interface GalleryCardProps {
  image: GalleryImage;
}

export const GalleryCard = ({ image }: GalleryCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 ease-out hover:shadow-xl hover:scale-105 cursor-pointer">
      <div className="p-2">
        <AspectRatio ratio={4/3} className="bg-muted rounded-md overflow-hidden">
          <img
            src={image.src}
            alt={image.alt}
            className="object-cover w-full h-full"
          />
        </AspectRatio>
      </div>
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground">{image.description}</p>
      </CardContent>
    </Card>
  );
};
