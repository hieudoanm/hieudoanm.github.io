import { render, screen } from '@testing-library/react';
import { DataViz } from '../DataViz';

const data = [
  { label: 'Q1', value: 40 },
  { label: 'Q2', value: 100 },
  { label: 'Q3', value: 70 },
];

describe('DataViz', () => {
  it('renders data labels and values', () => {
    render(<DataViz data={data} />);
    expect(screen.getByText('Q1')).toBeInTheDocument();
    expect(screen.getByText('Q2')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('70')).toBeInTheDocument();
  });

  it('scales the max value bar to full height', () => {
    render(<DataViz data={data} />);
    expect(screen.getByTestId('bar-1')).toHaveStyle('height: 100%');
    expect(screen.getByTestId('bar-0')).toHaveStyle('height: 40%');
  });

  it('appends the unit to values', () => {
    render(<DataViz data={data} unit="%" />);
    expect(screen.getByText('40%')).toBeInTheDocument();
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  it('handles an empty data array', () => {
    render(<DataViz data={[]} />);
    expect(screen.getByTestId('data-viz')).toBeInTheDocument();
    expect(screen.queryAllByTestId(/^bar-/)).toHaveLength(0);
  });
});
