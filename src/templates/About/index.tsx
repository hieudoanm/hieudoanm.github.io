import {
  CallToActionSection,
  type CallToActionSectionProperties,
} from '@hieudoanm/components/CTA';
import {
  ExperiencesSection,
  type ExperiencesSectionProperties,
} from '@hieudoanm/components/Experiences';
import {
  FeaturesSection,
  type FeaturesSectionProperties,
} from '@hieudoanm/components/Features';
import { Footer } from '@hieudoanm/components/Footer';
import {
  HeroSection,
  type HeroSectionProperties,
} from '@hieudoanm/components/Hero';
import { Navbar, type Section } from '@hieudoanm/components/Navbar';
import {
  NewsletterSection,
  type NewsletterSectionProperties,
} from '@hieudoanm/components/Newsletter';
import type React from 'react';

export type AboutTemplateProperties = {
  sections: Section[];
  hero: HeroSectionProperties;
  interests: FeaturesSectionProperties;
  experiences: ExperiencesSectionProperties;
  cta: CallToActionSectionProperties;
  newsletter: NewsletterSectionProperties;
};

export const AboutTemplate: React.FC<AboutTemplateProperties> = ({
  sections = [],
  hero,
  interests,
  experiences,
  cta,
  newsletter,
}) => {
  return (
    <>
      <Navbar fixed sections={sections} />
      <main>
        <HeroSection
          id={hero.id}
          title={hero.title}
          subtitle={hero.subtitle}
          backgroundImage={hero.backgroundImage}
        />
        <FeaturesSection
          id={interests.id}
          title={interests.title}
          subtitle={interests.subtitle}
          features={interests.features}
        />
        <ExperiencesSection
          id={experiences.id}
          title={experiences.title}
          subtitle={experiences.subtitle}
          experiences={experiences.experiences}
        />
        <CallToActionSection
          id={cta.id}
          title={cta.title}
          subtitle={cta.subtitle}
          cta={cta.cta}
          backgroundImage={cta.backgroundImage}
        />
        <NewsletterSection
          id={newsletter.id}
          title={newsletter.title}
          subtitle={newsletter.subtitle}
        />
      </main>
      <Footer />
    </>
  );
};
