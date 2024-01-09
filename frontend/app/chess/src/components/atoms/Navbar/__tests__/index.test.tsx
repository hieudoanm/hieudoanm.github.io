import { UserProvider } from '@auth0/nextjs-auth0/client';
import { render } from '@testing-library/react';
import { Navbar } from '..';

describe('Navbar', () => {
  it('to match snapshot', () => {
    const { container } = render(
      <UserProvider>
        <Navbar />
      </UserProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
