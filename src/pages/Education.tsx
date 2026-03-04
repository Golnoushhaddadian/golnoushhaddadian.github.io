
import React, { useState } from 'react';
import { GraduationCap, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const educationData = [
  {
    university: "Georgia State University",
    location: "Atlanta, Georgia",
    degree: "Ph.D., Learning Sciences",
    dates: "Aug 2021–Dec 2025",
    details: [
      { label: "Interests", text: "AI in Education; Personalized Learning; Feedback; Adaptive Systems; Design-based Research; Mixed-methods" },
      { label: "Dissertation", text: "\"Enhancing Argumentative Writing in English as Foreign Language Education through AI-Powered Personalized Learning\"" },
      { label: "Learning Technology Developed", text: "\"RITA–Real-time Intelligent Technology for Argumentative Writing\"" },
      { label: "Advisor", text: "Dr. Kim, M. K." },
      { label: "Committee", text: "Drs. Darling-Aduana, J., Shapiro, B. R., & Motevali, S." },
    ],
  },
  {
    university: "Sharif University of Technology",
    location: "Tehran, Iran",
    degree: "M.A., Applied Linguistics",
    dates: "Sep 2012–Sep 2014",
    details: [
      { label: "Dissertation", text: "\"Design and Development of a Computerized Adaptive Software to Test Written Receptive Vocabulary Knowledge of Foreign Language Learners\"" },
      { label: "Assessment Technology Developed", text: "\"CATWRV – Computer Adaptive Test of Written Receptive Vocabulary\"" },
      { label: "Advisor", text: "Dr. Salehi, M." },
      { label: "Committee", text: "Drs. Alemi, M., & Khomeijani Farahani, A." },
    ],
  },
  {
    university: "Emam Khomeiny International University",
    subInstitution: "Kar Institute of Higher Education",
    location: "Qazvin, Iran",
    degree: "B.A., English Translation Studies",
    dates: "Feb 2008–Jun 2012",
    details: [
      { label: "Dissertation", text: "\"Comparing the Effects of Teacher Feedback, Automated Feedback, and Integrative Feedback on EFL Learners' Writing Accuracy and Writing Apprehension\"" },
    ],
  },
];

const EducationCard = ({ edu }: { edu: typeof educationData[number] }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative pl-8 border-l-2 border-primary/30 cursor-pointer group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="absolute -left-[13px] top-0 w-6 h-6 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
        <GraduationCap size={14} className="text-primary group-hover:text-primary-foreground transition-colors duration-300" />
      </div>

      <div className="flex items-center gap-2">
        <h2 className="text-base sm:text-lg md:text-xl font-semibold group-hover:text-primary transition-colors duration-300">
          {edu.university}
        </h2>
        <ChevronDown
          size={16}
          className={cn(
            "text-muted-foreground transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]",
            isOpen && "rotate-180"
          )}
        />
      </div>

      {edu.subInstitution && (
        <p className="text-xs sm:text-sm text-muted-foreground">{edu.subInstitution}</p>
      )}

      <div
        className={cn(
          "overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]",
          isOpen ? "max-h-[600px] opacity-100 mt-3" : "max-h-0 opacity-0 mt-0"
        )}
      >
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
          <span className="text-xs sm:text-sm text-muted-foreground">{edu.location}</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-3">
          <p className="text-sm sm:text-base font-medium text-primary">{edu.degree}</p>
          <span className="text-xs sm:text-sm text-muted-foreground shrink-0">{edu.dates}</span>
        </div>

        <ul className="space-y-2">
          {edu.details.map((detail, i) => (
            <li key={i} className="text-xs sm:text-sm md:text-base leading-relaxed">
              <span className="font-semibold">{detail.label}:</span>{" "}
              <span className="text-muted-foreground">{detail.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Education = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">Education</h1>
      <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed mb-8">
        Academic background and degrees.
      </p>

      <div className="space-y-10">
        {educationData.map((edu, index) => (
          <EducationCard key={index} edu={edu} />
        ))}
      </div>
    </div>
  );
};

export default Education;
