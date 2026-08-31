import { fireEvent, render, screen } from '@testing-library/react';
import { ActivitiesStep } from '../ActivitiesStep';
import { ACTIVITIES } from '../../utils';

describe('ActivitiesStep', () => {
  it('toggles activities', () => {
    const onChange = jest.fn();
    render(
      <ActivitiesStep
        values={ACTIVITIES.map(() => false)}
        onChange={onChange}
      />
    );
    fireEvent.click(screen.getAllByRole('checkbox')[0]);
    expect(onChange).toHaveBeenCalledWith(0);
  });
});
