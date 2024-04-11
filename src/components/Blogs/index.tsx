import { Blog } from '@hieudoanm/components/Blog';
import { Container } from '@hieudoanm/components/Container';
import { Header } from '@hieudoanm/components/Header';
import type React from 'react';

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

export const BlogsSection: React.FC<BlogsSectionProperties> = ({
  id: sectionId,
  title: sectionTitle,
  subtitle,
  blogs = [],
}) => {
  return (
    <div id={sectionId} className="pb-16">
      <Container>
        <Header subtitle={subtitle}>{sectionTitle}</Header>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
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
