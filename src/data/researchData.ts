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
    period: "Aug 2024 – Aug 2025",
    funding: "Funded by the National Science Foundation (NSF)",
    description: "This project designs and implements AI-augmented formative assessment and feedback systems to help students build skills for in-classroom interactive problem-solving activities. The aim is to determine whether AI in education improves students' well-being inside and outside the classroom, with a focus on those traditionally underrepresented in STEM education. Extensive data collected in the final phase will examine the relationships among pre-classroom activities, in-classroom performance, self-efficacy, interest in physics, and student backgrounds, including gender, race, ethnicity, first-generation status, and English language learning."
  },
];

export const journalPublications: JournalPublication[] = [
  {
    authors: ["Haddadian, G.", "Kim, M. K.", "Haddadian, N."],
    year: "2025",
    title: "A Systematic Review of Automated Writing Evaluation Tools in Argumentative Writing for English as Foreign Language Education",
    journal: "Research Synthesis in Applied Linguistics",
    pages: "1-51",
    url: "https://doi.org/10.1080/29984475.2025.2598266",
    keywords: ["Systematic Review", "AWE", "Argumentative Writing", "EFL"]
  },
  {
    authors: ["Noroozi, O.", "Haddadian, G.", "Gao, X.", "Schunn, C.", "Alqassab, M.", "Banihashem, S. K."],
    year: "2025",
    title: "The value of GenAI for peer feedback provision: student perceptions and impacts",
    journal: "International Journal of Educational Technology in Higher Education",
    volume: "22(1)",
    pages: "61",
    url: "https://doi.org/10.1186/s41239-025-00558-6",
    keywords: ["GenAI", "Peer Feedback", "Higher Education"]
  },
  {
    authors: ["Haddadian, G.", "Panzade, P.", "Takabi, D.", "Kim, M. K."],
    year: "2025",
    title: "Problem-centered post-secondary computer science education: A study of the private artificial intelligence curriculum",
    journal: "International Journal of Technology in Education (IJTE)",
    volume: "8(2)",
    pages: "1-26",
    url: "https://doi.org/10.46328/ijte.1071",
    keywords: ["CS Education", "AI Curriculum", "Problem-Centered Instruction"]
  },
  {
    authors: ["Haddadian, G.", "Radmanesh, S.", "Haddadian, N."],
    year: "2024",
    title: "Construction and validation of a Computerized Formative Assessment Literacy (CFAL) questionnaire for language teachers: An exploratory sequential mixed-methods investigation",
    journal: "Language Testing in Asia",
    volume: "14(33)",
    url: "https://doi.org/10.1186/s40468-024-00303-2",
    keywords: ["Assessment", "Language Teaching", "Mixed Methods"]
  },
  {
    authors: ["Haddadian, G.", "Haddadian, N."],
    year: "2024",
    title: "Innovative Use of Grammarly Feedback for Improving EFL Learners' Speaking: Learners' Perceptions and Transformative Engagement Experiences in Focus",
    journal: "The Journal of Applied Instructional Design",
    volume: "13(2)",
    url: "https://doi.org/10.59668/1269.15640",
    keywords: ["EFL", "Feedback", "Grammarly", "Speaking"]
  },
  {
    authors: ["Haddadian, G."],
    year: "2024",
    title: "Comparing the Effects of Teacher Feedback, Automated Feedback, and Integrative Feedback on EFL Learners' Writing Accuracy and Writing Apprehension",
    journal: "Computer-Assisted Language Learning Electronic Journal",
    volume: "25(3)",
    pages: "124-147",
    url: "https://callej.org/index.php/journal/article/view/436",
    keywords: ["Feedback", "EFL", "Writing", "Automated Assessment"]
  },
  {
    authors: ["Haddadian, G.", "Mahmoodi-Bakhtiari, B."],
    year: "2018",
    title: "Conversational Repairs in Persian Dramatic Discourse: Akbar Radi's Pellekân (The Steps)",
    journal: "Persian Literary Studies Journal",
    volume: "7(11)",
    pages: "65-82",
    url: "http://doi.org/10.22099/jps.2019.31124.1088",
    keywords: ["Conversation Analysis", "Persian Literature", "Discourse"]
  },
];

