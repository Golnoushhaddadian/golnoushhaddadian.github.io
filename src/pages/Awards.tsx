
import { useDocumentHead } from "@/hooks/useDocumentHead";
import { galleryImages } from "@/data/galleryImages";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

const Awards = () => {
  useDocumentHead({
    title: 'Awards — Golnoush Haddadian',
    description: 'Awards and honors received by Golnoush Haddadian for excellence in research, teaching, and academic contributions.',
    canonical: '/awards',
  });

  const awardsImages = galleryImages.filter(image => image.category === "awards");

  const awards = [
    "AI4ED Summer Fellowship ($12,500), AI in Education Interest Group, The AI Institutes Virtual Organization (AIVO), funded by NSF and Google.org (2025).",
    "Outstanding Ph.D. Student in Learning Technologies (LT) Award, College of Education & Human Development (CEHD), Georgia State University (2025).",
    "AACE Conference Paper Award, Society for Information Technology & Teacher Education, Las Vegas, Nevada (2024).",
    "Doctoral Student Fellowship Award ($15,000), College of Education & Human Development (CEHD), Georgia State University (2023).",
    "Graduate Student Travel Awards, CEHD, Georgia State University (2023, 2024, 2025).",
    "Admitted to M.A. program at Sharif University of Technology as exceptional talented undergraduate student (2012).",
    "Ranked in top 1% in master's degree Nationwide University Entrance Exam (2012).",
    "Ranked 1st in GPA for bachelor's (2012) and master's degree (2014).",
    "Innovative and Supportive Teacher of Foreign Languages Award, Balan Language Academy (2013).",
    "Outstanding Teacher of Foreign Languages Award, Aryana Fanavaran Institute of Technology (2010).",
    "Distinguished Student Researcher Award, Young Researchers and Elite Club (2006).",
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Awards & Honors</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Recognition for contributions to research, teaching, and academic excellence.
        </p>
      </div>

      <ul className="space-y-3">
        {awards.map((award, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
            <p className="text-sm sm:text-base">{award}</p>
          </li>
        ))}
      </ul>

      {awardsImages.length > 0 && (
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Gallery</h2>
          <GalleryGrid images={awardsImages} />
        </div>
      )}
    </div>
  );
};

export default Awards;
