import React from 'react';
import Container from '../../components/atoms/Container';
import Blog from '../../components/molecules/Blog';
import Header from '../../components/molecules/Header';
import { BlogType } from '../../components/organisms/Blogs';
import Footer from '../../components/organisms/Footer';
import Hero, { HeroSectionProperties } from '../../components/organisms/Hero';
import Navbar from '../../components/organisms/Navbar';

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
          <div className="py-8 md:py-16 flex flex-col gap-8">
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
