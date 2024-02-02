import { Insights } from '@chess/common/types/chess';
import { mockResizeObserver } from '@chess/common/utils/mock-resize-observer';
import { render } from '@testing-library/react';
import { ChessOpponents } from '..';

describe('ChessOpponents', () => {
  beforeEach(() => {
    mockResizeObserver();
  });

  it('to match snapshot', () => {
    const { container } = render(
      <ChessOpponents insights={{ opponents: [] } as Insights} />
    );
    expect(container).toMatchSnapshot();
  });
});
