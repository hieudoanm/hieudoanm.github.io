import { mockResizeObserver } from '@chess/common/utils/mock-resize-observer';
import { Insights } from '@chess/types/chess';
import { render } from '@testing-library/react';
import { ChessGames } from '..';

describe('ChessGames', () => {
  beforeEach(() => {
    mockResizeObserver();
  });

  it('to match snapshot', () => {
    const { container } = render(<ChessGames insights={{} as Insights} />);
    expect(container).toMatchSnapshot();
  });
});
