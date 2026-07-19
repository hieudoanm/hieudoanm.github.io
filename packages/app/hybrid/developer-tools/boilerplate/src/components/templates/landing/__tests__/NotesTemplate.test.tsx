import { fireEvent, render, screen } from '@testing-library/react';
import { NotesTemplate } from '../NotesTemplate';

describe('NotesTemplate', () => {
  it('renders note cards', () => {
    render(<NotesTemplate />);
    expect(screen.getByText('Launch checklist')).toBeInTheDocument();
    expect(screen.getByText('Ideas')).toBeInTheDocument();
    expect(screen.getByText('Meeting notes')).toBeInTheDocument();
    expect(screen.getByText('Aug 04')).toBeInTheDocument();
  });

  it('creates a new note', () => {
    render(<NotesTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'New note' }));
    expect(screen.getByText('Untitled note')).toBeInTheDocument();
    expect(screen.getByText('Start writing...')).toBeInTheDocument();
  });

  it('edits a note inline and saves the changes', () => {
    render(<NotesTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Edit Ideas' }));
    fireEvent.change(screen.getByLabelText('Note title'), {
      target: { value: 'Brainstorm' },
    });
    fireEvent.change(screen.getByLabelText('Note body'), {
      target: { value: 'Write more ideas.' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Save note' }));
    expect(screen.getByText('Brainstorm')).toBeInTheDocument();
    expect(screen.getByText('Write more ideas.')).toBeInTheDocument();
    expect(screen.queryByLabelText('Note title')).not.toBeInTheDocument();
  });

  it('cancels an edit and keeps the original values', () => {
    render(<NotesTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Edit Ideas' }));
    fireEvent.change(screen.getByLabelText('Note title'), {
      target: { value: 'Changed' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Cancel edit' }));
    expect(screen.getByText('Ideas')).toBeInTheDocument();
    expect(screen.queryByText('Changed')).not.toBeInTheDocument();
  });

  it('falls back to a default title when saving an empty title', () => {
    render(<NotesTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Edit Ideas' }));
    fireEvent.change(screen.getByLabelText('Note title'), {
      target: { value: '' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Save note' }));
    expect(screen.getAllByText('Untitled note').length).toBeGreaterThan(0);
    expect(screen.queryByText('Ideas')).not.toBeInTheDocument();
  });

  it('deletes a note', () => {
    render(<NotesTemplate />);
    fireEvent.click(
      screen.getByRole('button', { name: 'Delete Meeting notes' })
    );
    expect(screen.queryByText('Meeting notes')).not.toBeInTheDocument();
  });

  it('filters notes by title or body and shows an empty state', () => {
    render(<NotesTemplate />);
    fireEvent.change(screen.getByPlaceholderText('Search notes...'), {
      target: { value: 'launch' },
    });
    expect(screen.getByText('Launch checklist')).toBeInTheDocument();
    expect(screen.queryByText('Ideas')).not.toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText('Search notes...'), {
      target: { value: 'dark mode' },
    });
    expect(screen.getByText('Ideas')).toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText('Search notes...'), {
      target: { value: 'zzz' },
    });
    expect(screen.getByText('No notes')).toBeInTheDocument();
  });
});
