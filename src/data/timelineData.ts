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
  milestone?: string; // e.g. "Career Start", "Moved to U.S.", "First NSF Grant"
}

export const categoryConfig: Record<TimelineCategory, { label: string; color: string; bgColor: string; icon: string }> = {
  education: { label: "Education", color: "hsl(210, 60%, 50%)", bgColor: "hsl(210, 60%, 95%)", icon: "🎓" },
  research: { label: "Research", color: "hsl(160, 50%, 40%)", bgColor: "hsl(160, 50%, 93%)", icon: "🔬" },
  publication: { label: "Publication", color: "hsl(270, 50%, 55%)", bgColor: "hsl(270, 50%, 94%)", icon: "📄" },
  award: { label: "Award", color: "hsl(40, 80%, 50%)", bgColor: "hsl(40, 80%, 93%)", icon: "🏆" },
  teaching: { label: "Teaching", color: "hsl(350, 55%, 55%)", bgColor: "hsl(350, 55%, 94%)", icon: "📚" },
  leadership: { label: "Leadership", color: "hsl(190, 60%, 45%)", bgColor: "hsl(190, 60%, 93%)", icon: "🌟" },
  service: { label: "Service", color: "hsl(20, 60%, 50%)", bgColor: "hsl(20, 60%, 93%)", icon: "🤝" },
};

