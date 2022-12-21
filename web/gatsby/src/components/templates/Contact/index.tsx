import React from 'react';
import Pricing, { PricingSectionProps } from '../../organisms/Pricing';
import Contact, { ContactSectionProps } from '../../organisms/Contact';
import Menu, { Section } from '../../organisms/Navbar';
import Footer from '../../organisms/Footer';
import Hero, { HeroSectionProps } from '../../organisms/Hero';

export type ContactTemplateProps = {
  sections: Section[];
  hero: HeroSectionProps;
  pricing: PricingSectionProps;
  contact: ContactSectionProps;
};

const ContactTemplate: React.FC<ContactTemplateProps> = ({
  sections,
  hero,
  pricing,
  contact,
}) => {
  return (
    <>
      <Menu fixed sections={sections} />
      <main className="pt-32">
        <Hero
          id={hero.id}
          title={hero.title}
          subtitle={hero.subtitle}
          backgroundImage={hero.backgroundImage}
        />
        <Pricing
          id={pricing.id}
          title={pricing.title}
          subtitle={pricing.subtitle}
          plans={pricing.plans}
        />
        <Contact id={contact.id} title={contact.title} />
      </main>
      <Footer />
    </>
  );
};

export default ContactTemplate;
