import { render } from '@testing-library/react';
import { TitleBadge } from '..';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({
    asPath: '',
    events: { on: jest.fn(), off: jest.fn() },
  }),
  usePathname: jest.fn().mockResolvedValue(''),
  useSearchParams: jest.fn().mockResolvedValue(new URLSearchParams()),
}));

describe('TitleBadge', () => {
  it('to match snapshot', () => {
    const { container } = render(<TitleBadge title='GM' />);
    expect(container).toMatchSnapshot();
  });
});
