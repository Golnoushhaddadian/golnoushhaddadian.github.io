
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { JournalPublication } from "@/types/research";
import { Badge } from "@/components/ui/badge";

interface JournalsTabProps {
  publications: JournalPublication[];
}

export const JournalsTab = ({ publications }: JournalsTabProps) => {
  return (
    <Card className="border-l-4 border-primary overflow-hidden">
      <CardHeader className="bg-primary/5">
        <CardTitle>Refereed Journal Publications ({publications.length})</CardTitle>
        <CardDescription>Peer-reviewed research articles published in academic journals</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-6">
          {publications.map((pub, index) => (
            <li key={index} className="border-b pb-5 last:border-0">
              <p className="font-semibold text-lg mb-1">{pub.title}</p>
              <p className="mb-1 text-primary/80">{pub.authors}</p>
              <p className="text-sm text-muted-foreground">
                <span className="italic">{pub.journal}</span>
                {pub.volume && <span>, {pub.volume}</span>}
                {pub.pages && <span>, {pub.pages}</span>}
                {pub.year && <span> ({pub.year})</span>}
              </p>
              {pub.doi && (
                <Badge variant="outline" className="mt-2 bg-primary/5">
                  DOI: {pub.doi}
                </Badge>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
