
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
          <OfficeHours />
        </div>

        <div className="sm:col-span-2 md:col-span-2">
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default Contact;
