import { render, screen } from '@testing-library/react';
import { KnockoutLink } from '../KnockoutLink';

describe('KnockoutLink', () => {
  it('renders link with tournament config', () => {
    render(<KnockoutLink year={2014} tournament="world-cup" />);
    const link = screen.getByText(/View Knockout Bracket/);
    expect(link).toHaveAttribute(
      'href',
      '/touraments/world-cup/2014/knock-out'
    );
  });

  it('defaults to world-cup tournament', () => {
    render(<KnockoutLink year={2020} />);
    const link = screen.getByText(/View Knockout Bracket/);
    expect(link).toHaveAttribute(
      'href',
      '/touraments/world-cup/2020/knock-out'
    );
  });
});
