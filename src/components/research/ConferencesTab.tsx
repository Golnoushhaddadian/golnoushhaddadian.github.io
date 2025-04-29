
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ConferenceProceeding } from "@/types/research";
import { Badge } from "@/components/ui/badge";

interface ConferencesTabProps {
  proceedings: ConferenceProceeding[];
}

export const ConferencesTab = ({ proceedings }: ConferencesTabProps) => {
  return (
    <Card className="border-l-4 border-primary overflow-hidden">
      <CardHeader className="bg-primary/5">
        <CardTitle>Refereed Conference Proceedings ({proceedings.length})</CardTitle>
        <CardDescription>Peer-reviewed papers presented at academic conferences</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-6">
          {proceedings.map((proc, index) => (
            <li key={index} className="border-b pb-5 last:border-0">
              <p className="font-semibold text-lg mb-1">{proc.title}</p>
              <p className="mb-1 text-primary/80">{proc.authors}</p>
              <p className="text-sm text-muted-foreground">
                <span>{proc.conference}</span>
                {proc.pages && <span>, pp. {proc.pages}</span>}
                {proc.publisher && <span>. {proc.publisher}</span>}
                {proc.year && <span> ({proc.year})</span>}
              </p>
              {proc.doi && (
                <Badge variant="outline" className="mt-2 bg-primary/5">
                  DOI: {proc.doi}
                </Badge>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
