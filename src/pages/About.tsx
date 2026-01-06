import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Heart, 
  GraduationCap, 
  Users, 
  Lightbulb, 
  Award,
  Sparkles,
  BookOpen,
  Brain,
  Target,
  Compass
} from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const About = () => {
  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center py-12 relative"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent rounded-3xl -z-10" />
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Sparkles className="w-12 h-12 mx-auto mb-4 text-primary" />
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Getting to Know Me
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Some questions I often get, with the answers I usually share, to offer a glimpse into my background 😊
        </p>
      </motion.section>

      {/* Q&A Sections */}
      <motion.div 
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="space-y-12"
      >
        {/* Question 1 */}
        <motion.div variants={fadeInUp}>
          <Card className="overflow-hidden border-l-4 border-l-primary bg-gradient-to-r from-background to-muted/20">
            <CardContent className="p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 rounded-full bg-primary/10 shrink-0">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  1. What made you interested in studying instructional technology?
                </h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed pl-16">
                <p className="text-lg font-medium text-foreground italic">
                  The passion, yes, the passion to help others grow! To lift those who struggle! To reach for those who are drowning quietly in confusion! To light a path for those getting lost in their learning! I know that path well. I walked it myself.
                </p>
                <p>
                  The reason I chose to study Instructional Technology is simple: I want to support others. This passion is not abstract or distant for me; it is lived experience. I know how it feels to learn in environments where bright students could not grow into who they truly are. I have seen potential fade quietly, not because learners lacked ability, but because their environment did not give them the room to learn, express, or rise. Those moments stayed with me. They became my reason to act, my motivation to help.
                </p>
                <p>
                  We are human, each of us a different shade of possibility, a blend of strengths, hopes, and hidden brilliance waiting for space to unfold. Each of us carries a unique palette of ideas and talents, bright and longing to rise. Yet many of us as students are pulled down by lack of timely support, overwhelming and confusing feedback, unclear expectations for how to address feedback, and ultimately the constant feeling of not being "enough."
                </p>
                <p>
                  I have seen a wide array of scenarios where classroom feedback heavily discouraged instead of guided students, because it was not on time, not specific, not clear, and not actionable. Feedback that closed hearts forever instead of opening minds. I chose to study Instructional Technology to help build enriched personalized learning spaces to help students grow; to show them how teaching and feedback can adapt to them rather than forcing them to adapt to the education system; to help them step beyond their comfort zone and climb into their proximal zone of development.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Question 2 */}
        <motion.div variants={fadeInUp}>
          <Card className="overflow-hidden border-l-4 border-l-primary bg-gradient-to-r from-background to-muted/20">
            <CardContent className="p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 rounded-full bg-primary/10 shrink-0">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  2. What made you want to earn your degree at Georgia State University?
                </h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed pl-16">
                <p>
                  Following my dream of supporting students, I recognized that opportunities to grow and create meaningful change in my home country were limited. After completing my master's degree, I pursued that vision by establishing an international, multidisciplinary institute that brings Language education and Artificial intelligence (AI) education together in one cohesive space. My goal was to create an environment where students can genuinely grow and experience a higher quality of learning, one that feels supportive rather than stressful, and where timely, meaningful feedback is a central part of how we help them succeed.
                </p>
                <p>
                  However, I soon realized that to make a more meaningful impact, I needed to widen my horizons. My knowledge at the time could only take me so far, so I chose to study abroad as a way to keep moving forward and deepen the expertise required to pursue that larger vision.
                </p>
                <p>
                  It was a major decision. I had stability, a good career, and a life I had built, yet my mind was restless because my passion was still there. I started by searching for a brilliant and exceptional professor who could guide me, inspire me, and align with my academic goals and needs. Not every professor was the right fit for me. I was looking for someone who truly valued personalization, adaptive learning, feedback, and technology, and whose research record demonstrated both scholarly excellence and a strong growth mindset. The one who shares the same passion as I do.
                </p>
                <p className="text-lg font-medium text-foreground">
                  My day and night search for the right advisor led me directly to Dr. Min Kyu Kim, at Georgia State University. GSU has brought together an exceptional community of education scholars and professors, and within that community, I found the person whose vision, rigor, and passion for innovative learning matched my own, an advisor whose mentorship would ultimately shape the direction and depth of my scholarly path. That is how I became part of the GSU family.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Question 3 */}
        <motion.div variants={fadeInUp}>
          <Card className="overflow-hidden border-l-4 border-l-primary bg-gradient-to-r from-background to-muted/20">
            <CardContent className="p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 rounded-full bg-primary/10 shrink-0">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  3. You are a first-generation graduate student and first-generation immigrant. What does it mean to you?
                </h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed pl-16">
                <p className="text-lg">
                  Yes, and carrying these identities is a deep honor for me. Being the first in my family to earn a graduate degree and to immigrate to the United States is more than personal achievement. <span className="font-semibold text-foreground">It reflects possibility.</span>
                </p>
                <p>
                  It shows that achieving your dreams does not require a perfect path, ideal conditions, rich or educated parents. What it requires is <span className="font-medium text-foreground">persistence, diligence, proactive effort, and a dream held firmly through uncertainty.</span> And at the center of it all is faith in your own capacity to succeed.
                </p>
                <p className="text-lg font-medium text-foreground italic">
                  I carry these identities with gratitude, and with hope for what future generations will build beyond this first step.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Question 4 - NSF Projects */}
        <motion.div variants={fadeInUp}>
          <Card className="overflow-hidden border-l-4 border-l-primary bg-gradient-to-r from-background to-muted/20">
            <CardContent className="p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 rounded-full bg-primary/10 shrink-0">
                  <Lightbulb className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  4. You have contributed to three major NSF projects at the intersection of AI and Education. Can you tell me about these?
                </h2>
              </div>
              <div className="pl-16 space-y-8">
                {/* Project 1: SaTC */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Brain className="w-5 h-5 text-primary" />
                    <h3 className="text-xl font-bold text-foreground">
                      Secure and Trustworthy Cyberspace (SaTC): Private AI
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="outline">NSF Funded</Badge>
                    <Badge variant="outline">Aug 2021 – May 2025</Badge>
                    <Badge variant="secondary">Graduate Research Associate</Badge>
                  </div>
                  <p className="text-muted-foreground">
                    This interdisciplinary project focused on trustworthy AI (private AI), supported by the Secure and Trustworthy Cyberspace (SaTC) program. Aligned with the Federal Cybersecurity Research and Development Strategic Plan and the National Privacy Research Strategy, it aimed to protect the benefits of cyber systems while ensuring security and privacy.
                  </p>
                  <div className="bg-muted/50 rounded-lg p-4 border-l-2 border-primary/50">
                    <p className="text-sm text-muted-foreground italic mb-3">
                      "On my first day, I felt as though I had crossed into another universe; not just a new university, but a new country, a new culture, even a new intellectual language. Everything looked and sounded unfamiliar, as if I had landed on the moon or Mars, learning how to breathe all over again..."
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Week after week, I found myself saying, "I cannot do this; I should quit." And yet, every week, a small light inside me whispered: <span className="font-medium text-foreground">"Stay just one more week. Just try one more week."</span> So, I stayed. And then another week. And another.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge>Design Based Research</Badge>
                    <Badge>Mixed-Methods Research</Badge>
                    <Badge>Theory-Driven Research</Badge>
                    <Badge>Curriculum Design</Badge>
                    <Badge>Interdisciplinary Collaboration</Badge>
                  </div>
                </div>

                {/* Project 2: AI-ALOE */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Target className="w-5 h-5 text-primary" />
                    <h3 className="text-xl font-bold text-foreground">
                      AI Institute for Adult Learning and Online Education (ALOE)
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="outline">NSF Funded</Badge>
                    <Badge variant="outline">Jan 2022 – Aug 2022</Badge>
                    <Badge variant="secondary">Graduate Research Associate</Badge>
                  </div>
                  <p className="text-muted-foreground">
                    This interdisciplinary project aims to transform online adult learning through AI-driven models grounded in cognitive and social learning theories. The initiative brings together a national network including Georgia Tech, Harvard University, Wiley, Georgia State University, Vanderbilt University, IBM, Boeing, and Technical College System of Georgia.
                  </p>
                  <div className="bg-muted/50 rounded-lg p-4 border-l-2 border-primary/50">
                    <p className="text-sm text-muted-foreground italic mb-3">
                      "I began to see my own transformation in real time! Wow! Look at you! My public speaking, once merely a strength, was growing far beyond anything I had imagined. I watched my research skills sharpen day by day!"
                    </p>
                    <p className="text-sm text-foreground font-medium">
                      I came to realize that perfection is not the entry ticket to growth—participation is.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge>Learning Engineering</Badge>
                    <Badge>Responsible AI Design</Badge>
                    <Badge>Scalable Instructional Design</Badge>
                    <Badge>Participatory Design</Badge>
                    <Badge>Data-Driven Decision Making</Badge>
                  </div>
                </div>

                {/* Project 3: IUSE */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Compass className="w-5 h-5 text-primary" />
                    <h3 className="text-xl font-bold text-foreground">
                      IUSE: AI-Scaffolded Pre-Classroom Learning for Physics Courses
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="outline">NSF Funded</Badge>
                    <Badge variant="outline">Aug 2024 – Present</Badge>
                    <Badge variant="secondary">Graduate Student Researcher</Badge>
                  </div>
                  <p className="text-muted-foreground">
                    This project designs and implements AI-augmented formative assessment and feedback systems to help students build skills for in-classroom interactive problem-solving activities, with a focus on those traditionally underrepresented in STEM education.
                  </p>
                  <div className="bg-muted/50 rounded-lg p-4 border-l-2 border-primary/50">
                    <p className="text-sm text-muted-foreground italic">
                      "Coming into this project, I carried with me the momentum of two big prior research experiences. Those earlier challenges had trained me, not only in research methods, but in endurance, self-trust, and academic navigation."
                    </p>
                    <p className="text-sm text-foreground font-medium mt-2">
                      Confidence is not given; it is built through small wins repeated over time.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Key Lessons Section */}
        <motion.div variants={fadeInUp}>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <CardContent className="p-6">
                <BookOpen className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-bold mb-2">On Growth</h3>
                <p className="text-muted-foreground text-sm">
                  "Growth rarely emerges from comfort or perfection; it comes from the trembling feet that still move forward, from the ache in your bones that reminds you you're stretching beyond who you were yesterday."
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <CardContent className="p-6">
                <Award className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-bold mb-2">On Success</h3>
                <p className="text-muted-foreground text-sm">
                  "Success is built by staying…. Staying right where your feet shake, where the room feels too big for you, where you are tempted to walk away. Sometimes success rises quietly from simply being present."
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;
