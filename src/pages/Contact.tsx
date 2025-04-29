
import React from 'react';
import ContactIntro from '@/components/contact/ContactIntro';
import ContactInfoCard from '@/components/contact/ContactInfoCard';
import OfficeHours from '@/components/contact/OfficeHours';
import ContactForm from '@/components/contact/ContactForm';

const Contact = () => {
  return (
    <section className="space-y-8">
      <ContactIntro />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <ContactInfoCard />
          <OfficeHours />
        </div>

        <div className="md:col-span-2">
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default Contact;
