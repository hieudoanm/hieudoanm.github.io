import { render, screen } from '@testing-library/react';

import PerceptionPage from '@/app/(games)/(health)/psychology/(theory)/cognitive/perception/page';

describe('PerceptionPage', () => {
  it('renders the note title', () => {
    render(<PerceptionPage />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Perception' })
    ).toBeInTheDocument();
  });

  it('renders the first section', () => {
    render(<PerceptionPage />);

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Perception is inference, not copying',
      })
    ).toBeInTheDocument();
  });

  it('covers illusions', () => {
    render(<PerceptionPage />);

    expect(
      screen.getByRole('heading', { level: 2, name: 'Illusions worth knowing' })
    ).toBeInTheDocument();
  });

  it('links back to the cognitive hub', () => {
    render(<PerceptionPage />);

    expect(
      screen.getByRole('link', { name: '← Back to Cognitive Psychology' })
    ).toHaveAttribute('href', '/psychology/cognitive');
  });

  it('links to the visual acuity charts', () => {
    render(<PerceptionPage />);

    expect(screen.getByRole('link', { name: /Snellen Chart/ })).toHaveAttribute(
      'href',
      '/ophthalmology/vision/snellen'
    );
  });
});
