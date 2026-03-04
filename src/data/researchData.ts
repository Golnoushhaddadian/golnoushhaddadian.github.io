import { ResearchProject, JournalPublication, ConferenceProceeding, NonRefereedPublication, WorkUnderReview, WorkInProgress } from "@/types/research";

export const currentProjects: ResearchProject[] = [
  {
    title: "AI Institutes Virtual Organization (AIVO) – AI4Ed Summer Program",
    position: "Graduate Fellow",
    period: "Summer 2025",
    funding: "Funded by Google.org",
    description: "This collaborative program brings together graduate student researchers from five NSF-funded national AI institutes dedicated to advancing AI applications in education. The initiative fosters cross-institute partnerships to promote inclusive, ethical, and human-centered AI innovations for lifelong learning. As a selected Fellow, I will represent the AI-ALOE team at Georgia Tech, engaging in interdisciplinary research, knowledge exchange, and synergistic activities to support AIVO's mission of leveraging AI to enhance educational access, equity, and learner success across diverse communities."
  },
  {
    title: "Secure and Trustworthy Cyberspace (SaTC): Private Artificial Intelligence (AI)",
    position: "Graduate Research Associate",
    period: "August 2021 - present",
    funding: "Funded by the National Science Foundation (NSF)",
    description: "This interdisciplinary project focuses on artificial intelligence (AI) and privacy, supported by the Secure and Trustworthy Cyberspace (SaTC) program. Aligned with the Federal Cybersecurity Research and Development Strategic Plan and the National Privacy Research Strategy, it aims to protect the benefits of cyber systems while ensuring security and privacy. The project develops instructional materials and hands-on labs to train students in trustworthy AI. It addresses the fast-growing demand for skilled researchers by integrating technical knowledge with ethical and privacy-focused practices in AI."
  },
  {
    title: "AI Institute for Adult Learning and Online Education (ALOE)",
    position: "Graduate Research Associate",
    period: "January 2022 - August 2022",
    funding: "Funded by the National Science Foundation (NSF)",
    description: "This interdisciplinary project aims to transform online adult learning through AI-driven models grounded in cognitive and social learning theories. It addresses the distinct needs of adult learners by developing intelligent virtual assistants and personalized learning systems. The initiative brings together a national network of universities, nonprofits, and industry partners to advance foundational research in areas such as cognitive-based AI, scalable personalization, human-AI collaboration, and ethical AI design. Using iterative learning engineering and mixed-methods evaluation, the project seeks to deliver scalable, equitable, and effective solutions for adult education."
  },
  {
    title: "IUSE-Engaged Student Learning (Level 1): AI-Scaffolded Pre-Classroom Learning for Large/Introductory Undergraduate Physics Courses",
    position: "Researcher",
    period: "August 2024 - present",
    funding: "Funded by the National Science Foundation (NSF)",
    description: "This project designs and implements AI-augmented formative assessment and feedback systems to help students build skills for in-classroom interactive problem-solving activities. The aim is to determine whether AI in education improves students' well-being inside and outside the classroom, with a focus on those traditionally underrepresented in STEM education. Extensive data collected in the final phase will examine the relationships among pre-classroom activities, in-classroom performance, self-efficacy, interest in physics, and student backgrounds, including gender, race, ethnicity, first-generation status, and English language learning."
  },
];

export const journalPublications: JournalPublication[] = [
  {
    authors: ["Haddadian, G.", "Panzade, P.", "Takabi, D.", "Kim, M. K."],
    year: "2025",
    title: "Problem-centered post-secondary computer science education: A study of the private artificial intelligence curriculum",
    journal: "International Journal of Technology in Education (IJTE)",
    volume: "8(2)",
    pages: "1-26",
    keywords: ["CS Education", "AI Curriculum", "Problem-Centered Instruction"]
  },
  {
    authors: ["Haddadian, G.", "Radmanesh, S.", "Haddadian, N."],
    year: "2024",
    title: "Construction and validation of a Computerized Formative Assessment Literacy (CFAL) questionnaire for language teachers: An exploratory sequential mixed-methods investigation",
    journal: "Language Testing in Asia",
    volume: "14(33)",
    keywords: ["Assessment", "Language Teaching", "Mixed Methods"]
  },
  {
    authors: ["Haddadian, G.", "Haddadian, N."],
    year: "2024",
    title: "Innovative Use of Grammarly Feedback for Improving EFL Learners' Speaking: Learners' Perceptions and Transformative Engagement Experiences in Focus",
    journal: "The Journal of Applied Instructional Design",
    volume: "13(2)",
    keywords: ["EFL", "Feedback", "Grammarly", "Speaking"]
  },
  {
    authors: ["Haddadian, G."],
    year: "2024",
    title: "Comparing the Effects of Teacher Feedback, Automated Feedback, and Integrative Feedback on EFL Learners' Writing Accuracy and Writing Apprehension",
    journal: "Computer-Assisted Language Learning Electronic Journal",
    volume: "25(3)",
    pages: "124-147",
    keywords: ["Feedback", "EFL", "Writing", "Automated Assessment"]
  },
  {
    authors: ["Haddadian, G.", "Mahmoodi-Bakhtiari, B."],
    year: "2018",
    title: "Conversational Repairs in Persian Dramatic Discourse: Akbar Radi's Pellekân (The Steps)",
    journal: "Persian Literary Studies Journal",
    volume: "7(11)",
    pages: "65-82",
    keywords: ["Conversation Analysis", "Persian Literature", "Discourse"]
  },
];

