import { render, screen } from '@testing-library/react';
import FilesPage from '@/app/(templates)/app/files/page';

describe('FilesPage', () => {
  it('renders the FilesPage', () => {
    render(<FilesPage />);
    expect(screen.getByText('invoice.pdf')).toBeInTheDocument();
  });
});
