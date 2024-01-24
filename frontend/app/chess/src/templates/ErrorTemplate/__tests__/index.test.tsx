import { UserProvider } from '@auth0/nextjs-auth0/client';
import { mockResizeObserver } from '@chess/common/utils/mock-resize-observer';
import { render } from '@testing-library/react';
import { ErrorTemplate } from '..';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    asPath: '',
    events: { on: jest.fn(), off: jest.fn() },
  }),
}));

describe('ErrorTemplate', () => {
  beforeEach(() => {
    mockResizeObserver();
  });

  it('to match snapshot', () => {
    const { container } = render(
      <UserProvider>
        <ErrorTemplate status={500} message="Error" />
      </UserProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
