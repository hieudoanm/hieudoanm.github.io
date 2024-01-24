import { Insights } from '@chess/common/types/chess';
import { mockResizeObserver } from '@chess/common/utils/mock-resize-observer';
import { render } from '@testing-library/react';
import { InsightsTemplate } from '..';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    asPath: '',
    events: { on: jest.fn(), off: jest.fn() },
  }),
}));

describe('InsightsTemplate', () => {
  beforeEach(() => {
    mockResizeObserver();
  });

  it('to match snapshot', () => {
    const { container } = render(
      <InsightsTemplate insights={{} as Insights} />
    );
    expect(container).toMatchSnapshot();
  });
});
