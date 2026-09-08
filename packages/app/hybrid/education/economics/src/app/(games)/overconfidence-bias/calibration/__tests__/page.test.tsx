import CalibrationPage from '@/app/(games)/overconfidence-bias/calibration/page';
import { render, screen } from '@testing-library/react';

describe('CalibrationPage', () => {
  it('renders the calibration challenge', () => {
    render(<CalibrationPage />);
    expect(
      screen.getByRole('heading', { name: /Calibration Challenge/ })
    ).toBeInTheDocument();
    expect(screen.getByTestId('question')).toBeInTheDocument();
  });
});
