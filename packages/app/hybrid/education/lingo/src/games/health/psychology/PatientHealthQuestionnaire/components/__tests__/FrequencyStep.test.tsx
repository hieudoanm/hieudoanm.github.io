import { fireEvent, render, screen } from '@testing-library/react';
import { FrequencyStep } from '../FrequencyStep';
import { PHQ_ITEMS, PHQ_OPTIONS } from '../../utils';

describe('FrequencyStep', () => {
  it('reports frequency clicks', () => {
    const onChange = jest.fn();
    render(
      <FrequencyStep
        items={PHQ_ITEMS}
        values={PHQ_ITEMS.map(() => -1)}
        onChange={onChange}
      />
    );
    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(onChange).toHaveBeenCalledWith(0, PHQ_OPTIONS[0].value);
  });
});
