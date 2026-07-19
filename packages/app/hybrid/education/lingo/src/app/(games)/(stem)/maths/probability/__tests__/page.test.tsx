import { render, screen } from '@testing-library/react';

import ProbabilityPage from '@/app/(games)/(stem)/maths/probability/page';

describe('ProbabilityPage', () => {
  it('renders the note title', () => {
    render(<ProbabilityPage />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Probability' })
    ).toBeInTheDocument();
  });

  it('renders the historical opening section', () => {
    render(<ProbabilityPage />);

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Probability started as a losing-problem story',
      })
    ).toBeInTheDocument();
  });

  it('renders the expected value section', () => {
    render(<ProbabilityPage />);

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Expected value is the whole game',
      })
    ).toBeInTheDocument();
  });

  it('links back to maths', () => {
    render(<ProbabilityPage />);

    expect(
      screen.getByRole('link', { name: '← Back to Maths' })
    ).toHaveAttribute('href', '/maths');
  });

  it.each([
    ['Baccarat', '/maths/probability/baccarat'],
    ['Card Counter', '/maths/probability/card-counter'],
    ['Craps', '/maths/probability/craps'],
    ['Hi-Lo', '/maths/probability/hi-lo'],
    ['Keno', '/maths/probability/keno'],
    ['Over / Under Seven', '/maths/probability/over-under-seven'],
    ['Poker Odds', '/maths/probability/poker-odds'],
    ['Roulette', '/maths/probability/roulette'],
    ['Slot Machine', '/maths/probability/slot-machine'],
    ['War', '/maths/probability/war'],
  ])('links to the %s simulation', (label, href) => {
    render(<ProbabilityPage />);

    expect(
      screen.getByRole('link', { name: new RegExp(`^${label}`) })
    ).toHaveAttribute('href', href);
  });

  it('lists the references', () => {
    render(<ProbabilityPage />);

    expect(
      screen.getByRole('link', { name: 'Wikipedia: History of Probability' })
    ).toHaveAttribute(
      'href',
      'https://en.wikipedia.org/wiki/History_of_probability'
    );
  });
});
