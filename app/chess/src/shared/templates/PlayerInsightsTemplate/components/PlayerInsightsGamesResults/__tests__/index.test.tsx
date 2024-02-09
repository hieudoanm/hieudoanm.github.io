import { Insights } from '@chess/common/types/chess';
import { mockResizeObserver } from '@chess/common/utils/mock-resize-observer';
import { render } from '@testing-library/react';
import { PlayerInsightsGamesResults } from '..';

describe('PlayerInsightsGamesResults', () => {
  beforeEach(() => {
    mockResizeObserver();
  });

  it('to match snapshot', () => {
    const { container } = render(
      <PlayerInsightsGamesResults insights={{} as Insights} />
    );
    expect(container).toMatchSnapshot();
  });
});
