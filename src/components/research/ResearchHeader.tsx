
import { FileChartLine } from "lucide-react";

export const ResearchHeader = () => {
  return (
    <div className="mb-10">
      <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
        <FileChartLine className="h-6 w-6 text-primary" />
        Research
      </h1>
      <p className="text-lg text-muted-foreground">
        My research focuses on AI in Education, with particular emphasis on innovative learning technologies, formative assessment, and feedback systems.
      </p>
      <div className="flex flex-wrap gap-2 mt-4">
        <span className="px-3 py-1 bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary rounded-full text-sm">AI in Education</span>
        <span className="px-3 py-1 bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary rounded-full text-sm">Learning Technologies</span>
        <span className="px-3 py-1 bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary rounded-full text-sm">Formative Assessment</span>
        <span className="px-3 py-1 bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary rounded-full text-sm">Feedback Systems</span>
      </div>
    </div>
  );
};
