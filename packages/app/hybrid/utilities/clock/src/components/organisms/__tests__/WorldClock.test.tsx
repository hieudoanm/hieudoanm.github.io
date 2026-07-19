import { render, screen } from '@testing-library/react';
import { WorldClock } from '../WorldClock';

const mockTimes = [
  '05:30:00',
  '07:30:00',
  '06:30:00',
  '12:30:00',
  '13:30:00',
  '13:30:00',
  '14:30:00',
  '16:30:00',
  '18:30:00',
  '19:30:00',
  '19:30:00',
  '20:30:00',
  '21:30:00',
  '22:30:00',
];

describe('WorldClock', () => {
  it('renders all cities when no query', () => {
    render(<WorldClock times={mockTimes} weatherQueries={[]} query="" />);
    expect(screen.getByText('Tokyo')).toBeInTheDocument();
    expect(screen.getByText('Dallas')).toBeInTheDocument();
  });

  it('filters cities by query', () => {
    render(<WorldClock times={mockTimes} weatherQueries={[]} query="tokyo" />);
    expect(screen.getByText('Tokyo')).toBeInTheDocument();
    expect(screen.queryByText('Dallas')).not.toBeInTheDocument();
  });

  it('shows no match message', () => {
    render(<WorldClock times={mockTimes} weatherQueries={[]} query="xyz" />);
    expect(screen.getByText(/No cities match/)).toBeInTheDocument();
  });

  it('shows weather credit', () => {
    render(<WorldClock times={mockTimes} weatherQueries={[]} query="" />);
    expect(screen.getByText(/Weather via Open-Meteo/)).toBeInTheDocument();
  });
});
