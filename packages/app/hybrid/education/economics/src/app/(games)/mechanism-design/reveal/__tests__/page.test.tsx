import RevealPage from '@/app/(games)/mechanism-design/reveal/page';
import { render, screen } from '@testing-library/react';

describe('RevealPage', () => {
  it('renders the revelation game', () => {
    render(<RevealPage />);
    expect(
      screen.getByRole('heading', { name: /Revelation Game/ })
    ).toBeInTheDocument();
    expect(screen.getByText(/A project costing 150/)).toBeInTheDocument();
    expect(screen.getByTestId('rule-equal')).toBeInTheDocument();
    expect(screen.getByTestId('rule-pivot')).toBeInTheDocument();
  });
});
