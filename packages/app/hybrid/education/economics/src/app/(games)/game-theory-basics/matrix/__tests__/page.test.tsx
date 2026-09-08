import MatrixPage from '@/app/(games)/game-theory-basics/matrix/page';
import { render, screen } from '@testing-library/react';

describe('MatrixPage', () => {
  it('renders the Matrix Explorer', () => {
    render(<MatrixPage />);
    expect(
      screen.getByRole('heading', { level: 1, name: /Matrix Explorer/ })
    ).toBeInTheDocument();
    expect(screen.getByTestId('game-select')).toBeInTheDocument();
  });
});
