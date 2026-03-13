export type TimelineCategory =
  | "education"
  | "research"
  | "publication"
  | "award"
  | "teaching"
  | "leadership"
  | "service";

export interface TimelineEvent {
  id: string;
  year: number;
  month?: number;
  endYear?: number;
  category: TimelineCategory;
  title: string;
  subtitle?: string;
  description?: string;
  highlight?: boolean;
}

export const categoryConfig: Record<TimelineCategory, { label: string; color: string; bgColor: string }> = {
  education: { label: "Education", color: "hsl(210, 60%, 50%)", bgColor: "hsl(210, 60%, 95%)" },
  research: { label: "Research", color: "hsl(160, 50%, 40%)", bgColor: "hsl(160, 50%, 93%)" },
  publication: { label: "Publication", color: "hsl(270, 50%, 55%)", bgColor: "hsl(270, 50%, 94%)" },
  award: { label: "Award", color: "hsl(40, 80%, 50%)", bgColor: "hsl(40, 80%, 93%)" },
  teaching: { label: "Teaching", color: "hsl(350, 55%, 55%)", bgColor: "hsl(350, 55%, 94%)" },
  leadership: { label: "Leadership", color: "hsl(190, 60%, 45%)", bgColor: "hsl(190, 60%, 93%)" },
  service: { label: "Service", color: "hsl(20, 60%, 50%)", bgColor: "hsl(20, 60%, 93%)" },
};

