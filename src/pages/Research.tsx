
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
        <TabsList className="w-full md:w-auto flex flex-wrap bg-primary/5 dark:bg-primary/10">
          <TabsTrigger value="projects" className="flex items-center gap-2 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800 dark:data-[state=active]:bg-blue-900/40 dark:data-[state=active]:text-blue-100">
            <FileChartLine className="h-4 w-4" />
            <span>Research Projects</span>
          </TabsTrigger>
          <TabsTrigger value="journals" className="flex items-center gap-2 data-[state=active]:bg-green-100 data-[state=active]:text-green-800 dark:data-[state=active]:bg-green-900/40 dark:data-[state=active]:text-green-100">
            <Book className="h-4 w-4" />
            <span>Journal Publications</span>
          </TabsTrigger>
          <TabsTrigger value="conferences" className="flex items-center gap-2 data-[state=active]:bg-purple-100 data-[state=active]:text-purple-800 dark:data-[state=active]:bg-purple-900/40 dark:data-[state=active]:text-purple-100">
            <FileText className="h-4 w-4" />
            <span>Conference Proceedings</span>
          </TabsTrigger>
          <TabsTrigger value="other" className="flex items-center gap-2 data-[state=active]:bg-amber-100 data-[state=active]:text-amber-800 dark:data-[state=active]:bg-amber-900/40 dark:data-[state=active]:text-amber-100">
            <BookOpen className="h-4 w-4" />
            <span>Other Publications</span>
          </TabsTrigger>
          <TabsTrigger value="upcoming" className="flex items-center gap-2 data-[state=active]:bg-cyan-100 data-[state=active]:text-cyan-800 dark:data-[state=active]:bg-cyan-900/40 dark:data-[state=active]:text-cyan-100">
            <FileCode className="h-4 w-4" />
            <span>Work in Progress</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="projects" className="space-y-6 mt-6">
          <ProjectsTab projects={currentProjects} />
        </TabsContent>
        
        <TabsContent value="journals" className="mt-6">
          <JournalsTab publications={journalPublications} />
        </TabsContent>

        <TabsContent value="conferences" className="mt-6">
          <ConferencesTab proceedings={conferenceProceedings} />
        </TabsContent>

        <TabsContent value="other" className="space-y-6 mt-6">
          <OtherPublicationsTab 
            nonRefereedPublications={nonRefereedPublications} 
            workUnderReview={workUnderReview} 
          />
        </TabsContent>

        <TabsContent value="upcoming" className="mt-6">
          <WorkInProgressTab workInProgress={workInProgress} />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default Research;
