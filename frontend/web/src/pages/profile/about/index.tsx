import { Section } from '@hieudoanm/components/Navbar';
import metadata from '@hieudoanm/configs/metadata';
import AboutTemplate from '@hieudoanm/templates/About';
import { NextPage } from 'next';
import { Helmet } from 'react-helmet';

const sections: Section[] = [
  { id: 'interests' },
  { id: 'stats' },
  { id: 'projects' },
  { id: 'techstack' },
  { id: 'testimonials' },
  { id: 'blogs' },
];

const AboutPage: NextPage = () => {
  const {
    about: {
      cta,
      experiences,
      hero,
      interests,
      newsletter,
      projects,
      stats,
      techstack,
      testimonials,
    },
  } = metadata;

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>About</title>
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

export default AboutPage;
