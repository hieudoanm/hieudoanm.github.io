import { render, screen, fireEvent } from '@solidjs/testing-library';
import { BlackjackModal } from '../BlackjackModal';

describe('BlackjackModal', () => {
  it('renders Deal, Reveal, and Reset buttons', () => {
    render(() => <BlackjackModal onClose={() => {}} />);
    expect(screen.getByText('Deal')).toBeInTheDocument();
    expect(screen.getByText('Reveal')).toBeInTheDocument();
    expect(screen.getByText('Reset')).toBeInTheDocument();
  });

  it('shows deck size', () => {
    render(() => <BlackjackModal onClose={() => {}} />);
    expect(screen.getByText(/Cards left/)).toBeInTheDocument();
  });

  it('deals a card when Deal is clicked', () => {
    render(() => <BlackjackModal onClose={() => {}} />);
    fireEvent.click(screen.getByText('Deal'));
    expect(screen.queryByText('Deal a card to start')).not.toBeInTheDocument();
  });

  it('shows the count when Reveal is clicked', () => {
    render(() => <BlackjackModal onClose={() => {}} />);
    fireEvent.click(screen.getByText('Deal'));
    fireEvent.click(screen.getByText('Reveal'));
    expect(screen.getByText(/Count/)).toBeInTheDocument();
  });
});
