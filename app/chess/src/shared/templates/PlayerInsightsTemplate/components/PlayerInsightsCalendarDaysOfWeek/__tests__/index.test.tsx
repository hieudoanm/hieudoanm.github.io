import { Insights } from '@chess/common/types/chess';
import { mockResizeObserver } from '@chess/common/utils/mock-resize-observer';
import { render } from '@testing-library/react';
import { PlayerInsightsCalendarDaysOfWeek } from '..';

describe('PlayerInsightsCalendarDaysOfWeek', () => {
  beforeEach(() => {
    mockResizeObserver();
  });

  it('to match snapshot', () => {
    const { container } = render(
      <PlayerInsightsCalendarDaysOfWeek insights={{} as Insights} />
    );
    expect(container).toMatchSnapshot();
  });
});
