
import React from 'react';
import { Mail, Globe, Phone, MapPin } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const ContactInfoCard = () => {
  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        <div className="flex items-start gap-3">
          <Mail className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <h3 className="font-medium mb-1">Email</h3>
            <p className="text-sm text-muted-foreground">ghaddadian1@gsu.edu</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Globe className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <h3 className="font-medium mb-1">Website</h3>
            <a 
              href="http://www.ai2researchlab.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-blue-500 hover:underline"
            >
              http://www.ai2researchlab.org/
            </a>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Phone className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <h3 className="font-medium mb-1">Phone</h3>
            <p className="text-sm text-muted-foreground">Available upon request</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <MapPin className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <h3 className="font-medium mb-1">Office</h3>
            <p className="text-sm text-muted-foreground">
              231 College of Education and Human Development<br />
              30 Pryor St SW<br />
              Atlanta, GA 30303
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactInfoCard;
