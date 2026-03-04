
import React from 'react';
import { ExternalLink } from 'lucide-react';

type Publication = {
  title: string;
  authors: string;
  venue: string;
  year: number;
  doi?: string;
  doiLabel?: string;
};

const journalPublications: Publication[] = [
  {
    title: "A Systematic Review of Automated Writing Evaluation Tools in Argumentative Writing for English as Foreign Language Education",
    authors: "Haddadian, G., Kim, M. K., & Haddadian, N.",
    venue: "Research Synthesis in Applied Linguistics",
    year: 2025,
    doi: "https://doi.org/10.1080/29984475.2025.2598266",
  },
  {
    title: "The value of GenAI for peer feedback provision: student perceptions and impacts",
    authors: "Noroozi, O., Haddadian, G., Gao, X., Schunn, C., Alqassab, M., & Banihashem, S. K.",
    venue: "International Journal of Educational Technology in Higher Education, 22(1), 61",
    year: 2025,
    doi: "https://doi.org/10.1186/s41239-025-00558-6",
  },
  {
    title: "Problem-centered post-secondary computer science education: A study of the private artificial intelligence curriculum",
    authors: "Haddadian, G., Panzade, P., Takabi, D., & Kim, M. K.",
    venue: "International Journal of Technology in Education (IJTE), 8(2), 1-26",
    year: 2025,
    doi: "https://doi.org/10.46328/ijte.1071",
  },
  {
    title: "Construction and validation of a Computerized Formative Assessment Literacy (CFAL) questionnaire for language teachers: An exploratory sequential mixed-methods investigation",
    authors: "Haddadian, G., Radmanesh, S., & Haddadian, N.",
    venue: "Language Testing in Asia, 14(33)",
    year: 2024,
    doi: "https://doi.org/10.1186/s40468-024-00303-2",
  },
  {
    title: "Innovative Use of Grammarly Feedback for Improving EFL Learners' Speaking: Learners' Perceptions and Transformative Engagement Experiences in Focus",
    authors: "Haddadian, G., & Haddadian, N.",
    venue: "The Journal of Applied Instructional Design, 13(2)",
    year: 2024,
    doi: "https://doi.org/10.59668/1269.15640",
  },
  {
    title: "Comparing the Effects of Teacher Feedback, Automated Feedback, and Integrative Feedback on EFL Learners' Writing Accuracy and Writing Apprehension",
    authors: "Haddadian, G.",
    venue: "Computer-Assisted Language Learning Electronic Journal, 25(3), 124-147",
    year: 2024,
    doi: "https://callej.org/index.php/journal/article/view/436",
  },
  {
    title: "Conversational Repairs in Persian Dramatic Discourse: Akbar Radi's Pellekân (The Steps)",
    authors: "Haddadian, G., & Mahmoodi-Bakhtiari, B.",
    venue: "Persian Literary Studies Journal, 7(11), 65-82",
    year: 2018,
    doi: "http://doi.org/10.22099/jps.2019.31124.1088",
  },
];

// Group publications by year
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

const PublicationEntry = ({ pub }: { pub: Publication }) => {
  // Bold "Haddadian, G." in the authors string
  const renderAuthors = (authors: string) => {
    const parts = authors.split(/(Haddadian, G\.)/);
    return parts.map((part, i) =>
      part === "Haddadian, G." ? (
        <span key={i} className="font-semibold text-foreground">{part}</span>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  return (
    <div className="py-4 border-b border-border/40 last:border-b-0">
      <h3 className="text-sm sm:text-base md:text-lg font-semibold leading-snug mb-1">
        {pub.title}
      </h3>
      <p className="text-xs sm:text-sm text-muted-foreground mb-1">
        {renderAuthors(pub.authors)}
      </p>
      <p className="text-xs sm:text-sm text-muted-foreground italic mb-2">
        {pub.venue} ({pub.year})
      </p>
      {pub.doi && (
        <a
          href={pub.doi}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs sm:text-sm text-primary hover:underline"
        >
          <ExternalLink size={14} />
          DOI
        </a>
      )}
    </div>
  );
};

const Research = () => {
  const grouped = groupByYear(journalPublications);

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">Research</h1>
      <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed mb-8">
        Refereed journal publications, conference proceedings, and ongoing work.
      </p>

      <section className="mb-12">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-6 text-primary">
          Refereed Journal Publications ({journalPublications.length})
        </h2>

        {grouped.map(({ year, items }) => (
          <div key={year} className="mb-8">
            <h3 className="text-base sm:text-lg md:text-xl font-bold mb-3 text-foreground/80">
              {year}
            </h3>
            <div>
              {items.map((pub, i) => (
                <PublicationEntry key={i} pub={pub} />
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Research;
