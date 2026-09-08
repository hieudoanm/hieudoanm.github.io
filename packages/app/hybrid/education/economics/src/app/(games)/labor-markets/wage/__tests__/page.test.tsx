import WagePage from '@/app/(games)/labor-markets/wage/page';
import { render, screen } from '@testing-library/react';

describe('WagePage', () => {
  it('renders the labor market lab', () => {
    render(<WagePage />);
    expect(
      screen.getByRole('heading', { name: /Labor Market Lab/ })
    ).toBeInTheDocument();
    expect(screen.getByTestId('min-wage')).toBeInTheDocument();
    expect(screen.getByTestId('start-quiz')).toBeInTheDocument();
  });
});
