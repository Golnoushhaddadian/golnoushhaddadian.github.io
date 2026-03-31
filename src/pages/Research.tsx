
import React, { useState } from 'react';
import { useDocumentHead } from '@/hooks/useDocumentHead';
import { Link } from 'react-router-dom';
import { ExternalLink, FileText, Quote, Copy, Check } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { motion } from 'framer-motion';
import CoauthorshipNetwork from '@/components/CoauthorshipNetwork';
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
    title: "Exploring AI-Generated Expert Models: Instructor Interaction and Learner Perceptions in a Physics Class",
    authors: "Haddadian, G., Han, H., Kim, J., Abdeen, M. S., & Kim, M. K.",
    venue: "Proceedings of the 19th International Conference of the Learning Sciences - ICLS 2025 (pp. 1684-1688). International Society of the Learning Sciences",
    year: 2025,
    doi: "https://doi.org/10.22318/icls2025.213524",
    pdf: "/papers/haddadian-et-al-2025-ai-expert-models.pdf",
    apa: "Haddadian, G., Han, H., Kim, J., Abdeen, M. S., & Kim, M. K. (2025). Exploring AI-Generated Expert Models: Instructor Interaction and Learner Perceptions in a Physics Class. In Proceedings of the 19th International Conference of the Learning Sciences-ICLS 2025, pp. 1684-1688. International Society of the Learning Sciences.",
  },
  {
    title: "Enhancing Peer Feedback Practices With Generative AI",
    authors: "Greisel, M., Hornstein, J., Kollar, I., Noroozi, O., Haddadian, G., Gao, X., Alqassab, M., Banihashem, K., Khosravi, H., Pozdniakov, S., Schunn, C. D., Yu, Q., & Rummel, N.",
    venue: "Proceedings of the 18th International Conference on Computer-Supported Collaborative Learning - CSCL 2025 (pp. 490-498). International Society of the Learning Sciences",
    year: 2025,
    doi: "https://doi.org/10.22318/cscl2025.921873",
    pdf: "/papers/greisel-et-al-2025-peer-feedback-genai.pdf",
    apa: "Greisel, M., Hornstein, J., Kollar, I., Noroozi, O., Haddadian, G., Gao, X., ... & Rummel, N. (2025). Enhancing Peer Feedback Practices with Generative AI. In Proceedings of the 18th International Conference on Computer-Supported Collaborative Learning-CSCL 2025, pp. 490-498. International Society of the Learning Sciences.",
  },
  {
    title: "A Systematic Review of Automated Writing Evaluation Tools in Argumentative Writing for English as Foreign Language Education",
    authors: "Haddadian, G., Kim, M. K., & Haddadian, N.",
    venue: "Research Synthesis in Applied Linguistics",
    year: 2025,
    doi: "https://doi.org/10.1080/29984475.2025.2598266",
    apa: "Haddadian, G., Kim, M. K., & Haddadian, N. (2025). A Systematic Review of Automated Writing Evaluation Tools in Argumentative Writing for English as Foreign Language Education. Research Synthesis in Applied Linguistics, 1-51.",
  },
  {
    title: "The value of GenAI for peer feedback provision: student perceptions and impacts",
    authors: "Noroozi, O., Haddadian, G., Gao, X., Schunn, C., Alqassab, M., & Banihashem, S. K.",
    venue: "International Journal of Educational Technology in Higher Education, 22(1), 61",
    year: 2025,
    doi: "https://doi.org/10.1186/s41239-025-00558-6",
    pdf: "/papers/noroozi-et-al-2025-genai-peer-feedback.pdf",
    apa: "Noroozi, O., Haddadian, G., Gao, X., Schunn, C., Alqassab, M., & Banihashem, S. K. (2025). The value of GenAI for peer feedback provision: student perceptions and impacts. International Journal of Educational Technology in Higher Education, 22(1), 61.",
  },
  {
    title: "Problem-centered post-secondary computer science education: A study of the private artificial intelligence curriculum",
    authors: "Haddadian, G., Panzade, P., Takabi, D., & Kim, M. K.",
    venue: "International Journal of Technology in Education (IJTE), 8(2), 1-26",
    year: 2025,
    doi: "https://doi.org/10.46328/ijte.1071",
    pdf: "/papers/haddadian-et-al-2025-problem-centered-cs.pdf",
    apa: "Haddadian, G., Panzade, P., Takabi, D., & Kim, M. K. (2025). Problem-centered post-secondary computer science education: A study of the private artificial intelligence curriculum. International Journal of Technology in Education, 8(2), 220-245.",
  },
  {
    title: "Construction and validation of a Computerized Formative Assessment Literacy (CFAL) questionnaire for language teachers: An exploratory sequential mixed-methods investigation",
    authors: "Haddadian, G., Radmanesh, S., & Haddadian, N.",
    venue: "Language Testing in Asia, 14(33)",
    year: 2024,
    doi: "https://doi.org/10.1186/s40468-024-00303-2",
    pdf: "/papers/haddadian-et-al-2024-cfal-questionnaire.pdf",
    apa: "Haddadian, G., Radmanesh, S., & Haddadian, N. (2024). Construction and validation of a Computerized Formative Assessment Literacy (CFAL) questionnaire for language teachers: an exploratory sequential mixed-methods investigation. Language Testing in Asia, 14(1), 33.",
  },
  {
    title: "Innovative Use of Grammarly Feedback for Improving EFL Learners' Speaking: Learners' Perceptions and Transformative Engagement Experiences in Focus",
    authors: "Haddadian, G., & Haddadian, N.",
    venue: "The Journal of Applied Instructional Design, 13(2)",
    year: 2024,
    doi: "https://doi.org/10.59668/1269.15640",
    pdf: "/papers/haddadian-2024-grammarly-speaking.pdf",
    apa: "Haddadian, G., & Haddadian, N. (2024). Innovative Use of Grammarly Feedback for Improving EFL Learners' Speaking: Learners' Perceptions and Transformative Engagement Experiences in Focus. The Journal of Applied Instructional Design, 13(2).",
  },
  {
    title: "Comparing the Effects of Teacher Feedback, Automated Feedback, and Integrative Feedback on EFL Learners' Writing Accuracy and Writing Apprehension",
    authors: "Haddadian, G.",
    venue: "Computer-Assisted Language Learning Electronic Journal, 25(3), 124-147",
    year: 2024,
    doi: "https://callej.org/index.php/journal/article/view/436",
    pdf: "/papers/haddadian-2024-feedback-comparison.pdf",
    apa: "Haddadian, G. (2024). Comparing the effects of teacher feedback, automated feedback, and integrative feedback on EFL learners' writing accuracy and writing apprehension. Computer-Assisted Language Learning Electronic Journal, 25(3), 124-147.",
  },
  {
    title: "Evaluating Private Artificial Intelligence (AI) Curriculum in Computer Science (CS) Education: Insights for Advancing Student-Centered CS Learning",
    authors: "Haddadian, G., Panzade, P., Takabi, D., & Kim, M. K.",
    venue: "Proceedings of the 18th International Conference of the Learning Sciences - ICLS 2024 (pp. 2271-2272). International Society of the Learning Sciences",
    year: 2024,
    doi: "https://doi.org/10.22318/icls2024.141269",
    pdf: "/papers/haddadian-et-al-2024-private-ai-curriculum.pdf",
    apa: "Haddadian, G., Panzade, P., Takabi, D., & Kim, M. K. (2024). Evaluating Private Artificial Intelligence (AI) Curriculum in Computer Science (CS) Education: Insights for Advancing Student-Centered CS Learning. In Proceedings of the 18th International Conference of the Learning Sciences-ICLS 2024, pp. 2271-2272. International Society of the Learning Sciences.",
  },
  {
    title: "An Investigation of ELT Teachers' Online Self-efficacy: Does Teachers' Level of Agency Matter?",
    authors: "Haddadian, G., & Haddadian, N.",
    venue: "Proceedings of Society for Information Technology & Teacher Education International Conference (pp. 1607-1615). Las Vegas, Nevada: Association for the Advancement of Computing in Education (AACE)",
    year: 2024,
    doi: "https://www.learntechlib.org/primary/p/224179/",
    apa: "Haddadian, G., & Haddadian, N. (2024, March). An Investigation of ELT Teachers' Online Self-efficacy: Does Teachers' Level of Agency Matter?. In Society for Information Technology & Teacher Education International Conference (pp. 1607-1615). Association for the Advancement of Computing in Education (AACE).",
  },
  {
    title: "Conversational Repairs in Persian Dramatic Discourse: Akbar Radi's Pellekân (The Steps)",
    authors: "Haddadian, G., & Mahmoodi-Bakhtiari, B.",
    venue: "Persian Literary Studies Journal, 7(11), 65-82",
    year: 2018,
    doi: "http://doi.org/10.22099/jps.2019.31124.1088",
    apa: "Haddadian, G., & Mahmoodi-Bakhtiari, B. (2018). Conversational Repairs in Persian Dramatic Discourse: Akbar Radi's Pellekân (The Steps). Persian Literary Studies Journal, 7(11), 65-82.",
  },
  {
    title: "An Investigation of Knowledge-Based AI vs. Human Evaluation in the Context of Academic Summary Evaluation: Similarities, Dissimilarities, and Being Toward Mutual Understandings",
    authors: "Kim, J., Haddadian, G., & Kim, M. K.",
    venue: "Proceedings of the 17th International Conference of the Learning Sciences - ICLS 2023 (pp. 994-997). International Society of the Learning Sciences",
    year: 2023,
    doi: "https://doi.org/10.22318/icls2023.633243",
    pdf: "/papers/kim-et-al-2023-ai-vs-human-evaluation.pdf",
    apa: "Kim, J., Haddadian, G., & Kim, M. K. (2023). An Investigation of Knowledge-Based AI vs. Human Evaluation in the Context of Academic Summary Evaluation: Similarities, Dissimilarities, and Being Toward Mutual Understandings. In Proceedings of the 17th International Conference of the Learning Sciences-ICLS 2023, pp. 994-997. International Society of the Learning Sciences.",
  },
  {
    title: "A Design Study of Problem-Centered Instruction (PCI) for Private Artificial Intelligence (AI) Curriculum Development",
    authors: "Haddadian, G., Takabi, D., Panzade, P., & Kim, M. K.",
    venue: "2023 Association for Educational Communications and Technology (AECT) Conference, Orlando, FL",
    year: 2023,
    doi: "https://par.nsf.gov/servlets/purl/10582484",
    pdf: "/papers/haddadian-et-al-2023-pci-private-ai.pdf",
    apa: "Haddadian, G., Takabi, D., Panzade, P., Kim, M. (2023). A Design Study of Problem-Centered Instruction (PCI) for Private Artificial Intelligence (AI) Curriculum Development. 2023 Association for Educational Communications and Technology (AECT) Conference, Orlando, FL.",
  },
  {
    title: "A Test of Learning Progress Models Using an AI-Enabled Knowledge Representation System",
    authors: "Kim, M. K., Kim, N. J., Haddadian, G., & Heidari, A.",
    venue: "Proceedings of the 17th International Conference of the Learning Sciences - ICLS 2023 (pp. 986-989). International Society of the Learning Sciences",
    year: 2023,
    doi: "https://doi.org/10.22318/icls2023.200138",
    pdf: "/papers/kim-et-al-2023-learning-progress-models.pdf",
    apa: "Kim, M. K., Kim, N. J., Haddadian, G., & Heidari, A. (2023). A test of learning progress models using an AI-enabled knowledge representation system. In Proceedings of the 17th International Conference of the Learning Sciences-ICLS 2023, pp. 986-989. International Society of the Learning Sciences.",
  },
  {
    title: "The Impact of an AI-Based Educational Tool, with a Focus on Technology Acceptance and Metacognitive Awareness of Adult Learners",
    authors: "Bae, Y., Kim, J., Haddadian, G., Davis, A., & Kim, M. K.",
    venue: "2023 Association for Educational Communications and Technology (AECT) Conference, Orlando, FL",
    year: 2023,
    apa: "Bae, Y., Kim, J., Haddadian, G., Davis, A., & Kim, M. (2023). The impact of an AI-based educational tool, with a focus on technology acceptance and metacognitive awareness of adult learners. 2023 Association for Educational Communications and Technology (AECT) Conference, Orlando, FL.",
  },
  {
    title: "Leveraging Machine Learning to Automatically Evaluate Cognitive Engagement in Asynchronous Online Discussions",
    authors: "Kim, J., Bae, Y., Haddadian, G., & Kim, M. K.",
    venue: "2023 Association for Educational Communications and Technology (AECT) Conference, Orlando, FL",
    year: 2023,
    apa: "Kim, J., Bae, Y., Haddadian, G., & Kim, M. (2023). Leveraging machine learning to automatically evaluate cognitive engagement in asynchronous online discussions. 2023 Association for Educational Communications and Technology (AECT) Conference, Orlando, FL.",
  },
  {
    title: "AI-Augmented Summarization: Impact on Online Adult Learners' Concept Learning, Discussion Quality, and Achievement",
    authors: "Kim, J., Bae, Y., Haddadian, G., Morris, W., Crossely, S., Holmes, L., Stravelakis, J., & Kim, M. K.",
    venue: "2023 Association for Educational Communications and Technology (AECT) Conference, Orlando, FL",
    year: 2023,
    apa: "Kim, J., Bae, Y., Haddadian, G., Morris, W., Crossely, S., Holmes, L., Stravelakis, J., & Kim, M. (2023). AI-augmented summarization: Impact on online adult learners' concept learning, discussion quality, and achievement. 2023 Association for Educational Communications and Technology (AECT) Conference, Orlando, FL.",
  },
  {
    title: "TeleCrowd: A Crowdsourcing Approach to Create Informal to Formal Text Corpora",
    authors: "Masoumi, V., Salehi, M., Veisi, H., Haddadian, G., Ranjbar, V., & Sahebdel, M.",
    venue: "arXiv:2004.11771",
    year: 2020,
    doi: "https://arxiv.org/abs/2004.11771",
    pdf: "/papers/masoumi-et-al-2020-telecrowd.pdf",
    apa: "Masoumi, V., Salehi, M., Veisi, H., Haddadian, G., Ranjbar, V., & Sahebdel, M. (2020). Telecrowd: A crowdsourcing approach to create informal to formal text corpora. arXiv preprint arXiv:2004.11771.",
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
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
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
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-8 text-center">Research</h1>

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
          </div>
          );
        })}
      </section>
    </div>
  );
};

export default Research;
