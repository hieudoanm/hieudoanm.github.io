import { Insights } from '@chess/app/api/chess/players/[username]/insights/model';
import { mockResizeObserver } from '@chess/common/utils/mock-resize-observer';
import { render } from '@testing-library/react';
import { InsightsOpponents } from '..';

describe('InsightsOpponents', () => {
  beforeEach(() => {
    mockResizeObserver();
  });

  it('to match snapshot', () => {
    const { container } = render(
      <InsightsOpponents insights={{ opponents: [] } as Insights} />
    );
    expect(container).toMatchSnapshot();
  });
});
