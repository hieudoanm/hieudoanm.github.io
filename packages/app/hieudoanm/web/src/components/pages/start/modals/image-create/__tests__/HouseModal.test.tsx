import { render, screen, fireEvent } from '@testing-library/react';
import { HouseModal } from '../HouseModal';

const renderHouseModal = (onClose = jest.fn()) =>
  render(<HouseModal onClose={onClose} />);

describe('HouseModal', () => {
  it('should render with default name', () => {
    renderHouseModal();
    expect(screen.getByDisplayValue('House')).toBeInTheDocument();
    expect(screen.getByText('H')).toBeInTheDocument();
    expect(screen.getByText('O')).toBeInTheDocument();
    expect(screen.getByText('U')).toBeInTheDocument();
    expect(screen.getByText('S')).toBeInTheDocument();
    expect(screen.getByText('E')).toBeInTheDocument();
    expect(screen.getByText('M.D.')).toBeInTheDocument();
  });

  it('should update letters when input changes', () => {
    renderHouseModal();
    const input = screen.getByDisplayValue('House');
    fireEvent.change(input, { target: { value: 'Heisenberg' } });
    expect(screen.getByText('H')).toBeInTheDocument();
    expect(screen.getAllByText('E').length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText('I')).toBeInTheDocument();
    expect(screen.getByText('S')).toBeInTheDocument();
    expect(screen.getByText('N')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText('R')).toBeInTheDocument();
    expect(screen.getByText('G')).toBeInTheDocument();
  });

  it('should reset to House when reset button clicked', () => {
    renderHouseModal();
    const input = screen.getByDisplayValue('House');
    fireEvent.change(input, { target: { value: 'Walter' } });
    expect(screen.getByDisplayValue('Walter')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Reset'));
    expect(screen.getByDisplayValue('House')).toBeInTheDocument();
  });

  it('should show nothing when name is empty', () => {
    const { container } = renderHouseModal();
    const input = screen.getByDisplayValue('House');
    fireEvent.change(input, { target: { value: '' } });
    const letterContainer = container.querySelector('.min-h-36');
    expect(letterContainer?.children.length ?? 0).toBe(0);
  });

  it('should trim whitespace from name', () => {
    renderHouseModal();
    const input = screen.getByDisplayValue('House');
    fireEvent.change(input, { target: { value: '  Ab  ' } });
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
  });

  it('should apply full border to first letter', () => {
    renderHouseModal();
    const firstLetter = screen.getByText('H');
    expect(firstLetter.className).toContain('border-4');
  });

  it('should apply only bottom border to non-first letters', () => {
    const { container } = renderHouseModal();
    const preview = container.querySelector('.min-h-36 .flex');
    const letters = preview?.querySelectorAll('.border-base-content') ?? [];
    for (let i = 1; i < letters.length; i++) {
      expect(letters[i].className).toContain('border-b-4');
    }
  });
});
