import React from 'react';
import Container from '../../atoms/Container';
import Blog from '../../molecules/Blog';
import Header from '../../molecules/Header';

export type BlogType = {
  id: string;
  title: string;
  description: string;
  date: string;
  url: string;
};

export type BlogsSectionProperties = {
  id: string;
  title: string;
  subtitle: string;
  blogs?: BlogType[];
};

const BlogsSection: React.FC<BlogsSectionProperties> = ({
  id: sectionId,
  title: sectionTitle,
  subtitle,
  blogs = [],
}) => {
  return (
    <div id={sectionId} className="pb-16">
      <Container>
        <Header subtitle={subtitle}>{sectionTitle}</Header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {blogs.map((blog: BlogType) => {
            const { id, title, description, url, date } = blog;
            return (
              <Blog
                key={`blog-${id}`}
                url={url}
                title={title}
                description={description}
                date={date}
              />
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default BlogsSection;
