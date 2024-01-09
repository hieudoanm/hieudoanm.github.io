import { mockResizeObserver } from '@chess/common/utils/mock-resize-observer';
import { Insights } from '@chess/types/chess';
import { render } from '@testing-library/react';
import { ChessDaysOfWeek } from '..';

describe('ChessDaysOfWeek', () => {
  beforeEach(() => {
    mockResizeObserver();
  });

  it('to match snapshot', () => {
    const { container } = render(<ChessDaysOfWeek insights={{} as Insights} />);
    expect(container).toMatchSnapshot();
  });
});
