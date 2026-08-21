import { useState } from "react";
import { useDocumentHead } from "@/hooks/useDocumentHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { BookOpen, Calendar, MapPin, GraduationCap, Award, Camera, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const htcSliderImages = [
  { src: "/uploads/htc-slider-2.jpg", alt: "English learning materials" },
  { src: "/uploads/htc-slider-1.jpg", alt: "HTC Training Center activity" },
  { src: "/uploads/htc-slider-3.jpg", alt: "Classroom group activity" },
  { src: "/uploads/htc-slider-4.jpg", alt: "Student with school bus" },
  { src: "/uploads/htc-slider-5.jpg", alt: "Presentation session" },
  { src: "/uploads/htc-slider-6.jpg", alt: "Student studying" },
  { src: "/uploads/htc-slider-7.jpg", alt: "TOEFL preparation" },
  { src: "/uploads/htc-slider-8.jpg", alt: "Group learning session" },
  { src: "/uploads/htc-slider-9.jpg", alt: "Collaborative learning" },
  { src: "/uploads/htc-slider-10.jpg", alt: "ELA balloon activity" },
  { src: "/uploads/htc-slider-11.jpg", alt: "Cambridge TOEFL preparation book" },
  { src: "/uploads/htc-slider-12.jpg", alt: "TOEFL study materials" },
  { src: "/uploads/htc-slider-13.jpg", alt: "Student with Cambridge TOEFL book" },
  { src: "/uploads/htc-slider-14.jpg", alt: "University application workshop" },
  { src: "/uploads/htc-slider-15.jpg", alt: "Classroom instruction" },
  { src: "/uploads/htc-slider-16.jpg", alt: "HTC group photo" },
  { src: "/uploads/htc-slider-17.jpg", alt: "TESOL certification graduates" },
];