export const conferenceProceedings: ConferenceProceeding[] = [
  {
    authors: ["Haddadian, G.", "Haddadian, N.", "Soleimani, S."],
    year: "Accepted, 2026",
    title: "Comparing the Effects of AI-generated and Teacher-delivered Formative Assessment on EFL Learners' Writing Performance and Writing Self-Efficacy",
    conference: "AIRiAL 2026 Conference, Teachers College, Columbia University, New York, NY, United States",
    keywords: ["AI Feedback", "Formative Assessment", "EFL", "Writing Self-Efficacy"]
  },
  {
    authors: ["Cohen, J. D.", "O'Reilly, T.", "Magliano, J.", "Haddadian, G.", "Dobar, E. B.", "Ari, O.", "Tinker Sachs, G.", "Sabatini, J."],
    year: "Accepted, 2026",
    title: "Scenario-based learning and assessment design principles for the AI age",
    conference: "International Conference on Education and New Learning Technologies (EDULEARN), Palma de Mallorca, Spain",
    keywords: ["Scenario-Based Learning", "Assessment", "AI"]
  },
  {
    authors: ["Dobar, E. B.", "Haddadian, G.", "Ari, O.", "Cohen, J. D.", "Tinker Sachs, G.", "Magliano, J."],
    year: "Accepted, 2026",
    title: "Navigating complexity in interdisciplinary problem solving: Insights from a scenario-based assessment",
    conference: "International Conference on Education and New Learning Technologies (EDULEARN), Palma de Mallorca, Spain",
    keywords: ["Interdisciplinary", "Problem Solving", "Assessment"]
  },
  {
    authors: ["Cohen, J. D.", "Sabatini, J.", "Haddadian, G.", "O'Reilly, T.", "Pierce, B.", "Magliano, J."],
    year: "Accepted, 2026",
    title: "Developing Authentic Learning and Assessment Through Scenarios",
    conference: "Proceedings of EdMedia 2026 Edinburgh (pp. 1716-1717), Waynesville, NC: Association for the Advancement of Computing in Education (AACE)",
    url: "https://www.learntechlib.org/primary/p/2129763/",
    keywords: ["Authentic Learning", "Assessment", "Scenarios"]
  },
  {
    authors: ["de Kleijn, R.", "Brouwer, R.", "Haddadian, G.", "van den Beemt, A.", "Noroozi, O."],
    year: "Accepted, 2026",
    title: "Peer, AI, and teacher feedback: Features, perceptions and uptake",
    conference: "EARLI SIG 1 Conference 2026, Utrecht, The Netherlands",
    keywords: ["Peer Feedback", "AI Feedback", "Teacher Feedback"]
  },
  {
    authors: ["Malcolm, B.", "Vickery, M.", "Louis-Strakes Lopez, J.", "Siciliano, L. M.", "Simon, S.", "Xing, G. (Y.)", "Kim, J.", "Kim, C.", "Zhao, Y.", "Desai, A.", "Gadong, E. S.", "Mabadeje, Y.", "Mhungu, B.", "Haddadian, G.", "Eloy, A.", "Soodhani, N.", "Prasad, R.", "Bae, Y."],
    year: "Accepted, 2026",
    title: "Fostering educational intimacy: ILSSA intergenerational partnerships for purposeful community building",
    conference: "International Society of the Learning Sciences (ISLS)",
    keywords: ["ILSSA", "Community", "Learning Sciences"]
  },
  {
    authors: ["Noroozi, O.", "Haddadian, G.", "Banihashem, K.", "Schunn, C."],
    year: "2026",
    title: "How students perceive and respond to GenAI for peer feedback uptake",
    conference: "American Educational Research Association (AERA) Annual Meeting, Los Angeles, CA",
    keywords: ["GenAI", "Peer Feedback", "AERA"]
  },
  {
    authors: ["Haddadian, G.", "Kim, M. K.", "Haddadian, N."],
    year: "2026",
    title: "Synthesizing Research on Automated Writing Evaluation Tools in EFL Argumentative Writing Context",
    conference: "American Association for Applied Linguistics (AAAL), Chicago, IL, United States",
    url: "https://www.xcdsystem.com/aaal/program/PK9HOeH/index.cfm?pgid=451",
    keywords: ["AWE", "EFL", "Argumentative Writing"]
  },
  {
    authors: ["Motevali, S.", "Haddadian, G.", "Desai, P.", "Seelam, N.", "Kim, M. K."],
    year: "2026",
    title: "The potential of artificial intelligence for automated scoring of argumentative essays",
    conference: "American Association for Applied Linguistics (AAAL), Chicago, IL, United States",
    url: "https://www.xcdsystem.com/aaal/program/PK9HOeH/index.cfm?pgid=451",
    keywords: ["AI", "Automated Scoring", "Argumentative Writing"]
  },
  {
    authors: ["Haddadian, N.", "Haddadian, G.", "Haddadian, M."],
    year: "2026",
    title: "Collaborative use of AI-generated feedback in EFL argumentative writing: Impacts on writing quality and self-efficacy",
    conference: "American Association for Applied Linguistics (AAAL), Chicago, IL, United States",
    url: "https://www.xcdsystem.com/aaal/program/PK9HOeH/index.cfm?pgid=451",
    keywords: ["AI Feedback", "EFL", "Writing", "Self-efficacy"]
  },
  {
    authors: ["Greisel, M.", "Hornstein, J.", "Kollar, I.", "Noroozi, O.", "Haddadian, G.", "Gao, X.", "Alqassab, M.", "Banihashem, K.", "Khosravi, H.", "Pozdniakov, S.", "Schunn, C. D.", "Yu, Q.", "Rummel, N."],
    year: "2025",
    title: "Enhancing Peer Feedback Practices With Generative AI",
    conference: "In Oshima, J., Chen, B., Vogel, F., & Järvelä, J. (Eds.), Proceedings of the 18th International Conference on Computer-Supported Collaborative Learning - CSCL 2025",
    pages: "490-498",
    publisher: "International Society of the Learning Sciences",
    url: "https://doi.org/10.22318/cscl2025.921873",
    keywords: ["Peer Feedback", "GenAI", "CSCL"]
  },
  {
    authors: ["Haddadian, G.", "Han, H.", "Kim, J.", "Abdeen, M. S.", "Kim, M. K."],
    year: "2025",
    title: "Exploring AI-Generated Expert Models: Instructor Interaction and Learner Perceptions in a Physics Class",
    conference: "In Rajala, A., Cortez, A., Hofmann, R., Jornet, A., Lotz-Sisitka, H., & Markauskaite, L. (Eds.), Proceedings of the 19th International Conference of the Learning Sciences - ICLS 2025",
    pages: "1684-1688",
    publisher: "International Society of the Learning Sciences",
    url: "https://doi.org/10.22318/icls2025.213524",
    keywords: ["AI", "Expert Models", "Physics Education"]
  },
  {
    authors: ["Haddadian, G.", "Panzade, P.", "Takabi, D.", "Kim, M. K."],
    year: "2024",
    title: "Evaluating Private Artificial Intelligence (AI) Curriculum in Computer Science (CS) Education: Insights for Advancing Student-Centered CS Learning",
    conference: "Proceedings of the 18th International Conference of the Learning Sciences - ICLS 2024",
    pages: "2271-2272",
    publisher: "International Society of the Learning Sciences",
    url: "https://doi.org/10.22318/icls2024.141269"
  },
  {
    authors: ["Haddadian, G.", "Haddadian, N."],
    year: "2024",
    title: "An Investigation of ELT Teachers' Online Self-efficacy: Does Teachers' Level of Agency Matter?",
    conference: "Proceedings of Society for Information Technology & Teacher Education International Conference",
    pages: "1607-1615",
    publisher: "Las Vegas, Nevada, United States: Association for the Advancement of Computing in Education (AACE)",
    url: "https://www.learntechlib.org/primary/p/224179/"
  },
  {
    authors: ["Daneshvar Ghorbani, B.", "Haddadian, G."],
    year: "2024",
    title: "The Impact of AI-Enabled Personalized Recommendations on L2 Learners' Engagement, Motivation, and Learning Outcomes",
    conference: "AIRiAL 2024 Conference, Teachers College, Columbia University"
  },
  {
    authors: ["Kim, J.", "Haddadian, G.", "Kim, M. K."],
    year: "2023",
    title: "An investigation of knowledge-based AI vs. human evaluation in the context of academic summary evaluation: Similarities, dissimilarities, and being toward mutual understandings",
    conference: "Proceedings of the 17th International Conference of the Learning Sciences - ICLS 2023",
    pages: "994-997",
    publisher: "International Society of the Learning Sciences",
    url: "https://doi.org/10.22318/icls2023.633243"
  },
  {
    authors: ["Haddadian, G.", "Takabi, D.", "Panzade, P.", "Kim, M."],
    year: "2023",
    title: "A Design Study of Problem-Centered Instruction (PCI) for Private Artificial Intelligence (AI) Curriculum Development",
    conference: "2023 Association for Educational Communications and Technology (AECT) Conference, Orlando, FL",
    url: "https://par.nsf.gov/servlets/purl/10582484"
  },
  {
    authors: ["Kim, M. K.", "Kim, N. J.", "Haddadian, G.", "Heidari, A."],
    year: "2023",
    title: "A test of learning progress models using an AI-enabled knowledge representation system",
    conference: "Proceedings of the 17th International Conference of the Learning Sciences - ICLS 2023",
    pages: "986-989",
    publisher: "International Society of the Learning Sciences",
    url: "https://doi.org/10.22318/icls2023.200138"
  },
  {
    authors: ["Haddadian, G.", "Bae, Y.", "Kim, J.", "Kim, M."],
    year: "2023",
    title: "A Comprehensive Model of AI Literacy from a Developmental Perspective",
    conference: "2023 Association for Educational Communications and Technology (AECT) Conference, Orlando, FL"
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
];

export const otherPresentations: NonRefereedPublication[] = [
  {
    authors: ["Niloy, A. C.", "Haddadian, G.", "Kim, M. K."],
    year: "2026",
    title: "The Moving Target Problem in AI Text Detection: Evidence From Chatbot and Detector Version Changes",
    journal: "External Advisory Board Meeting, The National AI Institute for Adult Learning and Online Education (AI-ALOE), May 15, Atlanta, Georgia [Format: Poster]",
    keywords: ["AI Detection", "Chatbots"]
  },
  {
    authors: ["Haddadian, G.", "Kim, M. K.", "Haddadian, N."],
    year: "2025",
    title: "Synthesizing Research on Automated Writing Evaluation Tools in EFL Argumentative Writing Context",
    journal: "External Advisory Board meeting, The National AI Institute for Adult Learning and Online Education (AI-ALOE), May 16, Atlanta, Georgia [Format: Poster]",
    keywords: ["AWE", "EFL"]
  },
  {
    authors: ["Haddadian, G.", "Kim, M. K.", "Haddadian, N."],
    year: "2025",
    title: "Automated Writing Evaluation in Foreign Language Education: A Systematic Review in Argumentative Writing",
    journal: "American Association for Applied Linguistics (AAAL): The Multilingual Matters Graduate Research Roundtable, March 21, Denver, Colorado [Format: Article in progress]",
    keywords: ["AWE", "AAAL"]
  },
  {
    authors: ["Radmanesh, S.", "Haddadian, G."],
    year: "2020",
    title: "The Effect of Using Mind Mapping on Iranian EFL Learners' Self-efficacy in Vocabulary Learning",
    journal: "WEI International Academic Conference on Education, Teaching, and Learning (WEI-ETL-Barcelona), Barcelona, Spain, February 2020 [Format: Full paper]"
  },
  {
    authors: ["Haddadian, G.", "Salehi, Mohammad"],
    year: "2015",
    title: "Design and Development of a Computer-Adaptive Prototype to Measure Written Receptive Vocabulary Knowledge of English Language Learners",
    journal: "English Language Teaching (ELT) Conference at Sharif University of Technology, Tehran, Iran, 2014 [Format: short paper]"
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
    year: "Under Review",
    title: "Learners' Collaboration in Using AI-generated Feedback, Argumentative Writing, and Writing Self-efficacy: Effects and Precepts",
    journal: "Computer Assisted Language Learning",
    keywords: ["AI Feedback", "Writing", "Collaboration"]
  },
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
    authors: ["Han, H.", "Haddadian, G.", "Kim, M.", "Kim, J.", "Bae, Y."],
    type: "Journal Article",
    title: "Students' Plagiarism Behaviors within AI-Enabled Introductory Physics Courses"
  },
  {
    authors: ["Han, H.", "Kim, M.", "Haddadian, G."],
    type: "Journal Article",
    title: "Generative AI for the Automated Construction and Evaluation of Expert Models in Physics Course"
  },
  {
    authors: ["Heidari, A.", "Kim, M.", "Kim, J.", "Bae, Y.", "Haddadian, G."],
    type: "Journal Article",
    title: "Examining Learner's Evaluative Judgment Supported by Technology-Enabled Feedback Information"
  }
];
