import { Insights } from '@chess/common/types/chess';
import { mockResizeObserver } from '@chess/common/utils/mock-resize-observer';
import { render } from '@testing-library/react';
import { PlayerInsightsCalendarTimeOfDays } from '..';

describe('PlayerInsightsCalendarTimeOfDays', () => {
  beforeEach(() => {
    mockResizeObserver();
  });

  it('to match snapshot', () => {
    const { container } = render(
      <PlayerInsightsCalendarTimeOfDays insights={{} as Insights} />
    );
    expect(container).toMatchSnapshot();
  });
});
