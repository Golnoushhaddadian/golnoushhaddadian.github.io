// Maps publication titles to research strands
import type { Strand } from "@/components/research/ResearchStrandsVenn";

type StrandKey = Exclude<Strand, "all">;

// Each publication can belong to multiple strands
const titleToStrands: Record<string, StrandKey[]> = {
  // Journals
  "Problem-centered post-secondary computer science education": ["ai-education", "research-methodology"],
  "Construction and validation of a Computerized Formative Assessment Literacy (CFAL)": ["assessment-feedback", "research-methodology"],
  "Innovative Use of Grammarly Feedback for Improving EFL Learners' Speaking": ["language-call", "assessment-feedback"],
  "Comparing the Effects of Teacher Feedback, Automated Feedback": ["assessment-feedback", "language-call"],
  "Conversational Repairs in Persian Dramatic Discourse": ["language-call"],
  
  // Conferences
  "Supporting peer feedback provision and uptake with GenAI": ["ai-education", "assessment-feedback"],
  "Automated Generation of Expert Models with Generative AI": ["ai-education", "research-methodology"],
  "Evaluating Private Artificial Intelligence (AI) Curriculum": ["ai-education", "research-methodology"],
  "An Investigation of ELT Teachers' Online Self-efficacy": ["language-call", "assessment-feedback"],
  "The Impact of AI-Enabled Personalized Recommendations": ["ai-education", "language-call"],
  "An investigation of knowledge-based AI vs. human evaluation": ["ai-education", "assessment-feedback"],
  "A Design Study of Problem-Centered Instruction (PCI)": ["ai-education", "research-methodology"],
  "A Comprehensive Model of AI Literacy": ["ai-education"],
  "A test of learning progress models": ["ai-education", "research-methodology"],
  "The impact of an AI-based educational tool": ["ai-education"],
  "Leveraging machine learning to automatically evaluate cognitive engagement": ["ai-education", "assessment-feedback"],
  "AI-augmented summarization": ["ai-education"],
  "The Effect of Using Mind Mapping on Iranian EFL Learners": ["language-call"],
  "Design and Development of a Computer-Adaptive Prototype": ["language-call", "research-methodology"],
  
  // Non-refereed
  "TeleCrowd": ["language-call", "research-methodology"],
  
  // Under review
  "Learners' Collaboration in Using AI-generated Feedback": ["ai-education", "assessment-feedback", "language-call"],
  "The Scaffolding Value of GenAI during Peer Feedback": ["ai-education", "assessment-feedback"],
  "Promoting EFL Teachers' Self-Directed Professional Development": ["language-call", "research-methodology"],
  "Exploring Classroom Interactions in Iranian EFL Classrooms": ["language-call"],
  
  // Work in progress
  "A Systematic Review of Automated Writing Evaluation": ["language-call", "assessment-feedback", "research-methodology"],
  "Real-time Intelligent Technology for Argumentative Writing (RITA)": ["ai-education", "language-call", "research-methodology"],
  "Text-based Generative AI to Facilitate Peer Feedback": ["ai-education", "assessment-feedback"],
  "Students' Plagiarism Behaviors within AI-Enabled": ["ai-education"],
  "Generative AI for the Automated Construction": ["ai-education", "research-methodology"],
  "Examining Learner's Evaluative Judgment": ["assessment-feedback"],
};

export function getStrands(title: string): StrandKey[] {
  for (const [key, strands] of Object.entries(titleToStrands)) {
    if (title.includes(key) || title.startsWith(key)) {
      return strands;
    }
  }
  return ["research-methodology"]; // default fallback
}

export function matchesStrand(title: string, strand: Strand): boolean {
  if (strand === "all") return true;
  return getStrands(title).includes(strand as StrandKey);
}
