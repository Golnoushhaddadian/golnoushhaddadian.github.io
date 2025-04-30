
import { Book, FileText, FileCode, BookOpen, FileChartLine } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResearchHeader } from "@/components/research/ResearchHeader";
import { ProjectsTab } from "@/components/research/ProjectsTab";
import { JournalsTab } from "@/components/research/JournalsTab";
import { ConferencesTab } from "@/components/research/ConferencesTab";
import { OtherPublicationsTab } from "@/components/research/OtherPublicationsTab";
import { WorkInProgressTab } from "@/components/research/WorkInProgressTab";
import { 
  currentProjects,
  journalPublications,
  conferenceProceedings,
  nonRefereedPublications,
  workUnderReview,
  workInProgress 
} from "@/data/researchData";

const Research = () => {
  return (
    <section className="space-y-8">
      <ResearchHeader />

      <Tabs defaultValue="projects" className="w-full">
        <TabsList className="w-full md:w-auto flex flex-wrap">
          <TabsTrigger value="projects" className="flex items-center gap-2">
            <FileChartLine className="h-4 w-4" />
            <span>Research Projects</span>
          </TabsTrigger>
          <TabsTrigger value="journals" className="flex items-center gap-2">
            <Book className="h-4 w-4" />
            <span>Journal Publications</span>
          </TabsTrigger>
          <TabsTrigger value="conferences" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Conference Proceedings</span>
          </TabsTrigger>
          <TabsTrigger value="other" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span>Other Publications</span>
          </TabsTrigger>
          <TabsTrigger value="upcoming" className="flex items-center gap-2">
            <FileCode className="h-4 w-4" />
            <span>Work in Progress</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="projects" className="space-y-6 mt-6">
          <ProjectsTab projects={currentProjects} />
        </TabsContent>
        
        <TabsContent value="journals" className="mt-6">
          <JournalsTab />
        </TabsContent>

        <TabsContent value="conferences" className="mt-6">
          <ConferencesTab />
        </TabsContent>

        <TabsContent value="other" className="space-y-6 mt-6">
          <OtherPublicationsTab />
        </TabsContent>

        <TabsContent value="upcoming" className="mt-6">
          <WorkInProgressTab />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default Research;
