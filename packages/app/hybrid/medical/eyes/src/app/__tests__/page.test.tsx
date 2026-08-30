import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

describe('HomePage', () => {
  it('renders the app heading and chart cards', () => {
    render(<HomePage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Eyes');
    expect(screen.getByTestId('chart-card-snellen')).toBeInTheDocument();
    expect(screen.getByTestId('chart-card-logmar')).toBeInTheDocument();
    expect(screen.getByTestId('chart-card-tumbling-e')).toBeInTheDocument();
  });
});
