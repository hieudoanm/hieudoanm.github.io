import { Insights } from '@chess/app/api/chess/players/[username]/insights/model';
import { mockResizeObserver } from '@chess/common/utils/mock-resize-observer';
import { render } from '@testing-library/react';
import { InsightsCalendarTimeOfDays } from '..';

describe('InsightsCalendarTimeOfDays', () => {
  beforeEach(() => {
    mockResizeObserver();
  });

  it('to match snapshot', () => {
    const { container } = render(
      <InsightsCalendarTimeOfDays insights={{} as Insights} />
    );
    expect(container).toMatchSnapshot();
  });
});
