
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { GalleryImage } from "@/types/gallery";

interface GalleryCardProps {
  image: GalleryImage;
}

export const GalleryCard = ({ image }: GalleryCardProps) => {
  const contain = image.fit === "contain";
  return (
    <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-lg cursor-pointer">
      <div className="p-2">
        <AspectRatio ratio={4/3} className="bg-muted rounded-md overflow-hidden">
          {contain && (
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-cover bg-center blur-xl scale-125 opacity-60"
              style={{ backgroundImage: "url(" + image.src + ")" }}
            />
          )}
          <img
            src={image.src}
            alt={image.alt}
            className={(contain ? "object-contain" : "object-cover") + " w-full h-full rounded-md relative"}
          />
        </AspectRatio>
      </div>
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground">{image.description}</p>
      </CardContent>
    </Card>
  );
};
