import { fireEvent, render, screen } from '@testing-library/react';
import { FrequencyStep } from '../FrequencyStep';
import { GAD_ITEMS, GAD_OPTIONS } from '../../utils';

describe('FrequencyStep', () => {
  it('reports frequency clicks', () => {
    const onChange = jest.fn();
    render(
      <FrequencyStep
        items={GAD_ITEMS}
        values={GAD_ITEMS.map(() => -1)}
        onChange={onChange}
      />
    );
    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(onChange).toHaveBeenCalledWith(0, GAD_OPTIONS[0].value);
  });
});
