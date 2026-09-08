import RollbackPage from '@/app/(games)/backward-induction/rollback/page';
import { render, screen } from '@testing-library/react';

describe('RollbackPage', () => {
  it('renders the rollback entry game', () => {
    render(<RollbackPage />);
    expect(
      screen.getByRole('heading', { name: /Rollback: Entry Game/ })
    ).toBeInTheDocument();
    expect(screen.getByText('You are the Entrant.')).toBeInTheDocument();
  });
});
