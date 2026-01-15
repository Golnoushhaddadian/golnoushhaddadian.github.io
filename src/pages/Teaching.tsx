import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BookOpen, Calendar, MapPin, GraduationCap, Award, Camera } from "lucide-react";
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
  { src: "/lovable-uploads/htc-slider-2.jpg", alt: "English learning materials" },
  { src: "/lovable-uploads/htc-slider-1.jpg", alt: "HTC Training Center activity" },
  { src: "/lovable-uploads/htc-slider-3.jpg", alt: "Classroom group activity" },
  { src: "/lovable-uploads/htc-slider-4.jpg", alt: "Student with school bus" },
  { src: "/lovable-uploads/htc-slider-5.jpg", alt: "Presentation session" },
  { src: "/lovable-uploads/htc-slider-6.jpg", alt: "Student studying" },
  { src: "/lovable-uploads/htc-slider-7.jpg", alt: "TOEFL preparation" },
  { src: "/lovable-uploads/htc-slider-8.jpg", alt: "Group learning session" },
  { src: "/lovable-uploads/htc-slider-9.jpg", alt: "Collaborative learning" },
  { src: "/lovable-uploads/htc-slider-10.jpg", alt: "ELA balloon activity" },
  { src: "/lovable-uploads/htc-slider-11.jpg", alt: "Cambridge TOEFL preparation book" },
  { src: "/lovable-uploads/htc-slider-12.jpg", alt: "TOEFL study materials" },
  { src: "/lovable-uploads/htc-slider-13.jpg", alt: "Student with Cambridge TOEFL book" },
  { src: "/lovable-uploads/htc-slider-14.jpg", alt: "University application workshop" },
  { src: "/lovable-uploads/htc-slider-15.jpg", alt: "Classroom instruction" },
  { src: "/lovable-uploads/htc-slider-16.jpg", alt: "HTC group photo" },
  { src: "/lovable-uploads/htc-slider-17.jpg", alt: "TESOL certification graduates" },
];

