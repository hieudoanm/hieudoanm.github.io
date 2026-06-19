import { render, screen, fireEvent } from '@solidjs/testing-library';
import { KaprekarModal } from '../KaprekarModal';

describe('KaprekarModal', () => {
  it('renders the title header', () => {
    render(() => <KaprekarModal onClose={() => {}} />);
    expect(screen.getByText(/Kaprekar/)).toBeInTheDocument();
  });

  it('renders Reset button', () => {
    render(() => <KaprekarModal onClose={() => {}} />);
    expect(screen.getByText('Reset')).toBeInTheDocument();
  });

  it('renders number input', () => {
    render(() => <KaprekarModal onClose={() => {}} />);
    const input = document.querySelector(
      'input[type="number"]'
    ) as HTMLInputElement;
    expect(input).toBeInTheDocument();
  });

  it('renders increment and decrement buttons', () => {
    render(() => <KaprekarModal onClose={() => {}} />);
    expect(screen.getByText('−')).toBeInTheDocument();
    expect(screen.getByText('+')).toBeInTheDocument();
  });

  it('shows Kaprekar constant for 6174', () => {
    render(() => <KaprekarModal onClose={() => {}} />);
    expect(screen.getByText('6174')).toBeInTheDocument();
  });
});
