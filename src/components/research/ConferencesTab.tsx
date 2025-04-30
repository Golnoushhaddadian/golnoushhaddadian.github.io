
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { conferenceProceedings } from "@/data/researchData";
import { ConferenceProceeding } from '@/types/research';

export const ConferencesTab = () => {
  return (
    <div className="space-y-6">
      {conferenceProceedings.map((conference: ConferenceProceeding, index: number) => (
        <Card key={index} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="mb-3 flex gap-2">
              {conference.keywords?.map((keyword, i) => (
                <Badge key={i} variant="outline" className="bg-primary/10 hover:bg-primary/20 text-primary border-primary/20">
                  {keyword}
                </Badge>
              ))}
            </div>
            <h3 className="text-lg font-semibold mb-2">{conference.title}</h3>
            <p className="text-muted-foreground mb-3">{conference.authors.join(', ')}</p>
            <CardDescription className="text-sm text-muted-foreground">
              {conference.conference}, {conference.year}
            </CardDescription>
          </CardContent>
          <CardFooter className="bg-muted/50 px-6 py-3">
            {conference.url && (
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