export const conferenceProceedings: ConferenceProceeding[] = [
  {
    authors: ["Noroozi, O.", "Haddadian, G.", "Gao, X.", "Schunn, C. D.", "Alqassab, M.", "Banihashem, S. K."],
    year: "Accepted",
    title: "Supporting peer feedback provision and uptake with GenAI",
    conference: "International Conference of the Learning Sciences – ICLS/ISLS 2025",
    keywords: ["Peer Feedback", "GenAI", "Learning Sciences"]
  },
  {
    authors: ["Haddadian, G.", "Han, H.", "Kim, M. Kim, J.", "Bae, Y."],
    year: "Accepted",
    title: "Automated Generation of Expert Models with Generative AI",
    conference: "International Conference of the Learning Sciences – ICLS/ISLS 2025"
  },
  {
    authors: ["Haddadian, G.", "Panzade, P.", "Takabi, D.", "Kim, M. K."],
    year: "2024",
    title: "Evaluating Private Artificial Intelligence (AI) Curriculum in Computer Science (CS) Education: Insights for Advancing Student-Centered CS Learning",
    conference: "In Proceedings of the 18th International Conference of the Learning Sciences-ICLS 2024",
    pages: "2271-2272",
    publisher: "International Society of the Learning Sciences"
  },
  {
    authors: ["Haddadian, G.", "Haddadian, N."],
    year: "2024",
    title: "An Investigation of ELT Teachers' Online Self-efficacy: Does Teachers' Level of Agency Matter?",
    conference: "In J. Cohen & G. Solano (Eds.), Proceedings of Society for Information Technology & Teacher Education International Conference",
    pages: "1607-1615",
    publisher: "Las Vegas, Nevada, United States: Association for the Advancement of Computing in Education (AACE)"
  },
  {
    authors: ["Daneshvar Ghorbani, B.", "Haddadian, G."],
    year: "2024",
    title: "The Impact of AI-Enabled Personalized Recommendations on L2 Learners' Engagement, Motivation, and Learning Outcomes",
    conference: "AIRiAL 2024 Conference, Teachers College, Columbia University"
  },
  {
    authors: ["Kim, J.", "Haddadian, G.", "Kim, M."],
    year: "2023",
    title: "An investigation of knowledge-based AI vs. human evaluation in academic summary evaluation: Similarities, dissimilarities, and being toward mutual understandings",
    conference: "In Blikstein, P., Van Aalst, J., Kizito, R., & Brennan, K. (Eds.). Proceedings of the 17th International Conference of the Learning Sciences - ICLS 2023",
    pages: "994-997",
    publisher: "Montreal, Canada: International Society of the Learning Sciences"
  },
  {
    authors: ["Haddadian, G.", "Takabi, D.", "Panzade, P.", "Kim, M."],
    year: "2023",
    title: "A Design Study of Problem-Centered Instruction (PCI) for Private Artificial Intelligence (AI) Curriculum Development",
    conference: "2023 Association for Educational Communications and Technology (AECT) Conference, Orlando, FL"
  },
  {
    authors: ["Haddadian, G.", "Bae, Y.", "Kim, J.", "Kim, M."],
    year: "2023",
    title: "A Comprehensive Model of AI Literacy from a Developmental Perspective",
    conference: "2023 Association for Educational Communications and Technology (AECT) Conference, Orlando, FL"
  },
  {
    authors: ["Kim, M.", "Kim, N.", "Haddadian, G.", "Heidari, A."],
    year: "2023",
    title: "A test of learning progress models using an AI-enabled knowledge representation system",
    conference: "In Blikstein, P., Van Aalst, J., Kizito, R., & Brennan, K. (Eds.). Proceedings of the 17th International Conference of the Learning Sciences - ICLS 2023",
    pages: "986-989",
    publisher: "Montreal, Canada: International Society of the Learning Sciences"
  },
  {
    authors: ["Bae, Y.", "Kim, J.", "Haddadian, G.", "Davis, A.", "Kim, M."],
    year: "2023",
    title: "The impact of an AI-based educational tool, with a focus on technology acceptance and metacognitive awareness of adult learners",
    conference: "2023 Association for Educational Communications and Technology (AECT) Conference, Orlando, FL"
  },
  {
    authors: ["Kim, J.", "Bae, Y.", "Haddadian, G.", "Kim, M."],
    year: "2023",
    title: "Leveraging machine learning to automatically evaluate cognitive engagement in asynchronous online discussions",
    conference: "2023 Association for Educational Communications and Technology (AECT) Conference, Orlando, FL"
  },
  {
    authors: ["Kim, J.", "Bae, Y.", "Haddadian, G.", "Morris, W.", "Crossely, S.", "Holmes, L.", "Stravelakis, J.", "Kim, M."],
    year: "2023",
    title: "AI-augmented summarization: Impact on online adult learners' concept learning, discussion quality, and achievement",
    conference: "2023 Association for Educational Communications and Technology (AECT) Conference, Orlando, FL"
  },
  {
    authors: ["Radmanesh, S.", "Haddadian, G."],
    year: "2020",
    title: "The Effect of Using Mind Mapping on Iranian EFL Learners' Self-efficacy in Vocabulary Learning",
    conference: "WEI International Academic Conference on Education, Teaching, and Learning (WEI-ETL-Barcelona), Barcelona, Spain, February 2020"
  },
  {
    authors: ["Haddadian, G.", "Salehi, Mohammad"],
    year: "2015",
    title: "Design and Development of a Computer-Adaptive Prototype to Measure Written Receptive Vocabulary Knowledge of English Language Learners",
    conference: "Thesis. Sharif University of Technology, Tehran, Iran, 2014"
  },
];

