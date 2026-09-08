import StimulusPage from '@/app/(games)/fiscal-policy/stimulus/page';
import { render, screen } from '@testing-library/react';

describe('FiscalStimulusPage', () => {
  it('renders the fiscal multiplier lab', () => {
    render(<StimulusPage />);
    expect(
      screen.getByRole('heading', { name: /Fiscal Multiplier Lab/ })
    ).toBeInTheDocument();
    expect(screen.getByTestId('gap-amount')).toHaveTextContent('100');
  });
});
