import { mockResizeObserver } from '@chess/common/utils/mock-resize-observer';
import { ChessTimeClass } from '@prisma/client';
import { render } from '@testing-library/react';
import { PlayerRecord } from '..';

describe('PlayerRecord', () => {
  beforeEach(() => {
    mockResizeObserver();
  });

  it('to match snapshot', () => {
    const { container } = render(
      <PlayerRecord
        timeClass={ChessTimeClass.classical}
        win={0}
        draw={0}
        loss={0}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
