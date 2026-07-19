import { render, screen } from '@testing-library/react';
import { LegalTemplate } from '../LegalTemplate';

describe('LegalTemplate', () => {
  it('renders heading, sections, and contact', () => {
    render(
      <LegalTemplate
        title="Privacy Policy"
        sections={[
          {
            heading: '1. Information We Collect',
            body: 'We collect information you provide.',
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
    expect(
      screen.getByRole('heading', { name: 'Privacy Policy' })
    ).toBeInTheDocument();
    expect(screen.getByText('1. Information We Collect')).toBeInTheDocument();
    expect(screen.getByText('privacy@boilerplate.com')).toBeInTheDocument();
  });

  it('renders legal links in the footer', () => {
    render(
      <LegalTemplate
        title="Terms of Service"
        sections={[]}
        contact={<>Contact us</>}
      />
    );
    expect(screen.getByRole('link', { name: 'Privacy' })).toHaveAttribute(
      'href',
      '/landing/privacy'
    );
    expect(screen.getByRole('link', { name: 'Terms' })).toHaveAttribute(
      'href',
      '/landing/terms'
    );
  });
});
