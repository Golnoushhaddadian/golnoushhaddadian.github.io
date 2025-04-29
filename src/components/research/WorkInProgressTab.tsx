
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { WorkInProgress } from "@/types/research";

interface WorkInProgressTabProps {
  workInProgress: WorkInProgress[];
}

export const WorkInProgressTab = ({ workInProgress }: WorkInProgressTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Work In Progress ({workInProgress.length})</CardTitle>
        <CardDescription>Ongoing research projects and manuscripts in preparation</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-6">
          {workInProgress.map((work, index) => (
            <li key={index} className="border-b pb-5 last:border-0">
              <p className="font-semibold text-lg mb-1">{work.title}</p>
              <p className="mb-1 text-primary/80">{work.authors}</p>
              <p className="text-sm text-muted-foreground">
                <span>{work.type}</span>
              </p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
