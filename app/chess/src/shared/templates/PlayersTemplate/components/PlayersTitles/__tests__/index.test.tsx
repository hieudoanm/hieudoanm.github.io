import { mockResizeObserver } from '@chess/common/utils/mock-resize-observer';
import { render } from '@testing-library/react';
import { PlayersTitles } from '..';

beforeEach(() => {
  mockResizeObserver();
});

describe('PlayersTitles', () => {
  it('to match snapshot', () => {
    const { container } = render(<PlayersTitles titles={[]} />);
    expect(container).toMatchSnapshot();
  });
});
