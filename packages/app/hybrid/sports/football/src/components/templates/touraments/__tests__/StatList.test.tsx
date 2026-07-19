import { render, screen } from '@testing-library/react';
import { StatList } from '../StatList';

describe('StatList', () => {
  it('renders title and data entries', () => {
    const data = [
      { name: 'Brazil', wins: 5, years: [1958, 1962, 1970, 1994, 2002] },
      { name: 'Germany', wins: 4, years: [1954, 1974, 1990, 2014] },
    ];
    render(<StatList title="Winners" data={data} />);
    expect(screen.getByText('Winners')).toBeInTheDocument();
    expect(screen.getByText('Brazil')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('Germany')).toBeInTheDocument();
  });

  it('renders empty list', () => {
    render(<StatList title="Empty" data={[]} />);
    expect(screen.getByText('Empty')).toBeInTheDocument();
  });
});
