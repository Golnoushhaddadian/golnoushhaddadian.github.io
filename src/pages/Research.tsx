
import React, { useState } from 'react';
import { useDocumentHead } from '@/hooks/useDocumentHead';
import { Link } from 'react-router-dom';
import { ExternalLink, FileText, Quote, Copy, Check } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { motion } from 'framer-motion';

import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

type Publication = {
  title: string;
  authors: string;
  venue: string;
  year: number;
  doi?: string;
  pdf?: string;
  apa?: string;
};

const journalPublications: Publication[] = [
  {
    title: "Agentic LLM-driven loss function search: Decomposing exploration and exploitation in closed-loop discovery",
    authors: "Khajooeinejad, A., Chapariniya, M., Motevali, S., & Haddadian, G.",
    venue: "4th IEEE International Conference on Artificial Intelligence, Blockchain, and Internet of Things (AIBThings), Mount Pleasant, MI, United States",
    year: 2026,
    apa: "Khajooeinejad, A., Chapariniya, M., Motevali, S., & Haddadian, G. (2026, September 5–6). Agentic LLM-driven loss function search: Decomposing exploration and exploitation in closed-loop discovery [Paper presentation]. 4th IEEE International Conference on Artificial Intelligence, Blockchain, and Internet of Things (AIBThings), Mount Pleasant, MI, United States.",
  },
  {
    title: "Trustless multi-agent AI: Blockchain-based coordination for LLM agents",
    authors: "Khajooeinejad, A., Haddadian, G., Chapariniya, M., & Motevali, S.",
    venue: "4th IEEE International Conference on Artificial Intelligence, Blockchain, and Internet of Things (AIBThings), Mount Pleasant, MI, United States",
    year: 2026,
    apa: "Khajooeinejad, A., Haddadian, G., Chapariniya, M., & Motevali, S. (2026, September 5–6). Trustless multi-agent AI: Blockchain-based coordination for LLM agents [Paper presentation]. 4th IEEE International Conference on Artificial Intelligence, Blockchain, and Internet of Things (AIBThings), Mount Pleasant, MI, United States.",
  },
  {
    title: "The value of GenAI for peer feedback provision: Student perceptions and impacts",
    authors: "Noroozi, O., Haddadian, G., Gao, X., Schunn, C., Alqassab, M., & Banihashem, S. K.",
    venue: "International Journal of Educational Technology in Higher Education, 22(1), 61",
    year: 2025,
    doi: "https://doi.org/10.1186/s41239-025-00558-6",
    apa: "Noroozi, O., Haddadian, G., Gao, X., Schunn, C., Alqassab, M., & Banihashem, S. K. (2025). The value of GenAI for peer feedback provision: Student perceptions and impacts. International Journal of Educational Technology in Higher Education, 22(1), 61.",
  },
  {
    title: "Problem-centered post-secondary computer science education: A study of the private artificial intelligence curriculum",
    authors: "Haddadian, G., Panzade, P., Takabi, D., & Kim, M. K.",
    venue: "International Journal of Technology in Education (IJTE), 8(2), 1-26",
    year: 2025,
    doi: "https://doi.org/10.46328/ijte.1071",
    apa: "Haddadian, G., Panzade, P., Takabi, D., & Kim, M. K. (2025). Problem-centered post-secondary computer science education: A study of the private artificial intelligence curriculum. International Journal of Technology in Education (IJTE), 8(2), 1-26.",
  },
  {
    title: "Construction and validation of a Computerized Formative Assessment Literacy (CFAL) questionnaire for language teachers: An exploratory sequential mixed-methods investigation",
    authors: "Haddadian, G., Radmanesh, S., & Haddadian, N.",
    venue: "Language Testing in Asia, 14(33)",
    year: 2024,
    doi: "https://doi.org/10.1186/s40468-024-00303-2",
    apa: "Haddadian, G., Radmanesh, S., & Haddadian, N. (2024). Construction and validation of a Computerized Formative Assessment Literacy (CFAL) questionnaire for language teachers: An exploratory sequential mixed-methods investigation. Language Testing in Asia, 14(33).",
  },
  {
    title: "Innovative Use of Grammarly Feedback for Improving EFL Learners' Speaking: Learners' Perceptions and Transformative Engagement Experiences in Focus",
    authors: "Haddadian, G., & Haddadian, N.",
    venue: "The Journal of Applied Instructional Design, 13(2)",
    year: 2024,
    doi: "https://doi.org/10.59668/1269.15640",
    apa: "Haddadian, G., & Haddadian, N. (2024). Innovative Use of Grammarly Feedback for Improving EFL Learners' Speaking: Learners' Perceptions and Transformative Engagement Experiences in Focus. The Journal of Applied Instructional Design, 13(2).",
  },
  {
    title: "Comparing the Effects of Teacher Feedback, Automated Feedback, and Integrative Feedback on EFL Learners' Writing Accuracy and Writing Apprehension",
    authors: "Haddadian, G.",
    venue: "Computer-Assisted Language Learning Electronic Journal, 25(3), 124-147",
    year: 2024,
    doi: "https://callej.org/index.php/journal/article/view/436",
    apa: "Haddadian, G. (2024). Comparing the Effects of Teacher Feedback, Automated Feedback, and Integrative Feedback on EFL Learners' Writing Accuracy and Writing Apprehension. Computer-Assisted Language Learning Electronic Journal, 25(3), 124-147.",
  },
  {
    title: "Conversational Repairs in Persian Dramatic Discourse: Akbar Radi's Pellekan (The Steps)",
    authors: "Haddadian, G., & Mahmoodi-Bakhtiari, B.",
    venue: "Persian Literary Studies Journal, 7(11), 65-82",
    year: 2018,
    doi: "https://doi.org/10.22099/jps.2019.31124.1088",
    apa: "Haddadian, G., & Mahmoodi-Bakhtiari, B. (2018). Conversational Repairs in Persian Dramatic Discourse: Akbar Radi's Pellekan (The Steps). Persian Literary Studies Journal, 7(11), 65-82.",
  },
  {
    title: "Comparing the effects of AI-generated and teacher-delivered formative assessment on EFL learners' writing performance and writing self-efficacy",
    authors: "Haddadian, G., Haddadian, N., & Soleimani, S.",
    venue: "AIRiAL 2026 Conference, Teachers College, Columbia University, New York, NY, United States (Accepted)",
    year: 2026,
    apa: "Haddadian, G., Haddadian, N., & Soleimani, S. (Accepted, 2026). Comparing the effects of AI-generated and teacher-delivered formative assessment on EFL learners' writing performance and writing self-efficacy. Paper presented at AIRiAL 2026 Conference, Teachers College, Columbia University, New York, NY, United States.",
  },
  {
    title: "A Systematic Review of Automated Writing Evaluation Tools in Argumentative Writing for English as Foreign Language Education",
    authors: "Haddadian, G., Kim, M. K., & Haddadian, N.",
    venue: "Research Synthesis in Applied Linguistics, 1-51",
    year: 2026,
    doi: "https://doi.org/10.1080/29984475.2025.2598266",
    apa: "Haddadian, G., Kim, M. K., & Haddadian, N. (2026). A Systematic Review of Automated Writing Evaluation Tools in Argumentative Writing for English as Foreign Language Education. Research Synthesis in Applied Linguistics, 1-51.",
  },
  {
    title: "Navigating complexity in interdisciplinary problem solving: Insights from a scenario-based assessment",
    authors: "Dobar, E. B., Haddadian, G., Ari, O., Cohen, J. D., Tinker-Sachs, G., & Magliano, J. P.",
    venue: "EDULEARN26 Proceedings, Article 1668",
    year: 2026,
    doi: "https://doi.org/10.21125/edulearn.2026.1668",
    apa: "Dobar, E. B., Haddadian, G., Ari, O., Cohen, J. D., Tinker-Sachs, G., & Magliano, J. P. (2026). Navigating complexity in interdisciplinary problem solving: Insights from a scenario-based assessment. EDULEARN26 Proceedings, Article 1668.",
  },
  {
    title: "Scenario-based learning and assessment design principles for the AI age",
    authors: "Cohen, J. D., O'Reilly, T., Magliano, J. P., Haddadian, G., Dobar, E. B., Ari, O., Tinker-Sachs, G., & Sabatini, J.",
    venue: "EDULEARN26 Proceedings, Article 1753",
    year: 2026,
    doi: "https://doi.org/10.21125/edulearn.2026.1753",
    apa: "Cohen, J. D., O'Reilly, T., Magliano, J. P., Haddadian, G., Dobar, E. B., Ari, O., Tinker-Sachs, G., & Sabatini, J. (2026). Scenario-based learning and assessment design principles for the AI age. EDULEARN26 Proceedings, Article 1753.",
  },
  {
    title: "Developing Authentic Learning and Assessment Through Scenarios",
    authors: "Cohen, J. D., Sabatini, J., Haddadian, G., O'Reilly, T., Pierce, B., & Magliano, J.",
    venue: "Proceedings of EdMedia 2026 Edinburgh (pp. 1716-1717). Association for the Advancement of Computing in Education (AACE)",
    year: 2026,
    doi: "https://www.learntechlib.org/primary/p/2129763/",
    apa: "Cohen, J. D., Sabatini, J., Haddadian, G., O'Reilly, T., Pierce, B., & Magliano, J. (2026). Developing Authentic Learning and Assessment Through Scenarios. In Proceedings of EdMedia 2026 Edinburgh (pp. 1716-1717). Waynesville, NC: Association for the Advancement of Computing in Education (AACE).",
  },
  {
    title: "Fostering educational intimacy: ILSSA intergenerational partnerships for purposeful community building",
    authors: "Malcolm, B., Vickery, M., Louis-Strakes Lopez, J., Siciliano, L. M., Simon, S., Xing, G. (Y.), Kim, J., Kim, C., Zhao, Y., Desai, A., Gadong, E. S., Mabadeje, Y., Mhungu, B., Haddadian, G., Eloy, A., Soodhani, N., Prasad, R., & Bae, Y.",
    venue: "International Society of the Learning Sciences (ISLS)",
    year: 2026,
    apa: "Malcolm, B., Vickery, M., Louis-Strakes Lopez, J., Siciliano, L. M., Simon, S., Xing, G. (Y.), Kim, J., Kim, C., Zhao, Y., Desai, A., Gadong, E. S., Mabadeje, Y., Mhungu, B., Haddadian, G., Eloy, A., Soodhani, N., Prasad, R., & Bae, Y. (2026). Fostering educational intimacy: ILSSA intergenerational partnerships for purposeful community building. Session presented at the International Society of the Learning Sciences (ISLS).",
  },
  {
    title: "Peer, AI, and teacher feedback: Features, perceptions and uptake",
    authors: "de Kleijn, R., Brouwer, R., Haddadian, G., van den Beemt, A., & Noroozi, O.",
    venue: "EARLI SIG 1 Conference 2026, Utrecht, The Netherlands",
    year: 2026,
    apa: "de Kleijn, R., Brouwer, R., Haddadian, G., van den Beemt, A., & Noroozi, O. (2026). Peer, AI, and teacher feedback: Features, perceptions and uptake. EARLI SIG 1 Conference 2026, Utrecht, The Netherlands.",
  },
  {
    title: "How students perceive and respond to GenAI for peer feedback uptake",
    authors: "Noroozi, O., Haddadian, G., Banihashem, K., & Schunn, C.",
    venue: "American Educational Research Association (AERA) Annual Meeting, Los Angeles, CA, United States",
    year: 2026,
    apa: "Noroozi, O., Haddadian, G., Banihashem, K., & Schunn, C. (2026). How students perceive and respond to GenAI for peer feedback uptake. In Understanding and supporting feedback uptake: Bridging research and practice in educational contexts. American Educational Research Association (AERA) Annual Meeting, Los Angeles, CA, United States.",
  },
  {
    title: "Synthesizing Research on Automated Writing Evaluation Tools in EFL Argumentative Writing Context",
    authors: "Haddadian, G., Kim, M. K., & Haddadian, N.",
    venue: "American Association for Applied Linguistics (AAAL), Chicago, IL, United States",
    year: 2026,
    doi: "https://www.xcdsystem.com/aaal/program/PK9HOeH/index.cfm?pgid=451",
    apa: "Haddadian, G., Kim, M. K., & Haddadian, N. (2026). Synthesizing Research on Automated Writing Evaluation Tools in EFL Argumentative Writing Context. American Association for Applied Linguistics (AAAL), Chicago, IL, United States.",
  },
  {
    title: "The potential of artificial intelligence for automated scoring of argumentative essays",
    authors: "Motevali, S., Haddadian, G., Desai, P., Seelam, N., & Kim, M. K.",
    venue: "American Association for Applied Linguistics (AAAL), Chicago, IL, United States",
    year: 2026,
    apa: "Motevali, S., Haddadian, G., Desai, P., Seelam, N., & Kim, M. K. (2026). The potential of artificial intelligence for automated scoring of argumentative essays. American Association for Applied Linguistics (AAAL), Chicago, IL, United States.",
  },
  {
    title: "Collaborative use of AI-generated feedback in EFL argumentative writing: Impacts on writing quality and self-efficacy",
    authors: "Haddadian, N., Haddadian, G., & Haddadian, M.",
    venue: "American Association for Applied Linguistics (AAAL), Chicago, IL, United States",
    year: 2026,
    apa: "Haddadian, N., Haddadian, G., & Haddadian, M. (2026). Collaborative use of AI-generated feedback in EFL argumentative writing: Impacts on writing quality and self-efficacy. American Association for Applied Linguistics (AAAL), Chicago, IL, United States.",
  },
  {
    title: "Enhancing Peer Feedback Practices With Generative AI",
    authors: "Greisel, M., Hornstein, J., Kollar, I., Noroozi, O., Haddadian, G., Gao, X., Alqassab, M., Banihashem, K., Khosravi, H., Pozdniakov, S., Schunn, C. D., Yu, Q., & Rummel, N.",
    venue: "Proceedings of the 18th International Conference on Computer-Supported Collaborative Learning - CSCL 2025 (pp. 490-498). International Society of the Learning Sciences",
    year: 2025,
    doi: "https://doi.org/10.22318/cscl2025.921873",
    apa: "Greisel, M., Hornstein, J., Kollar, I., Noroozi, O., Haddadian, G., Gao, X., Alqassab, M., Banihashem, K., Khosravi, H., Pozdniakov, S., Schunn, C. D., Yu, Q., & Rummel, N. (2025). Enhancing Peer Feedback Practices With Generative AI. In Oshima, J., Chen, B., Vogel, F., & Jarvela, J. (Eds.), Proceedings of the 18th International Conference on Computer-Supported Collaborative Learning - CSCL 2025 (pp. 490-498). International Society of the Learning Sciences.",
  },
  {
    title: "Exploring AI-Generated Expert Models: Instructor Interaction and Learner Perceptions in a Physics Class",
    authors: "Haddadian, G., Han, H., Kim, J., Abdeen, M. S., & Kim, M. K.",
    venue: "Proceedings of the 19th International Conference of the Learning Sciences - ICLS 2025 (pp. 1684-1688). International Society of the Learning Sciences",
    year: 2025,
    doi: "https://doi.org/10.22318/icls2025.213524",
    apa: "Haddadian, G., Han, H., Kim, J., Abdeen, M. S., & Kim, M. K. (2025). Exploring AI-Generated Expert Models: Instructor Interaction and Learner Perceptions in a Physics Class. In Proceedings of the 19th International Conference of the Learning Sciences - ICLS 2025 (pp. 1684-1688). International Society of the Learning Sciences.",
  },
  {
    title: "Evaluating Private Artificial Intelligence (AI) Curriculum in Computer Science (CS) Education: Insights for Advancing Student-Centered CS Learning",
    authors: "Haddadian, G., Panzade, P., Takabi, D., & Kim, M. K.",
    venue: "Proceedings of the 18th International Conference of the Learning Sciences - ICLS 2024 (pp. 2271-2272). International Society of the Learning Sciences",
    year: 2024,
    doi: "https://doi.org/10.22318/icls2024.141269",
    apa: "Haddadian, G., Panzade, P., Takabi, D., & Kim, M. K. (2024). Evaluating Private Artificial Intelligence (AI) Curriculum in Computer Science (CS) Education: Insights for Advancing Student-Centered CS Learning. In Proceedings of the 18th International Conference of the Learning Sciences - ICLS 2024 (pp. 2271-2272). International Society of the Learning Sciences.",
  },
  {
    title: "An Investigation of ELT Teachers' Online Self-efficacy: Does Teachers' Level of Agency Matter?",
    authors: "Haddadian, G., & Haddadian, N.",
    venue: "Proceedings of Society for Information Technology & Teacher Education International Conference (pp. 1607-1615). Association for the Advancement of Computing in Education (AACE)",
    year: 2024,
    doi: "https://www.learntechlib.org/primary/p/224179/",
    apa: "Haddadian, G., & Haddadian, N. (2024). An Investigation of ELT Teachers' Online Self-efficacy: Does Teachers' Level of Agency Matter? In J. Cohen & G. Solano (Eds.), Proceedings of Society for Information Technology & Teacher Education International Conference (pp. 1607-1615). Las Vegas, Nevada, United States: Association for the Advancement of Computing in Education (AACE).",
  },
  {
    title: "The Impact of AI-Enabled Personalized Recommendations on L2 Learners' Engagement, Motivation, and Learning Outcomes",
    authors: "Daneshvar Ghorbani, B., & Haddadian, G.",
    venue: "AIRiAL 2024 Conference, Teachers College, Columbia University, New York, NY, United States",
    year: 2024,
    apa: "Daneshvar Ghorbani, B., & Haddadian, G. (2024). The Impact of AI-Enabled Personalized Recommendations on L2 Learners' Engagement, Motivation, and Learning Outcomes. AIRiAL 2024 Conference, Teachers College, Columbia University, New York, NY, United States.",
  },
  {
    title: "An investigation of knowledge-based AI vs. human evaluation in the context of academic summary evaluation: Similarities, dissimilarities, and being toward mutual understandings",
    authors: "Kim, J., Haddadian, G., & Kim, M. K.",
    venue: "Proceedings of the 17th International Conference of the Learning Sciences - ICLS 2023 (pp. 994-997). International Society of the Learning Sciences",
    year: 2023,
    doi: "https://doi.org/10.22318/icls2023.633243",
    apa: "Kim, J., Haddadian, G., & Kim, M. K. (2023). An investigation of knowledge-based AI vs. human evaluation in the context of academic summary evaluation: Similarities, dissimilarities, and being toward mutual understandings. In Proceedings of the 17th International Conference of the Learning Sciences - ICLS 2023 (pp. 994-997). International Society of the Learning Sciences.",
  },
  {
    title: "A Design Study of Problem-Centered Instruction (PCI) for Private Artificial Intelligence (AI) Curriculum Development",
    authors: "Haddadian, G., Takabi, D., Panzade, P., & Kim, M.",
    venue: "2023 Association for Educational Communications and Technology (AECT) Conference, Orlando, FL",
    year: 2023,
    doi: "https://par.nsf.gov/servlets/purl/10582484",
    apa: "Haddadian, G., Takabi, D., Panzade, P., & Kim, M. (2023). A Design Study of Problem-Centered Instruction (PCI) for Private Artificial Intelligence (AI) Curriculum Development. 2023 Association for Educational Communications and Technology (AECT) Conference, Orlando, FL.",
  },
  {
    title: "A test of learning progress models using an AI-enabled knowledge representation system",
    authors: "Kim, M. K., Kim, N. J., Haddadian, G., & Heidari, A.",
    venue: "Proceedings of the 17th International Conference of the Learning Sciences - ICLS 2023 (pp. 986-989). International Society of the Learning Sciences",
    year: 2023,
    doi: "https://doi.org/10.22318/icls2023.200138",
    apa: "Kim, M. K., Kim, N. J., Haddadian, G., & Heidari, A. (2023). A test of learning progress models using an AI-enabled knowledge representation system. In Proceedings of the 17th International Conference of the Learning Sciences - ICLS 2023 (pp. 986-989). International Society of the Learning Sciences.",
  },
  {
    title: "A Comprehensive Model of AI Literacy from a Developmental Perspective",
    authors: "Haddadian, G., Bae, Y., Kim, J., & Kim, M.",
    venue: "2023 Association for Educational Communications and Technology (AECT) Conference, Orlando, FL",
    year: 2023,
    apa: "Haddadian, G., Bae, Y., Kim, J., & Kim, M. (2023). A Comprehensive Model of AI Literacy from a Developmental Perspective. 2023 Association for Educational Communications and Technology (AECT) Conference, Orlando, FL.",
  },
  {
    title: "The impact of an AI-based educational tool, with a focus on technology acceptance and metacognitive awareness of adult learners",
    authors: "Bae, Y., Kim, J., Haddadian, G., Davis, A., & Kim, M.",
    venue: "2023 Association for Educational Communications and Technology (AECT) Conference, Orlando, FL",
    year: 2023,
    apa: "Bae, Y., Kim, J., Haddadian, G., Davis, A., & Kim, M. (2023). The impact of an AI-based educational tool, with a focus on technology acceptance and metacognitive awareness of adult learners. 2023 Association for Educational Communications and Technology (AECT) Conference, Orlando, FL.",
  },
  {
    title: "Leveraging machine learning to automatically evaluate cognitive engagement in asynchronous online discussions",
    authors: "Kim, J., Bae, Y., Haddadian, G., & Kim, M.",
    venue: "2023 Association for Educational Communications and Technology (AECT) Conference, Orlando, FL",
    year: 2023,
    apa: "Kim, J., Bae, Y., Haddadian, G., & Kim, M. (2023). Leveraging machine learning to automatically evaluate cognitive engagement in asynchronous online discussions. 2023 Association for Educational Communications and Technology (AECT) Conference, Orlando, FL.",
  },
  {
    title: "AI-augmented summarization: Impact on online adult learners' concept learning, discussion quality, and achievement",
    authors: "Kim, J., Bae, Y., Haddadian, G., Morris, W., Crossley, S., Holmes, L., Stravelakis, J., & Kim, M.",
    venue: "2023 Association for Educational Communications and Technology (AECT) Conference, Orlando, FL",
    year: 2023,
    apa: "Kim, J., Bae, Y., Haddadian, G., Morris, W., Crossley, S., Holmes, L., Stravelakis, J., & Kim, M. (2023). AI-augmented summarization: Impact on online adult learners' concept learning, discussion quality, and achievement. 2023 Association for Educational Communications and Technology (AECT) Conference, Orlando, FL.",
  },
  {
    title: "The Moving Target Problem in AI Text Detection: Evidence From Chatbot and Detector Version Changes",
    authors: "Niloy, A. C., Haddadian, G., & Kim, M. K.",
    venue: "External Advisory Board Meeting, The National AI Institute for Adult Learning and Online Education (AI-ALOE), Atlanta, Georgia [Poster]",
    year: 2026,
    apa: "Niloy, A. C., Haddadian, G., & Kim, M. K. (2026). The Moving Target Problem in AI Text Detection: Evidence From Chatbot and Detector Version Changes. External Advisory Board Meeting, The National AI Institute for Adult Learning and Online Education (AI-ALOE), May 15, Atlanta, Georgia [Format: Poster].",
  },
  {
    title: "Synthesizing Research on Automated Writing Evaluation Tools in EFL Argumentative Writing Context",
    authors: "Haddadian, G., Kim, M. K., & Haddadian, N.",
    venue: "External Advisory Board Meeting, The National AI Institute for Adult Learning and Online Education (AI-ALOE), Atlanta, Georgia [Poster]",
    year: 2025,
    apa: "Haddadian, G., Kim, M. K., & Haddadian, N. (2025). Synthesizing Research on Automated Writing Evaluation Tools in EFL Argumentative Writing Context. External Advisory Board meeting, The National AI Institute for Adult Learning and Online Education (AI-ALOE) 2025, May 16, Atlanta, Georgia [Format: Poster].",
  },
  {
    title: "Automated Writing Evaluation in Foreign Language Education: A Systematic Review in Argumentative Writing",
    authors: "Haddadian, G., Kim, M. K., & Haddadian, N.",
    venue: "American Association for Applied Linguistics (AAAL): The Multilingual Matters Graduate Research Roundtable, Denver, Colorado",
    year: 2025,
    apa: "Haddadian, G., Kim, M. K., & Haddadian, N. (2025). Automated Writing Evaluation in Foreign Language Education: A Systematic Review in Argumentative Writing. American Association for Applied Linguistics (AAAL): The Multilingual Matters Graduate Research Roundtable, March 21, Denver, Colorado [Format: Article in progress].",
  },
  {
    title: "The Effect of Using Mind Mapping on Iranian EFL Learners' Self-efficacy in Vocabulary Learning",
    authors: "Radmanesh, S., & Haddadian, G.",
    venue: "WEI International Academic Conference on Education, Teaching, and Learning (WEI-ETL-Barcelona), Barcelona, Spain",
    year: 2020,
    apa: "Radmanesh, S., & Haddadian, G. (2020). The Effect of Using Mind Mapping on Iranian EFL Learners' Self-efficacy in Vocabulary Learning. WEI International Academic Conference on Education, Teaching, and Learning (WEI-ETL-Barcelona), Barcelona, Spain, February 2020 [Format: Full paper].",
  },
  {
    title: "Design and Development of a Computer-Adaptive Prototype to Measure Written Receptive Vocabulary Knowledge of English Language Learners",
    authors: "Haddadian, G., & Salehi, M.",
    venue: "English Language Teaching (ELT) Conference at Sharif University of Technology, Tehran, Iran",
    year: 2014,
    apa: "Haddadian, G., & Salehi, M. (2015). Design and Development of a Computer-Adaptive Prototype to Measure Written Receptive Vocabulary Knowledge of English Language Learners. English Language Teaching (ELT) Conference at Sharif University of Technology, Tehran, Iran, 2014 [Format: Short paper].",
  },
  {
    title: "TeleCrowd: A Crowdsourcing Approach to Create Informal to Formal Text Corpora",
    authors: "Masoumi, V., Salehi, M., Veisi, H., Haddadian, G., Ranjbar, V., & Sahebdel, M.",
    venue: "arXiv:2004.11771",
    year: 2020,
    doi: "https://arxiv.org/abs/2004.11771",
    apa: "Masoumi, V., Salehi, M., Veisi, H., Haddadian, G., Ranjbar, V., & Sahebdel, M. (2020). TeleCrowd: A Crowdsourcing Approach to Create Informal to Formal Text Corpora. arXiv:2004.11771.",
  },
];

