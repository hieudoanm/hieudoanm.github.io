import BusinessCyclesPage from '@/app/(games)/business-cycles/predict/page';
import { render, screen } from '@testing-library/react';

describe('BusinessCyclesPage', () => {
  it('renders the business cycle forecaster', () => {
    render(<BusinessCyclesPage />);
    expect(
      screen.getByRole('heading', { name: /Business Cycle Forecaster/ })
    ).toBeInTheDocument();
    expect(screen.getByText(/growth forecast/)).toBeInTheDocument();
    expect(screen.getByTestId('growth-input')).toBeInTheDocument();
  });
});