export const timelineEvents: TimelineEvent[] = [
  // Education
  { id: "edu-1", year: 2008, endYear: 2012, category: "education", title: "B.A. in English Translation Studies", subtitle: "Kar Institute / Emam Khomeiny International University, Iran", highlight: true },
  { id: "edu-2", year: 2012, endYear: 2014, category: "education", title: "M.A. in Applied Linguistics (GPA: 4.00/4.00)", subtitle: "Sharif University of Technology, Tehran, Iran", highlight: true },
  { id: "edu-3", year: 2021, category: "education", title: "Ph.D. Candidate in Learning Sciences (GPA: 4.14/4.00)", subtitle: "Georgia State University, Atlanta, GA", description: "Dissertation: Design and Development of an AI-Augmented Feedback System to Enhance Argumentative Writing Proficiency Among EFL Learners", highlight: true },

  // Teaching
  { id: "teach-1", year: 2009, endYear: 2012, category: "teaching", title: "EFL & Technology Instructor", subtitle: "Aryana Institute of Technology, Iran" },
  { id: "teach-2", year: 2009, endYear: 2015, category: "teaching", title: "Education Administrator & EFL Instructor", subtitle: "Balan Language Academy, Iran" },
  { id: "teach-3", year: 2011, endYear: 2012, category: "teaching", title: "EFL Instructor", subtitle: "Iran-Europe English Language Institute" },
  { id: "teach-4", year: 2015, endYear: 2018, category: "teaching", title: "TOEFL Coach & EFL Instructor", subtitle: "Tehran Pouya Technical & Vocational Training" },
  { id: "teach-5", year: 2015, category: "teaching", title: "Adjunct Instructor — Intro to Educational Technology", subtitle: "University of Applied Sciences, Al-Zahra" },
  { id: "teach-6", year: 2019, endYear: 2021, category: "teaching", title: "CEO & Founder / TOEFL Coach / TESOL Trainer", subtitle: "RadGuyesh Haddadian International Institute" },
  { id: "teach-7", year: 2019, category: "teaching", title: "Adjunct Instructor — English for MBA", subtitle: "Andisheh Moein Institute of Higher Education" },
  { id: "teach-8", year: 2022, category: "teaching", title: "Instructor — Computer Skills for the Information Age", subtitle: "Georgia State University", description: "Teaching undergraduate students essential computer skills for organizing, analyzing, and communicating data." },

  // Research Projects
  { id: "res-1", year: 2021, category: "research", title: "SaTC: Private Artificial Intelligence", subtitle: "NSF-funded | Graduate Research Associate", highlight: true },
  { id: "res-2", year: 2022, category: "research", title: "AI-ALOE: AI Institute for Adult Learning", subtitle: "NSF-funded | Graduate Research Associate" },
  { id: "res-3", year: 2024, category: "research", title: "IUSE: AI-Scaffolded Pre-Classroom Learning for Physics", subtitle: "NSF-funded | Researcher" },
  { id: "res-4", year: 2025, category: "research", title: "AIVO – AI4Ed Summer Program", subtitle: "Funded by Google.org | Graduate Fellow", highlight: true },

  // Key Publications
  { id: "pub-1", year: 2018, category: "publication", title: "Conversational Repairs in Persian Dramatic Discourse", subtitle: "Persian Literary Studies Journal" },
  { id: "pub-2", year: 2020, category: "publication", title: "TeleCrowd: A Crowdsourcing Approach", subtitle: "arXiv preprint" },
  { id: "pub-3", year: 2023, category: "publication", title: "5 Conference Papers at ICLS & AECT 2023", subtitle: "Including AI literacy, learning progress models, cognitive engagement" },
  { id: "pub-4", year: 2024, category: "publication", title: "4 Journal Articles & 3 Conference Papers", subtitle: "CFAL questionnaire, Grammarly speaking, feedback comparison, ICLS/SITE/AIRiAL", highlight: true },
  { id: "pub-5", year: 2025, category: "publication", title: "Problem-Centered CS Education (IJTE)", subtitle: "International Journal of Technology in Education, 8(2)" },
  { id: "pub-6", year: 2025, category: "publication", title: "2 Papers Accepted at ICLS 2025", subtitle: "Peer feedback with GenAI & Automated Expert Models" },

  // Awards
  { id: "award-1", year: 2005, category: "award", title: "Outstanding Student Researcher Award", subtitle: "Shahid Shamloo High School" },
  { id: "award-2", year: 2006, category: "award", title: "Distinguished Student Researcher Award", subtitle: "Young Researchers and Elite Club" },
  { id: "award-3", year: 2010, category: "award", title: "Outstanding Teacher of Foreign Languages", subtitle: "Aryana Fanavaran Institute" },
  { id: "award-4", year: 2012, category: "award", title: "Top 1% Nationwide — M.A. Entrance Exam", subtitle: "Iran" },
  { id: "award-5", year: 2013, category: "award", title: "Innovative and Supportive Teacher Award", subtitle: "Balan Language Academy" },
  { id: "award-6", year: 2023, category: "award", title: "Doctoral Student Fellowship ($15,000)", subtitle: "Georgia State University" },
  { id: "award-7", year: 2024, category: "award", title: "AACE Conference Paper Award", subtitle: "SITE 2024, Las Vegas" },
  { id: "award-8", year: 2025, category: "award", title: "Outstanding Ph.D. Student in Learning Technologies", subtitle: "Georgia State University", highlight: true },
  { id: "award-9", year: 2025, category: "award", title: "AI4ED Summer Fellowship ($12,500)", subtitle: "AIVO / NSF / Google.org", highlight: true },

  // Leadership
  { id: "lead-1", year: 2019, endYear: 2021, category: "leadership", title: "CEO & Founder", subtitle: "RadGuyesh Haddadian International Institute" },
  { id: "lead-2", year: 2024, category: "leadership", title: "Student Representative — Equity & Justice Committee", subtitle: "ISLS/ICLS" },
  { id: "lead-3", year: 2024, category: "leadership", title: "Africa & Middle East Regional Representative", subtitle: "International Learning Sciences Student Association (ILSSA)" },
  { id: "lead-4", year: 2025, category: "leadership", title: "Mentorship Program Initiator & Mentor", subtitle: "ILSSA Mentorship Program" },

  // Service
  { id: "serv-1", year: 2024, category: "service", title: "Journal Reviewer (4 journals)", subtitle: "CALL, EITI, CALL-EJ, Innovations in Education" },
  { id: "serv-2", year: 2024, category: "service", title: "Program Committee Member (4 organizations)", subtitle: "ISLS, SITE, AECT, ACM Learning@Scale" },
  { id: "serv-3", year: 2025, category: "service", title: "Scholarships Reviewer — ISLS/ICLS Travel Scholarships", subtitle: "Helsinki 2025" },
  { id: "serv-4", year: 2025, category: "service", title: "Student Rep & Proposal Evaluator", subtitle: "Faculty Technology Initiatives, GSU" },
];
