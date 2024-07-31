import { Insights } from '@chess/app/api/chess/players/[username]/insights/model';
import { mockResizeObserver } from '@chess/common/utils/mock-resize-observer';
import { render } from '@testing-library/react';
import { InsightsCalendarDaysOfWeek } from '..';

describe('InsightsCalendarDaysOfWeek', () => {
  beforeEach(() => {
    mockResizeObserver();
  });

  it('to match snapshot', () => {
    const { container } = render(
      <InsightsCalendarDaysOfWeek insights={{} as Insights} />
    );
    expect(container).toMatchSnapshot();
  });
});