export const nonRefereedPublications: NonRefereedPublication[] = [
  {
    authors: ["Masoumi, V.", "Salehi, Mostafa", "Veisi, H.", "Haddadian, G.", "Ranjbar, V.", "Sahebdel, M."],
    year: "2020",
    title: "TeleCrowd: A Crowdsourcing Approach to Create Informal to Formal Text Corpora",
    journal: "arXiv preprint arXiv:2004.11771",
    keywords: ["Crowdsourcing", "NLP", "Text Corpora"]
  }
];

export const workUnderReview: WorkUnderReview[] = [
  {
    authors: ["Haddadian, G.", "Haddadian, M."],
    year: "In revision",
    title: "Learners' Collaboration in Using AI-generated Feedback, Argumentative Writing, and Writing Self-efficacy: Effects and Precepts",
    journal: "Computer Assisted Language Learning",
    keywords: ["AI Feedback", "Writing", "Collaboration"]
  },
  {
    authors: ["Noroozi, O.", "Haddadian, G.", "Banihashem, K.", "Schunn, C, Alqassab, M."],
    year: "In revision",
    title: "The Scaffolding Value of GenAI during Peer Feedback Provision and Uptake: Student Perceptions and Actual Impacts",
    journal: "International Journal of Educational Technology in Higher Education"
  },
  {
    authors: ["Mashhadi, F.", "Haddadian, G.", "Kavoshian, S.", "Heidari, F."],
    year: "Under Review",
    title: "Promoting EFL Teachers' Self-Directed Professional Development through Collaborative Action Research in a Networked Community of Shared Knowledge",
    journal: "Journal of Language and Education"
  },
  {
    authors: ["Kavoshian, S.", "Mashhadi, F.", "Haddadian, G."],
    year: "Under Review",
    title: "Exploring Classroom Interactions in Iranian EFL Classrooms",
    journal: "International Journal of Language Studies"
  }
];

export const workInProgress: WorkInProgress[] = [
  {
    authors: ["Haddadian, G.", "Kim, M.", "Haddadian, N."],
    type: "Journal Article",
    title: "A Systematic Review of Automated Writing Evaluation in Argumentative Writing for English as Foreign Language Education",
    keywords: ["Systematic Review", "AWE", "EFL", "Argumentative Writing"]
  },
  {
    authors: ["Haddadian, G.", "Kim, M."],
    type: "Journal Article",
    title: "Real-time Intelligent Technology for Argumentative Writing (RITA): A Design-Based Research"
  },
  {
    authors: ["Alqassab, M.", "Noroozi, O.", "Haddadian, G.", "Banihashem, K.", "Schunn, C."],
    type: "Book Chapter",
    title: "Text-based Generative AI to Facilitate Peer Feedback: Pedagogical Opportunities and Challenges"
  },
  {
    authors: ["Han, H.", "Haddadian, G.", "Kim, M. Kim, J.", "Bae, Y."],
    type: "Journal Article",
    title: "Students' Plagiarism Behaviors within AI-Enabled Introductory Physics Courses"
  },
  {
    authors: ["Han, H.", "Kim, M. Haddadian, G."],
    type: "Journal Article",
    title: "Generative AI for the Automated Construction and Evaluation of Expert Models in Physics Course"
  },
  {
    authors: ["Heidari, A.", "Kim, M.", "Kim, J.", "Bae, Y.", "Haddadian, G."],
    type: "Journal Article",
    title: "Examining Learner's Evaluative Judgment Supported by Technology-Enabled Feedback Information"
  }
];
