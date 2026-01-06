import { GraduationCap } from "lucide-react";

const Education = () => {
  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-2">
          <GraduationCap className="h-8 w-8 text-primary" />
          Education
        </h1>
      </div>

      <div className="space-y-8 text-foreground">
        {/* PhD */}
        <div className="space-y-2">
          <p>
            <span className="font-bold">Ph.D.</span> Candidate in Learning Sciences; AI<sup>2</sup> Research Lab; GPA: 4.14/4.00 (Honored).
          </p>
          <p>Georgia State University, (Georgia, USA), (August 2021- Graduation: December 1st, 2025)</p>
          <p className="italic">
            Thesis Title: Enhancing Argumentative Writing in English as Foreign Language Education through AI-Powered Personalized Learning
          </p>
          <p className="ml-4 italic">
            AI-Augmented Learning tool Developed: RITA – Real-time Intelligent Technology for Argumentative Writing
          </p>
          <p className="mt-2">Advisor: Dr. Kim, M. K.</p>
          <p>Committee: Drs. Darling-Aduana, J., Shapiro, B. R., & Motevali, S.</p>
        </div>

        {/* MA */}
        <div className="space-y-2">
          <p>
            <span className="font-bold">M.A.</span> in Applied Linguistics; GPA: 4.00/4.00 (Honored).
          </p>
          <p>Sharif University of Technology, (Tehran, Iran), (September 2012- September 2014)</p>
          <p className="italic">
            Thesis: Design and Development of a Computerized Adaptive Software to Test Written Receptive Vocabulary Knowledge of Foreign Language Learners.
          </p>
          <p className="ml-4 italic">
            Assessment Technology Developed: CATWRV – Computer Adaptive Test of Written Receptive Vocabulary
          </p>
          <p className="mt-2">Advisor: Dr. Salehi, M.</p>
          <p>Committee: Drs. Alemi, M., & Khomeijani Farahani, A.</p>
        </div>

        {/* BA */}
        <div className="space-y-2">
          <p>
            <span className="font-bold">B.A.</span> in English Language Translation; GPA: 3.71/4.00 (Honored).
          </p>
          <p>Kar Institute of Higher Education, Emam Khomeiny International University (Qazvin, Iran), (February 2008 – June 2012)</p>
        </div>
      </div>
    </section>
  );
};

export default Education;
