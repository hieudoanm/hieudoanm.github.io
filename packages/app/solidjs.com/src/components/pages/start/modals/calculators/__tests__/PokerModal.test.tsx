import { render, screen, fireEvent } from '@solidjs/testing-library';
import { PokerModal } from '../PokerModal';

describe('PokerModal', () => {
  it('renders Your hand section', () => {
    render(() => <PokerModal onClose={() => {}} />);
    expect(screen.getByText('Your hand')).toBeInTheDocument();
  });

  it('renders Opponent hand section', () => {
    render(() => <PokerModal onClose={() => {}} />);
    expect(screen.getByText("Opponent's hand")).toBeInTheDocument();
  });

  it('renders Community section', () => {
    render(() => <PokerModal onClose={() => {}} />);
    expect(screen.getByText('Community')).toBeInTheDocument();
  });

  it('renders Calculate button', () => {
    render(() => <PokerModal onClose={() => {}} />);
    expect(screen.getByText('Calculate')).toBeInTheDocument();
  });

  it('renders Reset button', () => {
    render(() => <PokerModal onClose={() => {}} />);
    expect(screen.getByText('Reset')).toBeInTheDocument();
  });

  it('renders placeholder message when no cards selected', () => {
    render(() => <PokerModal onClose={() => {}} />);
    expect(screen.getByText(/Add both hole cards/)).toBeInTheDocument();
  });
});
