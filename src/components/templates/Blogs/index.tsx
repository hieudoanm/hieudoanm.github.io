import React from 'react';
import Container from '../../atoms/Container';
import Blog from '../../molecules/Blog';
import Header from '../../molecules/Header';
import { BlogType } from '../../organisms/Blogs';
import Footer from '../../organisms/Footer';
import Hero, { HeroSectionProps } from '../../organisms/Hero';
import Navbar from '../../organisms/Navbar';

export type BlogsTemplateProps = {
  hero: HeroSectionProps;
  title: string;
  subtitle: string;
  blogs: BlogType[];
};

const BlogsTemplate: React.FC<BlogsTemplateProps> = ({
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
