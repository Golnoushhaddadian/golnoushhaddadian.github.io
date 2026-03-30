export type JourneyCategory = 'Education' | 'Research' | 'Publications' | 'Teaching' | 'Awards' | 'Leadership' | 'Service';

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
  'Leadership',
  'Service',
];

export const journeyItems: JourneyItem[] = [
  // ── Education ──
  {
    category: 'Education',
    period: '2008–2014',
    label: 'B.A. English Translation',
    sublabel: 'Emam Khomeiny Intl. University · 2008–2012',
    detail:
      'B.A. in English Language Translation\nKar Institute of Higher Education, Emam Khomeiny International University\nQazvin, Iran · 2008–2012\nGPA: 3.71/4.00 (Honored Student)',
  },
  {
    category: 'Education',
    period: '2008–2014',
    label: 'M.A. Applied Linguistics',
    sublabel: 'Sharif University of Technology · 2012–2014',
    detail:
      'M.A. in Applied Linguistics\nSharif University of Technology, Tehran, Iran · 2012–2014\nGPA: 4.00/4.00 (Honored Student)\nThesis: "Design and Development of a Computerized Adaptive Software to Test Written Receptive Vocabulary Knowledge of Foreign Language Learners"\nAdvisor: Professor Salehi, M.',
  },
  {
    category: 'Education',
    period: '2021–2022',
    label: 'Ph.D. Learning Sciences',
    sublabel: 'Georgia State University · 2021–Present',
    detail:
      'Ph.D. in Learning Sciences\nGeorgia State University, Atlanta, GA · 2021–2025\nGPA: 4.14/4.00 (Honored Student)\nDissertation: "Design and Development of an AI-Augmented Feedback System to Enhance Argumentative Writing Proficiency Among EFL Learners"\nLearning tool: RITA - Real-time Intelligent Technology for Argumentative Writing\nAdvisor: Professor Kim, M. K.\nCommittee: Darling-Aduana, J. & Shapiro, B. R.',
  },

  // ── Research ──
  {
    category: 'Research',
    period: '2021–2022',
    label: 'Private AI (SaTC)',
    sublabel: 'NSF-Funded · Graduate Research Associate',
    detail:
      'Secure and Trustworthy Cyberspace (SaTC): Private Artificial Intelligence\nFunded by NSF · Graduate Research Associate · Aug 2021–Present\nDeveloping instructional materials and hands-on labs to train students in trustworthy AI, addressing the demand for skilled researchers by integrating technical knowledge with ethical and privacy-focused practices.',
  },
  {
    category: 'Research',
    period: '2021–2022',
    label: 'Adult Learning & Online Ed.',
    sublabel: 'NSF AI-ALOE · Graduate Research Associate',
    detail:
      'AI Institute for Adult Learning and Online Education (ALOE)\nFunded by NSF · Graduate Research Associate · Jan 2022–Aug 2022\nTransforming online adult learning through AI-driven models grounded in cognitive and social learning theories, developing intelligent virtual assistants and personalized learning systems.',
  },
  {
    category: 'Research',
    period: '2023–2024',
    label: 'AI for Undergraduate Physics',
    sublabel: 'NSF IUSE · Researcher',
    detail:
      'IUSE-Engaged Student Learning: AI-Scaffolded Pre-Classroom Learning for Undergraduate Physics Courses\nFunded by NSF · Researcher · Aug 2024–Present\nDesigning AI-augmented formative assessment and feedback systems to help students build skills for interactive problem-solving, with a focus on underrepresented students in STEM.',
  },
  {
    category: 'Research',
    period: '2025–2026',
    label: 'AI4Ed Summer Program',
    sublabel: 'Google.org · Graduate Fellow',
    detail:
      'AI Institutes Virtual Organization (AIVO) – AI4Ed Summer Program\nFunded by Google.org · Graduate Fellow · Summer 2025\nRepresenting the AI-ALOE team at Georgia Tech across five NSF-funded national AI institutes, engaging in interdisciplinary research and knowledge exchange to advance AI applications in education.',
    badges: ['Fellowship'],
  },

  // ── Publications: Journals ──
  {
    category: 'Publications',
    period: '2015–2020',
    label: 'Conversational Repairs in Persian Discourse',
    sublabel: 'Persian Literary Studies Journal · 2018',
    detail:
      'Haddadian, G., & Mahmoodi-Bakhtiari, B. (2018). Conversational Repairs in Persian Dramatic Discourse: Akbar Radi\'s Pellekân (The Steps). Persian Literary Studies Journal, 7(11), 65-82.',
    url: 'http://doi.org/10.22099/jps.2019.31124.1088',
    badges: ['Journal'],
  },
  {
    category: 'Publications',
    period: '2023–2024',
    label: 'Formative Assessment Literacy Questionnaire',
    sublabel: 'Language Testing in Asia · 2024',
    detail:
      'Haddadian, G., Radmanesh, S., & Haddadian, N. (2024). Construction and validation of a Computerized Formative Assessment Literacy (CFAL) questionnaire for language teachers: An exploratory sequential mixed-methods investigation. Language Testing in Asia, 14(33).',
    url: 'https://doi.org/10.1186/s40468-024-00303-2',
    badges: ['Journal'],
  },
  {
    category: 'Publications',
    period: '2023–2024',
    label: 'Grammarly for EFL Speaking',
    sublabel: 'Journal of Applied Instructional Design · 2024',
    detail:
      'Haddadian, G., & Haddadian, N. (2024). Innovative Use of Grammarly Feedback for Improving EFL Learners\' Speaking: Learners\' Perceptions and Transformative Engagement Experiences in Focus. The Journal of Applied Instructional Design, 13(2).',
    badges: ['Journal'],
  },
  {
    category: 'Publications',
    period: '2023–2024',
    label: 'Feedback Effects on EFL Writing',
    sublabel: 'CALL Electronic Journal · 2024',
    detail:
      'Haddadian, G. (2024). Comparing the Effects of Teacher Feedback, Automated Feedback, and Integrative Feedback on EFL Learners\' Writing Accuracy and Writing Apprehension. Computer-Assisted Language Learning Electronic Journal, 25(3), 124-147.',
    badges: ['Journal'],
  },
  {
    category: 'Publications',
    period: '2025–2026',
    label: 'Private AI Curriculum in CS Education',
    sublabel: 'Intl. Journal of Technology in Education · 2025',
    detail:
      'Haddadian, G., Panzade, P., Takabi, D., & Kim, M. K. (2025). Problem-centered post-secondary computer science education: A study of the private artificial intelligence curriculum. International Journal of Technology in Education (IJTE), 8(2), 1-26.',
    badges: ['Journal'],
  },
  {
    category: 'Publications',
    period: '2025–2026',
    label: 'Systematic Review of AWE Tools',
    sublabel: 'Research Synthesis in Applied Linguistics · 2025',
    detail:
      'Haddadian, G., Kim, M. K., & Haddadian, N. (2025). A Systematic Review of AWE Tools in Argumentative Writing for EFL Education. Research Synthesis in Applied Linguistics, 1-51.',
    url: 'https://doi.org/10.1080/29984475.2025.2598266',
    badges: ['Journal'],
  },
  {
    category: 'Publications',
    period: '2025–2026',
    label: 'GenAI for Peer Feedback',
    sublabel: 'Intl. Journal of Ed. Technology in Higher Ed. · 2025',
    detail:
      'Noroozi, O., Haddadian, G., et al. (2025). The value of GenAI for peer feedback provision. International Journal of Educational Technology in Higher Education, 22(1), 61.',
    url: 'https://doi.org/10.1186/s41239-025-00558-6',
    badges: ['Journal'],
  },

  // ── Publications: Conference Proceedings ──
  {
    category: 'Publications',
    period: '2015–2020',
    label: 'Mind Mapping & EFL Vocabulary',
    sublabel: 'WEI Academic Conference · Barcelona · 2020',
    detail:
      'Radmanesh, S., Haddadian, G. (2020). The Effect of Using Mind Mapping on Iranian EFL Learners\' Self-efficacy in Vocabulary Learning. WEI International Academic Conference on Education, Teaching, and Learning, Barcelona, Spain.',
    badges: ['Conference'],
  },
  {
    category: 'Publications',
    period: '2023–2024',
    label: 'AI vs. Human Evaluation',
    sublabel: 'ICLS 2023 · Montreal',
    detail:
      'Kim, J., Haddadian, G., & Kim, M. (2023). An investigation of knowledge-based AI vs. human evaluation in academic summary evaluation: Similarities, dissimilarities, and being toward mutual understandings. Proceedings of ICLS 2023 (pp. 994-997). Montreal, Canada.',
    badges: ['Conference'],
  },
  {
    category: 'Publications',
    period: '2023–2024',
    label: 'Learning Progress with AI Systems',
    sublabel: 'ICLS 2023 · Montreal',
    detail:
      'Kim, M., Kim, N., Haddadian, G., & Heidari, A. (2023). A test of learning progress models using an AI-enabled knowledge representation system. Proceedings of ICLS 2023 (pp. 986-989). Montreal, Canada.',
    badges: ['Conference'],
  },
  {
    category: 'Publications',
    period: '2023–2024',
    label: 'Problem-Centered Private AI Instruction',
    sublabel: 'AECT 2023 · Orlando',
    detail:
      'Haddadian, G., Takabi, D., Panzade, P., Kim, M. (2023). A Design Study of Problem-Centered Instruction (PCI) for Private AI Curriculum Development. AECT 2023, Orlando, FL.',
    badges: ['Conference'],
  },
  {
    category: 'Publications',
    period: '2023–2024',
    label: 'AI Literacy: Developmental Model',
    sublabel: 'AECT 2023 · Orlando',
    detail:
      'Haddadian, G., Bae, Y., Kim, J., & Kim, M. (2023). A Comprehensive Model of AI Literacy from a Developmental Perspective. AECT 2023, Orlando, FL.',
    badges: ['Conference'],
  },
  {
    category: 'Publications',
    period: '2023–2024',
    label: 'AI Tool & Adult Learners',
    sublabel: 'AECT 2023 · Orlando',
    detail:
      'Bae, Y., Kim, J., Haddadian, G., Davis, A., & Kim, M. (2023). The impact of an AI-based educational tool, with a focus on technology acceptance and metacognitive awareness of adult learners. AECT 2023, Orlando, FL.',
    badges: ['Conference'],
  },
  {
    category: 'Publications',
    period: '2023–2024',
    label: 'ML for Cognitive Engagement',
    sublabel: 'AECT 2023 · Orlando',
    detail:
      'Kim, J., Bae, Y., Haddadian, G., & Kim, M. (2023). Leveraging machine learning to automatically evaluate cognitive engagement in asynchronous online discussions. AECT 2023, Orlando, FL.',
    badges: ['Conference'],
  },
  {
    category: 'Publications',
    period: '2023–2024',
    label: 'AI-Augmented Summarization',
    sublabel: 'AECT 2023 · Orlando',
    detail:
      'Kim, J., Bae, Y., Haddadian, G., et al. (2023). AI-augmented summarization: Impact on online adult learners\' concept learning, discussion quality, and achievement. AECT 2023, Orlando, FL.',
    badges: ['Conference'],
  },
  {
    category: 'Publications',
    period: '2023–2024',
    label: 'Teachers\' Online Self-Efficacy',
    sublabel: 'SITE 2024 · Las Vegas',
    detail:
      'Haddadian, G., & Haddadian, N. (2024). An Investigation of ELT Teachers\' Online Self-efficacy: Does Teachers\' Level of Agency Matter? SITE International Conference, pp. 1607-1615. Las Vegas, NV.',
    url: 'https://www.learntechlib.org/primary/p/224179/',
    badges: ['Award'],
  },
  {
    category: 'Publications',
    period: '2023–2024',
    label: 'Private AI in CS Education',
    sublabel: 'ICLS 2024 · Buffalo',
    detail:
      'Haddadian, G., Panzade, P., Takabi, D., & Kim, M. K. (2024). Evaluating Private AI Curriculum in CS Education: Insights for Advancing Student-Centered CS Learning. Proceedings of ICLS 2024, pp. 2271-2272.',
    badges: ['Conference'],
  },
  {
    category: 'Publications',
    period: '2023–2024',
    label: 'AI Personalized Recommendations for L2',
    sublabel: 'AIRiAL 2024 · Columbia University',
    detail:
      'Daneshvar Ghorbani, B., & Haddadian, G. (2024). The Impact of AI-Enabled Personalized Recommendations on L2 Learners\' Engagement, Motivation, and Learning Outcomes. AIRiAL 2024 Conference, Teachers College, Columbia University.',
    badges: ['Conference'],
  },
  {
    category: 'Publications',
    period: '2025–2026',
    label: 'Peer Feedback with GenAI',
    sublabel: 'ICLS 2025 · Helsinki (Accepted)',
    detail:
      'Noroozi, O., Haddadian, G., Gao, X., Schunn, C. D., Alqassab, M., & Banihashem, S. K. (Accepted). Supporting peer feedback provision and uptake with GenAI. ICLS/ISLS 2025, Helsinki.',
    badges: ['Upcoming'],
  },
  {
    category: 'Publications',
    period: '2025–2026',
    label: 'Expert Models with GenAI',
    sublabel: 'ICLS 2025 · Helsinki (Accepted)',
    detail:
      'Haddadian, G., Han, H., Kim, M. Kim, J., Bae, Y. (Accepted). Automated Generation of Expert Models with Generative AI. ICLS/ISLS 2025, Helsinki.',
    badges: ['Upcoming'],
  },
  {
    category: 'Publications',
    period: '2025–2026',
    label: 'GenAI for Peer Feedback Uptake',
    sublabel: 'AERA 2026 · Los Angeles (Accepted)',
    detail:
      'GenAI-supported peer feedback uptake in collaborative writing contexts. Accepted for AERA 2026, Los Angeles.',
    badges: ['Upcoming'],
  },
  {
    category: 'Publications',
    period: '2025–2026',
    label: 'AWE in EFL Argumentative Writing',
    sublabel: 'AAAL 2026 · Chicago (Accepted)',
    detail:
      'Automated Writing Evaluation in Foreign Language Education: A Systematic Review in Argumentative Writing. Accepted for AAAL 2026, Chicago.',
    badges: ['Upcoming'],
  },

  // ── Publications: Non-Refereed ──
  {
    category: 'Publications',
    period: '2015–2020',
    label: 'TeleCrowd: Text Corpora',
    sublabel: 'arXiv Preprint · 2020',
    detail:
      'Masoumi, V., Salehi, M., Veisi, H., Haddadian, G., Ranjbar, V., & Sahebdel, M. (2020). TeleCrowd: A Crowdsourcing Approach to Create Informal to Formal Text Corpora. arXiv preprint arXiv:2004.11771.',
    badges: ['Preprint'],
  },

  // ── Publications: Under Review ──
  {
    category: 'Publications',
    period: '2025–2026',
    label: 'AI Feedback & Collaborative Writing',
    sublabel: 'Computer Assisted Language Learning · In Revision',
    detail:
      'Haddadian, G., Haddadian, M. (In revision). Learners\' Collaboration in Using AI-generated Feedback, Argumentative Writing, and Writing Self-efficacy: Effects and Precepts. Computer Assisted Language Learning.',
    badges: ['In Review'],
  },
  {
    category: 'Publications',
    period: '2025–2026',
    label: 'GenAI Scaffolding for Peer Feedback',
    sublabel: 'Intl. Journal of Ed. Tech. in Higher Ed. · In Revision',
    detail:
      'Noroozi, O., Haddadian, G., Banihashem, K., Schunn, C, Alqassab, M. (In revision). The Scaffolding Value of GenAI during Peer Feedback Provision and Uptake: Student Perceptions and Actual Impacts. International Journal of Educational Technology in Higher Education.',
    badges: ['In Review'],
  },
  {
    category: 'Publications',
    period: '2025–2026',
    label: 'EFL Teachers\' Professional Development',
    sublabel: 'Journal of Language and Education · Under Review',
    detail:
      'Mashhadi, F., Haddadian, G., Kavoshian, S., Heidari, F. (Under Review). Promoting EFL Teachers\' Self-Directed Professional Development through Collaborative Action Research in a Networked Community of Shared Knowledge. Journal of Language and Education.',
    badges: ['In Review'],
  },
  {
    category: 'Publications',
    period: '2025–2026',
    label: 'Classroom Interactions in Iranian EFL',
    sublabel: 'Intl. Journal of Language Studies · Under Review',
    detail:
      'Kavoshian, S., Mashhadi, F., Haddadian, G. (Under Review). Exploring Classroom Interactions in Iranian EFL Classrooms. International Journal of Language Studies.',
    badges: ['In Review'],
  },

  // ── Publications: Work in Progress ──
  {
    category: 'Publications',
    period: '2025–2026',
    label: 'RITA: Design-Based Research',
    sublabel: 'Journal Article · In Progress',
    detail:
      'Haddadian, G., Kim, M. (Journal Article). Real-time Intelligent Technology for Argumentative Writing (RITA): A Design-Based Research.',
    badges: ['In Progress'],
  },
  {
    category: 'Publications',
    period: '2025–2026',
    label: 'GenAI for Peer Feedback (Book Chapter)',
    sublabel: 'Book Chapter · In Progress',
    detail:
      'Alqassab, M., Noroozi, O., Haddadian, G., Banihashem, K., Schunn, C. (Book Chapter). Text-based Generative AI to Facilitate Peer Feedback: Pedagogical Opportunities and Challenges.',
    badges: ['In Progress'],
  },
  {
    category: 'Publications',
    period: '2025–2026',
    label: 'Plagiarism in AI-Enabled Physics',
    sublabel: 'Journal Article · In Progress',
    detail:
      'Han, H., Haddadian, G., Kim, M. Kim, J., Bae, Y. (Journal Article). Students\' Plagiarism Behaviors within AI-Enabled Introductory Physics Courses.',
    badges: ['In Progress'],
  },
  {
    category: 'Publications',
    period: '2025–2026',
    label: 'AI Expert Models in Physics',
    sublabel: 'Journal Article · In Progress',
    detail:
      'Han, H., Kim, M. Haddadian, G. (Journal Article). Generative AI for the Automated Construction and Evaluation of Expert Models in Physics Course.',
    badges: ['In Progress'],
  },
  {
    category: 'Publications',
    period: '2025–2026',
    label: 'Evaluative Judgment & Tech Feedback',
    sublabel: 'Journal Article · In Progress',
    detail:
      'Heidari, A., Kim, M., Kim, J., Bae, Y., Haddadian, G. (Journal Article). Examining Learner\'s Evaluative Judgment Supported by Technology-Enabled Feedback Information.',
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
    sublabel: 'EFL & Technology · Since 2004',
    detail:
      'Private Tutor (April 2004 to 2021)\nEFL Instructor, Technology Instructor\nProviding personalized tutoring to adult learners and K-12 students.',
  },
  {
    category: 'Teaching',
    period: '2015–2020',
    label: 'Senior Instructor & CEO',
    sublabel: 'Tehran Pouya · RadGuyesh Institute',
    detail:
      'Senior Instructor at Tehran Pouya (2015–2018): TOEFL Coach, EFL Instructor, Technology Instructor, Educational Consultant\nCEO & Founder of RadGuyesh Haddadian International Institute (2019–2021): TOEFL Coach, TESOL Trainer, EFL Instructor\nCourses: TOEFL, EFL, GRE, TESOL\nMentored more than 500 students',
    badges: ['Leadership'],
  },
  {
    category: 'Teaching',
    period: '2015–2020',
    label: 'Adjunct Instructor',
    sublabel: 'Al-Zahra University · Andisheh Moein',
    detail:
      'Adjunct Instructor at University of Applied Sciences, Al-Zahra (Summer 2015): Introduction to Educational Technology Course for undergraduate students\nAdjunct Instructor at Andisheh Moein Institute (Fall 2019): English for Master of Business Administration (MBA) for graduate students',
  },
  {
    category: 'Teaching',
    period: '2023–2024',
    label: 'Instructor of Record',
    sublabel: 'Georgia State University · Fall 2022–Present',
    detail:
      'Instructor of Record, Georgia State University · Fall 2022–Present\nCourse: Computer Skills for the Information Age\nAudience: Undergraduate Students\nStudents learn essential computer skills for organizing, analyzing, and communicating data.',
  },
  {
    category: 'Teaching',
    period: '2023–2024',
    label: 'GenAI Curriculum Module',
    sublabel: 'Georgia State University · Summer 2024',
    detail:
      'Module on Responsible Use of Generative AI (Summer 2024)\nPart of Computer Skills for the Information Age (LT2010) at GSU\nIntensive 2-week asynchronous module for undergraduate students on understanding, exploring, and responsibly using GenAI.',
    badges: ['Curriculum'],
  },
  {
    category: 'Teaching',
    period: '2025–2026',
    label: 'Co-designer/Instructor',
    sublabel: 'GSU · Maker Technologies · Fall 2025',
    detail:
      'Co-designer/Instructor, Georgia State University · Fall 2025\nCourse: Inventing to Learn: Teaching and Learning with Maker Technologies\nAudience: Graduate and Undergraduate Students',
  },

  // ── Awards ──
  {
    category: 'Awards',
    period: '2008–2014',
    label: 'Top 1% Nationwide Exam',
    sublabel: 'Admitted to Sharif University · 2012',
    detail:
      'Ranked in top 1% among all participants in the master\'s degree Nationwide University Entrance Exam (Tehran, Iran, 2012). Admitted to the M.A. program at Sharif University of Technology as an exceptional talented student supported by the National Organization for Development of Exceptional Talents.',
  },
  {
    category: 'Awards',
    period: '2008–2014',
    label: 'Ranked 1st in GPA',
    sublabel: 'B.A. (2012) & M.A. (2014)',
    detail:
      'Ranked 1st in GPA for bachelor\'s degree (2012) and master\'s degree (2014).',
  },
  {
    category: 'Awards',
    period: '2008–2014',
    label: 'Outstanding Teaching Awards',
    sublabel: 'Balan Academy · Aryana Institute',
    detail:
      'Innovative and Supportive Teacher of Foreign Languages Award: Balan Language Academy (Tehran, Iran, 2013).\nOutstanding Teacher of Foreign Languages Award: Aryana Fanavaran Institute of Technology (Tehran, Iran, 2010).',
  },
  {
    category: 'Awards',
    period: '2008–2014',
    label: 'Student Researcher Awards',
    sublabel: 'Young Researchers Club · 2005–2006',
    detail:
      'Distinguished Student Researcher Award: Young Researchers and Elite Club (Tehran, Iran, 2006).\nOutstanding Student Researcher Award: Shahid Shamloo High School (Tehran, Iran, 2005).',
  },
  {
    category: 'Awards',
    period: '2023–2024',
    label: 'Doctoral Fellowship ($15,000)',
    sublabel: 'Georgia State University · 2023',
    detail:
      'Doctoral Student Fellowship Award ($15,000)\nCollege of Education & Human Development, Georgia State University. Given to three PhD students for exceptional scholarship and academic potential in the Learning Technologies department.',
    badges: ['$15,000'],
  },
  {
    category: 'Awards',
    period: '2023–2024',
    label: 'Outstanding Conference Paper',
    sublabel: 'SITE / AACE · Las Vegas · 2024',
    detail:
      'Association for the Advancement of Computing in Education (AACE) Conference Paper Award, Society for Information Technology & Teacher Education, Las Vegas, Nevada, 2024. Awarded to papers distinguished as outstanding by the AACE Program Committee for exceptional quality, originality, and significant scholarly contribution.',
    badges: ['Outstanding'],
  },
  {
    category: 'Awards',
    period: '2023–2024',
    label: 'Travel Awards ($1,000)',
    sublabel: 'Georgia State University · 2023 & 2024',
    detail:
      'Graduate Student Travel Award ($500) — 2024\nGraduate Student Travel Award ($500) — 2023\nCollege of Education & Human Development, Learning Technology Department, Georgia State University.',
    badges: ['$1,000'],
  },
  {
    category: 'Awards',
    period: '2025–2026',
    label: 'AI4ED Fellowship ($12,500)',
    sublabel: 'AIVO · Funded by NSF & Google.org',
    detail:
      'AI4ED Summer Fellowship ($12,500)\nAI Institutes Virtual Organization (AIVO). Funded by NSF & Google.org. Awarded to selected graduate researchers representing five major AI in Education Institutes across U.S. (iSAT, AI-ALOE, EngageAI, AI4ExceptionalEd, and INVITE).',
    badges: ['$12,500'],
  },
  {
    category: 'Awards',
    period: '2025–2026',
    label: 'Outstanding Ph.D. Student',
    sublabel: 'Georgia State University · 2025',
    detail:
      'Outstanding Ph.D. Student in Learning Technologies (LT) Award, College of Education & Human Development (CEHD). Given to a student who has demonstrated potential for excellence in research, teaching and service in instructional technology.',
    badges: ['Outstanding'],
  },
  {
    category: 'Awards',
    period: '2025–2026',
    label: 'Outstanding Dissertation',
    sublabel: 'Georgia State University · 2026',
    detail:
      'Outstanding Dissertation in Learning Technologies, Department of Learning Sciences, Georgia State University.',
    badges: ['Outstanding'],
  },
  {
    category: 'Awards',
    period: '2025–2026',
    label: 'Travel Award ($500)',
    sublabel: 'Georgia State University · 2025',
    detail:
      'Graduate Student Travel Award ($500) — 2025\nCollege of Education & Human Development, Learning Technology Department, Georgia State University.',
    badges: ['$500'],
  },

  // ── Leadership ──
  {
    category: 'Leadership',
    period: '2015–2020',
    label: 'CEO & Founder',
    sublabel: 'RadGuyesh Haddadian Intl. Institute · 2019–2021',
    detail:
      'Founded a multidisciplinary educational center specializing in English language learning and computer science. Offered TOEFL, GRE, TESOL training, General English, and advanced computer science courses including Machine Learning and Deep Learning.',
  },
  {
    category: 'Leadership',
    period: '2023–2024',
    label: 'ISLS Committee Representative',
    sublabel: 'Equity & Justice · Publications · Since 2024',
    detail:
      'Student Representative on the Equity and Justice Committee and the Publication Committee at the International Society of the Learning Sciences (ISLS/ICLS). Since 2024.',
  },
  {
    category: 'Leadership',
    period: '2023–2024',
    label: 'Africa & Middle East Representative',
    sublabel: 'ILSSA at ISLS/ICLS · Since 2024',
    detail:
      'Africa and Middle East Regional Representative for the International Learning Sciences Student Association (ILSSA) at ISLS/ICLS. Since 2024.',
  },
  {
    category: 'Leadership',
    period: '2025–2026',
    label: 'Mentorship Program Initiator',
    sublabel: 'ILSSA Mentorship Program · 2025',
    detail:
      'Initiated and mentored the ILSSA Mentorship Program, creating an adaptive, inclusive, collaborative space for Learning Sciences students and researchers to connect, enhance expertise, and foster personal and professional development.',
  },
  {
    category: 'Leadership',
    period: '2025–2026',
    label: 'Graduate Student Mentor',
    sublabel: 'RITA Project · Robinson College · 2025',
    detail:
      'Mentoring a team of Master\'s students in Business Analytics and Computer Science at J. Mack Robinson College of Business for the RITA (Real-time Intelligent Technology for Argumentative Writing) Project.',
  },

  // ── Service ──
  {
    category: 'Service',
    period: '2023–2024',
    label: 'Journal Reviewer',
    sublabel: 'CALL · IETI · EIT · CALL-EJ · Since 2024',
    detail:
      'Reviewer for: Innovations in Education and Teaching International, Education and Information Technologies, Computer Assisted Language Learning, and Computer-Assisted Language Learning Electronic Journal. Since 2024.',
  },
  {
    category: 'Service',
    period: '2023–2024',
    label: 'Program Committee Member',
    sublabel: 'ISLS · SITE · AECT · ACM L@S · Since 2024',
    detail:
      'Program Committee Member for: ISLS/ICLS (International Society of the Learning Sciences), SITE (Society for Information Technology and Teacher Education), AECT International Convention, and ACM Learning @ Scale at Georgia Institute of Technology. Since 2024.',
  },
  {
    category: 'Service',
    period: '2025–2026',
    label: 'Scholarships Reviewer',
    sublabel: 'ISLS/ICLS Travel Scholarships · 2025',
    detail:
      'Reviewer for the ISLS/ICLS Travel to Helsinki Scholarships (Equity Travel Support and ILSSA Annual Meeting Scholarship). 2025.',
  },
  {
    category: 'Service',
    period: '2025–2026',
    label: 'Faculty Tech Proposal Evaluator',
    sublabel: 'Georgia State University · 2025',
    detail:
      'Student Representative and Proposal Evaluator for Faculty Technology Initiatives, College of Education and Human Development, Georgia State University. 2025.',
  },
  {
    category: 'Service',
    period: '2025–2026',
    label: 'Project FEED Volunteer',
    sublabel: 'Food Equity · Atlanta · 2025',
    detail:
      'Volunteer for Project FEED (Food Equity and Efficient Delivery), fighting food insecurity in under-resourced areas of Atlanta. Backed by the 2025 Youth Stop Hunger Sodexo Grant, providing families in need with access to fresh, healthy food.',
  },
];
