import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import Container from '../../components/atoms/Container';
import Header from '../../components/molecules/Header';
import Footer from '../../components/organisms/Footer';
import Hero, { HeroSectionProps } from '../../components/organisms/Hero';
import Navbar from '../../components/organisms/Navbar';

deckDeckGoHighlightElement();

const StyledMDX = styled.div`
  h3,
  h4,
  ol,
  ul {
    margin-bottom: 2rem;
  }

  h3 {
    font-size: 1.5rem;
    line-height: 2rem;
  }

  h4 {
    font-size: 1.25rem;
    line-height: 1.75rem;
  }

  ol,
  ul {
    list-style-position: inside;
  }

  ul {
    list-style-type: disc;
  }

  ol {
    list-style-type: decimal;
  }

  p {
    margin-bottom: 2rem;
  }
`;

export type BlogPageProps = {
  data: {
    site: {
      siteMetadata: {
        about: {
          hero: HeroSectionProps;
        };
      };
    };
    mdx: {
      body: string;
      frontmatter: { title: string; description: string; date: string };
    };
  };
};

const BlogPage: React.FC<BlogPageProps> = ({ data }) => {
  const hero = data.site.siteMetadata.about.hero || {};

  const {
    mdx = { body: '', frontmatter: { title: '', description: '', date: '' } },
  } = data;
  const { body = '', frontmatter = { title: '', description: '', date: '' } } =
    mdx;
  const { title, description, date } = frontmatter;

  return (
    <>
      <Helmet>
        <title>HIEU DOAN (hieudoanm): {title}</title>
      </Helmet>
      <Navbar fixed />
      <Hero
        id={hero.id}
        title={hero.title}
        subtitle={description}
        backgroundImage={hero.backgroundImage}
      />
      <Container>
        <div className="pb-16">
          <Header>{date}</Header>
          <StyledMDX>
            <MDXRenderer>{body}</MDXRenderer>
          </StyledMDX>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export const query = graphql`
  query ($id: String) {
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
      }
    }
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        date(formatString: "MMMM D, YYYY")
        author
        description
      }
      body
    }
  }
`;

export default BlogPage;
