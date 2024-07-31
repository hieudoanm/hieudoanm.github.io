import { Insights } from '@chess/app/api/chess/players/[username]/insights/model';
import { mockResizeObserver } from '@chess/common/utils/mock-resize-observer';
import { render } from '@testing-library/react';
import { InsightsCalendar } from '..';

describe('InsightsCalendar', () => {
  beforeEach(() => {
    mockResizeObserver();
  });

  it('to match snapshot', () => {
    const { container } = render(
      <InsightsCalendar insights={{} as Insights} />
    );
    expect(container).toMatchSnapshot();
  });
});
