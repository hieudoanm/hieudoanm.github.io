import { Insights } from '@chess/common/types/chess';
import { mockResizeObserver } from '@chess/common/utils/mock-resize-observer';
import { render } from '@testing-library/react';
import { PlayerInsightsCalendar } from '..';

describe('PlayerInsightsCalendar', () => {
  beforeEach(() => {
    mockResizeObserver();
  });

  it('to match snapshot', () => {
    const { container } = render(
      <PlayerInsightsCalendar insights={{} as Insights} />
    );
    expect(container).toMatchSnapshot();
  });
});
