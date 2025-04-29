
import React from 'react';
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WORK_IN_PROGRESS } from "@/data/researchData";
import { WorkInProgress } from '@/types/research';

export const WorkInProgressTab = () => {
  return (
    <div className="space-y-6">
      {WORK_IN_PROGRESS.map((work: WorkInProgress, index: number) => (
        <Card key={index} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="mb-3 flex gap-2">
              {work.keywords?.map((keyword, i) => (
                <Badge key={i} variant="outline" className="bg-primary/10 hover:bg-primary/20 text-primary border-primary/20">
                  {keyword}
                </Badge>
              ))}
            </div>
            <h3 className="text-lg font-semibold mb-2">{work.title}</h3>
            <p className="text-muted-foreground mb-3">{work.authors.join(', ')}</p>
            <CardDescription className="text-sm text-muted-foreground">
              {work.year}
            </CardDescription>
            {/* Remove references to the status property which doesn't exist in the type */}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
