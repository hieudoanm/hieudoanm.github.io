import {
  ContactSection,
  type ContactSectionProperties,
} from '@hieudoanm/components/Contact';
import { Footer } from '@hieudoanm/components/Footer';
import {
  HeroSection,
  type HeroSectionProperties,
} from '@hieudoanm/components/Hero';
import { Navbar, type Section } from '@hieudoanm/components/Navbar';
import {
  PricingSection,
  type PricingSectionProperties,
} from '@hieudoanm/components/Pricing';
import type React from 'react';

export type ContactTemplateProperties = {
  sections: Section[];
  hero: HeroSectionProperties;
  pricing: PricingSectionProperties;
  contact: ContactSectionProperties;
};

export const ContactTemplate: React.FC<ContactTemplateProperties> = ({
  sections,
  hero,
  pricing,
  contact,
}) => {
  return (
    <>
      <Navbar fixed sections={sections} />
      <main className="pt-32">
        <HeroSection
          id={hero.id}
          title={hero.title}
          subtitle={hero.subtitle}
          backgroundImage={hero.backgroundImage}
        />
        <PricingSection
          id={pricing.id}
          title={pricing.title}
          subtitle={pricing.subtitle}
          plans={pricing.plans}
        />
        <ContactSection id={contact.id} title={contact.title} />
      </main>
      <Footer />
    </>
  );
};
