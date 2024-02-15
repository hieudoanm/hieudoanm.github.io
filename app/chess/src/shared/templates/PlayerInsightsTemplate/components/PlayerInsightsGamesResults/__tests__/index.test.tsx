import { Insights } from '@chess/app/api/chess/players/[username]/insights/model';
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
