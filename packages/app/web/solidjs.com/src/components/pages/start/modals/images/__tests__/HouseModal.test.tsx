import { render, screen, fireEvent } from '@solidjs/testing-library';
import { HouseModal } from '../HouseModal';

describe('HouseModal', () => {
  it('renders the default name', () => {
    render(() => <HouseModal onClose={() => {}} />);
    const letters = screen.getAllByText(/[A-Z]/);
    expect(letters.length).toBeGreaterThan(0);
  });

  it('renders the M.D. label', () => {
    render(() => <HouseModal onClose={() => {}} />);
    expect(screen.getByText('M.D.')).toBeInTheDocument();
  });

  it('renders a reset button', () => {
    render(() => <HouseModal onClose={() => {}} />);
    expect(screen.getByText('Reset')).toBeInTheDocument();
  });

  it('renders the input field', () => {
    render(() => <HouseModal onClose={() => {}} />);
    expect(screen.getByPlaceholderText('e.g. Gregory')).toBeInTheDocument();
  });

  it('updates letters when input changes', () => {
    render(() => <HouseModal onClose={() => {}} />);
    const input = screen.getByPlaceholderText(
      'e.g. Gregory'
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'ABC' } });
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText('C')).toBeInTheDocument();
  });
});
