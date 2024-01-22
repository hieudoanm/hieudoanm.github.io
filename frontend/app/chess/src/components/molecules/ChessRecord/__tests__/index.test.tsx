import { mockResizeObserver } from '@chess/common/utils/mock-resize-observer';
import { render } from '@testing-library/react';
import { ChessRecord } from '..';

describe('ChessRecord', () => {
  beforeEach(() => {
    mockResizeObserver();
  });

  it('to match snapshot', () => {
    const { container } = render(
      <ChessRecord timeClass="" win={0} draw={0} loss={0} />
    );
    expect(container).toMatchSnapshot();
  });
});
