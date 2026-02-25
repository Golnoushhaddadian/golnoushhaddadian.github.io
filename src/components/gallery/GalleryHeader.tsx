
import { ImageIcon } from "lucide-react";

export const GalleryHeader = () => {
  return (
    <div className="flex items-center gap-3 sm:gap-4">
      <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
        <ImageIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-700 dark:text-blue-300" />
      </div>
      <div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-0">Photo Gallery</h1>
        <p className="text-xs sm:text-sm md:text-base text-muted-foreground">Professional and Academic Journey</p>
      </div>
    </div>
  );
};
