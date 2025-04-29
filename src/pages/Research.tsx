
import { Book, FileText, Download } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Research = () => {
  const publications = [
    {
      title: "Title of Research Paper 1",
      authors: "Your Name, Co-author Name, Another Author",
      journal: "Journal of Important Research",
      year: "2023",
      abstract: "This paper explores the fundamental aspects of [research topic], providing new insights into [specific area]. We present a novel approach to [problem] that outperforms existing methods by [improvement percentage].",
      link: "#",
    },
    {
      title: "Title of Research Paper 2",
      authors: "Your Name, Different Co-author",
      journal: "Proceedings of International Conference on [Field]",
      year: "2022",
      abstract: "In this work, we address the challenge of [research challenge] through innovative [methodology]. Our experimental results demonstrate significant improvements in [metrics] compared to state-of-the-art approaches.",
      link: "#",
    },
    {
      title: "Title of Research Paper 3",
      authors: "Your Name, Multiple Co-authors",
      journal: "Transactions on [Field]",
      year: "2021",
      abstract: "This research introduces a groundbreaking framework for [research area]. Through extensive validation across multiple datasets, we show that our approach provides robust performance under various conditions.",
      link: "#",
    },
  ];

  const currentProjects = [
    {
      title: "Project 1: Innovative Research Direction",
      description: "This ongoing project investigates [research question] through [methodological approach]. We are developing new algorithms that address [problem] with applications in [field].",
      collaborators: "In collaboration with Research Lab at University X",
      funding: "Funded by National Science Foundation",
    },
    {
      title: "Project 2: Interdisciplinary Research Initiative",
      description: "A cross-disciplinary exploration of [topic] that bridges [field 1] and [field 2]. This work aims to develop novel insights that can inform both theoretical understanding and practical applications.",
      collaborators: "Joint work with Department Y at University Z",
      funding: "Supported by Industry Partner Grant",
    },
  ];

  return (
    <section className="space-y-8">
      <div>
        <h1>Research</h1>
        <p className="text-lg text-muted-foreground mb-6">
          My research focuses on [your research area], with particular emphasis on [specific aspects].
        </p>
      </div>

      <Tabs defaultValue="publications" className="w-full">
        <TabsList className="w-full md:w-auto">
          <TabsTrigger value="publications" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Publications</span>
          </TabsTrigger>
          <TabsTrigger value="projects" className="flex items-center gap-2">
            <Book className="h-4 w-4" />
            <span>Current Projects</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="publications" className="space-y-6 mt-6">
          {publications.map((pub, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-xl">{pub.title}</CardTitle>
                <CardDescription className="space-y-1">
                  <div>{pub.authors}</div>
                  <div className="font-medium text-primary">{pub.journal}, {pub.year}</div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{pub.abstract}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" asChild>
                  <a href={pub.link} target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 h-4 w-4" />
                    <span>Download PDF</span>
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="projects" className="space-y-6 mt-6">
          {currentProjects.map((project, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <CardDescription>{project.collaborators}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>{project.description}</p>
                <div className="text-sm text-muted-foreground">{project.funding}</div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default Research;
