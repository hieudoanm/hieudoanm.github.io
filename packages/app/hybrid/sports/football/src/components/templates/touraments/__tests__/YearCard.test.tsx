import { render, screen } from '@testing-library/react';
import { YearCard } from '../YearCard';
import type { YearInfo } from '../YearCard';

const baseInfo: YearInfo = {
  year: 2014,
  host: 'Brazil',
  champion: 'Germany',
  runnerUp: 'Argentina',
  available: true,
};

describe('YearCard', () => {
  it('renders year and host', () => {
    render(<YearCard info={baseInfo} href="/wc/2014" />);
    expect(screen.getByText('2014')).toBeInTheDocument();
    expect(screen.getByText('Brazil')).toBeInTheDocument();
  });

  it('shows champion and runner-up', () => {
    render(<YearCard info={baseInfo} href="/wc/2014" />);
    expect(screen.getByText(/Germany/)).toBeInTheDocument();
    expect(screen.getByText(/Argentina/)).toBeInTheDocument();
  });

  it('shows "Upcoming" when no champion but available', () => {
    const info: YearInfo = {
      year: 2026,
      host: 'US/Mexico/Canada',
      champion: null,
      runnerUp: null,
      available: true,
    };
    render(<YearCard info={info} href="/wc/2026" />);
    expect(screen.getByText('Upcoming')).toBeInTheDocument();
  });

  it('does not show champion/runner-up when null', () => {
    const info: YearInfo = {
      year: 2026,
      host: 'US',
      champion: null,
      runnerUp: null,
      available: true,
    };
    render(<YearCard info={info} href="/wc/2026" />);
    expect(screen.queryByText(/🏆/)).not.toBeInTheDocument();
    expect(screen.queryByText(/2nd/)).not.toBeInTheDocument();
  });

  it('renders with available false', () => {
    const info: YearInfo = {
      year: 2030,
      host: 'TBD',
      champion: null,
      runnerUp: null,
      available: false,
    };
    render(<YearCard info={info} href="/wc/2030" />);
    expect(screen.getByText('2030')).toBeInTheDocument();
  });
});
