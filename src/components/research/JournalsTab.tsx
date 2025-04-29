
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { JournalPublication } from "@/types/research";

interface JournalsTabProps {
  publications: JournalPublication[];
}

export const JournalsTab = ({ publications }: JournalsTabProps) => {
  return (
    <Card>
      <CardHeader>
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
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
