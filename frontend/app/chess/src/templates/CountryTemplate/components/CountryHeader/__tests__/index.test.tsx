import { render } from '@testing-library/react';
import { CountryHeader } from '..';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({
    asPath: '',
    events: { on: jest.fn(), off: jest.fn() },
  }),
  usePathname: jest.fn().mockReturnValue(''),
  useSearchParams: jest.fn().mockReturnValue(new URLSearchParams()),
}));

describe('CountryChart', () => {
  it('to match snapshot', () => {
    const { container } = render(
      <CountryHeader countryCode="US" titles={[]} />
    );
    expect(container).toMatchSnapshot();
  });
});
