
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { School, BookOpen, Users, GraduationCap } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

const Teaching = () => {
  const courses = [
    {
      institution: "Georgia State University",
      period: "Fall 2022 to present",
      audience: "Undergraduate Students",
      position: "Instructor for \"Computer Skills for the Information Age\" Course",
      description: "In this course, students learn essential computer skills for organizing, analyzing, and communicating data. The focus is on empowering students to excel in various areas, including using word processing tools, spreadsheets, and databases. They also learn how to improve their presentation skills and develop a website. Students engage with assignments and projects from their coursebook written by Dr. Brendan Calandra and Dr. Lauren Margulieux, providing them with hands-on experience to develop a solid foundation in computer skills. The ultimate goal of the course is to prepare students to succeed in today's data-driven world."
    },
    {
      institution: "RadGuyesh Haddadian International Institute",
      period: "January 2019 to 2021",
      audience: "Adult Learners, Teachers",
      position: "TOEFL coach, TESOL trainer, EFL Instructor",
      description: "Several courses were taught by me at this institute. The institute is a multidisciplinary educational center specializing in English language learning and computer science. It offers General English courses, Test of English as a Foreign Language (TOEFL) and Graduate Record Examinations (GRE) preparation programs, English teacher training through Teaching English to Speakers of Other Languages (TESOL) certification and diploma programs, as well as advanced computer science courses such as Machine Learning and Deep Learning. I served as the lead instructor for the TOEFL and TESOL \"training the trainers\" courses on a full-time basis and occasionally taught General English classes."
    },
    {
      institution: "Andisheh Moein Institute of Higher Education",
      period: "Fall 2019",
      audience: "Graduate Students",
      position: "Adjunct Instructor for \"English for Master of Business Administration (MBA)\"",
      description: "In this course, students develop the language skills required for success in business-related academic and professional settings. They learn to understand and use business-specific vocabulary, read and analyze case studies and reports, write formal documents such as reports and summaries, and effectively communicate in presentations and discussions. The course emphasizes academic and professional English fluency tailored to the MBA context. The institute within which the course is offered is a non-profit, multidisciplinary higher education institution in Iran, offering programs designed for professionals, working adults, and individuals seeking to advance their careers through specialized, skill-based education. The institute supports education, research, and workforce development."
    },
    {
      institution: "University of Applied Sciences, Al-Zahra",
      period: "Summer 2015",
      audience: "Undergraduate Students",
      position: "Adjunct Instructor for \"Introduction to Educational Technology Course\"",
      description: "In this course, students explore the foundational concepts, tools, and practices involved in integrating technology into teaching and learning environments. They learn to evaluate and apply digital tools to enhance instructional design, create interactive learning materials, and support diverse learners with diverse needs. The course emphasizes practical skills in using educational software, learning management systems, and multimedia resources while encouraging critical thinking about the ethical and pedagogical implications of technology in education."
    },
    {
      institution: "Tehran Pouya Technical & Vocational Training",
      period: "March 2015 to December 2018",
      audience: "Adult Learners",
      position: "TOEFL coach, EFL Instructor, Technology Instructor, Educational Consultant",
      description: "Several courses were taught by me at this institute. This is a private educational institution offering English language courses as well as technical and vocational training programs verified by the Technical and Vocational Training Organization in Iran. The institute is committed to providing skill-based education that prepares learners for both professional and academic advancement."
    },
    {
      institution: "Balan Language Academy",
      period: "October 2009 to March 2015",
      audience: "Adult Learners, K-12",
      position: "Education administrator, EFL Instructor, Supervisor, Educational Consultant",
      description: "This is a private educational institution offering English language courses verified by the Ministry of Education in Iran. It primarily serve K–12 students and adult learners by offering General English, conversation, and grammar courses. Instruction is typically based on structured curricula aligned with international standards. Classes are held in group or individual formats, with regular assessments to track student progress."
    },
    {
      institution: "Aryana Institute of Technology",
      period: "February 2009 to September 2012",
      audience: "K-12",
      position: "EFL Instructor, Technology instructor, Educational Consultant",
      description: "This is a multidisciplinary educational institution in Iran, offering programs in both English language education and Information and Communication Technology (ICT). It serves a wide range of learners, from pre-K–12 students to adults. The institution is affiliated with Mojtama Fani Tehran, the country's leading educational brand in technology, recognized at the Second Festival of Communication and Information Technology (ICT) in Iran."
    },
    {
      institution: "Iran-Europe English Language Institute",
      period: "January 2011 to January 2012",
      audience: "K-12",
      position: "EFL Instructor, Educational Consultant",
      description: "This is a private educational institution offering English language courses verified by the Ministry of Education in Iran. These institutions primarily serve K–12 students and adult learners by offering General English, conversation, and grammar courses. Classes are held in group or individual formats."
    },
    {
      institution: "Private Tutor",
      period: "April 2004 to 2021",
      audience: "Adult Learners, K-12",
      position: "EFL Instructor, Technology Instructor",
      description: ""
    }
  ];

  const mentorships = [
    {
      program: "International Learning Sciences Student Association (ILSSA) Mentorship Program",
      role: "Mentorship Program Initiator & Mentor",
      year: "2025",
      description: "Mentorship Program aims to create an adaptive, inclusive, collaborative space for Learning Sciences students and researchers to connect, enhance their expertise, and foster personal and professional development. We aim to empower participants by providing opportunities to receive personalized mentorship to address academic challenges, build professional networks, strengthen leadership and communication skills, and gain constructive feedback on their progress where necessary. By joining, individuals become part of a shared journey that focuses on mutual support, growth, and inspiration within the Learning Sciences community."
    },
    {
      program: "Graduate Student Mentorship",
      role: "Mentor",
      year: "2025",
      description: "Mentoring a team of Master's students in Business Analytics and Computer Science at J. Mack Robinson College of Business for the RITA (Real-time Intelligent Technology for Argumentative Writing) Project."
    }
  ];

  const philosophy = [
    "I believe in creating an inclusive learning environment that encourages critical thinking and intellectual curiosity. My teaching approach emphasizes active learning strategies that engage students in the material beyond memorization.",
    "My courses integrate theoretical foundations with practical applications, preparing students for real-world challenges in the field. I incorporate current research and emerging trends to ensure relevance.",
    "I strive to meet diverse learning needs by providing multiple pathways to understanding complex concepts. This includes visual learning aids, hands-on activities, and opportunities for collaborative problem-solving."
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="space-y-8">
      <div className="bg-teal-50 dark:bg-teal-900/20 p-6 rounded-lg border border-teal-200 dark:border-teal-800">
        <h1 className="text-3xl font-bold mb-2 text-teal-900 dark:text-teal-100">Teaching Experience</h1>
        <p className="text-lg text-teal-700 dark:text-teal-300">
          My teaching philosophy and experience across various institutions.
        </p>
      </div>

      <div className="space-y-6 bg-amber-50 dark:bg-amber-900/20 p-6 rounded-lg border border-amber-200 dark:border-amber-800">
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-amber-600 dark:text-amber-400" />
          <h2 className="text-2xl font-semibold text-amber-900 dark:text-amber-100">Teaching Philosophy</h2>
        </div>
        <div className="space-y-4 pl-4 border-l-2 border-amber-300 dark:border-amber-700">
          {philosophy.map((paragraph, index) => (
            <p key={index} className="text-amber-800 dark:text-amber-200">{paragraph}</p>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 p-4 rounded-t-lg border border-emerald-200 dark:border-emerald-800">
          <School className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
          <h2 className="text-2xl font-semibold text-emerald-900 dark:text-emerald-100">Teaching Positions</h2>
        </div>
        <motion.div 
          className="space-y-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {courses.map((course, index) => (
            <motion.div key={index} variants={item}>
              <Card key={index} className="overflow-hidden border-l-4 border-emerald-500 dark:border-emerald-400">
                <CardHeader className="pb-2 bg-emerald-50/70 dark:bg-emerald-900/20">
                  <CardTitle className="text-xl text-emerald-900 dark:text-emerald-100">{course.institution}</CardTitle>
                  <CardDescription className="flex justify-between items-center">
                    <span>{course.position}</span>
                    <span className="text-sm bg-emerald-100 dark:bg-emerald-800/60 text-emerald-800 dark:text-emerald-200 px-3 py-1 rounded-full">{course.period}</span>
                  </CardDescription>
                  <div className="flex items-center gap-2 mt-1">
                    <Users className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-sm text-emerald-700 dark:text-emerald-300">{course.audience}</span>
                  </div>
                </CardHeader>
                {course.description && (
                  <CardContent className="pt-2">
                    <p className="text-sm text-emerald-800/80 dark:text-emerald-200/80">{course.description}</p>
                  </CardContent>
                )}
                {index < courses.length - 1 && <Separator className="my-1 bg-emerald-100 dark:bg-emerald-800" />}
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-2 bg-violet-100 dark:bg-violet-900/30 p-4 rounded-t-lg border border-violet-200 dark:border-violet-800">
          <GraduationCap className="h-6 w-6 text-violet-600 dark:text-violet-400" />
          <h2 className="text-2xl font-semibold text-violet-900 dark:text-violet-100">Mentorship Experience</h2>
        </div>
        <motion.div 
          className="space-y-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {mentorships.map((mentorship, index) => (
            <motion.div key={index} variants={item}>
              <Card className="overflow-hidden border-l-4 border-violet-500 dark:border-violet-400 bg-violet-50/70 dark:bg-violet-900/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl text-violet-900 dark:text-violet-100">{mentorship.program}</CardTitle>
                  <CardDescription className="flex justify-between items-center">
                    <span className="text-violet-700 dark:text-violet-300">{mentorship.role}</span>
                    <span className="text-sm bg-violet-100 dark:bg-violet-800/60 text-violet-800 dark:text-violet-200 px-3 py-1 rounded-full">{mentorship.year}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <p className="text-sm text-violet-800/80 dark:text-violet-200/80">{mentorship.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Teaching;
