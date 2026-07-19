import { render, screen } from '@testing-library/react';
import GeneralizedAnxietyDisorderPage from '@/app/generalized-anxiety-disorder/page';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

describe('GeneralizedAnxietyDisorderPage', () => {
  it('renders its scale wizard', () => {
    render(<GeneralizedAnxietyDisorderPage />);
    expect(screen.getAllByRole('button').length).toBeGreaterThan(0);
  });
});
