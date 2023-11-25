import React from 'react';
import Blogs, {
  BlogsSectionProperties,
} from '../../components/organisms/Blogs';
import CTA, { CTASectionProperties } from '../../components/organisms/CTA';
import Experiences, {
  ExperiencesSectionProperties,
} from '../../components/organisms/Experiences';
import Features, {
  FeaturesSectionProperties,
} from '../../components/organisms/Features';
import Footer from '../../components/organisms/Footer';
import Hero, { HeroSectionProperties } from '../../components/organisms/Hero';
import LogosCloudSection, {
  LogosCloudSectionProperties,
} from '../../components/organisms/LogoClouds';
import Navbar, { Section } from '../../components/organisms/Navbar';
import Newsletter, {
  NewsletterSectionProperties,
} from '../../components/organisms/Newsletter';
import Stats, {
  StatsSectionProperties,
} from '../../components/organisms/Stats';
import Team, { TeamSectionProperties } from '../../components/organisms/Team';
import Testimonials, {
  TestimonialsSectionProperties,
} from '../../components/organisms/Testimonials';

export type AboutTemplateProperties = {
  sections: Section[];
  hero: HeroSectionProperties;
  interests: FeaturesSectionProperties;
  experiences: ExperiencesSectionProperties;
  stats: StatsSectionProperties;
  logos: LogosCloudSectionProperties;
  team: TeamSectionProperties;
  cta: CTASectionProperties;
  testimonials: TestimonialsSectionProperties;
  blogs: BlogsSectionProperties;
  newsletter: NewsletterSectionProperties;
};

const AboutTemplate: React.FC<AboutTemplateProperties> = ({
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
