import { render } from '@testing-library/react';
import { PageHeading } from '..';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
    asPath: '',
    events: { on: jest.fn(), off: jest.fn() },
  }),
}));

describe('PageHeading', () => {
  it('to match snapshot', () => {
    const { container } = render(<PageHeading />);
    expect(container).toMatchSnapshot();
  });
});
