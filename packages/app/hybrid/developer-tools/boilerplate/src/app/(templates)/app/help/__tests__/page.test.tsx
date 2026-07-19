import { render, screen } from '@testing-library/react';
import HelpPage from '@/app/(templates)/app/help/page';

describe('HelpPage', () => {
  it('renders the HelpPage', () => {
    render(<HelpPage />);
    expect(
      screen.getByRole('button', { name: /Getting Started/ })
    ).toBeInTheDocument();
  });
});
