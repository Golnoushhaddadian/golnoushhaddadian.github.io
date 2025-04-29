
import { ImageIcon } from "lucide-react";

export const GalleryHeader = () => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
        <ImageIcon className="h-6 w-6 text-blue-700 dark:text-blue-300" />
      </div>
      <div>
        <h1 className="text-3xl font-bold mb-0">Photo Gallery</h1>
        <p className="text-muted-foreground">Professional and Academic Journey</p>
      </div>
    </div>
  );
};
