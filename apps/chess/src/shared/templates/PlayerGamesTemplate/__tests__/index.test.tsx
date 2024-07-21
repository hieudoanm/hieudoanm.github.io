import { mockResizeObserver } from '@chess/common/utils/mock-resize-observer';
import { render } from '@testing-library/react';
import { PlayerGamesTemplate } from '..';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({
    asPath: '',
    events: { on: jest.fn(), off: jest.fn() },
  }),
}));

describe('PlayerGamesTemplate', () => {
  beforeEach(() => {
    mockResizeObserver();
  });

  it('to match snapshot', () => {
    const { container } = render(
      <PlayerGamesTemplate games={[]} username="hikaru" />
    );
    expect(container).toMatchSnapshot();
  });
});
