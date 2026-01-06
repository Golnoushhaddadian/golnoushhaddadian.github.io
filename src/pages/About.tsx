import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  GraduationCap, 
  BookOpen, 
  Award, 
  Briefcase, 
  Globe, 
  Mail, 
  MapPin 
} from "lucide-react";

const About = () => {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold mb-2">Golnoush (Lia) Haddadian</h1>
        <p className="text-muted-foreground text-lg mb-4">
          Graduate Research Associate, Ph.D. Candidate
        </p>
        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mb-6">
          <span className="flex items-center gap-1">
            <MapPin size={16} />
            College of Education and Human Development, Georgia State University
          </span>
          <span className="flex items-center gap-1">
            <Mail size={16} />
            ghaddadian1@gsu.edu
          </span>
        </div>
        <p className="text-muted-foreground">
          <strong>AI2 Research Laboratory:</strong> AI2 stands for Artificial Intelligence (A), Interactive (I), 
          Augmented (A), and Immersive (I) learning environments. We build on the legacy of our understanding 
          of how people learn to answer the question, how we can scaffold people to learn better.
        </p>
      </section>

      <Separator />

      {/* Education */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <GraduationCap className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-semibold">Education</h2>
        </div>
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Ph.D. Candidate in Learning Sciences</CardTitle>
              <p className="text-sm text-muted-foreground">Georgia State University, USA • August 2021 - Present</p>
            </CardHeader>
            <CardContent>
              <p className="text-sm">GPA: 4.14/4.00 (Honored Student)</p>
              <p className="text-sm mt-2">
                <strong>Thesis:</strong> Design and Development of an AI-Augmented Feedback System to Enhance 
                Argumentative Writing Proficiency Among EFL Learners
              </p>
              <p className="text-sm"><strong>Advisor:</strong> Professor Kim, M. K.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">M.A. in Applied Linguistics</CardTitle>
              <p className="text-sm text-muted-foreground">Sharif University of Technology, Iran • 2012 - 2014</p>
            </CardHeader>
            <CardContent>
              <p className="text-sm">GPA: 4.00/4.00 (Honored Student)</p>
              <p className="text-sm mt-2">
                <strong>Thesis:</strong> Design and Development of a Computerized Adaptive Software to Test 
                Written Receptive Vocabulary Knowledge of Foreign Language Learners
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">B.A. in English Language Translation</CardTitle>
              <p className="text-sm text-muted-foreground">Kar Institute of Higher Education, Iran • 2008 - 2012</p>
            </CardHeader>
            <CardContent>
              <p className="text-sm">GPA: 3.71/4.00 (Honored Student)</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />

      {/* Research Interests */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-semibold">Research Interests</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">Instructional/Educational Technology</Badge>
          <Badge variant="secondary">AI in Education</Badge>
          <Badge variant="secondary">AI-Augmented Learning Environments</Badge>
          <Badge variant="secondary">Adaptive Learning Technologies</Badge>
          <Badge variant="secondary">Personalized Learning Environments</Badge>
          <Badge variant="secondary">Human-Computer Interaction</Badge>
          <Badge variant="secondary">Formative Assessment and Feedback</Badge>
          <Badge variant="secondary">Peer Feedback</Badge>
          <Badge variant="secondary">Collaborative Learning</Badge>
          <Badge variant="secondary">Automated Writing Evaluation (AWE) Systems</Badge>
          <Badge variant="secondary">Computer Assisted Language Learning (CALL)</Badge>
          <Badge variant="secondary">Curriculum Design and Development</Badge>
          <Badge variant="secondary">Design Based Research (DBR)</Badge>
          <Badge variant="secondary">Mixed-Methods Research</Badge>
        </div>
      </section>

      <Separator />

      {/* Research Projects */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Briefcase className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-semibold">Research Projects</h2>
        </div>
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">AI Institutes Virtual Organization (AIVO) – AI4Ed Summer Program</CardTitle>
              <p className="text-sm text-muted-foreground">Graduate Fellow • Summer 2025</p>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Funded by Google.org. Collaborative program bringing together graduate student researchers from 
                five NSF-funded national AI institutes dedicated to advancing AI applications in education.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Secure and Trustworthy Cyberspace (SaTC): Private AI</CardTitle>
              <p className="text-sm text-muted-foreground">Graduate Research Associate • August 2021 - Present</p>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Funded by NSF. Interdisciplinary project focusing on artificial intelligence and privacy, 
                developing instructional materials and hands-on labs to train students in trustworthy AI.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">AI Institute for Adult Learning and Online Education (ALOE)</CardTitle>
              <p className="text-sm text-muted-foreground">Graduate Research Associate • January 2022 - August 2022</p>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Funded by NSF. Project aims to transform online adult learning through AI-driven models 
                grounded in cognitive and social learning theories.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />

      {/* Awards */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Award className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-semibold">Selected Awards & Honors</h2>
        </div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• AI4ED Summer Fellowship ($12,500) - AI Institutes Virtual Organization (AIVO), 2025</li>
          <li>• Outstanding Ph.D. Student in Learning Technologies Award - Georgia State University, 2025</li>
          <li>• AACE Conference Paper Award - Society for Information Technology & Teacher Education, 2024</li>
          <li>• Doctoral Student Fellowship Award ($15,000) - Georgia State University, 2023</li>
          <li>• Ranked in top 1% in Nationwide University Entrance Exam - Iran, 2012</li>
        </ul>
      </section>

      <Separator />

      {/* Languages */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Globe className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-semibold">Languages</h2>
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          <span><strong>Persian:</strong> Native</span>
          <span><strong>English:</strong> Proficient</span>
          <span><strong>Arabic & Deutsch:</strong> Pre-intermediate</span>
        </div>
      </section>
    </div>
  );
};

export default About;
