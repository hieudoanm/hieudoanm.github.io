import { render } from '@testing-library/react';
import { Heading } from '..';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
    asPath: '',
    events: { on: jest.fn(), off: jest.fn() },
  }),
}));

describe('Heading', () => {
  it('to match snapshot', () => {
    const { container } = render(<Heading />);
    expect(container).toMatchSnapshot();
  });
});
