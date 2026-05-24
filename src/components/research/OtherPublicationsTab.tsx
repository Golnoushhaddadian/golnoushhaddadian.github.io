
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { nonRefereedPublications, workUnderReview, otherPresentations } from "@/data/researchData";
import { NonRefereedPublication, WorkUnderReview } from '@/types/research';

export const OtherPublicationsTab = () => {
  return (
    <div className="space-y-8">
      {workUnderReview.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Work Under Review</h3>
          <div className="space-y-6">
            {workUnderReview.map((work: WorkUnderReview, index: number) => (
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
                    {work.journal || work.conference || ''}, {work.year}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {nonRefereedPublications.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Non-Refereed Publications</h3>
          <div className="space-y-6">
            {nonRefereedPublications.map((pub: NonRefereedPublication, index: number) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="mb-3 flex gap-2">
                    {pub.keywords?.map((keyword, i) => (
                      <Badge key={i} variant="outline" className="bg-primary/10 hover:bg-primary/20 text-primary border-primary/20">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{pub.title}</h3>
                  <p className="text-muted-foreground mb-3">{pub.authors.join(', ')}</p>
                  <CardDescription className="text-sm text-muted-foreground">
                    {pub.journal || pub.publication || ''}, {pub.year}
                  </CardDescription>
                </CardContent>
                <CardFooter className="bg-muted/50 px-6 py-3">
                  {pub.url && (
                    <Button variant="outline" size="sm" className="ml-auto gap-1">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      View Publication
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