const groupByYear = (pubs: Publication[]) => {
  const grouped: Record<number, Publication[]> = {};
  pubs.forEach((pub) => {
    if (!grouped[pub.year]) grouped[pub.year] = [];
    grouped[pub.year].push(pub);
  });
  return Object.entries(grouped)
    .sort(([a], [b]) => Number(b) - Number(a))
    .map(([year, items]) => ({ year: Number(year), items }));
};

const linkClass = "inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[hsl(175,50%,40%)] underline decoration-[hsl(175,50%,40%)]/40 decoration-1 underline-offset-2 hover:decoration-[hsl(175,50%,40%)] transition-all duration-200";

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="ml-auto shrink-0 p-1 rounded hover:bg-muted transition-colors"
      aria-label="Copy APA citation"
    >
      {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} className="text-muted-foreground" />}
    </button>
  );
};

const PublicationEntry = ({ pub, index }: { pub: Publication; index: number }) => {
  const renderAuthors = (authors: string) => {
    const parts = authors.split(/(Haddadian, G\.)/);
    return parts.map((part, i) =>
      part === "Haddadian, G." ? (
        <Link key={i} to="/" className="font-semibold text-primary underline decoration-primary/40 decoration-1 underline-offset-2 hover:decoration-primary transition-all duration-200">{part}</Link>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      style={{ opacity: 1 }}
      className="group relative py-4 first:pt-1"
    >
      {/* Card-like container with subtle hover */}
      <div className="relative pl-5 sm:pl-7 border-l-[3px] border-border/40 group-hover:border-primary/50 transition-colors duration-500">
        {/* Timeline dot */}
        <div className="absolute -left-[7px] top-1 w-[11px] h-[11px] rounded-full border-2 border-border bg-background group-hover:border-primary group-hover:bg-primary/10 transition-all duration-500" />

        {/* Title */}
        {pub.pdf ? (
          <HoverCard openDelay={300} closeDelay={200}>
            <HoverCardTrigger asChild>
              <h3 className="text-sm sm:text-base md:text-[1.1rem] font-semibold leading-[1.4] mb-2 text-foreground/90 group-hover:text-foreground transition-colors duration-300 cursor-pointer">
                {pub.title}
              </h3>
            </HoverCardTrigger>
            <HoverCardContent
              side="right"
              align="start"
              sideOffset={12}
              className="w-[280px] sm:w-[340px] p-2 overflow-hidden border-primary/20"
            >
              <Document file={pub.pdf} loading={<div className="flex items-center justify-center h-[300px] text-xs text-muted-foreground">Loading...</div>}>
                <Page pageNumber={1} width={260} renderTextLayer={false} renderAnnotationLayer={false} />
              </Document>
            </HoverCardContent>
          </HoverCard>
        ) : (
          <h3 className="text-sm sm:text-base md:text-[1.1rem] font-semibold leading-[1.4] mb-2 text-foreground/90 group-hover:text-foreground transition-colors duration-300">
            {pub.title}
          </h3>
        )}

        {/* Authors */}
        <p className="text-xs sm:text-sm text-muted-foreground mb-1.5 leading-relaxed">
          {renderAuthors(pub.authors)}
        </p>

        {/* Venue */}
        <p className="text-xs sm:text-[0.8rem] text-muted-foreground/60 mb-3.5 leading-relaxed">
          <span className="italic">{pub.venue}</span>
          <span className="mx-1.5 text-border">·</span>
          <span>{pub.year}</span>
        </p>

        {/* Action links row */}
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
          {pub.doi && (
            <a href={pub.doi} target="_blank" rel="noopener noreferrer" className={linkClass}>
              <ExternalLink size={13} />
              DOI
            </a>
          )}
          {pub.pdf && (
            <a href={pub.pdf} target="_blank" rel="noopener noreferrer" className={linkClass}>
              <FileText size={13} />
              PDF
            </a>
          )}
          {pub.apa && (
            <Popover>
              <PopoverTrigger asChild>
                <button className={linkClass}>
                  <Quote size={13} />
                   Cite
                </button>
              </PopoverTrigger>
              <PopoverContent
                className="w-[min(24rem,calc(100vw-2rem))] text-xs sm:text-sm leading-relaxed text-muted-foreground border-primary/20"
                side="top"
                align="start"
              >
                <div className="flex items-start gap-2">
                  <p className="flex-1 select-all">{pub.apa}</p>
                  <CopyButton text={pub.apa} />
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>

      {/* Separator line between entries */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-border/30" />
    </motion.div>
  );
};

const Research = () => {
  useDocumentHead({
    title: 'Research & Publications — Golnoush Haddadian',
    description: 'Published research by Golnoush Haddadian in AI in Education, automated writing evaluation, peer feedback, and learning sciences.',
    canonical: '/research',
  });
  const grouped = groupByYear(journalPublications);
  let globalIndex = 0;

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 text-center">Selected Research</h1>
      <p className="text-sm sm:text-base text-muted-foreground text-center mb-8">
        For the full list, please refer to my <a href="https://scholar.google.com/citations?user=8MQCFZQAAAAJ&hl=en" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Scholar</a> page.
      </p>



      <section className="mb-12">
        {grouped.map(({ year, items }, groupIdx) => {
          const yearColors = [
            'text-[hsl(200,60%,65%)]',   // soft blue
            'text-[hsl(340,50%,65%)]',    // soft rose
            'text-[hsl(160,45%,55%)]',    // soft teal
            'text-[hsl(270,45%,65%)]',    // soft lavender
            'text-[hsl(30,60%,60%)]',     // soft amber
          ];
          const lineColors = [
            'from-[hsl(200,60%,65%)]/30',
            'from-[hsl(340,50%,65%)]/30',
            'from-[hsl(160,45%,55%)]/30',
            'from-[hsl(270,45%,65%)]/30',
            'from-[hsl(30,60%,60%)]/30',
          ];
          const colorClass = yearColors[groupIdx % yearColors.length];
          const lineClass = lineColors[groupIdx % lineColors.length];

          return (
          <div key={year} className="mb-8 last:mb-0">
            <div className="flex items-center gap-4 mb-2">
              <h3 className={`text-3xl sm:text-4xl font-black tracking-tighter select-none ${colorClass}`}>
                {year}
              </h3>
              <div className={`flex-1 h-px bg-gradient-to-r ${lineClass} to-transparent`} />
            </div>

            <div>
              {items.map((pub) => {
                const idx = globalIndex++;
                return <PublicationEntry key={idx} pub={pub} index={idx} />;
              })}
            </div>

            {year === 2018 && (
              <div className="mt-10 pt-8 border-t border-border/30">
                <div className="flex items-baseline gap-3 mb-3">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">Collaborators</h2>
                  <span className="text-[10px] sm:text-xs text-muted-foreground/50 font-medium uppercase tracking-wider">
                    World Map
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground/70 mb-4 max-w-2xl">
                  Advisors, mentors, dissertation committee members, and co-authors collaborating across institutions worldwide.
                </p>
                <iframe
                  src="/collaborators-map.html"
                  title="Research Collaborators World Map"
                  className="w-full rounded-md border border-border"
                  style={{ height: '720px' }}
                />
              </div>
            )}
          </div>
          );
        })}
      </section>
    </div>
  );
};

export default Research;
