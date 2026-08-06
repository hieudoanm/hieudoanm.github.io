import { fireEvent, render, screen } from '@testing-library/react';
import { FiZap } from 'react-icons/fi';
import { LandingTemplate } from '../LandingTemplate';
import { PrivacyTemplate } from '../PrivacyTemplate';
import { TermsTemplate } from '../TermsTemplate';

const props = {
  name: 'Boilerplate',
  tagline: 'Build faster',
  description: 'Modern web apps',
  features: [
    { icon: <FiZap />, title: 'Fast', description: 'Blazing speed' },
    { icon: <FiZap />, title: 'Secure', description: 'Enterprise grade' },
  ],
};

describe('PrivacyTemplate', () => {
  it('renders heading and sections', () => {
    render(<PrivacyTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Privacy Policy' })
    ).toBeInTheDocument();
    expect(screen.getByText('1. Information We Collect')).toBeInTheDocument();
    expect(screen.getByText('privacy@boilerplate.com')).toBeInTheDocument();
  });
});

describe('TermsTemplate', () => {
  it('renders heading and sections', () => {
    render(<TermsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Terms of Service' })
    ).toBeInTheDocument();
    expect(screen.getByText('1. Acceptance of Terms')).toBeInTheDocument();
    expect(screen.getByText('hello@boilerplate.com')).toBeInTheDocument();
  });
});

describe('LandingTemplate', () => {
  it('renders hero with name, tagline, and CTAs', () => {
    render(<LandingTemplate {...props} />);
    expect(
      screen.getByRole('heading', { name: 'Modern web apps' })
    ).toBeInTheDocument();
    expect(screen.getAllByText('Build faster').length).toBeGreaterThan(0);
    expect(
      screen.getAllByRole('link', { name: /Get started/ }).length
    ).toBeGreaterThan(0);
    expect(screen.getByRole('link', { name: 'Learn more' })).toHaveAttribute(
      'href',
      '/about'
    );
  });

  it('renders feature cards', () => {
    render(<LandingTemplate {...props} />);
    expect(screen.getByText('Fast')).toBeInTheDocument();
    expect(screen.getByText('Blazing speed')).toBeInTheDocument();
  });

  it('renders pricing tiers with popular badge and feature states', () => {
    render(<LandingTemplate {...props} />);
    expect(screen.getByText('Free')).toBeInTheDocument();
    expect(screen.getByText('Pro')).toBeInTheDocument();
    expect(screen.getByText('Enterprise')).toBeInTheDocument();
    expect(screen.getByText('Most popular')).toBeInTheDocument();
    expect(screen.getAllByText('Team collaboration').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Advanced reports').length).toBeGreaterThan(0);
  });

  it('renders custom CTA label and href', () => {
    render(
      <LandingTemplate {...props} ctaLabel="Start now" ctaHref="/pricing" />
    );
    expect(
      screen.getAllByRole('link', { name: /Start now/ }).length
    ).toBeGreaterThan(0);
  });

  it('toggles FAQ open and closed', () => {
    render(<LandingTemplate {...props} />);
    expect(
      screen.queryByText(/A comprehensive starter kit/)
    ).not.toBeInTheDocument();
    fireEvent.click(
      screen.getByRole('button', { name: /What is Boilerplate/ })
    );
    expect(screen.getByText(/A comprehensive starter kit/)).toBeInTheDocument();
    fireEvent.click(
      screen.getByRole('button', { name: /What is Boilerplate/ })
    );
    expect(
      screen.queryByText(/A comprehensive starter kit/)
    ).not.toBeInTheDocument();
  });

  it('filters FAQ questions by search', () => {
    render(<LandingTemplate {...props} />);
    fireEvent.change(screen.getByPlaceholderText('Search questions...'), {
      target: { value: 'trial' },
    });
    expect(screen.getByText('Is there a free trial?')).toBeInTheDocument();
    expect(screen.queryByText('What is Boilerplate?')).not.toBeInTheDocument();
  });

  it('shows no results message for unmatched FAQ search', () => {
    render(<LandingTemplate {...props} />);
    fireEvent.change(screen.getByPlaceholderText('Search questions...'), {
      target: { value: 'zzz' },
    });
    expect(
      screen.getByText('No questions match your search.')
    ).toBeInTheDocument();
  });

  it('submits contact form and resets', () => {
    render(<LandingTemplate {...props} />);
    fireEvent.submit(document.querySelector('form')!);
    expect(screen.getByText('Message sent!')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Send another' }));
    expect(screen.queryByText('Message sent!')).not.toBeInTheDocument();
  });

  it('renders footer with privacy and terms links', () => {
    render(<LandingTemplate {...props} />);
    expect(
      screen.getAllByRole('link', { name: 'Privacy' }).length
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByRole('link', { name: 'Terms' }).length
    ).toBeGreaterThan(0);
  });
});
