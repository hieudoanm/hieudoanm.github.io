import { render, screen } from '@testing-library/react';
import NotesPage from '@/app/(templates)/landing/notes/page';

describe('NotesPage', () => {
  it('renders the NotesPage', () => {
    render(<NotesPage />);
    expect(screen.getByText('Launch checklist')).toBeInTheDocument();
  });
});
