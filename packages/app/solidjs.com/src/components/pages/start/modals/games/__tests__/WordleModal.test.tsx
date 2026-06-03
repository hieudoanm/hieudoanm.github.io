import { render, screen, fireEvent } from '@solidjs/testing-library';
import { WordleModal } from '../WordleModal';

describe('WordleModal', () => {
  it('renders the Enter button', () => {
    render(() => <WordleModal onClose={() => {}} />);
    expect(screen.getByText('Enter')).toBeInTheDocument();
  });

  it('renders the New Game button', () => {
    render(() => <WordleModal onClose={() => {}} />);
    expect(screen.getByText('New Game')).toBeInTheDocument();
  });

  it('renders the input field', () => {
    render(() => <WordleModal onClose={() => {}} />);
    const input = screen.getByPlaceholderText(
      /letter word/
    ) as HTMLInputElement;
    expect(input).toBeInTheDocument();
  });
});
