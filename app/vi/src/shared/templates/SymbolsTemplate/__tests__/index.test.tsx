import { render } from '@testing-library/react';
import { SymbolsTemplate } from '..';

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn().mockReturnValue(new URLSearchParams()),
  usePathname: jest.fn().mockReturnValue(''),
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
    asPath: '',
    events: { on: jest.fn(), off: jest.fn() },
  }),
}));

describe('SymbolsTemplate', () => {
  it('to match snapshot', () => {
    const { container } = render(
      <SymbolsTemplate title="" stockSymbols={[]} />
    );
    expect(container).toMatchSnapshot();
  });
});
