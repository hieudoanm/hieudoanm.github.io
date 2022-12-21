import React from 'react';
import Blogs, { BlogsSectionProps } from '../../organisms/Blogs';
import CTA, { CTASectionProps } from '../../organisms/CTA';
import Features, { FeaturesSectionProps } from '../../organisms/Features';
import Footer from '../../organisms/Footer';
import Hero, { HeroSectionProps } from '../../organisms/Hero';
import LogosCloudSection, {
  LogosCloudSectionProps,
} from '../../organisms/LogoClouds';
import Navbar, { Section } from '../../organisms/Navbar';
import Newsletter, { NewsletterSectionProps } from '../../organisms/Newsletter';
import Testimonials, {
  TestimonialsSectionProps,
} from '../../organisms/Testimonials';
import Stats, { StatsSectionProps } from '../../organisms/Stats';
import Team, { TeamSectionProps } from '../../organisms/Team';
import Experiences, {
  ExperiencesSectionProps,
} from '../../organisms/Experiences';

export type AboutTemplateProps = {
  sections: Section[];
  hero: HeroSectionProps;
  interests: FeaturesSectionProps;
  experiences: ExperiencesSectionProps;
  stats: StatsSectionProps;
  logos: LogosCloudSectionProps;
  team: TeamSectionProps;
  cta: CTASectionProps;
  testimonials: TestimonialsSectionProps;
  blogs: BlogsSectionProps;
  newsletter: NewsletterSectionProps;
};

const AboutTemplate: React.FC<AboutTemplateProps> = ({
  sections = [],
  hero,
  interests,
  experiences,
  stats,
  logos,
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
        <Hero
          id={hero.id}
          title={hero.title}
          subtitle={hero.subtitle}
          backgroundImage={hero.backgroundImage}
        />
        <Features
          id={interests.id}
          title={interests.title}
          subtitle={interests.subtitle}
          features={interests.features}
        />
        <Experiences
          id={experiences.id}
          title={experiences.title}
          subtitle={experiences.subtitle}
          experiences={experiences.experiences}
        />
        <Stats
          id={stats.id}
          title={stats.title}
          subtitle={stats.subtitle}
          stats={stats.stats}
        />
        <LogosCloudSection
          id={logos.id}
          title={logos.title}
          subtitle={logos.subtitle}
          logos={logos.logos}
        />
        <Team
          id={team.id}
          title={team.title}
          subtitle={team.subtitle}
          team={team.team}
        />
        <CTA
          id={cta.id}
          title={cta.title}
          subtitle={cta.subtitle}
          cta={cta.cta}
          backgroundImage={cta.backgroundImage}
        />
        <Testimonials
          id={testimonials.id}
          title={testimonials.title}
          subtitle={testimonials.subtitle}
          testimonials={testimonials.testimonials}
        />
        <Blogs
          id={blogs.id}
          title={blogs.title}
          subtitle={blogs.subtitle}
          blogs={blogs.blogs}
        />
        <Newsletter
          id={newsletter.id}
          title={newsletter.title}
          subtitle={newsletter.subtitle}
        />
      </main>
      <Footer />
    </>
  );
};

export default AboutTemplate;
