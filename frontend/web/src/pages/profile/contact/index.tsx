import { Section } from '@hieudoanm/components/Navbar';
import metadata from '@hieudoanm/configs/metadata';
import ContactTemplate from '@hieudoanm/templates/Contact';
import { NextPage } from 'next';
import { Helmet } from 'react-helmet';

const sections: Section[] = [{ id: 'pricing' }, { id: 'contact' }];

export const ContactPage: NextPage = () => {
  const {
    about: { hero },
    contact: { contact, pricing },
  } = metadata;

  return (
    <>
      <Helmet>
        <title>HIEU DOAN (hieudoanm): Contact</title>
      </Helmet>
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
