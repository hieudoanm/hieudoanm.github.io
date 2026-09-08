import ReplicatorPage from '@/app/(games)/evolutionary-game-theory/replicator/page';
import { render, screen } from '@testing-library/react';

describe('ReplicatorPage', () => {
  it('renders the replicator dynamics lab', () => {
    render(<ReplicatorPage />);
    expect(
      screen.getByRole('heading', { name: /Replicator Dynamics Lab/ })
    ).toBeInTheDocument();
    expect(screen.getByText(/Hawk–Dove/)).toBeInTheDocument();
    expect(screen.getByTestId('share-a')).toHaveTextContent(/Hawk/);
  });
});
