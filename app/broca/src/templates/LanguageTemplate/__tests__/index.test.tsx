import { Language } from '@prisma/client';
import { render } from '@testing-library/react';
import { LanguageTemplate } from '..';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({
    asPath: '',
    events: { on: jest.fn(), off: jest.fn() },
  }),
  usePathname: jest.fn().mockReturnValue(''),
  useSearchParams: jest.fn().mockReturnValue(new URLSearchParams()),
}));

describe('LanguageTemplate', () => {
  it('to match snapshot', () => {
    const { container } = render(
      <LanguageTemplate language={{} as Language} />
    );
    expect(container).toMatchSnapshot();
  });
});
