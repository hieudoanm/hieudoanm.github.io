import { mockResizeObserver } from '@chess/common/utils/mock-resize-observer';
import { render } from '@testing-library/react';
import { TitledTemplate } from '..';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({
    asPath: '',
    events: { on: jest.fn(), off: jest.fn() },
  }),
}));

describe('TitledTemplate', () => {
  beforeEach(() => {
    mockResizeObserver();
  });

  it('to match snapshot', () => {
    const { container } = render(
      <TitledTemplate
        title={'GM'}
        total={0}
        timeRange={'year'}
        players={[]}
        averageRapidRating={0}
        maxRapidRating={0}
        averageBlitzRating={0}
        maxBlitzRating={0}
        averageBulletRating={0}
        maxBulletRating={0}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
