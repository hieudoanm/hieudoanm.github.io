import { render } from '@testing-library/react';
import { Hero } from '..';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
    asPath: '',
    events: { on: jest.fn(), off: jest.fn() },
  }),
}));

describe('Hero', () => {
  it('to match snapshot', () => {
    const { container } = render(<Hero />);
    expect(container).toMatchSnapshot();
  });
});
