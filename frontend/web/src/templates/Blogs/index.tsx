import React from 'react';
import Container from '@hieudoanm/components/Container';
import Blog from '@hieudoanm/components/Blog';
import Header from '@hieudoanm/components/Header';
import { BlogType } from '@hieudoanm/components/Blogs';
import Footer from '@hieudoanm/components/Footer';
import Hero, { HeroSectionProperties } from '@hieudoanm/components/Hero';
import Navbar from '@hieudoanm/components/Navbar';

export type BlogsTemplateProperties = {
  hero: HeroSectionProperties;
  title: string;
  subtitle: string;
  blogs: BlogType[];
};

const BlogsTemplate: React.FC<BlogsTemplateProperties> = ({
  hero,
  title,
  subtitle,
  blogs,
}) => {
  return (
    <>
      <Navbar fixed />
      <main>
        <Hero
          id={hero.id}
          title={hero.title}
          subtitle={hero.subtitle}
          backgroundImage={hero.backgroundImage}
        />
        <Container>
          <div className="flex flex-col gap-8 py-8 md:py-16">
            <Header subtitle={subtitle}>{title}</Header>
            {blogs.map((blog) => {
              return (
                <Blog
                  key={`blog-${blog.id}`}
                  url={blog.url}
                  title={blog.title}
                  description={blog.description}
                  date={blog.date}
                />
              );
            })}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
};

BlogsTemplate.displayName = 'BlogsTemplate';

export default BlogsTemplate;
