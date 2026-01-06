import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Button } from "@/components/ui/button";
import { Download, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

// Set up the worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const CurriculumVitae = () => {
  const pdfUrl = "/CV_Golnoush_Haddadian.pdf";
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.2);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  const goToPrevPage = () => setPageNumber((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () => setPageNumber((prev) => Math.min(prev + 1, numPages || 1));
  const zoomIn = () => setScale((prev) => Math.min(prev + 0.2, 2.5));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.5));

  return (
    <section className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1>Curriculum Vitae</h1>
        <Button size="sm" asChild>
          <a href={pdfUrl} download="CV_Golnoush_Haddadian.pdf">
            <Download className="mr-2 h-4 w-4" />
            Download CV
          </a>
        </Button>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-3 bg-muted rounded-lg">
        <Button variant="outline" size="sm" onClick={goToPrevPage} disabled={pageNumber <= 1}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm px-2">
          Page {pageNumber} of {numPages || "..."}
        </span>
        <Button variant="outline" size="sm" onClick={goToNextPage} disabled={pageNumber >= (numPages || 1)}>
          <ChevronRight className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-border mx-2" />
        <Button variant="outline" size="sm" onClick={zoomOut}>
          <ZoomOut className="h-4 w-4" />
        </Button>
        <span className="text-sm px-2">{Math.round(scale * 100)}%</span>
        <Button variant="outline" size="sm" onClick={zoomIn}>
          <ZoomIn className="h-4 w-4" />
        </Button>
      </div>

      {/* PDF Viewer */}
      <div className="flex justify-center overflow-auto border border-border rounded-lg bg-muted/50 p-4 min-h-[600px]">
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<div className="text-muted-foreground">Loading PDF...</div>}
          error={<div className="text-destructive">Failed to load PDF. Please try downloading instead.</div>}
        >
          <Page
            pageNumber={pageNumber}
            scale={scale}
            renderTextLayer={true}
            renderAnnotationLayer={true}
          />
        </Document>
      </div>
    </section>
  );
};

export default CurriculumVitae;
