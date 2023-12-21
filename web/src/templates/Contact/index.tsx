import React from 'react';
import Contact, {
  ContactSectionProperties,
} from '../../components/organisms/Contact';
import Footer from '../../components/organisms/Footer';
import Hero, { HeroSectionProperties } from '../../components/organisms/Hero';
import Menu, { Section } from '../../components/organisms/Navbar';
import Pricing, {
  PricingSectionProperties,
} from '../../components/organisms/Pricing';

export type ContactTemplateProperties = {
  sections: Section[];
  hero: HeroSectionProperties;
  pricing: PricingSectionProperties;
  contact: ContactSectionProperties;
};

const ContactTemplate: React.FC<ContactTemplateProperties> = (
  { sections, hero, pricing, contact }
) => {
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
