import { render, screen } from '@testing-library/react';
import ArchivePage from '@/app/(templates)/blog/archive/page';

describe('ArchivePage', () => {
  it('renders the archive page', () => {
    render(<ArchivePage />);
    expect(
      screen.getByRole('heading', { name: 'Blog Archive' })
    ).toBeInTheDocument();
    expect(screen.getByText('Building a Design System')).toBeInTheDocument();
  });
});