const Teaching = () => {
  useDocumentHead({
    title: 'Teaching Experience — Golnoush Haddadian',
    description: 'Teaching experience of Golnoush Haddadian including courses at Georgia State University, TOEFL coaching, TESOL training, and educational technology instruction.',
    canonical: '/teaching',
    noindex: true,
  });
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({ ...prev, [sectionId]: !prev[sectionId] }));
  };

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-10">
      {/* Header Section */}
      <div className="text-center space-y-2 sm:space-y-3">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">Teaching</h1>
        <p className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-5xl mx-auto leading-relaxed">
          The following section presents a selection of my most recent teaching experiences. I started teaching in 2004. For a complete record of my teaching activities, please refer to the CV section.
        </p>
      </div>

      {/* Inventing to Learn Section */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 border-b p-3 sm:p-4 md:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
            <div className="flex items-center gap-2">
              <div className="p-1 sm:p-1.5 bg-primary/10 rounded-lg">
                <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              </div>
              <div>
                <Badge variant="secondary" className="mb-0.5 sm:mb-1 text-[9px] sm:text-[10px] px-1.5 py-0.5">Co-designer & Co-instructor</Badge>
                <CardTitle className="text-sm sm:text-lg md:text-2xl">Inventing to Learn</CardTitle>
              </div>
            </div>
            {/* Logo */}
            <div className="rounded-lg overflow-hidden border shadow-sm bg-background p-1.5 sm:p-2 shrink-0 self-start sm:self-auto">
              <img 
                src="/uploads/gsu-logo.jpg" 
                alt="Georgia State University logo"
                className="h-8 sm:h-10 md:h-16 w-auto"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-3 sm:pt-4 md:pt-6 px-3 sm:px-4 md:px-6">
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-3 sm:mb-4 text-[10px] sm:text-xs">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Calendar className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              <span>Aug 2025 - Dec 2025</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              <span>Atlanta, GA</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <BookOpen className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              <span>Georgia State University</span>
            </div>
          </div>
          
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <p className="text-foreground/90 leading-relaxed text-[10px] sm:text-xs md:text-sm">
              This course equips educators to integrate maker tools such as 3D printers and microcontrollers into teaching. 
              It emphasizes both technological skills and pedagogical approaches, enhancing confidence in designing curriculum 
              that uses making to enhance student learning, and is offered at both undergraduate and graduate levels.
            </p>
          </div>

          {/* Student Feedback Highlight - Subsection */}
          <Separator className="my-4 sm:my-6 md:my-8" />
          
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-accent/20 rounded-lg">
                <Award className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm md:text-lg font-bold">
                  CETLOE: Thank-A-Teacher Program
                </h3>
                <p className="text-[10px] sm:text-xs text-muted-foreground">Student Feedback Highlight</p>
              </div>
            </div>

            {/* Featured Image */}
            <div className="mx-auto max-w-2xl rounded-lg overflow-hidden border shadow-sm">
              <img 
                src="/uploads/inventing-to-learn-thank-a-teacher.png" 
                alt="Thank-A-Teacher Program recognition letter from CETLOE for Inventing to Learn course"
                className="w-full h-auto"
              />
            </div>

            {/* Learn More Link */}
            <Dialog>
              <DialogTrigger asChild>
                <button className="inline-flex items-center gap-1.5 px-2 sm:px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg text-[10px] sm:text-xs font-medium transition-colors cursor-pointer border border-primary/20">
                  <Award className="h-3 w-3" />
                  Learn more
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle className="text-sm sm:text-lg">CETLOE: Thank-A-Teacher Program</DialogTitle>
                </DialogHeader>
                <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm">
                  Teacher Appreciation Week is a dedicated time to recognize educators for their contributions throughout the academic year. This note is an example of the student feedback my brilliant mentor, Dr. Cohen, and I have received during my teaching journey at Georgia State University's College of Education & Human Development.
                </p>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Computer Skills Section */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 border-b p-3 sm:p-4 md:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
            <div className="flex items-center gap-2">
              <div className="p-1 sm:p-1.5 bg-primary/10 rounded-lg">
                <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              </div>
              <div>
                <Badge variant="secondary" className="mb-0.5 sm:mb-1 text-[9px] sm:text-[10px] px-1.5 py-0.5">Instructor of Record</Badge>
                <CardTitle className="text-sm sm:text-lg md:text-2xl">Computer Skills for the Information Age</CardTitle>
              </div>
            </div>
            {/* Logo */}
            <div className="rounded-lg overflow-hidden border shadow-sm bg-background p-1.5 sm:p-2 shrink-0 self-start sm:self-auto">
              <img 
                src="/uploads/gsu-logo.jpg" 
                alt="Georgia State University logo"
                className="h-8 sm:h-10 md:h-16 w-auto"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-3 sm:pt-4 md:pt-6 px-3 sm:px-4 md:px-6">
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-3 sm:mb-4 text-[10px] sm:text-xs">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Calendar className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              <span>Aug 2022 - Present</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              <span>Atlanta, GA</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <BookOpen className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              <span>Georgia State University</span>
            </div>
          </div>
          
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <p className={cn(
              "text-foreground/90 leading-relaxed text-[10px] sm:text-xs md:text-sm",
              !expandedSections['computer-skills'] && "line-clamp-3 md:line-clamp-none"
            )}>
              In this course, students learn essential computer skills for organizing, analyzing, and communicating data. 
              The focus is on empowering students to excel in various areas, including using word processing tools, 
              spreadsheets, and databases. They also learn how to improve their presentation skills and develop a website.
              Students engage with assignments and projects from their coursebook, providing them with hands-on experience 
              to develop a solid foundation in computer skills. The ultimate goal of the course is to prepare students 
              to succeed in today's data-driven world.
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleSection('computer-skills')}
              className="md:hidden mt-1 h-5 px-1 text-[10px] text-primary hover:text-primary/80 p-0"
            >
              {expandedSections['computer-skills'] ? (
                <>Show less <ChevronUp className="w-3 h-3 ml-0.5" /></>
              ) : (
                <>Read more <ChevronDown className="w-3 h-3 ml-0.5" /></>
              )}
            </Button>
          </div>

          {/* Student Feedback Highlight */}
          <Separator className="my-4 sm:my-6 md:my-8" />
          
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-accent/20 rounded-lg">
                <Award className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm md:text-lg font-bold">
                  CETLOE: Thank-A-Teacher Program
                </h3>
                <p className="text-[10px] sm:text-xs text-muted-foreground">Student Feedback Highlight</p>
              </div>
            </div>

            {/* Featured Image */}
            <div className="mx-auto max-w-2xl rounded-lg overflow-hidden border shadow-sm">
              <img 
                src="/uploads/computer-skills-thank-a-teacher.png" 
                alt="Thank-A-Teacher Program recognition letter from CETLOE for Computer Skills course"
                className="w-full h-auto"
              />
            </div>

            {/* Learn More Link */}
            <Dialog>
              <DialogTrigger asChild>
                <button className="inline-flex items-center gap-1.5 px-2 sm:px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg text-[10px] sm:text-xs font-medium transition-colors cursor-pointer border border-primary/20">
                  <Award className="h-3 w-3" />
                  Learn more
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle className="text-sm sm:text-lg">CETLOE: Thank-A-Teacher Program</DialogTitle>
                </DialogHeader>
                <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm">
                  Teacher Appreciation Week is a dedicated time to recognize educators for their contributions throughout the academic year. This note is an example of the student feedback I have received during my teaching journey at Georgia State University's College of Education & Human Development.
                </p>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Haddadian Training Center Section */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 border-b p-3 sm:p-4 md:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
            <div className="flex items-center gap-2">
              <div className="p-1 sm:p-1.5 bg-primary/10 rounded-lg">
                <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              </div>
              <div>
                <Badge variant="secondary" className="mb-0.5 sm:mb-1 text-[9px] sm:text-[10px] px-1.5 py-0.5">Coach & Trainer</Badge>
                <CardTitle className="text-sm sm:text-lg md:text-2xl">TOEFL & GRE Coach | TESOL Trainer</CardTitle>
              </div>
            </div>
            {/* Logo */}
            <div className="rounded-lg overflow-hidden border shadow-sm bg-background p-1.5 sm:p-2 shrink-0 self-start sm:self-auto">
              <img 
                src="/uploads/htc-new-logo.png" 
                alt="Haddadian Training Center logo"
                className="h-8 sm:h-10 md:h-16 w-auto"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-3 sm:pt-4 md:pt-6 px-3 sm:px-4 md:px-6">
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-3 sm:mb-4 text-[10px] sm:text-xs">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Calendar className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              <span>2019 - 2021</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              <span>Tehran, Iran</span>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                  <BookOpen className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  <span className="underline decoration-dotted underline-offset-2 text-[10px] sm:text-xs">HTC Haddadian Training Center</span>
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle className="text-sm sm:text-lg">HTC Haddadian Training Center</DialogTitle>
                </DialogHeader>
                <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm">
                  This multidisciplinary institute, based in Tehran, Iran, is dedicated to advancing education at the intersection of language learning and artificial intelligence. Its core mission is to support students in developing strong proficiency in English as a Foreign Language (EFL), with specialized preparation for high-stakes exams such as TOEFL and GRE.
                </p>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <p className={cn(
              "text-foreground/90 leading-relaxed text-[10px] sm:text-xs md:text-sm",
              !expandedSections['htc'] && "line-clamp-3 md:line-clamp-none"
            )}>
              I began my teaching career in April 2004 as an English as a Foreign Language (EFL) instructor and technology instructor, working as a private tutor with K–12 students and adult learners. Over time, I transitioned into teaching roles within private institutions and university-level courses. In 2019, I established HTC Haddadian Training Center, where my primary role was as a TOEFL coach, working closely with students to develop the academic language skills and test-taking strategies required for success on high-stakes examinations. I also supported students preparing for the GRE, with a particular focus on verbal reasoning and academic writing. Building on this work, I served as a TESOL trainer, delivering pedagogy-focused training for instructors, mentoring teachers in classroom practice, and supporting the development of effective, learner-centered approaches to English language instruction.
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleSection('htc')}
              className="md:hidden mt-1 h-5 px-1 text-[10px] text-primary hover:text-primary/80 p-0"
            >
              {expandedSections['htc'] ? (
                <>Show less <ChevronUp className="w-3 h-3 ml-0.5" /></>
              ) : (
                <>Read more <ChevronDown className="w-3 h-3 ml-0.5" /></>
              )}
            </Button>
          </div>

          {/* Image Slider */}
          <Separator className="my-4 sm:my-6 md:my-8" />
          
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-accent/20 rounded-lg">
                <Camera className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm md:text-lg font-bold">Highlights from HTC</h3>
                <p className="text-[10px] sm:text-xs text-muted-foreground">Training sessions and student activities</p>
              </div>
            </div>

            <Carousel className="w-full max-w-3xl mx-auto" opts={{ loop: true }}>
              <CarouselContent>
                {htcSliderImages.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="rounded-lg overflow-hidden border shadow-sm relative">
                      <img 
                        src={image.src} 
                        alt={image.alt}
                        className="w-full h-[180px] sm:h-[300px] md:h-[500px] object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20" />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2 h-6 w-6 sm:h-8 sm:w-8" />
              <CarouselNext className="right-2 h-6 w-6 sm:h-8 sm:w-8" />
            </Carousel>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Teaching;
