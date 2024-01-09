import { mockResizeObserver } from '@chess/common/utils/mock-resize-observer';
import { Insights } from '@chess/types/chess';
import { render } from '@testing-library/react';
import { ChessTimeOfDays } from '..';

describe('ChessTimeOfDays', () => {
  beforeEach(() => {
    mockResizeObserver();
  });

  it('to match snapshot', () => {
    const { container } = render(<ChessTimeOfDays insights={{} as Insights} />);
    expect(container).toMatchSnapshot();
  });
});
