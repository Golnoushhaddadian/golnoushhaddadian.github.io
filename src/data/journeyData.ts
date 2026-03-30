export type JourneyCategory = 'Education' | 'Research' | 'Publications' | 'Teaching' | 'Awards';

export type JourneyItem = {
  category: JourneyCategory;
  period: string; // matches a key in journeyPeriods
  label: string;
  sublabel: string;
  detail: string;
  url?: string;
  badges?: string[];
};

export const journeyQuote =
  "From language education to AI-augmented learning design, every step has shaped my mission: designing human-centered AI systems that enhance learning, strengthen teaching, and create meaningful impact in education.";

export const journeyPeriods = [
  '2008–2014',
  '2015–2020',
  '2021–2022',
  '2023–2024',
  '2025–2026',
];

export const journeyCategories: JourneyCategory[] = [
  'Education',
  'Research',
  'Publications',
  'Teaching',
  'Awards',
];

export const journeyItems: JourneyItem[] = [
  // ── Education ──
  {
    category: 'Education',
    period: '2008–2014',
    label: 'B.A. Translation',
    sublabel: 'Emam Khomeiny Intl. Univ.',
    detail:
      'B.A. in English Language Translation\nKar Institute of Higher Education, Emam Khomeiny International University\nQazvin, Iran · 2008–2012\nGPA: 3.71/4.00 (Honored Student)',
  },
  {
    category: 'Education',
    period: '2008–2014',
    label: 'M.A. Applied Linguistics',
    sublabel: 'Sharif Univ. of Technology',
    detail:
      'M.A. in Applied Linguistics\nSharif University of Technology, Tehran, Iran · 2012–2014\nGPA: 4.00/4.00 (Honored Student)\nThesis: "Design and Development of a Computerized Adaptive Software to Test Written Receptive Vocabulary Knowledge of Foreign Language Learners"\nAdvisor: Professor Salehi, M.',
  },
  {
    category: 'Education',
    period: '2021–2022',
    label: 'Ph.D. Learning Sciences',
    sublabel: 'Georgia State University',
    detail:
      'Ph.D. in Learning Sciences\nGeorgia State University, Atlanta, GA · 2021–2025\nGPA: 4.14/4.00 (Honored Student)\nDissertation: "Enhancing Argumentative Writing in English as Foreign Language Education through AI-Powered Personalized Learning"\nAdvisor: Professor Kim, M. K.\nCommittee: Drs. Darling-Aduana, J., Shapiro, B. R., & Motevali, S.',
  },

  // ── Research ──
  {
    category: 'Research',
    period: '2021–2022',
    label: 'SaTC: Private AI',
    sublabel: 'NSF · GRA',
    detail:
      'Secure and Trustworthy Cyberspace (SaTC): Private Artificial Intelligence\nFunded by NSF · Graduate Research Associate · Aug 2021–Present\nDeveloping instructional materials and hands-on labs to train students in trustworthy AI.',
  },
  {
    category: 'Research',
    period: '2021–2022',
    label: 'AI-ALOE',
    sublabel: 'NSF · GRA',
    detail:
      'AI Institute for Adult Learning and Online Education (ALOE)\nFunded by NSF · Graduate Research Associate · Jan 2022–Aug 2022\nTransforming online adult learning through AI-driven models.',
  },
  {
    category: 'Research',
    period: '2023–2024',
    label: 'IUSE Physics',
    sublabel: 'NSF · Researcher',
    detail:
      'IUSE-Engaged Student Learning: AI-Scaffolded Pre-Classroom Learning for Undergraduate Physics Courses\nFunded by NSF · Researcher · Aug 2024–Present\nDesigning AI-augmented formative assessment and feedback systems.',
  },
  {
    category: 'Research',
    period: '2025–2026',
    label: 'AIVO AI4Ed',
    sublabel: 'Google.org · Fellow',
    detail:
      'AI Institutes Virtual Organization (AIVO) – AI4Ed Summer Program\nFunded by Google.org · Graduate Fellow · Summer 2025\nRepresenting the AI-ALOE team at Georgia Tech across five NSF-funded national AI institutes.',
    badges: ['Fellowship'],
  },

  // ── Publications ──
  {
    category: 'Publications',
    period: '2015–2020',
    label: 'Persian Discourse',
    sublabel: 'PLSJ · 2018',
    detail:
      'Haddadian, G., & Mahmoodi-Bakhtiari, B. (2018). Conversational Repairs in Persian Dramatic Discourse. Persian Literary Studies Journal, 7(11), 65-82.',
    url: 'http://doi.org/10.22099/jps.2019.31124.1088',
  },
  {
    category: 'Publications',
    period: '2023–2024',
    label: 'CFAL Questionnaire',
    sublabel: 'Language Testing in Asia',
    detail:
      'Haddadian, G., Radmanesh, S., & Haddadian, N. (2024). Construction and validation of a CFAL questionnaire for language teachers. Language Testing in Asia, 14(33).',
    url: 'https://doi.org/10.1186/s40468-024-00303-2',
    badges: ['Journal'],
  },
  {
    category: 'Publications',
    period: '2023–2024',
    label: 'SITE Award Paper',
    sublabel: 'AACE · 2024',
    detail:
      'Haddadian, G., & Haddadian, N. (2024). An Investigation of ELT Teachers\' Online Self-efficacy. SITE International Conference, pp. 1607-1615.',
    url: 'https://www.learntechlib.org/primary/p/224179/',
    badges: ['Award'],
  },
  {
    category: 'Publications',
    period: '2025–2026',
    label: 'AWE Systematic Review',
    sublabel: 'RSAL · 2025',
    detail:
      'Haddadian, G., Kim, M. K., & Haddadian, N. (2025). A Systematic Review of AWE Tools in Argumentative Writing for EFL Education. Research Synthesis in Applied Linguistics, 1-51.',
    url: 'https://doi.org/10.1080/29984475.2025.2598266',
    badges: ['Journal'],
  },
  {
    category: 'Publications',
    period: '2025–2026',
    label: 'GenAI Peer Feedback',
    sublabel: 'IJETHE · 2025',
    detail:
      'Noroozi, O., Haddadian, G., et al. (2025). The value of GenAI for peer feedback provision. Int. Journal of Educational Technology in Higher Education, 22(1), 61.',
    url: 'https://doi.org/10.1186/s41239-025-00558-6',
    badges: ['Journal'],
  },
  {
    category: 'Publications',
    period: '2025–2026',
    label: 'AERA & AAAL 2026',
    sublabel: '4 Accepted Papers',
    detail:
      'Four accepted papers at AERA 2026 (Los Angeles) and AAAL 2026 (Chicago):\n• GenAI for peer feedback uptake (AERA)\n• AWE in EFL argumentative writing (AAAL)\n• AI for automated scoring (AAAL)\n• Collaborative AI feedback in writing (AAAL)',
    badges: ['Upcoming'],
  },

  // ── Teaching ──
  {
    category: 'Teaching',
    period: '2008–2014',
    label: 'EFL Instructor',
    sublabel: 'Balan · Aryana · Iran-Europe',
    detail:
      'EFL Instructor across multiple institutions in Iran\nBalan Language Academy (2009–2015)\nAryana Institute of Technology (2009–2012)\nIran-Europe English Language Institute (2011–2012)\nTeaching English as a Foreign Language to Adult, K-12 students.',
  },
  {
    category: 'Teaching',
    period: '2015–2020',
    label: 'Senior Instructor & CEO',
    sublabel: 'Tehran Pouya · RadGuyesh',
    detail:
      'Senior Instructor at Tehran Pouya (2015–2018)\nCEO & Founder of RadGuyesh Haddadian International Institute (2019–2021)\nCourses: TOEFL, EFL, GRE, TESOL\nMentored more than 500 students',
    badges: ['Leadership'],
  },
  {
    category: 'Teaching',
    period: '2023–2024',
    label: 'Instructor of Record',
    sublabel: 'Georgia State University',
    detail:
      'Instructor of Record, Georgia State University · Fall 2022–Spring 2026\nCourse: Computer Skills for the Information Age\nAudience: Undergraduate Students',
  },
  {
    category: 'Teaching',
    period: '2025–2026',
    label: 'Co-designer/Instructor',
    sublabel: 'GSU · Maker Technologies',
    detail:
      'Co-designer/Instructor, Georgia State University · Fall 2025\nCourse: Inventing to Learn: Teaching and Learning with Maker Technologies\nAudience: Graduate and Undergraduate Students',
  },

  // ── Awards ──
  {
    category: 'Awards',
    period: '2008–2014',
    label: 'Top 1% Nationwide',
    sublabel: 'Sharif Univ. of Technology',
    detail:
      'Ranked in top 1% in M.A. Nationwide Entrance Exam\nAdmitted as exceptionally talented student\nRanked 1st in GPA for B.A. (2012) and M.A. (2014)',
  },
  {
    category: 'Awards',
    period: '2023–2024',
    label: 'Doctoral Fellowship',
    sublabel: '$15,000 · GSU',
    detail:
      'Doctoral Student Fellowship Award ($15,000)\nCollege of Education & Human Development, Georgia State University\nGiven to three PhD students for exceptional scholarship.',
    badges: ['$15,000'],
  },
  {
    category: 'Awards',
    period: '2023–2024',
    label: 'AACE Paper Award',
    sublabel: 'SITE Conference',
    detail:
      'Outstanding Conference Paper Award\nSITE & AACE · Las Vegas, NV\nAwarded for exceptional quality, originality, and significant scholarly contribution.',
    badges: ['Outstanding'],
  },
  {
    category: 'Awards',
    period: '2025–2026',
    label: 'AI4ED Fellowship',
    sublabel: '$12,500 · AIVO',
    detail:
      'AI4ED Summer Fellowship ($12,500)\nAI Institutes Virtual Organization (AIVO)\nFunded by NSF & Google.org\nAwarded to selected graduate researchers across five major AI in Education Institutes.',
    badges: ['$12,500'],
  },
  {
    category: 'Awards',
    period: '2025–2026',
    label: 'Outstanding Ph.D. Student',
    sublabel: 'GSU CEHD',
    detail:
      'Outstanding Ph.D. Student in Learning Technologies\nCollege of Education & Human Development, Georgia State University\nDemonstrated excellence in research, teaching, and service.',
    badges: ['Outstanding'],
  },
  {
    category: 'Awards',
    period: '2025–2026',
    label: 'Outstanding Dissertation',
    sublabel: 'GSU CEHD · 2026',
    detail:
      'Outstanding Dissertation in Learning Technologies\nDepartment of Learning Sciences, Georgia State University.',
    badges: ['Outstanding'],
  },
];
