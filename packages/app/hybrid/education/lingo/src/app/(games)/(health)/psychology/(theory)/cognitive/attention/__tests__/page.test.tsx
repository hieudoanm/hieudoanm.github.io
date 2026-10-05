import { render, screen } from '@testing-library/react';

import AttentionPage from '@/app/(games)/(health)/psychology/(theory)/cognitive/attention/page';

describe('AttentionPage', () => {
  it('renders the note title', () => {
    render(<AttentionPage />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Attention' })
    ).toBeInTheDocument();
  });

  it('renders the first section', () => {
    render(<AttentionPage />);

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Selection, not amplification',
      })
    ).toBeInTheDocument();
  });

  it('renders the subtitle', () => {
    render(<AttentionPage />);

    expect(
      screen.getByText(/cannot notice everything at once/)
    ).toBeInTheDocument();
  });

  it('links back to the cognitive hub', () => {
    render(<AttentionPage />);

    expect(
      screen.getByRole('link', { name: '← Back to Cognitive Psychology' })
    ).toHaveAttribute('href', '/psychology/cognitive');
  });

  it('links to the n-back exercise', () => {
    render(<AttentionPage />);

    expect(screen.getByRole('link', { name: /N-Back/ })).toHaveAttribute(
      'href',
      '/psychology/cognitive/memory/n-back'
    );
  });

  it('lists the references', () => {
    render(<AttentionPage />);

    expect(
      screen.getByRole('link', { name: 'Wikipedia: Cocktail Party Effect' })
    ).toHaveAttribute(
      'href',
      'https://en.wikipedia.org/wiki/Cocktail_party_effect'
    );
  });
});
