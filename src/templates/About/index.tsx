import {
  BlogsSection,
  type BlogsSectionProperties,
} from '@hieudoanm/components/Blogs';
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
import {
  StatsSection,
  type StatsSectionProperties,
} from '@hieudoanm/components/Stats';
import {
  TeamSection,
  type TeamSectionProperties,
} from '@hieudoanm/components/Team';
import {
  TestimonialsSection,
  type TestimonialsSectionProperties,
} from '@hieudoanm/components/Testimonials';
import type React from 'react';

export type AboutTemplateProperties = {
  sections: Section[];
  hero: HeroSectionProperties;
  interests: FeaturesSectionProperties;
  experiences: ExperiencesSectionProperties;
  stats: StatsSectionProperties;
  team: TeamSectionProperties;
  cta: CallToActionSectionProperties;
  testimonials: TestimonialsSectionProperties;
  blogs: BlogsSectionProperties;
  newsletter: NewsletterSectionProperties;
};

export const AboutTemplate: React.FC<AboutTemplateProperties> = ({
  sections = [],
  hero,
  interests,
  experiences,
  stats,
  team,
  cta,
  testimonials,
  blogs,
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
        <StatsSection
          id={stats.id}
          title={stats.title}
          subtitle={stats.subtitle}
          stats={stats.stats}
        />
        <TeamSection
          id={team.id}
          title={team.title}
          subtitle={team.subtitle}
          team={team.team}
        />
        <CallToActionSection
          id={cta.id}
          title={cta.title}
          subtitle={cta.subtitle}
          cta={cta.cta}
          backgroundImage={cta.backgroundImage}
        />
        <TestimonialsSection
          id={testimonials.id}
          title={testimonials.title}
          subtitle={testimonials.subtitle}
          testimonials={testimonials.testimonials}
        />
        <BlogsSection
          id={blogs.id}
          title={blogs.title}
          subtitle={blogs.subtitle}
          blogs={blogs.blogs}
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
