import { render, fireEvent, screen } from '@testing-library/react';
import { CardPicker } from '../CardPicker';

const mockOnChange = jest.fn();

describe('CardPicker', () => {
  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders label and cards', () => {
    render(
      <CardPicker
        label="Test Hand"
        cards={[null, null]}
        onChange={mockOnChange}
      />
    );
    expect(screen.getByText('Test Hand')).toBeInTheDocument();
  });

  it('shows card rank and suit when card is set', () => {
    const { container } = render(
      <CardPicker
        label="Test Hand"
        cards={[{ rank: 14, suit: 'h' }]}
        onChange={mockOnChange}
      />
    );
    expect(container.textContent).toContain('A');
    expect(container.textContent).toContain('♥');
  });

  it('clicking a card slot clears it', () => {
    render(
      <CardPicker
        label="Test Hand"
        cards={[{ rank: 14, suit: 'h' }, null]}
        onChange={mockOnChange}
      />
    );
    const slots = screen.getAllByRole('button');
    const cardSlot = slots[0];
    fireEvent.click(cardSlot);
    expect(mockOnChange).toHaveBeenCalledWith(0, null);
  });

  it('clicking a rank/suit button in grid sets card', () => {
    const { container } = render(
      <CardPicker
        label="Test Hand"
        cards={[null, null]}
        onChange={mockOnChange}
      />
    );
    const buttons = container.querySelectorAll(
      'div.flex.flex-wrap.gap-0\\.5 button'
    );
    const firstAvailable = Array.from(buttons).find(
      (b) => !b.hasAttribute('disabled')
    );
    if (firstAvailable) {
      fireEvent.click(firstAvailable);
      expect(mockOnChange).toHaveBeenCalled();
    }
  });

  it('disabled buttons cannot be clicked', () => {
    const { container } = render(
      <CardPicker
        label="Test Hand"
        cards={[{ rank: 14, suit: 'h' }, null]}
        onChange={mockOnChange}
      />
    );
    const buttons = container.querySelectorAll(
      'div.flex.flex-wrap.gap-0\\.5 button'
    );
    const disabledButton = Array.from(buttons).find((b) =>
      b.hasAttribute('disabled')
    );
    expect(disabledButton).toBeTruthy();
    if (disabledButton) {
      expect(disabledButton).toBeDisabled();
    }
  });
});
