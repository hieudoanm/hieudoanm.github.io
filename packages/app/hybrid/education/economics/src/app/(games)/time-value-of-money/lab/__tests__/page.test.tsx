import LabPage from '@/app/(games)/time-value-of-money/lab/page';
import { render, screen } from '@testing-library/react';

describe('LabPage', () => {
  it('renders the future value lab', () => {
    render(<LabPage />);
    expect(
      screen.getByRole('heading', { name: /Future Value Lab/ })
    ).toBeInTheDocument();
    expect(screen.getByTestId('principal')).toBeInTheDocument();
    expect(screen.getByTestId('rate')).toBeInTheDocument();
  });
});
