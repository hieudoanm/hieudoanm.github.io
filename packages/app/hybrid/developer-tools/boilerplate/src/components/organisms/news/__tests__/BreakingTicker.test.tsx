import { act, render, screen } from '@testing-library/react';
import { BreakingTicker } from '../BreakingTicker';

const items = [
  'Storm warning issued',
  'Markets hit record high',
  'New transit line opens',
];

describe('BreakingTicker', () => {
  it('renders all ticker items', () => {
    render(<BreakingTicker items={items} />);
    expect(screen.getByText('Storm warning issued')).toBeInTheDocument();
    expect(screen.getByText('Markets hit record high')).toBeInTheDocument();
    expect(screen.getByText('New transit line opens')).toBeInTheDocument();
  });

  it('renders the label', () => {
    render(<BreakingTicker items={items} label="Urgent" />);
    expect(screen.getByText('Urgent')).toBeInTheDocument();
  });

  it('applies the CSS scroll animation to the track', () => {
    render(<BreakingTicker items={items} />);
    expect(screen.getByTestId('breaking-ticker-track')).toHaveClass(
      'ticker-scroll'
    );
  });

  it('rotates the active item on an interval', () => {
    jest.useFakeTimers();
    render(<BreakingTicker items={['First', 'Second']} intervalMs={3000} />);
    expect(screen.getByText('First')).toHaveAttribute('data-active', 'true');
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(screen.getByText('Second')).toHaveAttribute('data-active', 'true');
    jest.useRealTimers();
  });

  it('handles an empty items list', () => {
    render(<BreakingTicker items={[]} />);
    expect(screen.getByTestId('breaking-ticker')).toBeInTheDocument();
    expect(screen.queryAllByText(/warning|record|line/i)).toHaveLength(0);
  });
});
