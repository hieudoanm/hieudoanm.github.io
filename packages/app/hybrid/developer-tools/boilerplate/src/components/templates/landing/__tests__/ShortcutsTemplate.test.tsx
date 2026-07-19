import { fireEvent, render, screen } from '@testing-library/react';
import { ShortcutsTemplate } from '../ShortcutsTemplate';

describe('ShortcutsTemplate', () => {
  it('renders shortcuts grouped by category', () => {
    render(<ShortcutsTemplate />);
    expect(screen.getByText('Navigation')).toBeInTheDocument();
    expect(screen.getByText('Editing')).toBeInTheDocument();
    expect(screen.getAllByText('Actions').length).toBeGreaterThan(0);
    expect(screen.getByText('Go to home')).toBeInTheDocument();
    expect(screen.getByText('G + H')).toBeInTheDocument();
    expect(screen.getByText('Save changes')).toBeInTheDocument();
  });

  it('shows copied feedback', () => {
    render(<ShortcutsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Copy' })[0]);
    expect(screen.getByText('Copied!')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Copy' })).toHaveLength(6);
  });

  it('filters shortcuts by description or keys', () => {
    render(<ShortcutsTemplate />);
    fireEvent.change(screen.getByPlaceholderText('Search shortcuts...'), {
      target: { value: 'palette' },
    });
    expect(screen.getByText('Open command palette')).toBeInTheDocument();
    expect(screen.queryByText('Go to home')).not.toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText('Search shortcuts...'), {
      target: { value: 'zzz' },
    });
    expect(screen.getByText('No shortcuts found')).toBeInTheDocument();
  });
});
