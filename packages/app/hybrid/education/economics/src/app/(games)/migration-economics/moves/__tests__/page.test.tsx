import MigrationMovesPage from '@/app/(games)/migration-economics/moves/page';
import { render, screen } from '@testing-library/react';

describe('MigrationMovesPage', () => {
  it('renders the migration decision lab', () => {
    render(<MigrationMovesPage />);
    expect(
      screen.getByRole('heading', { name: /Migration Decision Lab/ })
    ).toBeInTheDocument();
    expect(screen.getByTestId('origin-wage')).toBeInTheDocument();
    expect(screen.getByTestId('destination-wage')).toBeInTheDocument();
  });
});
