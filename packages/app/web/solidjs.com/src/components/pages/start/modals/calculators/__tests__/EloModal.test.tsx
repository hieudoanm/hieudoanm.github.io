import { render, screen, fireEvent } from '@solidjs/testing-library';
import { EloModal } from '../EloModal';

vi.mock('@chess/ts', () => ({
  calculateRating: () => 1016,
  calculatePerformance: () => 1800,
  Score: { WIN: 'win', DRAW: 'draw', LOSS: 'loss' },
  TimeClass: { CLASSICAL: 'classical' },
}));

describe('EloModal', () => {
  it('renders Rating and Performance tabs', () => {
    render(() => <EloModal onClose={() => {}} />);
    expect(screen.getByText('Rating')).toBeInTheDocument();
    expect(screen.getByText('Performance')).toBeInTheDocument();
  });

  it('renders Rating tab inputs by default', () => {
    render(() => <EloModal onClose={() => {}} />);
    expect(screen.getByText('Your Rating')).toBeInTheDocument();
    expect(screen.getByText('Opponent Rating')).toBeInTheDocument();
    expect(screen.getByText('Score')).toBeInTheDocument();
  });

  it('renders Calculate Rating button', () => {
    render(() => <EloModal onClose={() => {}} />);
    expect(screen.getByText('Calculate Rating')).toBeInTheDocument();
  });

  it('switches to Performance tab', () => {
    render(() => <EloModal onClose={() => {}} />);
    const tabs = screen.getAllByText('Performance');
    fireEvent.click(tabs[0]);
    const activeTabs = screen
      .getAllByText('Performance')
      .filter((t) => t.classList.contains('tab-active'));
    expect(activeTabs.length).toBe(1);
  });
});
