import { render, screen } from '@testing-library/react';
import StatementsPage from '@/app/(templates)/finance/statements/page';

describe('StatementsPage', () => {
  it('renders the StatementsPage', () => {
    render(<StatementsPage />);
    expect(screen.getByText('July 2026')).toBeInTheDocument();
  });
});
