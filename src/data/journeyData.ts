export type JourneyCategory = 'Education' | 'Research' | 'Publications' | 'Teaching' | 'Awards';

export type JourneyItem = {
  category: JourneyCategory;
  period: string;
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
      'Ph.D. in Learning Sciences\nGeorgia State University, Atlanta, GA · 2021–2025\nGPA: 4.14/4.00 (Honored Student)\nDissertation: "Design and Development of an AI-Augmented Feedback System to Enhance Argumentative Writing Proficiency Among EFL Learners"\nLearning tool: RITA - Real-time Intelligent Technology for Argumentative Writing\nAdvisor: Professor Kim, M. K.\nCommittee: Darling-Aduana, J. & Shapiro, B. R.',
  },

  // ── Research ──
  {
    category: 'Research',
    period: '2021–2022',
    label: 'SaTC: Private AI',
    sublabel: 'NSF · GRA',
    detail:
      'Secure and Trustworthy Cyberspace (SaTC): Private Artificial Intelligence\nFunded by NSF · Graduate Research Associate · Aug 2021–Present\nDeveloping instructional materials and hands-on labs to train students in trustworthy AI, addressing the demand for skilled researchers by integrating technical knowledge with ethical and privacy-focused practices.',
  },
  {
    category: 'Research',
    period: '2021–2022',
    label: 'AI-ALOE',
    sublabel: 'NSF · GRA',
    detail:
      'AI Institute for Adult Learning and Online Education (ALOE)\nFunded by NSF · Graduate Research Associate · Jan 2022–Aug 2022\nTransforming online adult learning through AI-driven models grounded in cognitive and social learning theories, developing intelligent virtual assistants and personalized learning systems.',
  },
  {
    category: 'Research',
    period: '2023–2024',
    label: 'IUSE Physics',
    sublabel: 'NSF · Researcher',
    detail:
      'IUSE-Engaged Student Learning: AI-Scaffolded Pre-Classroom Learning for Undergraduate Physics Courses\nFunded by NSF · Researcher · Aug 2024–Present\nDesigning AI-augmented formative assessment and feedback systems to help students build skills for interactive problem-solving, with a focus on underrepresented students in STEM.',
  },
  {
    category: 'Research',
    period: '2025–2026',
    label: 'AIVO AI4Ed',
    sublabel: 'Google.org · Fellow',
    detail:
      'AI Institutes Virtual Organization (AIVO) – AI4Ed Summer Program\nFunded by Google.org · Graduate Fellow · Summer 2025\nRepresenting the AI-ALOE team at Georgia Tech across five NSF-funded national AI institutes, engaging in interdisciplinary research and knowledge exchange to advance AI applications in education.',
    badges: ['Fellowship'],
  },

  // ── Publications: Journals (5) ──
  {
    category: 'Publications',
    period: '2015–2020',
    label: 'Persian Discourse',
    sublabel: 'PLSJ · 2018',
    detail:
      'Haddadian, G., & Mahmoodi-Bakhtiari, B. (2018). Conversational Repairs in Persian Dramatic Discourse. Persian Literary Studies Journal, 7(11), 65-82.',
    url: 'http://doi.org/10.22099/jps.2019.31124.1088',
    badges: ['Journal'],
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
    label: 'Grammarly & EFL Speaking',
    sublabel: 'JAID · 2024',
    detail:
      'Haddadian, G., & Haddadian, N. (2024). Innovative Use of Grammarly Feedback for Improving EFL Learners\' Speaking: Learners\' Perceptions and Transformative Engagement Experiences in Focus. The Journal of Applied Instructional Design, 13(2).',
    badges: ['Journal'],
  },
  {
    category: 'Publications',
    period: '2023–2024',
    label: 'Feedback & Writing',
    sublabel: 'CALL-EJ · 2024',
    detail:
      'Haddadian, G. (2024). Comparing the Effects of Teacher Feedback, Automated Feedback, and Integrative Feedback on EFL Learners\' Writing Accuracy and Writing Apprehension. Computer-Assisted Language Learning Electronic Journal, 25(3), 124-147.',
    badges: ['Journal'],
  },
  {
    category: 'Publications',
    period: '2025–2026',
    label: 'Private AI Curriculum',
    sublabel: 'IJTE · 2025',
    detail:
      'Haddadian, G., Panzade, P., Takabi, D., & Kim, M. K. (2025). Problem-centered post-secondary computer science education: A study of the private artificial intelligence curriculum. International Journal of Technology in Education (IJTE), 8(2), 1-26.',
    badges: ['Journal'],
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

  // ── Publications: Conference Proceedings ──
  {
    category: 'Publications',
    period: '2015–2020',
    label: 'WEI-ETL Barcelona',
    sublabel: 'Conference · 2020',
    detail:
      'Radmanesh, S., Haddadian, G. (2020). The Effect of Using Mind Mapping on Iranian EFL Learners\' Self-efficacy in Vocabulary Learning. WEI International Academic Conference on Education, Teaching, and Learning, Barcelona, Spain.',
    badges: ['Conference'],
  },
  {
    category: 'Publications',
    period: '2023–2024',
    label: 'ICLS 2023',
    sublabel: '3 Papers · Montreal',
    detail:
      'Three papers at ICLS 2023, Montreal:\n• Knowledge-based AI vs. human evaluation in academic summary (Kim, J., Haddadian, G., & Kim, M.)\n• A test of learning progress models using an AI-enabled knowledge representation system (Kim, M., et al.)\n• AI-augmented summarization impact on adult learners (Kim, J., et al.)',
    badges: ['Conference'],
  },
  {
    category: 'Publications',
    period: '2023–2024',
    label: 'AECT 2023',
    sublabel: '5 Papers · Orlando',
    detail:
      'Five papers at AECT 2023, Orlando, FL:\n• Design Study of PCI for Private AI Curriculum Development\n• A Comprehensive Model of AI Literacy from a Developmental Perspective\n• Impact of AI-based educational tool on adult learners\n• Leveraging ML to evaluate cognitive engagement\n• AI-augmented summarization for online adult learners',
    badges: ['Conference'],
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
    period: '2023–2024',
    label: 'ICLS 2024',
    sublabel: 'Conference · Buffalo',
    detail:
      'Haddadian, G., Panzade, P., Takabi, D., & Kim, M. K. (2024). Evaluating Private AI Curriculum in CS Education. Proceedings of ICLS 2024, pp. 2271-2272.',
    badges: ['Conference'],
  },
  {
    category: 'Publications',
    period: '2023–2024',
    label: 'AIRiAL 2024',
    sublabel: 'Columbia University',
    detail:
      'Daneshvar Ghorbani, B., & Haddadian, G. (2024). The Impact of AI-Enabled Personalized Recommendations on L2 Learners\' Engagement, Motivation, and Learning Outcomes. AIRiAL 2024 Conference, Teachers College, Columbia University.',
    badges: ['Conference'],
  },
  {
    category: 'Publications',
    period: '2025–2026',
    label: 'ICLS 2025',
    sublabel: '2 Accepted · Helsinki',
    detail:
      'Two accepted papers at ICLS 2025, Helsinki:\n• Supporting peer feedback provision and uptake with GenAI (Noroozi, O., Haddadian, G., et al.)\n• Automated Generation of Expert Models with Generative AI (Haddadian, G., Han, H., et al.)',
    badges: ['Upcoming'],
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

  // ── Publications: Non-Refereed ──
  {
    category: 'Publications',
    period: '2015–2020',
    label: 'TeleCrowd',
    sublabel: 'arXiv · 2020',
    detail:
      'Masoumi, V., Salehi, M., Veisi, H., Haddadian, G., Ranjbar, V., & Sahebdel, M. (2020). TeleCrowd: A Crowdsourcing Approach to Create Informal to Formal Text Corpora. arXiv preprint arXiv:2004.11771.',
    badges: ['Preprint'],
  },

  // ── Publications: Under Review ──
  {
    category: 'Publications',
    period: '2025–2026',
    label: 'Under Review',
    sublabel: '4 Manuscripts',
    detail:
      'Four manuscripts under review/in revision:\n• Learners\' Collaboration in Using AI-generated Feedback (CALL) — In Revision\n• Scaffolding Value of GenAI during Peer Feedback (IJETHE) — In Revision\n• Promoting EFL Teachers\' Self-Directed Professional Development — Under Review\n• Exploring Classroom Interactions in Iranian EFL Classrooms — Under Review',
    badges: ['In Review'],
  },

  // ── Publications: Work in Progress ──
  {
    category: 'Publications',
    period: '2025–2026',
    label: 'Work in Progress',
    sublabel: '6 Manuscripts',
    detail:
      'Six manuscripts in progress:\n• Systematic Review of AWE in Argumentative Writing for EFL Education\n• RITA: A Design-Based Research (Real-time Intelligent Technology for Argumentative Writing)\n• Text-based GenAI to Facilitate Peer Feedback (Book Chapter)\n• Students\' Plagiarism Behaviors within AI-Enabled Physics Courses\n• GenAI for Automated Construction and Evaluation of Expert Models\n• Examining Learner\'s Evaluative Judgment Supported by Technology-Enabled Feedback',
    badges: ['In Progress'],
  },

  // ── Teaching ──
  {
    category: 'Teaching',
    period: '2008–2014',
    label: 'EFL Instructor',
    sublabel: 'Balan · Aryana · Iran-Europe',
    detail:
      'EFL Instructor across multiple institutions in Iran\nBalan Language Academy (2009–2015): Education Administrator, Supervisor\nAryana Institute of Technology (2009–2012): EFL & Technology Instructor\nIran-Europe English Language Institute (2011–2012)\nTeaching English as a Foreign Language to Adult and K-12 students.',
  },
  {
    category: 'Teaching',
    period: '2008–2014',
    label: 'Private Tutor',
    sublabel: 'Since 2004',
    detail:
      'Private Tutor (April 2004 to 2021)\nEFL Instructor, Technology Instructor\nProviding personalized tutoring to adult learners and K-12 students.',
  },
  {
    category: 'Teaching',
    period: '2015–2020',
    label: 'Senior Instructor & CEO',
    sublabel: 'Tehran Pouya · RadGuyesh',
    detail:
      'Senior Instructor at Tehran Pouya (2015–2018): TOEFL Coach, EFL Instructor, Technology Instructor, Educational Consultant\nCEO & Founder of RadGuyesh Haddadian International Institute (2019–2021): TOEFL Coach, TESOL Trainer, EFL Instructor\nCourses: TOEFL, EFL, GRE, TESOL\nMentored more than 500 students',
    badges: ['Leadership'],
  },
  {
    category: 'Teaching',
    period: '2015–2020',
    label: 'Adjunct Instructor',
    sublabel: 'Al-Zahra · Andisheh Moein',
    detail:
      'Adjunct Instructor at University of Applied Sciences, Al-Zahra (Summer 2015): Introduction to Educational Technology Course for undergraduate students\nAdjunct Instructor at Andisheh Moein Institute (Fall 2019): English for Master of Business Administration (MBA) for graduate students',
  },
  {
    category: 'Teaching',
    period: '2023–2024',
    label: 'Instructor of Record',
    sublabel: 'Georgia State University',
    detail:
      'Instructor of Record, Georgia State University · Fall 2022–Present\nCourse: Computer Skills for the Information Age\nAudience: Undergraduate Students\nStudents learn essential computer skills for organizing, analyzing, and communicating data.',
  },
  {
    category: 'Teaching',
    period: '2025–2026',
    label: 'Co-designer/Instructor',
    sublabel: 'GSU · Maker Technologies',
    detail:
      'Co-designer/Instructor, Georgia State University · Fall 2025\nCourse: Inventing to Learn: Teaching and Learning with Maker Technologies\nAudience: Graduate and Undergraduate Students',
  },
  {
    category: 'Teaching',
    period: '2023–2024',
    label: 'GenAI Module',
    sublabel: 'Curriculum · GSU',
    detail:
      'Module on Responsible Use of Generative AI (Summer 2024)\nPart of Computer Skills for the Information Age (LT2010) at GSU\nIntensive 2-week asynchronous module for undergraduate students on understanding, exploring, and responsibly using GenAI.',
    badges: ['Curriculum'],
  },

  // ── Awards ──
  {
    category: 'Awards',
    period: '2008–2014',
    label: 'Top 1% Nationwide',
    sublabel: 'Sharif Univ. of Technology',
    detail:
      'Ranked in top 1% in M.A. Nationwide Entrance Exam\nAdmitted as exceptionally talented student at Sharif University of Technology\nRanked 1st in GPA for B.A. (2012) and M.A. (2014)',
  },
  {
    category: 'Awards',
    period: '2008–2014',
    label: 'Teacher Awards',
    sublabel: 'Balan · Aryana',
    detail:
      'Innovative and Supportive Teacher of Foreign Languages Award: Balan Language Academy (2013)\nOutstanding Teacher of Foreign Languages Award: Aryana Fanavaran Institute of Technology (2010)\nDistinguished Student Researcher Award: Young Researchers and Elite Club (2006)\nOutstanding Student Researcher Award: Shahid Shamloo High School (2005)',
  },
  {
    category: 'Awards',
    period: '2023–2024',
    label: 'Doctoral Fellowship',
    sublabel: '$15,000 · GSU',
    detail:
      'Doctoral Student Fellowship Award ($15,000)\nCollege of Education & Human Development, Georgia State University\nGiven to three PhD students for exceptional scholarship and academic potential in Learning Technologies.',
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
    period: '2023–2024',
    label: 'Travel Awards',
    sublabel: 'GSU CEHD · 2023–2024',
    detail:
      'Graduate Student Travel Award ($500) — 2024\nGraduate Student Travel Award ($500) — 2023\nCollege of Education & Human Development, Learning Technology Department, Georgia State University.',
    badges: ['$1,000'],
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
  {
    category: 'Awards',
    period: '2025–2026',
    label: 'Travel Award 2025',
    sublabel: '$500 · GSU CEHD',
    detail:
      'Graduate Student Travel Award ($500) — 2025\nCollege of Education & Human Development, Learning Technology Department, Georgia State University.',
    badges: ['$500'],
  },
];
