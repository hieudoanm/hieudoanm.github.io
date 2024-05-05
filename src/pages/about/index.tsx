import { metadata } from '@hieudoanm/common/configs/metadata';
import type { Section } from '@hieudoanm/components/Navbar';
import { AboutTemplate } from '@hieudoanm/templates/About';
import type { NextPage } from 'next';
import Head from 'next/head';

const sections: Section[] = [{ id: 'interests' }];

const AboutPage: NextPage = () => {
  const {
    about: { cta, experiences, hero, interests, newsletter },
  } = metadata;

  return (
    <>
      <Head>
        <title>About</title>
      </Head>
      <AboutTemplate
        sections={sections}
        hero={hero}
        interests={interests}
        experiences={experiences}
        cta={cta}
        newsletter={newsletter}
      />
    </>
  );
};

export default AboutPage;
