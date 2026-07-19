import { LegalTemplate } from '@/components/templates/landing';

const PrivacyPage = () => (
  <LegalTemplate
    title="Privacy Policy"
    sections={[
      {
        heading: '1. Information We Collect',
        body: 'We collect information you provide directly to us, such as your name, email address, and payment information when you create an account or use the Service.',
      },
      {
        heading: '2. How We Use Your Information',
        body: 'We use the information we collect to provide, maintain, and improve the Service, process transactions, send technical notices, and respond to your requests.',
      },
      {
        heading: '3. Data Sharing',
        body: 'We do not sell your personal information. We may share data with third-party service providers who help us operate the Service, subject to strict confidentiality agreements.',
      },
      {
        heading: '4. Data Security',
        body: 'We implement industry-standard security measures including encryption at rest and in transit, regular security audits, and access controls to protect your data.',
      },
      {
        heading: '5. Your Rights',
        body: 'You have the right to access, update, or delete your personal data at any time through your account settings or by contacting us.',
      },
      {
        heading: '6. Cookies',
        body: 'We use cookies and similar tracking technologies to improve your experience. You can control cookie preferences in your browser settings.',
      },
    ]}
    contact={
      <>
        For privacy-related inquiries, contact us at{' '}
        <span className="text-primary">privacy@boilerplate.com</span>.
      </>
    }
  />
);

export default PrivacyPage;
