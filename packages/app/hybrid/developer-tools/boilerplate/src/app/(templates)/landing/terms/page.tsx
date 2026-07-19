import { LegalTemplate } from '@/components/templates/landing';

const TermsPage = () => (
  <LegalTemplate
    title="Terms of Service"
    sections={[
      {
        heading: '1. Acceptance of Terms',
        body: 'By accessing or using Boilerplate (&ldquo;the Service&rdquo;), you agree to be bound by these Terms of Service. If you do not agree, do not use the Service.',
      },
      {
        heading: '2. Description of Service',
        body: 'Boilerplate provides a web-based platform for building and deploying modern web applications. We reserve the right to modify, suspend, or discontinue the Service at any time.',
      },
      {
        heading: '3. User Obligations',
        body: 'You agree to use the Service in compliance with all applicable laws. You are responsible for maintaining the confidentiality of your account credentials.',
      },
      {
        heading: '4. Intellectual Property',
        body: 'The Service and its original content, features, and functionality are owned by Boilerplate and are protected by international copyright laws.',
      },
      {
        heading: '5. Limitation of Liability',
        body: 'Boilerplate shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of the Service.',
      },
      {
        heading: '6. Changes to Terms',
        body: 'We reserve the right to update these terms at any time. We will notify users of material changes via email or through the Service.',
      },
    ]}
    contact={
      <>
        For terms-related inquiries, contact us at{' '}
        <span className="text-primary">support@boilerplate.com</span>.
      </>
    }
  />
);

export default TermsPage;
