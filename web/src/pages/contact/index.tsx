import { graphql } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';
import { ContactSectionProperties } from '../../components/organisms/Contact';
import { HeroSectionProperties } from '../../components/organisms/Hero';
import { Section } from '../../components/organisms/Navbar';
import { PricingSectionProperties } from '../../components/organisms/Pricing';
import ContactTemplate from '../../templates/Contact';

const sections: Section[] = [{ id: 'pricing' }, { id: 'contact' }];

export type ContactPageProperties = {
  data: {
    site: {
      siteMetadata: {
        about: {
          hero: HeroSectionProperties;
        };
        contact: {
          contact: ContactSectionProperties;
          pricing: PricingSectionProperties;
        };
      };
    };
  };
};

const ContactPage: React.FC<ContactPageProperties> = ({ data }) => {
  const contact = data.site.siteMetadata.contact.contact || {};
  const hero = data.site.siteMetadata.about.hero || {};
  const pricing = data.site.siteMetadata.contact.pricing || {};

  return (
    <>
      <Helmet>
        <title>HIEU DOAN (hieudoanm): Contact</title>
      </Helmet>
      <ContactTemplate
        sections={sections}
        hero={hero}
        pricing={pricing}
        contact={contact}
      />
    </>
  );
};

export const query = graphql`
  query {
    site {
      siteMetadata {
        about {
          hero {
            id
            title
            subtitle
            backgroundImage
          }
        }
        contact {
          contact {
            id
            title
            subtitle
          }
          pricing {
            id
            title
            subtitle
            plans {
              id
              title
              description
              price {
                vnd {
                  value
                  unit
                }
                usd {
                  value
                  unit
                }
              }
              timeUnit
              features
            }
          }
        }
      }
    }
  }
`;

export default ContactPage;
