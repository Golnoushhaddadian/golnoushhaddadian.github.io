
import { useDocumentHead } from "@/hooks/useDocumentHead";
import ResearchStrands from "@/components/ResearchStrands";

const ResearchInterests = () => {
  useDocumentHead({
    title: "Research Strands — Golnoush Haddadian",
    description: "Interactive visualization of research strands by Golnoush Haddadian spanning AI in Education, feedback, adaptive learning, and writing.",
    canonical: "/research-interests",
  });

  return (
    <div className="container max-w-6xl mx-auto py-8 px-4">
      <ResearchStrands />
    </div>
  );
};

export default ResearchInterests;
