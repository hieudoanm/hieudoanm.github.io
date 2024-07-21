import { mockResizeObserver } from '@chess/common/utils/mock-resize-observer';
import { render } from '@testing-library/react';
import { PlayerRecords } from '..';

describe('PlayerRecords', () => {
  beforeEach(() => {
    mockResizeObserver();
  });

  it('to match snapshot', () => {
    const { container } = render(<PlayerRecords stats={[]} />);
    expect(container).toMatchSnapshot();
  });
});
