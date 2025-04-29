
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { JOURNALS } from "@/data/researchData";
import { JournalPublication } from '@/types/research';

export const JournalsTab = () => {
  return (
    <div className="space-y-6">
      {JOURNALS.map((journal: JournalPublication, index: number) => (
        <Card key={index} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="mb-3 flex gap-2">
              {journal.keywords?.map((keyword, i) => (
                <Badge key={i} variant="outline" className="bg-primary/10 hover:bg-primary/20 text-primary border-primary/20">
                  {keyword}
                </Badge>
              ))}
            </div>
            <h3 className="text-lg font-semibold mb-2">{journal.title}</h3>
            <p className="text-muted-foreground mb-3">{journal.authors.join(', ')}</p>
            <CardDescription className="text-sm text-muted-foreground">
              {journal.journal}, {journal.volume && `Volume ${journal.volume}`} {journal.issue && `Issue ${journal.issue}`}, {journal.year}
            </CardDescription>
            {/* Remove references to the doi property which doesn't exist in the type */}
          </CardContent>
          <CardFooter className="bg-muted/50 px-6 py-3">
            {journal.url && (
              <Button variant="outline" size="sm" className="ml-auto gap-1">
                <ExternalLink className="h-4 w-4 mr-1" />
                View Publication
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
