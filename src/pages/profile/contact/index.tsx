import { metadata } from '@hieudoanm/common/configs/metadata';
import { APP_NAME } from '@hieudoanm/common/constants/time.constants';
import type { Section } from '@hieudoanm/components/Navbar';
import { ContactTemplate } from '@hieudoanm/templates/Contact';
import type { NextPage } from 'next';
import Head from 'next/head';

const sections: Section[] = [{ id: 'pricing' }, { id: 'contact' }];

export const ContactPage: NextPage = () => {
  const {
    about: { hero },
    contact: { contact, pricing },
  } = metadata;

  return (
    <>
      <Head>
        <title>{APP_NAME}: Contact</title>
      </Head>
      <ContactTemplate
        sections={sections}
        hero={hero}
        pricing={pricing}
        contact={contact}
      />
    </>
  );
};

export default ContactPage;
