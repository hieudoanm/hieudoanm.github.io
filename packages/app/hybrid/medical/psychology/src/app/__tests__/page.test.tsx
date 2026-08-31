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
  it('renders the app heading and tool cards', () => {
    render(<HomePage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Psychology'
    );
    const slugs = [
      'beck-depression-inventory',
      'big-five-inventory',
      'dyadic-adjustment-scale',
      'experiences-in-close-relationships',
      'generalized-anxiety-disorder',
      'patient-health-questionnaire',
      'relationship-closeness-inventory',
      'satisfaction-with-life',
    ];
    slugs.forEach((slug) => {
      expect(screen.getByTestId(`tool-card-${slug}`)).toBeInTheDocument();
    });
  });
});
