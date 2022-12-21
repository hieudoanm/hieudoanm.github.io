import { graphql } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';
import { CTASectionProps } from '../../components/organisms/CTA';
import { ExperiencesSectionProps } from '../../components/organisms/Experiences';
import { FeaturesSectionProps } from '../../components/organisms/Features';
import { HeroSectionProps } from '../../components/organisms/Hero';
import { LogosCloudSectionProps } from '../../components/organisms/LogoClouds';
import { Section } from '../../components/organisms/Navbar';
import { NewsletterSectionProps } from '../../components/organisms/Newsletter';
import { StatsSectionProps } from '../../components/organisms/Stats';
import { TeamSectionProps } from '../../components/organisms/Team';
import { TestimonialsSectionProps } from '../../components/organisms/Testimonials';
import AboutTemplate from '../../components/templates/About';

const sections: Section[] = [
  { id: 'interests' },
  { id: 'stats' },
  { id: 'projects' },
  { id: 'techstack' },
  { id: 'testimonials' },
  { id: 'blogs' },
];

export type AboutPageProps = {
  data: {
    site: {
      siteMetadata: {
        about: {
          cta: CTASectionProps;
          experiences: ExperiencesSectionProps;
          hero: HeroSectionProps;
          interests: FeaturesSectionProps;
          newsletter: NewsletterSectionProps;
          projects: LogosCloudSectionProps;
          stats: StatsSectionProps;
          techstack: TeamSectionProps;
          testimonials: TestimonialsSectionProps;
        };
      };
    };
  };
};

const AboutPage: React.FC<AboutPageProps> = ({ data }) => {
  const cta = data.site.siteMetadata.about.cta || {};
  const experiences = data.site.siteMetadata.about.experiences || {};
  const hero = data.site.siteMetadata.about.hero || {};
  const interests = data.site.siteMetadata.about.interests || {};
  const newsletter = data.site.siteMetadata.about.newsletter || {};
  const projects = data.site.siteMetadata.about.projects || {};
  const stats = data.site.siteMetadata.about.stats || {};
  const techstack = data.site.siteMetadata.about.techstack || {};
  const testimonials = data.site.siteMetadata.about.testimonials || {};

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>HIEU DOAN (hieudoanm): About</title>
      </Helmet>
      <AboutTemplate
        sections={sections}
        hero={hero}
        interests={interests}
        experiences={experiences}
        stats={stats}
        logos={projects}
        team={techstack}
        cta={cta}
        testimonials={testimonials}
        blogs={{
          id: 'blogs',
          title: 'Blogs',
          subtitle:
            'Keep updated with new technologies and stories from other developers.',
          blogs: [],
        }}
        newsletter={newsletter}
      />
    </>
  );
};

export const query = graphql`
  query {
    site {
      siteMetadata {
        about {
          cta {
            id
            title
            subtitle
            backgroundImage
            cta
          }
          experiences {
            id
            title
            subtitle
            experiences {
              company
              period
              city
              title
            }
          }
          hero {
            id
            title
            subtitle
            backgroundImage
          }
          interests {
            id
            title
            subtitle
            features {
              id
              placeholder
              title
              description
            }
          }
          newsletter {
            id
            title
            subtitle
          }
          projects {
            id
            title
            subtitle
            logos {
              id
              href
              image
              title
            }
          }
          stats {
            id
            title
            subtitle
            stats {
              value
              title
              subtitle
            }
          }
          techstack {
            id
            title
            subtitle
            team {
              image
              title
              position
              homepage
            }
          }
          testimonials {
            id
            title
            subtitle
            testimonials {
              quote
              author
              position
            }
          }
        }
      }
    }
  }
`;

export default AboutPage;
