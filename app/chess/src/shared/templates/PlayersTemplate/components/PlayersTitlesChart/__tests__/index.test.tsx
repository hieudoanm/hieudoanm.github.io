import { mockResizeObserver } from '@chess/common/utils/mock-resize-observer';
import { render } from '@testing-library/react';
import { PlayersTitlesChart } from '..';

beforeEach(() => {
  mockResizeObserver();
});

describe('PlayersTitlesChart', () => {
  it('to match snapshot', () => {
    const { container } = render(<PlayersTitlesChart titles={[]} />);
    expect(container).toMatchSnapshot();
  });
});
