import { render, screen } from '@testing-library/react';
import { BrowseSpread } from '../components/components/BrowseSpread';
import type { HistoricalEvent } from '../types';

const makeEvent = (id: string, year: number): HistoricalEvent => ({
  id,
  title: `Event ${id}`,
  year,
  description: '',
  category: 'culture',
  region: 'world',
  difficulty: 1,
  source: 'test',
});

describe('BrowseSpread', () => {
  it('renders rows from its own bounds when no bounds prop is given', () => {
    render(
      <BrowseSpread
        events={[makeEvent('a', 1960), makeEvent('b', 2000)]}
        selectedId={null}
        onSelect={() => undefined}
      />
    );

    expect(screen.getByText('1960')).toBeInTheDocument();
    expect(screen.getByText('2000')).toBeInTheDocument();
    expect(screen.queryByText('1955')).not.toBeInTheDocument();
  });

  it('renders the full shared year range when bounds are given', () => {
    render(
      <BrowseSpread
        events={[makeEvent('a', 1960), makeEvent('b', 2000)]}
        selectedId={null}
        onSelect={() => undefined}
        bounds={{ minYear: 1950, maxYear: 2010, span: 60 }}
      />
    );

    expect(screen.getByText('1950')).toBeInTheDocument();
    expect(screen.getByText('1955')).toBeInTheDocument();
    expect(screen.getByText('2010')).toBeInTheDocument();
  });
});
