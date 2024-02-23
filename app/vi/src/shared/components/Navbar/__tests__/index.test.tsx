import { render } from '@testing-library/react';
import { Navbar } from '..';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
    asPath: '',
    events: { on: jest.fn(), off: jest.fn() },
  }),
}));

describe('Navbar', () => {
  it('to match snapshot', () => {
    const { container } = render(<Navbar />);
    expect(container).toMatchSnapshot();
  });
});
