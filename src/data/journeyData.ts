export type JourneyCategory = 'Education' | 'Research' | 'Publications' | 'Teaching' | 'Awards';

export type JourneyItem = {
  category: JourneyCategory;
  year: number;
  label: string;
  sublabel: string;
  detail: string;
  url?: string;
  badges?: string[];
};

export const journeyQuote =
  "From language education to AI-augmented learning design, every step has shaped my mission: designing human-centered AI systems that enhance learning, strengthen teaching, and create meaningful impact in education.";

export const journeyYears = [2008, 2012, 2015, 2019, 2021, 2023, 2024, 2025, 2026];

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
    year: 2008,
    label: 'B.A. Translation',
    sublabel: 'Emam Khomeiny Intl. Univ.',
    detail:
      'B.A. in English Language Translation\nKar Institute of Higher Education, Emam Khomeiny International University\nQazvin, Iran · 2008–2012\nGPA: 3.71/4.00 (Honored Student)',
  },
  {
    category: 'Education',
    year: 2012,
    label: 'M.A. Applied Linguistics',
    sublabel: 'Sharif University of Tech.',
    detail:
      'M.A. in Applied Linguistics\nSharif University of Technology, Tehran, Iran · 2012–2014\nGPA: 4.00/4.00 (Honored Student)\nThesis: "Design and Development of a Computerized Adaptive Software to Test Written Receptive Vocabulary Knowledge of Foreign Language Learners"\nAdvisor: Professor Salehi, M.',
  },
  {
    category: 'Education',
    year: 2021,
    label: 'Ph.D. Learning Sciences',
    sublabel: 'Georgia State University',
    detail:
      'Ph.D. in Learning Sciences\nGeorgia State University, Atlanta, GA · 2021–2025\nGPA: 4.14/4.00 (Honored Student)\nDissertation: "Enhancing Argumentative Writing in English as Foreign Language Education through AI-Powered Personalized Learning"\nAdvisor: Professor Kim, M. K.\nCommittee: Drs. Darling-Aduana, J., Shapiro, B. R., & Motevali, S.',
  },

  // ── Research ──
  {
    category: 'Research',
    year: 2021,
    label: 'SaTC: Private AI',
    sublabel: 'NSF · GRA',
    detail:
      'Secure and Trustworthy Cyberspace (SaTC): Private Artificial Intelligence\nFunded by NSF · Graduate Research Associate · Aug 2021–Present\nInterdisciplinary project focusing on AI and privacy, developing instructional materials and hands-on labs to train students in trustworthy AI.',
  },
  {
    category: 'Research',
    year: 2023,
    label: 'AI-ALOE',
    sublabel: 'NSF · GRA',
    detail:
      'AI Institute for Adult Learning and Online Education (ALOE)\nFunded by NSF · Graduate Research Associate · Jan 2022–Aug 2022\nTransforming online adult learning through AI-driven models grounded in cognitive and social learning theories.',
  },
  {
    category: 'Research',
    year: 2024,
    label: 'IUSE Physics',
    sublabel: 'NSF · Researcher',
    detail:
      'IUSE-Engaged Student Learning: AI-Scaffolded Pre-Classroom Learning for Large/Introductory Undergraduate Physics Courses\nFunded by NSF · Researcher · Aug 2024–Present\nDesigning AI-augmented formative assessment and feedback systems for physics education.',
  },
  {
    category: 'Research',
    year: 2025,
    label: 'AIVO AI4Ed',
    sublabel: 'Google.org · Fellow',
    detail:
      'AI Institutes Virtual Organization (AIVO) – AI4Ed Summer Program\nFunded by Google.org · Graduate Fellow · Summer 2025\nRepresenting the AI-ALOE team at Georgia Tech, engaging in interdisciplinary research across five NSF-funded national AI institutes.',
    badges: ['Fellowship'],
  },

  // ── Publications ──
  {
    category: 'Publications',
    year: 2019,
    label: 'Persian Discourse',
    sublabel: 'PLSJ',
    detail:
      'Haddadian, G., & Mahmoodi-Bakhtiari, B. (2018). Conversational Repairs in Persian Dramatic Discourse: Akbar Radi\'s Pellekân (The Steps). Persian Literary Studies Journal, 7(11), 65-82.',
    url: 'http://doi.org/10.22099/jps.2019.31124.1088',
  },
  {
    category: 'Publications',
    year: 2023,
    label: 'AI vs. Human Eval',
    sublabel: 'ICLS 2023',
    detail:
      'Kim, J., Haddadian, G., & Kim, M. K. (2023). An investigation of knowledge-based AI vs. human evaluation in the context of academic summary evaluation. ICLS 2023, pp. 994-997.',
    url: 'https://doi.org/10.22318/icls2023.633243',
  },
  {
    category: 'Publications',
    year: 2024,
    label: 'CFAL Questionnaire',
    sublabel: 'Language Testing in Asia',
    detail:
      'Haddadian, G., Radmanesh, S., & Haddadian, N. (2024). Construction and validation of a Computerized Formative Assessment Literacy (CFAL) questionnaire for language teachers. Language Testing in Asia, 14(33).',
    url: 'https://doi.org/10.1186/s40468-024-00303-2',
  },
  {
    category: 'Publications',
    year: 2024,
    label: 'Grammarly Feedback',
    sublabel: 'JAID',
    detail:
      'Haddadian, G., & Haddadian, N. (2024). Innovative Use of Grammarly Feedback for Improving EFL Learners\' Speaking. The Journal of Applied Instructional Design, 13(2).',
    url: 'https://doi.org/10.59668/1269.15640',
  },
  {
    category: 'Publications',
    year: 2024,
    label: 'SITE Award Paper',
    sublabel: 'AACE',
    detail:
      'Haddadian, G., & Haddadian, N. (2024). An Investigation of ELT Teachers\' Online Self-efficacy. Proceedings of SITE International Conference, pp. 1607-1615. Las Vegas, NV.',
    url: 'https://www.learntechlib.org/primary/p/224179/',
    badges: ['Award'],
  },
  {
    category: 'Publications',
    year: 2025,
    label: 'AWE Systematic Review',
    sublabel: 'RSAL',
    detail:
      'Haddadian, G., Kim, M. K., & Haddadian, N. (2025). A Systematic Review of Automated Writing Evaluation Tools in Argumentative Writing for English as Foreign Language Education. Research Synthesis in Applied Linguistics, 1-51.',
    url: 'https://doi.org/10.1080/29984475.2025.2598266',
    badges: ['Journal'],
  },
  {
    category: 'Publications',
    year: 2025,
    label: 'GenAI Peer Feedback',
    sublabel: 'IJETHE',
    detail:
      'Noroozi, O., Haddadian, G., et al. (2025). The value of GenAI for peer feedback provision: student perceptions and impacts. International Journal of Educational Technology in Higher Education, 22(1), 61.',
    url: 'https://doi.org/10.1186/s41239-025-00558-6',
    badges: ['Journal'],
  },
  {
    category: 'Publications',
    year: 2025,
    label: 'Private AI Curriculum',
    sublabel: 'IJTE',
    detail:
      'Haddadian, G., Panzade, P., Takabi, D., & Kim, M. K. (2025). Problem-centered post-secondary computer science education: A study of the private artificial intelligence curriculum. IJTE, 8(2), 220-245.',
    url: 'https://doi.org/10.46328/ijte.1071',
    badges: ['Journal'],
  },
  {
    category: 'Publications',
    year: 2025,
    label: 'AI Expert Models',
    sublabel: 'ICLS 2025',
    detail:
      'Haddadian, G., Han, H., Kim, J., Abdeen, M. S., & Kim, M. K. (2025). Exploring AI-Generated Expert Models: Instructor Interaction and Learner Perceptions in a Physics Class. ICLS 2025, pp. 1684-1688.',
    url: 'https://doi.org/10.22318/icls2025.213524',
  },
  {
    category: 'Publications',
    year: 2025,
    label: 'Peer Feedback + GenAI',
    sublabel: 'CSCL 2025',
    detail:
      'Greisel, M., ... Haddadian, G., et al. (2025). Enhancing Peer Feedback Practices With Generative AI. CSCL 2025, pp. 490-498.',
    url: 'https://doi.org/10.22318/cscl2025.921873',
  },
  {
    category: 'Publications',
    year: 2026,
    label: 'AERA 2026',
    sublabel: 'Accepted',
    detail:
      'Noroozi, O., Haddadian, G., Banihashem, K., Schunn, C. (Accepted, 2026). How students perceive and respond to GenAI for peer feedback uptake. AERA Annual Meeting, Los Angeles, CA.',
    badges: ['Upcoming'],
  },
  {
    category: 'Publications',
    year: 2026,
    label: 'AAAL 2026',
    sublabel: 'Accepted',
    detail:
      'Haddadian, G., Kim, M. K., & Haddadian, N. (Accepted, 2026). Synthesizing Research on AWE Tools in EFL Argumentative Writing. AAAL 2026 Conference, Chicago, IL.',
    badges: ['Upcoming'],
  },

  // ── Teaching ──
  {
    category: 'Teaching',
    year: 2008,
    label: 'EFL Instructor',
    sublabel: 'Balan & Aryana',
    detail:
      'EFL Instructor at Balan Language Academy (2009–2015) and Aryana Institute of Technology (2009–2012)\nTeaching English as a Foreign Language and Technology to Adult, K-12 students.',
  },
  {
    category: 'Teaching',
    year: 2015,
    label: 'Senior Instructor',
    sublabel: 'Tehran Pouya',
    detail:
      'Senior Instructor at Tehran Pouya Technical & Vocational Training · 2015–2018\nCourses: TOEFL, EFL, GRE, TESOL, Technology Integration, Intro to Educational Technology\nAudience: Adult, K-12, Teachers',
  },
  {
    category: 'Teaching',
    year: 2019,
    label: 'CEO & Founder',
    sublabel: 'RadGuyesh Intl. Institute',
    detail:
      'CEO & Founder, RadGuyesh Haddadian International Institute · 2019–2021\nLead instructor for TOEFL and TESOL training programs\nMentored more than 500 students',
    badges: ['Leadership'],
  },
  {
    category: 'Teaching',
    year: 2023,
    label: 'Instructor of Record',
    sublabel: 'Georgia State University',
    detail:
      'Instructor of Record, Georgia State University · Fall 2022–Spring 2026\nCourse: Computer Skills for the Information Age\nAudience: Undergraduate Students',
  },
  {
    category: 'Teaching',
    year: 2025,
    label: 'Co-designer/Instructor',
    sublabel: 'GSU · Maker Tech',
    detail:
      'Co-designer/Instructor, Georgia State University · Fall 2025\nCourse: Inventing to Learn: Teaching and Learning with Maker Technologies\nAudience: Graduate and Undergraduate Students',
  },

  // ── Awards ──
  {
    category: 'Awards',
    year: 2012,
    label: 'Top 1% Nationwide',
    sublabel: 'Sharif Univ. of Tech.',
    detail:
      'Ranked in top 1% among all participants in the M.A. Nationwide University Entrance Exam\nAdmitted as exceptionally talented student supported by the National Organization for Development of Exceptional Talents\nRanked 1st in GPA for both B.A. (2012) and M.A. (2014)',
  },
  {
    category: 'Awards',
    year: 2023,
    label: 'Doctoral Fellowship',
    sublabel: '$15,000 · GSU',
    detail:
      'Doctoral Student Fellowship Award ($15,000)\nCollege of Education & Human Development, Georgia State University\nGiven to three PhD students who demonstrate exceptional scholarship and academic potential in Learning Technologies.',
    badges: ['$15,000'],
  },
  {
    category: 'Awards',
    year: 2024,
    label: 'AACE Paper Award',
    sublabel: 'SITE Conference',
    detail:
      'Outstanding Conference Paper Award\nSociety for Information Technology & Teacher Education (SITE) & AACE\nAwarded for exceptional quality, originality, and significant scholarly contribution. Las Vegas, NV.',
    badges: ['Outstanding'],
  },
  {
    category: 'Awards',
    year: 2025,
    label: 'AI4ED Fellowship',
    sublabel: '$12,500 · AIVO',
    detail:
      'AI4ED Summer Fellowship ($12,500)\nAI Institutes Virtual Organization (AIVO), funded by NSF & Google.org\nAwarded to selected graduate researchers representing five major AI in Education Institutes across the U.S.',
    badges: ['$12,500'],
  },
  {
    category: 'Awards',
    year: 2025,
    label: 'Outstanding Ph.D. Student',
    sublabel: 'GSU CEHD',
    detail:
      'Outstanding Ph.D. Student in Learning Technologies\nCollege of Education & Human Development, Georgia State University\nDemonstrated potential for excellence in research, teaching, and service.',
    badges: ['Outstanding'],
  },
  {
    category: 'Awards',
    year: 2025,
    label: 'Global Engagement',
    sublabel: 'GSU',
    detail:
      'Outstanding Contributions to Global Engagement and Global Citizenship\nGeorgia State University\nNominated for the 2025 International Education Award in International Initiatives.',
  },
  {
    category: 'Awards',
    year: 2026,
    label: 'Outstanding Dissertation',
    sublabel: 'GSU CEHD',
    detail:
      'Outstanding Dissertation in Learning Technologies\nDepartment of Learning Sciences, College of Education & Human Development, Georgia State University.',
    badges: ['Outstanding'],
  },
];
