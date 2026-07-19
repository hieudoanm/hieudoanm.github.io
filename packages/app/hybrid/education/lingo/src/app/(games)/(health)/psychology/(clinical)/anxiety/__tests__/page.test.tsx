import { render, screen } from '@testing-library/react';

import AnxietyClinicalPage from '@/app/(games)/(health)/psychology/(clinical)/anxiety/page';

describe('AnxietyClinicalPage', () => {
  it('renders the heading and section headers', () => {
    render(<AnxietyClinicalPage />);
    expect(
      screen.getByRole('heading', { name: 'Anxiety' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        name: 'Anxiety is a signal, not a disorder',
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'When worry becomes generalised' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'How common and how disabling' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Screening is not diagnosis' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'What the evidence supports' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Risk and getting help' })
    ).toBeInTheDocument();
  });

  it('links back to the psychology hub and out to the screening instrument', () => {
    render(<AnxietyClinicalPage />);
    expect(
      screen.getByRole('link', { name: /Back to Psychology/ })
    ).toHaveAttribute('href', '/psychology');
    expect(
      screen.getByRole('link', {
        name: /^Generalized Anxiety Disorder/,
      })
    ).toHaveAttribute(
      'href',
      '/psychology/anxiety/generalized-anxiety-disorder'
    );
  });
});
