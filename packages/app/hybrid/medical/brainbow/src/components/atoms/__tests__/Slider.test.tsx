import { fireEvent, render, screen } from '@testing-library/react';
import { Slider } from '@/components/atoms/Slider';

describe('Slider', () => {
  it('emits numeric values on change', () => {
    const onChange = jest.fn();
    render(
      <Slider
        value={50}
        min={0}
        max={100}
        ariaLabel="opacity"
        onChange={onChange}
      />
    );
    const slider = screen.getByRole('slider', { name: 'opacity' });
    fireEvent.change(slider, { target: { value: '75' } });
    expect(onChange).toHaveBeenCalledWith(75);
  });
});
