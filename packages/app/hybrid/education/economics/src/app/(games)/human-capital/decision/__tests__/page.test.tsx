import HumanCapitalPage from '@/app/(games)/human-capital/decision/page';
import { render, screen } from '@testing-library/react';

describe('HumanCapitalPage', () => {
  it('renders the human capital decision simulator', () => {
    render(<HumanCapitalPage />);
    expect(
      screen.getByRole('heading', { name: /Human Capital Decision/ })
    ).toBeInTheDocument();
    expect(screen.getByTestId('check')).toBeInTheDocument();
    expect(screen.getByTestId('reset')).toBeInTheDocument();
  });
});
