import { render } from '@testing-library/react';
import { LanguagesTemplate } from '..';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({
    asPath: '',
    events: { on: jest.fn(), off: jest.fn() },
  }),
  usePathname: jest.fn().mockReturnValue(''),
  useSearchParams: jest.fn().mockReturnValue(new URLSearchParams()),
}));

describe('LanguagesTemplate', () => {
  it('to match snapshot', () => {
    const { container } = render(<LanguagesTemplate languages={[]} />);
    expect(container).toMatchSnapshot();
  });
});
