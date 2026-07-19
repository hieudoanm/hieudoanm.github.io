import { fireEvent, render, screen } from '@testing-library/react';
import { ToggleGroup } from '../ToggleGroup';

describe('ToggleGroup', () => {
  const options = [
    { label: 'Bold', value: 'bold' },
    { label: 'Italic', value: 'italic' },
  ];

  it('selects a single option', () => {
    const onChange = jest.fn();
    render(<ToggleGroup options={options} value="bold" onChange={onChange} />);
    expect(screen.getByRole('button', { name: 'Bold' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    fireEvent.click(screen.getByRole('button', { name: 'Italic' }));
    expect(onChange).toHaveBeenCalledWith('italic');
  });

  it('toggles options in multiple mode', () => {
    const onChange = jest.fn();
    render(
      <ToggleGroup
        options={options}
        value={['bold']}
        onChange={onChange}
        multiple
      />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Italic' }));
    expect(onChange).toHaveBeenCalledWith(['bold', 'italic']);
    fireEvent.click(screen.getByRole('button', { name: 'Bold' }));
    expect(onChange).toHaveBeenCalledWith([]);
  });

  it('disables the buttons', () => {
    render(
      <ToggleGroup
        options={options}
        value="bold"
        onChange={jest.fn()}
        disabled
      />
    );
    expect(screen.getByRole('button', { name: 'Bold' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Italic' })).toBeDisabled();
  });
});
