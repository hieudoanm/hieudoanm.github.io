import { render, screen } from '@testing-library/react';
import BackupsPage from '@/app/(templates)/developer/backups/page';

describe('BackupsPage', () => {
  it('renders the BackupsPage', () => {
    render(<BackupsPage />);
    expect(screen.getByText('3 completed backups')).toBeInTheDocument();
  });
});
