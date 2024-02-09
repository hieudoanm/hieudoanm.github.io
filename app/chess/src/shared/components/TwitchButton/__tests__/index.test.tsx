import { render } from '@testing-library/react';
import { TwitchButton } from '..';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({
    asPath: '',
    events: { on: jest.fn(), off: jest.fn() },
  }),
  usePathname: jest.fn().mockResolvedValue(''),
  useSearchParams: jest.fn().mockResolvedValue(new URLSearchParams()),
}));

describe('TwitchButton', () => {
  it('to match snapshot', () => {
    const { container } = render(<TwitchButton />);
    expect(container).toMatchSnapshot();
  });
});
