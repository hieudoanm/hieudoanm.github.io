import { fireEvent, render, screen } from '@testing-library/react';
import { TimeStep } from '../TimeStep';
import { TIME_SLOTS } from '../../utils';

describe('TimeStep', () => {
  it('clamps hour entries to zero or above', () => {
    const onChange = jest.fn();
    render(
      <TimeStep
        values={TIME_SLOTS.map(() => ({ hours: 0, minutes: 0 }))}
        onChange={onChange}
      />
    );
    fireEvent.change(screen.getAllByRole('spinbutton')[0], {
      target: { value: '2' },
    });
    expect(onChange).toHaveBeenCalledWith(0, 'hours', 2);
  });
});
