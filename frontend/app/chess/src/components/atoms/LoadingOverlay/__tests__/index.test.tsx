import { render } from '@testing-library/react';
import { LoadingOverlay } from '..';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({
    asPath: '',
    events: { on: jest.fn(), off: jest.fn() },
  }),
  usePathname: jest.fn().mockResolvedValue(''),
  useSearchParams: jest.fn().mockResolvedValue(new URLSearchParams()),
}));

describe('LoadingOverlay', () => {
  it('to match snapshot', () => {
    const { container } = render(<LoadingOverlay />);
    expect(container).toMatchSnapshot();
  });
});
