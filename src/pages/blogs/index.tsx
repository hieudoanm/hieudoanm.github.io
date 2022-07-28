import { graphql } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';
import BlogsTemplate from '../../components/templates/Blogs';
import { BlogType } from '../../components/organisms/Blogs';
import { HeroSectionProps } from '../../components/organisms/Hero';

export type BlogPageProps = {
  data: {
    site: {
      siteMetadata: {
        about: {
          hero: HeroSectionProps;
        };
      };
    };
    allMdx: {
      nodes: [
        {
          id: string;
          slug: string;
          frontmatter: { title: string; description: string; date: string };
        }
      ];
    };
  };
};

const IndexPage: React.FC<BlogPageProps> = ({ data }) => {
  const blogs: BlogType[] = data.allMdx.nodes.map((node) => {
    const {
      id,
      frontmatter = { title: '', description: '', date: '' },
      slug,
    } = node;
    const { title, description, date } = frontmatter;
    return { id, url: '/blogs/' + slug, title, description, date };
  });

  const hero = data.site.siteMetadata.about.hero || {};

  return (
    <>
      <Helmet>
        <title>HIEU DOAN (hieudoanm): Docs</title>
      </Helmet>
      <BlogsTemplate
        hero={hero}
        title={'Blogs'}
        subtitle={
          'Keep updated with new technologies and stories from other developers.'
        }
        blogs={blogs}
      ></BlogsTemplate>
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
      }
    }
    allMdx(sort: { fields: frontmatter___title, order: ASC }) {
      nodes {
        frontmatter {
          title
          date(formatString: "MMMM D, YYYY")
          author
          description
        }
        id
        body
        slug
      }
    }
  }
`;

export default IndexPage;
