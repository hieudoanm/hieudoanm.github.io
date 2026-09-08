import InterestPage from '@/app/(games)/monetary-policy/interest/page';
import { render, screen } from '@testing-library/react';

describe('InterestPage', () => {
  it('renders the monetary policy lab', () => {
    render(<InterestPage />);
    expect(
      screen.getByRole('heading', { name: /Monetary Policy Lab/ })
    ).toBeInTheDocument();
    expect(screen.getByTestId('policy-rate')).toBeInTheDocument();
  });
});
