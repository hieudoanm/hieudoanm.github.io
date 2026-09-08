import BubblePage from '@/app/(games)/behavioral-finance/bubble/page';
import { render, screen } from '@testing-library/react';

describe('BubblePage', () => {
  it('renders the bubble lab', () => {
    render(<BubblePage />);
    expect(
      screen.getByRole('heading', { name: /Bubble Lab/ })
    ).toBeInTheDocument();
    expect(screen.getByTestId('buy')).toBeInTheDocument();
    expect(screen.getByTestId('round')).toBeInTheDocument();
  });
});
