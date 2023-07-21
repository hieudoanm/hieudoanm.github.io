import { graphql } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';
import { CTASectionProperties } from '../../components/organisms/CTA';
import { ExperiencesSectionProperties } from '../../components/organisms/Experiences';
import { FeaturesSectionProperties } from '../../components/organisms/Features';
import { HeroSectionProperties } from '../../components/organisms/Hero';
import { LogosCloudSectionProperties } from '../../components/organisms/LogoClouds';
import { Section } from '../../components/organisms/Navbar';
import { NewsletterSectionProperties } from '../../components/organisms/Newsletter';
import { StatsSectionProperties } from '../../components/organisms/Stats';
import { TeamSectionProperties } from '../../components/organisms/Team';
import { TestimonialsSectionProperties } from '../../components/organisms/Testimonials';
import AboutTemplate from '../../templates/About';

const sections: Section[] = [
  { id: 'interests' },
  { id: 'stats' },
  { id: 'projects' },
  { id: 'techstack' },
  { id: 'testimonials' },
  { id: 'blogs' },
];

export type AboutPageProperties = {
  data: {
    site: {
      siteMetadata: {
        about: {
          cta: CTASectionProperties;
          experiences: ExperiencesSectionProperties;
          hero: HeroSectionProperties;
          interests: FeaturesSectionProperties;
          newsletter: NewsletterSectionProperties;
          projects: LogosCloudSectionProperties;
          stats: StatsSectionProperties;
          techstack: TeamSectionProperties;
          testimonials: TestimonialsSectionProperties;
        };
      };
    };
  };
};

const AboutPage: React.FC<AboutPageProperties> = ({ data }) => {
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
