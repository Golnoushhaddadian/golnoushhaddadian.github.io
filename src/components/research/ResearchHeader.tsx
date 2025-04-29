
import { FileChartLine } from "lucide-react";

export const ResearchHeader = () => {
  return (
    <div>
      <h1 className="flex items-center gap-2">
        <FileChartLine className="h-8 w-8 text-primary" />
        Research
      </h1>
      <p className="text-lg text-muted-foreground mb-6">
        My research focuses on AI in Education, with particular emphasis on innovative learning technologies, formative assessment, and feedback systems.
      </p>
    </div>
  );
};
