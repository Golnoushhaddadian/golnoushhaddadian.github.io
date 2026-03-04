
import React from 'react';
import ContactIntro from '@/components/contact/ContactIntro';
import ContactInfoCard from '@/components/contact/ContactInfoCard';
import OfficeHours from '@/components/contact/OfficeHours';
import ContactForm from '@/components/contact/ContactForm';
import { useDocumentHead } from '@/hooks/useDocumentHead';

const Contact = () => {
  useDocumentHead({
    title: 'Contact — Golnoush Haddadian',
    description: 'Get in touch with Golnoush (Lia) Haddadian for research collaboration, academic inquiries, or CV requests.',
    canonical: '/contact',
    noindex: true,
  });

  return (
    <section className="space-y-4 sm:space-y-6 md:space-y-8">
      <ContactIntro />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        <div className="sm:col-span-2 md:col-span-1 space-y-4 sm:space-y-6">
          <ContactInfoCard />
        </div>

        <div className="sm:col-span-2 md:col-span-2">
          <ContactForm />
        </div>
      </div>

      {/* Schedule a Meeting */}
      <div className="pt-6 sm:pt-10 md:pt-14">
        <div className="border-t border-border pt-6 sm:pt-10 md:pt-14">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-1">Schedule a Meeting</h2>
          <p className="text-base sm:text-lg text-muted-foreground font-medium mb-2">Book with Calendly</p>
          <p className="text-sm text-muted-foreground mb-6 whitespace-nowrap">
            Feel free to schedule a virtual meeting through Calendly to connect on Google Meet. You can view my availability and select a convenient time.
          </p>
          <div className="rounded-xl border border-border overflow-hidden bg-card">
            <iframe
              src="https://calendly.com/liahaddadian/30min"
              title="Schedule a meeting with Lia Haddadian"
              width="100%"
              height="700"
              frameBorder="0"
              className="w-full"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Office Hours - at the bottom */}
      <div className="pt-6 sm:pt-10 md:pt-14">
        <div className="border-t border-border pt-6 sm:pt-10 md:pt-14">
          <OfficeHours />
        </div>
      </div>
    </section>
  );
};

export default Contact;