const Teaching = () => {
  return (
    <div className="space-y-10">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Teaching</h1>
      </div>

      {/* Inventing to Learn Section */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 border-b">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <div>
                <Badge variant="secondary" className="mb-2">Co-designer & Co-instructor</Badge>
                <CardTitle className="text-2xl">Inventing to Learn</CardTitle>
              </div>
            </div>
            {/* Logo */}
            <div className="rounded-lg overflow-hidden border shadow-sm bg-background p-3 shrink-0">
              <img 
                src="/lovable-uploads/gsu-logo.jpg" 
                alt="Georgia State University logo"
                className="h-16 w-auto"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Aug 2025 - Dec 2025</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Atlanta, GA</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              <span>Georgia State University</span>
            </div>
          </div>
          
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <p className="text-foreground/90 leading-relaxed">
              This course equips educators to integrate maker tools such as 3D printers and microcontrollers into teaching. 
              It emphasizes both technological skills and pedagogical approaches, enhancing confidence in designing curriculum 
              that uses making to enhance student learning, and is offered at both undergraduate and graduate levels.
            </p>
          </div>

          {/* Student Feedback Highlight - Subsection */}
          <Separator className="my-8" />
          
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/20 rounded-lg">
                <Award className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold">
                  The Center for Excellence in Teaching, Learning, and Online Education (CETLOE): Thank-A-Teacher Program
                </h3>
                <p className="text-sm text-muted-foreground">Student Feedback Highlight</p>
              </div>
            </div>

            {/* Featured Image */}
            <div className="mx-auto max-w-2xl rounded-lg overflow-hidden border shadow-sm">
              <img 
                src="/lovable-uploads/inventing-to-learn-thank-a-teacher.png" 
                alt="Thank-A-Teacher Program recognition letter from CETLOE for Inventing to Learn course"
                className="w-full h-auto"
              />
            </div>

            {/* Learn More Link */}
            <Dialog>
              <DialogTrigger asChild>
                <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg text-sm font-medium transition-colors cursor-pointer border border-primary/20">
                  <Award className="h-4 w-4" />
                  Learn more about "Thank-A-Teacher Program"
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle className="text-lg">The Center for Excellence in Teaching, Learning, and Online Education (CETLOE): Thank-A-Teacher Program</DialogTitle>
                </DialogHeader>
                <p className="text-muted-foreground leading-relaxed">
                  Teacher Appreciation Week is a dedicated time to recognize educators for their contributions throughout the academic year. This note is an example of the student feedback my brilliant mentor, Dr. Cohen, and I have received during my teaching journey at Georgia State University's College of Education & Human Development. I am grateful and honored for each student's appreciation and for the opportunity to be a part of their learning experience.
                </p>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Computer Skills Section */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 border-b">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <div>
                <Badge variant="secondary" className="mb-2">Instructor of Record</Badge>
                <CardTitle className="text-2xl">Computer Skills for the Information Age</CardTitle>
              </div>
            </div>
            {/* Logo */}
            <div className="rounded-lg overflow-hidden border shadow-sm bg-background p-3 shrink-0">
              <img 
                src="/lovable-uploads/gsu-logo.jpg" 
                alt="Georgia State University logo"
                className="h-16 w-auto"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Aug 2022 - Present</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Atlanta, GA</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              <span>Georgia State University</span>
            </div>
          </div>
          
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <p className="text-foreground/90 leading-relaxed">
              In this course, students learn essential computer skills for organizing, analyzing, and communicating data. 
              The focus is on empowering students to excel in various areas, including using word processing tools, 
              spreadsheets, and databases. They also learn how to improve their presentation skills and develop a website.
            </p>
            <p className="text-foreground/90 leading-relaxed mt-4">
              Students engage with assignments and projects from their coursebook, providing them with hands-on experience 
              to develop a solid foundation in computer skills. The ultimate goal of the course is to prepare students 
              to succeed in today's data-driven world.
            </p>
          </div>


          {/* Student Feedback Highlight - Now a subsection */}
          <Separator className="my-8" />
          
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/20 rounded-lg">
                <Award className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold">
                  The Center for Excellence in Teaching, Learning, and Online Education (CETLOE): Thank-A-Teacher Program
                </h3>
                <p className="text-sm text-muted-foreground">Student Feedback Highlight</p>
              </div>
            </div>

            {/* Featured Image */}
            <div className="mx-auto max-w-2xl rounded-lg overflow-hidden border shadow-sm">
              <img 
                src="/lovable-uploads/computer-skills-thank-a-teacher.png" 
                alt="Thank-A-Teacher Program recognition letter from CETLOE for Computer Skills course"
                className="w-full h-auto"
              />
            </div>

            {/* Learn More Link */}
            <Dialog>
              <DialogTrigger asChild>
                <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg text-sm font-medium transition-colors cursor-pointer border border-primary/20">
                  <Award className="h-4 w-4" />
                  Learn more about "Thank-A-Teacher Program"
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle className="text-lg">The Center for Excellence in Teaching, Learning, and Online Education (CETLOE): Thank-A-Teacher Program</DialogTitle>
                </DialogHeader>
                <p className="text-muted-foreground leading-relaxed">
                  Teacher Appreciation Week is a dedicated time to recognize educators for their contributions throughout the academic year. This note is an example of the student feedback I have received during my teaching journey at Georgia State University's College of Education & Human Development. I am grateful and honored for each student's appreciation and for the opportunity to be a part of their learning experience.
                </p>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Haddadian Training Center Section */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 border-b">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <div>
                <Badge variant="secondary" className="mb-2">Coach & Trainer</Badge>
                <CardTitle className="text-2xl">TOEFL & GRE Coach | TESOL Trainer</CardTitle>
              </div>
            </div>
            {/* Logo */}
            <div className="rounded-lg overflow-hidden border shadow-sm bg-background p-3 shrink-0">
              <img 
                src="/lovable-uploads/htc-new-logo.png" 
                alt="Haddadian Training Center logo"
                className="h-16 w-auto"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>2019 - 2021</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Tehran, Iran</span>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                  <BookOpen className="h-4 w-4" />
                  <span className="underline decoration-dotted underline-offset-4">HTC Haddadian Training Center</span>
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle className="text-lg">HTC Haddadian Training Center</DialogTitle>
                </DialogHeader>
                <p className="text-muted-foreground leading-relaxed">
                  This multidisciplinary institute, based in Tehran, Iran, is dedicated to advancing education at the intersection of language learning and artificial intelligence. Its core mission is to support students in developing strong proficiency in English as a Foreign Language (EFL), with specialized preparation for high-stakes exams such as TOEFL and GRE, emphasizing academic language skills, critical thinking, and test strategies.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  In parallel, the institute offers a growing portfolio of AI-focused educational programs, designed to equip learners with foundational to advanced knowledge in artificial intelligence and related technologies. Through an integrated, future-oriented approach, the institute prepares students not only for academic and professional success in global contexts but also for active participation in the evolving AI-driven world.
                </p>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <p className="text-foreground/90 leading-relaxed">
              I began my teaching career in April 2004 as an English as a Foreign Language (EFL) instructor and technology instructor, working as a private tutor with K–12 students and adult learners. Over time, I transitioned into teaching roles within private institutions and university-level courses, including appointments as a visiting instructor, where I continued to develop my professional expertise through 2019.
            </p>
            <p className="text-foreground/90 leading-relaxed mt-4">
              In 2019, I established HTC Haddadian Training Center, where my primary role was as a Test of English as a Foreign Language (TOEFL) coach, working closely with students to develop the academic language skills and test-taking strategies required for success on high-stakes examinations. I also supported students preparing for the Graduate Record Examination (GRE), with a particular focus on verbal reasoning and academic writing.
            </p>
            <p className="text-foreground/90 leading-relaxed mt-4">
              Building on this work, I served as a Teaching English to Speakers of Other Languages (TESOL) trainer, delivering pedagogy-focused training for instructors, mentoring teachers in classroom practice, and supporting the development of effective, learner-centered approaches to English language instruction. In addition, I acted as an academic advisor, guiding students through their educational pathways and helping them align language learning, test preparation, and long-term academic goals.
            </p>
          </div>

          {/* Image Slider */}
          <Separator className="my-8" />
          
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/20 rounded-lg">
                <Camera className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Highlights from HTC</h3>
                <p className="text-sm text-muted-foreground">Training sessions and student activities</p>
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
                        className="w-full h-[500px] object-cover"
                      />
                      <div className="absolute inset-0 bg-black/10" />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Teaching;
