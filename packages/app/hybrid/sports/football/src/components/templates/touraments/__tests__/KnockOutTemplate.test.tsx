import { render, screen } from '@testing-library/react';
import { KnockOutTemplate } from '../KnockOutTemplate';
import type { KnockoutYearData } from '@/data/touraments/international/world-cup/types';

const yearData: KnockoutYearData = {
  teams: {
    BRA: { id: 'BRA', name: 'Brazil', iso: 'br', flag: '' },
    ARG: { id: 'ARG', name: 'Argentina', iso: 'ar', flag: '' },
  },
  predetermined: { ARG_BRA: 'BRA' },
  bracket: ['BRA', 'ARG'],
};

describe('KnockOutTemplate', () => {
  it('renders the knockout bracket', () => {
    render(<KnockOutTemplate yearData={yearData} year={2014} />);
    expect(screen.getByText('Knockout Bracket')).toBeInTheDocument();
    expect(screen.getByText(/World Cup Knockouts/)).toBeInTheDocument();
  });

  it('renders with custom tournament', () => {
    render(
      <KnockOutTemplate yearData={yearData} year={2020} tournament="euro" />
    );
    expect(screen.getByText('Knockout Bracket')).toBeInTheDocument();
  });
});
