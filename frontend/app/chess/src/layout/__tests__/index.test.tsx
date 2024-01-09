import { UserProvider } from '@auth0/nextjs-auth0/client';
import { render } from '@testing-library/react';
import { Layout } from '..';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    asPath: '',
    events: { on: jest.fn(), off: jest.fn() },
  }),
}));

describe('Layout', () => {
  it('to match snapshot', () => {
    const { container } = render(
      <UserProvider>
        <Layout>
          <></>
        </Layout>
      </UserProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
