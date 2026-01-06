import { Button } from "@/components/ui/button";
import { Download, ExternalLink } from "lucide-react";

const CurriculumVitae = () => {
  const pdfUrl = "/CV_Golnoush_Haddadian.pdf";

  return (
    <section className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1>Curriculum Vitae</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Open in New Tab
            </a>
          </Button>
          <Button size="sm" asChild>
            <a href={pdfUrl} download="CV_Golnoush_Haddadian.pdf">
              <Download className="mr-2 h-4 w-4" />
              Download
            </a>
          </Button>
        </div>
      </div>
      
      <div className="w-full h-[calc(100vh-200px)] min-h-[700px] rounded-lg overflow-hidden border border-border bg-muted">
        <object
          data={pdfUrl}
          type="application/pdf"
          className="w-full h-full"
        >
          <iframe
            src={`https://docs.google.com/viewer?url=${encodeURIComponent(window.location.origin + pdfUrl)}&embedded=true`}
            className="w-full h-full"
            title="Golnoush Haddadian CV"
          />
        </object>
      </div>
    </section>
  );
};

export default CurriculumVitae;