export const timelineEvents: TimelineEvent[] = [
  // Education
  { id: "edu-1", year: 2008, endYear: 2012, category: "education", title: "B.A. in English Translation Studies", subtitle: "Kar Institute / Emam Khomeiny International University, Iran", description: "Graduated as Honored Student with a 3.71/4.00 GPA. Wrote a thesis comparing effects of teacher, automated, and integrative feedback on EFL learners' writing.", highlight: true, milestone: "Academic Journey Begins" },
  { id: "edu-2", year: 2012, endYear: 2014, category: "education", title: "M.A. in Applied Linguistics (GPA: 4.00/4.00)", subtitle: "Sharif University of Technology, Tehran, Iran", description: "Admitted as an exceptionally talented student. Developed CATWRV — a computer-adaptive test for measuring written receptive vocabulary knowledge. Ranked 1st in GPA.", highlight: true, milestone: "Admitted to Top University" },
  { id: "edu-3", year: 2021, category: "education", title: "Ph.D. Candidate in Learning Sciences (GPA: 4.14/4.00)", subtitle: "Georgia State University, Atlanta, GA", description: "Dissertation: Design and Development of an AI-Augmented Feedback System to Enhance Argumentative Writing Proficiency Among EFL Learners. Developing RITA — Real-time Intelligent Technology for Argumentative Writing.", highlight: true, milestone: "Moved to the U.S." },

  // Teaching
  { id: "teach-1", year: 2009, endYear: 2012, category: "teaching", title: "EFL & Technology Instructor", subtitle: "Aryana Institute of Technology, Iran", description: "Taught English and ICT courses to K–12 students at a multidisciplinary institution affiliated with Iran's leading educational brand in technology." },
  { id: "teach-2", year: 2009, endYear: 2015, category: "teaching", title: "Education Administrator & EFL Instructor", subtitle: "Balan Language Academy, Iran", description: "Served as education administrator, EFL instructor, supervisor, and educational consultant for K–12 and adult learners. Won the Innovative and Supportive Teacher Award in 2013.", milestone: "First Teaching Role" },
  { id: "teach-3", year: 2011, endYear: 2012, category: "teaching", title: "EFL Instructor", subtitle: "Iran-Europe English Language Institute", description: "Taught General English and conversation courses to K–12 students and adult learners." },
  { id: "teach-4", year: 2015, endYear: 2018, category: "teaching", title: "TOEFL Coach & EFL Instructor", subtitle: "Tehran Pouya Technical & Vocational Training", description: "Taught TOEFL preparation, EFL, and technology courses at a private institution offering technical and vocational training." },
  { id: "teach-5", year: 2015, category: "teaching", title: "Adjunct Instructor — Intro to Educational Technology", subtitle: "University of Applied Sciences, Al-Zahra", description: "Taught foundational concepts of integrating technology into teaching and learning, including digital tools, LMS systems, and multimedia resources." },
  { id: "teach-6", year: 2019, endYear: 2021, category: "teaching", title: "CEO & Founder / TOEFL Coach / TESOL Trainer", subtitle: "RadGuyesh Haddadian International Institute", description: "Founded a multidisciplinary educational center specializing in English language learning and computer science. Served as lead instructor for TOEFL and TESOL 'training the trainers' courses.", milestone: "Founded Own Institute" },
  { id: "teach-7", year: 2019, category: "teaching", title: "Adjunct Instructor — English for MBA", subtitle: "Andisheh Moein Institute of Higher Education", description: "Taught business-specific English skills including case study analysis, formal writing, and professional presentations for MBA students." },
  { id: "teach-8", year: 2022, category: "teaching", title: "Instructor — Computer Skills for the Information Age", subtitle: "Georgia State University", description: "Teaching undergraduate students essential computer skills including word processing, spreadsheets, databases, presentations, and web development." },

  // Research Projects
  { id: "res-1", year: 2021, category: "research", title: "SaTC: Private Artificial Intelligence", subtitle: "NSF-funded | Graduate Research Associate", description: "Interdisciplinary project developing instructional materials and hands-on labs for trustworthy AI, integrating technical knowledge with ethical and privacy-focused practices.", highlight: true, milestone: "First NSF Project" },
  { id: "res-2", year: 2022, category: "research", title: "AI-ALOE: AI Institute for Adult Learning", subtitle: "NSF-funded | Graduate Research Associate", description: "Worked on transforming online adult learning through AI-driven models grounded in cognitive and social learning theories, developing intelligent virtual assistants and personalized learning systems." },
  { id: "res-3", year: 2024, category: "research", title: "IUSE: AI-Scaffolded Pre-Classroom Learning for Physics", subtitle: "NSF-funded | Researcher", description: "Designing AI-augmented formative assessment and feedback systems for large introductory physics courses, focusing on underrepresented students in STEM." },
  { id: "res-4", year: 2025, category: "research", title: "AIVO – AI4Ed Summer Program", subtitle: "Funded by Google.org | Graduate Fellow", description: "Selected as a Graduate Fellow representing the AI-ALOE team at Georgia Tech, engaging in cross-institute partnerships across five NSF-funded AI institutes to advance AI in education.", highlight: true, milestone: "Google-funded Fellowship" },

  // Key Publications
  { id: "pub-1", year: 2018, category: "publication", title: "Conversational Repairs in Persian Dramatic Discourse", subtitle: "Persian Literary Studies Journal, 7(11), 65–82", description: "Analyzed conversational repairs in Akbar Radi's play 'Pellekân' using discourse analysis methodology.", milestone: "First Journal Publication" },
  { id: "pub-2", year: 2020, category: "publication", title: "TeleCrowd: A Crowdsourcing Approach", subtitle: "arXiv preprint arXiv:2004.11771", description: "Developed a crowdsourcing approach for creating informal-to-formal text corpora, contributing to NLP research." },
  { id: "pub-3", year: 2023, category: "publication", title: "5 Conference Papers at ICLS & AECT 2023", subtitle: "Including AI literacy, learning progress models, cognitive engagement", description: "Published at ICLS 2023 (Montreal) and AECT 2023 (Orlando) covering topics from AI literacy models to machine learning for evaluating cognitive engagement." },
  { id: "pub-4", year: 2024, category: "publication", title: "4 Journal Articles & 3 Conference Papers", subtitle: "CFAL questionnaire, Grammarly speaking, feedback comparison, ICLS/SITE/AIRiAL", description: "A prolific year: published in Language Testing in Asia, JAID, CALL-EJ, and presented at ICLS 2024, SITE 2024, and AIRiAL at Columbia University.", highlight: true, milestone: "Most Productive Year" },
  { id: "pub-5", year: 2025, category: "publication", title: "Problem-Centered CS Education (IJTE)", subtitle: "International Journal of Technology in Education, 8(2), 1–26", description: "Study of problem-centered post-secondary CS education examining the private AI curriculum development." },
  { id: "pub-6", year: 2025, category: "publication", title: "2 Papers Accepted at ICLS 2025", subtitle: "Peer feedback with GenAI & Automated Expert Models", description: "Two papers accepted at the International Conference of the Learning Sciences 2025: one on supporting peer feedback with GenAI, another on automated generation of expert models." },

  // Awards
  { id: "award-1", year: 2005, category: "award", title: "Outstanding Student Researcher Award", subtitle: "Shahid Shamloo High School", milestone: "First Academic Recognition" },
  { id: "award-2", year: 2006, category: "award", title: "Distinguished Student Researcher Award", subtitle: "Young Researchers and Elite Club" },
  { id: "award-3", year: 2010, category: "award", title: "Outstanding Teacher of Foreign Languages", subtitle: "Aryana Fanavaran Institute" },
  { id: "award-4", year: 2012, category: "award", title: "Top 1% Nationwide — M.A. Entrance Exam", subtitle: "Iran", description: "Ranked in the top 1% among all participants in the nationwide M.A. entrance examination." },
  { id: "award-5", year: 2013, category: "award", title: "Innovative and Supportive Teacher Award", subtitle: "Balan Language Academy" },
  { id: "award-6", year: 2023, category: "award", title: "Doctoral Student Fellowship ($15,000)", subtitle: "Georgia State University", description: "One of three PhD students selected for exceptional scholarship and academic potential in the Learning Technologies department." },
  { id: "award-7", year: 2024, category: "award", title: "AACE Conference Paper Award", subtitle: "SITE 2024, Las Vegas", description: "Awarded to papers distinguished as outstanding by the AACE Program Committee for exceptional quality, originality, and significant scholarly contribution." },
  { id: "award-8", year: 2025, category: "award", title: "Outstanding Ph.D. Student in Learning Technologies", subtitle: "Georgia State University", description: "Given to a student who has demonstrated potential for excellence in research, teaching, and service in instructional technology.", highlight: true },
  { id: "award-9", year: 2025, category: "award", title: "AI4ED Summer Fellowship ($12,500)", subtitle: "AIVO / NSF / Google.org", description: "Awarded to selected graduate researchers representing five major AI in Education Institutes across the U.S.", highlight: true },

  // Leadership
  { id: "lead-1", year: 2019, endYear: 2021, category: "leadership", title: "CEO & Founder", subtitle: "RadGuyesh Haddadian International Institute", description: "Founded and led a multidisciplinary educational center specializing in English language learning, TESOL certification, and computer science courses." },
  { id: "lead-2", year: 2024, category: "leadership", title: "Student Representative — Equity & Justice Committee", subtitle: "ISLS/ICLS", description: "Serving on the Equity and Justice Committee and Publication Committee of the International Society of the Learning Sciences." },
  { id: "lead-3", year: 2024, category: "leadership", title: "Africa & Middle East Regional Representative", subtitle: "International Learning Sciences Student Association (ILSSA)", description: "Representing the Africa and Middle East region in ILSSA, fostering connections across the global Learning Sciences community." },
  { id: "lead-4", year: 2025, category: "leadership", title: "Mentorship Program Initiator & Mentor", subtitle: "ILSSA Mentorship Program", description: "Initiated an adaptive, inclusive mentorship program to empower Learning Sciences students with personalized mentorship, networking, and professional development.", milestone: "Launched Mentorship Program" },

  // Service
  { id: "serv-1", year: 2024, category: "service", title: "Journal Reviewer (4 journals)", subtitle: "CALL, EITI, CALL-EJ, Innovations in Education", description: "Serving as reviewer for Computer Assisted Language Learning, Education and Information Technologies, CALL-EJ, and Innovations in Education and Teaching International." },
  { id: "serv-2", year: 2024, category: "service", title: "Program Committee Member (4 organizations)", subtitle: "ISLS, SITE, AECT, ACM Learning@Scale", description: "Reviewing submissions and contributing to program design for four major international conferences." },
  { id: "serv-3", year: 2025, category: "service", title: "Scholarships Reviewer — ISLS/ICLS Travel Scholarships", subtitle: "Helsinki 2025", description: "Reviewing scholarship applications for Travel to Helsinki Scholarships (Equity Travel Support and ILSSA Annual Meeting)." },
  { id: "serv-4", year: 2025, category: "service", title: "Student Rep & Proposal Evaluator", subtitle: "Faculty Technology Initiatives, GSU", description: "Evaluating faculty technology proposals at the College of Education and Human Development." },
];
