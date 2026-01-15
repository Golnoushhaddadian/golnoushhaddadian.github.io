
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BookOpen, Calendar, MapPin, GraduationCap, Award } from "lucide-react";

const Teaching = () => {
  return (
    <div className="space-y-10">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Teaching</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Dedicated to empowering students with essential skills for success in today's data-driven world
        </p>
      </div>

      {/* Teaching Role Section */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <GraduationCap className="h-6 w-6 text-primary" />
            </div>
            <div>
              <Badge variant="secondary" className="mb-2">Instructor of Record</Badge>
              <CardTitle className="text-2xl">Computer Skills for the Information Age</CardTitle>
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

          {/* Skills Covered */}
          <div className="mt-6 pt-6 border-t">
            <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">Skills Covered</h3>
            <div className="flex flex-wrap gap-2">
              {["Word Processing", "Spreadsheets", "Databases", "Presentation Skills", "Web Development", "Data Analysis", "Digital Literacy"].map((skill) => (
                <Badge key={skill} variant="outline" className="bg-background">
                  {skill}
                </Badge>
              ))}
            </div>
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
            <div className="rounded-lg overflow-hidden border shadow-sm">
              <img 
                src="/lovable-uploads/thank-a-teacher-program.jpeg" 
                alt="Thank-A-Teacher Program recognition letter from CETLOE"
                className="w-full h-auto"
              />
            </div>

            {/* Image Caption */}
            <div className="p-5 bg-muted/30 rounded-lg border-l-4 border-primary/50">
              <p className="text-sm text-foreground/80 leading-relaxed">
                Teacher Appreciation Week, celebrated annually in May, is a dedicated time to recognize educators 
                for their contributions throughout the academic year. This note is an example of the student feedback 
                I have received during my teaching journey at Georgia State University's College of Education & Human Development. 
                I am grateful for each student's appreciation and for the opportunity to be a part of their learning experience.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Teaching;
