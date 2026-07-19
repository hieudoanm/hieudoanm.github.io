import { fireEvent, render, screen } from '@testing-library/react';
import { LiveScoresTemplate } from '../LiveScoresTemplate';

describe('LiveScoresTemplate', () => {
  it('renders matches with scores and live badges', () => {
    render(<LiveScoresTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Live Scores' })
    ).toBeInTheDocument();
    expect(screen.getByText('4 matches live')).toBeInTheDocument();
    expect(screen.getByText('FC Riverside')).toBeInTheDocument();
    expect(screen.getByText('Atlas United')).toBeInTheDocument();
    expect(screen.getByText('2 — 1')).toBeInTheDocument();
    expect(screen.getByText('88 — 84')).toBeInTheDocument();
    expect(screen.getAllByText('Live')).toHaveLength(4);
  });

  it('filters matches by sport tab', () => {
    render(<LiveScoresTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Football' }));
    expect(screen.getByText('2 matches live')).toBeInTheDocument();
    expect(screen.getByText('Northport City')).toBeInTheDocument();
    expect(screen.queryByText('Lakeside Nets')).not.toBeInTheDocument();
    expect(screen.getAllByText('Live')).toHaveLength(2);
    fireEvent.click(screen.getByRole('button', { name: 'Basketball' }));
    expect(screen.getByText('2 matches live')).toBeInTheDocument();
    expect(screen.getByText('Summit Storm')).toBeInTheDocument();
    expect(screen.queryByText('FC Riverside')).not.toBeInTheDocument();
  });
});
