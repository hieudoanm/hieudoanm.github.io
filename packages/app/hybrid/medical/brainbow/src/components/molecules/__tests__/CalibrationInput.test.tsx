import { fireEvent, render, screen } from '@testing-library/react';
import { CalibrationInput } from '@/components/molecules/CalibrationInput';

describe('CalibrationInput', () => {
  it('emits the parsed pixels-per-micron value', () => {
    const onChange = jest.fn();
    render(<CalibrationInput value={null} onChange={onChange} />);
    fireEvent.change(screen.getByRole('spinbutton'), {
      target: { value: '4.5' },
    });
    expect(onChange).toHaveBeenCalledWith(4.5);
  });

  it('emits null when cleared or invalid', () => {
    const onChange = jest.fn();
    render(<CalibrationInput value={4.5} onChange={onChange} />);
    fireEvent.change(screen.getByRole('spinbutton'), {
      target: { value: '' },
    });
    expect(onChange).toHaveBeenCalledWith(null);
  });
});
