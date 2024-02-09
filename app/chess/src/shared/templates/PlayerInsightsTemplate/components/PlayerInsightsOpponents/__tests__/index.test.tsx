import { Insights } from '@chess/common/types/chess';
import { mockResizeObserver } from '@chess/common/utils/mock-resize-observer';
import { render } from '@testing-library/react';
import { PlayerInsightsOpponents } from '..';

describe('PlayerInsightsOpponents', () => {
  beforeEach(() => {
    mockResizeObserver();
  });

  it('to match snapshot', () => {
    const { container } = render(
      <PlayerInsightsOpponents insights={{ opponents: [] } as Insights} />
    );
    expect(container).toMatchSnapshot();
  });
});
