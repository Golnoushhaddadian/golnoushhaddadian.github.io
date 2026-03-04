
import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, FileText, BookOpen, Quote } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { motion } from 'framer-motion';

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
    title: "Conversational Repairs in Persian Dramatic Discourse: Akbar Radi's Pellekân (The Steps)",
    authors: "Haddadian, G., & Mahmoodi-Bakhtiari, B.",
    venue: "Persian Literary Studies Journal, 7(11), 65-82",
    year: 2018,
    doi: "http://doi.org/10.22099/jps.2019.31124.1088",
    apa: "Haddadian, G., & Mahmoodi-Bakhtiari, B. (2018). Conversational Repairs in Persian Dramatic Discourse: Akbar Radi's Pellekân (The Steps). Persian Literary Studies Journal, 7(11), 65-82.",
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
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group relative pl-5 py-5 border-l-2 border-border/60 hover:border-primary/60 transition-colors duration-300"
    >
      {/* Dot on timeline */}
      <div className="absolute -left-[5px] top-6 w-2 h-2 rounded-full bg-border group-hover:bg-primary transition-colors duration-300" />

      <h3 className="text-sm sm:text-base md:text-lg font-semibold leading-snug mb-1.5 group-hover:text-primary/90 transition-colors duration-300">
        {pub.title}
      </h3>
      <p className="text-xs sm:text-sm text-muted-foreground mb-1">
        {renderAuthors(pub.authors)}
      </p>
      <p className="text-xs sm:text-sm text-muted-foreground/70 italic mb-2.5">
        {pub.venue} ({pub.year})
      </p>
      <div className="flex items-center gap-4">
        {pub.doi && (
          <a
            href={pub.doi}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[hsl(175,50%,40%)] underline decoration-[hsl(175,50%,40%)]/40 decoration-1 underline-offset-2 hover:decoration-[hsl(175,50%,40%)] transition-all duration-200"
          >
            <ExternalLink size={13} />
            DOI
          </a>
        )}
        {pub.pdf && (
          <a
            href={pub.pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[hsl(175,50%,40%)] underline decoration-[hsl(175,50%,40%)]/40 decoration-1 underline-offset-2 hover:decoration-[hsl(175,50%,40%)] transition-all duration-200"
          >
            <FileText size={13} />
            PDF
          </a>
        )}
        {pub.apa && (
          <Popover>
            <PopoverTrigger asChild>
              <button className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[hsl(175,50%,40%)] underline decoration-[hsl(175,50%,40%)]/40 decoration-1 underline-offset-2 hover:decoration-[hsl(175,50%,40%)] transition-all duration-200">
                <Quote size={13} />
                APA
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-96 text-xs sm:text-sm leading-relaxed text-muted-foreground" side="top">
              {pub.apa}
            </PopoverContent>
          </Popover>
        )}
      </div>
    </motion.div>
  );
};

const Research = () => {
  const grouped = groupByYear(journalPublications);
  let globalIndex = 0;

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">Research</h1>
      <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed mb-8">
        Refereed journal publications, conference proceedings, and ongoing work.
      </p>

      <section className="mb-12">
        <div className="mb-8">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">
            Refereed Journal Publications
            <span className="ml-2 text-sm font-normal text-muted-foreground align-middle">
              ({journalPublications.length})
            </span>
          </h2>
        </div>

        {grouped.map(({ year, items }) => (
          <div key={year} className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl sm:text-3xl font-bold text-primary/20">{year}</span>
              <div className="flex-1 h-px bg-border/60" />
            </div>
            <div>
              {items.map((pub) => {
                const idx = globalIndex++;
                return <PublicationEntry key={idx} pub={pub} index={idx} />;
              })}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Research;
