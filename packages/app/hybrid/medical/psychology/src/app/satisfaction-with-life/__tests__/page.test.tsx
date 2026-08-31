import { render, screen } from '@testing-library/react';
import SatisfactionWithLifePage from '@/app/satisfaction-with-life/page';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

describe('SatisfactionWithLifePage', () => {
  it('renders its scale wizard', () => {
    render(<SatisfactionWithLifePage />);
    expect(screen.getAllByRole('button').length).toBeGreaterThan(0);
  });
});
