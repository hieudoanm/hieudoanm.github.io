import { render } from '@testing-library/react';
import { LayoutTemplate } from '..';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({
    asPath: '',
    events: { on: jest.fn(), off: jest.fn() },
  }),
  usePathname: jest.fn().mockReturnValue(''),
  useSearchParams: jest.fn().mockReturnValue(new URLSearchParams()),
}));

describe('LayoutTemplate', () => {
  it('to match snapshot', () => {
    const { container } = render(<LayoutTemplate />);
    expect(container).toMatchSnapshot();
  });
});
