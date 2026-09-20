import { render, screen } from '@testing-library/react';

import PsychologyPage from '@/app/(games)/(health)/psychology/page';

describe('PsychologyPage', () => {
  it('renders a hub with a link to each theory page', () => {
    render(<PsychologyPage />);
    expect(
      screen.getByRole('heading', { name: 'Psychology' })
    ).toBeInTheDocument();
    expect(screen.getByTestId('psychology-biology')).toHaveAttribute(
      'href',
      '/psychology/biology'
    );
    expect(screen.getByTestId('psychology-cognitive')).toHaveAttribute(
      'href',
      '/psychology/cognitive'
    );
    expect(screen.getByTestId('psychology-developmental')).toHaveAttribute(
      'href',
      '/psychology/developmental'
    );
    expect(screen.getByTestId('psychology-social')).toHaveAttribute(
      'href',
      '/psychology/social'
    );
  });

  it('links to each practice page', () => {
    render(<PsychologyPage />);
    expect(screen.getByTestId('psychology-mindfulness')).toHaveAttribute(
      'href',
      '/psychology/mindfulness'
    );
    expect(screen.getByTestId('psychology-journaling')).toHaveAttribute(
      'href',
      '/psychology/journaling'
    );
    expect(screen.getByTestId('psychology-counselling')).toHaveAttribute(
      'href',
      '/psychology/counselling'
    );
  });

  it('still links to the existing scales', () => {
    render(<PsychologyPage />);
    expect(screen.getByTestId('psychology-bdi')).toHaveAttribute(
      'href',
      '/psychology/beck-depression-inventory'
    );
    expect(screen.getByTestId('psychology-swls')).toHaveAttribute(
      'href',
      '/psychology/satisfaction-with-life'
    );
  });
});
