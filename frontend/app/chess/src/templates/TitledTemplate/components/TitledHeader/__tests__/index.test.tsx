import { render } from '@testing-library/react';
import { TitledHeader } from '..';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({
    asPath: '',
    events: { on: jest.fn(), off: jest.fn() },
  }),
  usePathname: jest.fn().mockReturnValue(''),
  useSearchParams: jest.fn().mockReturnValue(new URLSearchParams()),
}));

describe('TitledHeader', () => {
  it('to match snapshot', () => {
    const { container } = render(<TitledHeader total={0} />);
    expect(container).toMatchSnapshot();
  });
});
