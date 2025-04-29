
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { NonRefereedPublication, WorkUnderReview } from "@/types/research";

interface OtherPublicationsTabProps {
  nonRefereedPublications: NonRefereedPublication[];
  workUnderReview: WorkUnderReview[];
}

export const OtherPublicationsTab = ({ nonRefereedPublications, workUnderReview }: OtherPublicationsTabProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Non-Refereed Publications ({nonRefereedPublications.length})</CardTitle>
          <CardDescription>Research reports, preprints, and other non-peer-reviewed publications</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-6">
            {nonRefereedPublications.map((pub, index) => (
              <li key={index} className="border-b pb-5 last:border-0">
                <p className="font-semibold text-lg mb-1">{pub.title}</p>
                <p className="mb-1 text-primary/80">{pub.authors}</p>
                <p className="text-sm text-muted-foreground">
                  <span>{pub.journal}</span>
                  {pub.year && <span> ({pub.year})</span>}
                </p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Work Under Review/In Revision ({workUnderReview.length})</CardTitle>
          <CardDescription>Manuscripts submitted to journals or in revision</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-6">
            {workUnderReview.map((work, index) => (
              <li key={index} className="border-b pb-5 last:border-0">
                <p className="font-semibold text-lg mb-1">{work.title}</p>
                <p className="mb-1 text-primary/80">{work.authors}</p>
                <p className="text-sm text-muted-foreground">
                  <span>{work.journal}</span>
                  <span> ({work.year})</span>
                </p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
