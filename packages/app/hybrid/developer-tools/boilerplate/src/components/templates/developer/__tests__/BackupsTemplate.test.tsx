import { fireEvent, render, screen, within } from '@testing-library/react';
import { BackupsTemplate } from '../BackupsTemplate';

describe('BackupsTemplate', () => {
  it('renders backups with the completed summary', () => {
    render(<BackupsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Backups' })
    ).toBeInTheDocument();
    expect(screen.getByText('3 completed backups')).toBeInTheDocument();
    expect(screen.getByText('Production database')).toBeInTheDocument();
    expect(screen.getByText('4.2 GB')).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Completed')).toHaveLength(3);
    expect(within(table).getAllByText('Running')).toHaveLength(1);
    expect(within(table).getAllByText('Failed')).toHaveLength(1);
    expect(
      screen.getAllByRole('button', { name: 'Mark complete' })
    ).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: 'Restore' })).toHaveLength(3);
  });

  it('creates an on-demand backup', () => {
    render(<BackupsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Create backup' }));
    expect(screen.getByText('Backup created')).toBeInTheDocument();
    expect(screen.getByText('On-demand backup')).toBeInTheDocument();
    expect(screen.getByText('0 B')).toBeInTheDocument();
    expect(screen.getByText('3 completed backups')).toBeInTheDocument();
    expect(
      screen.getAllByRole('button', { name: 'Mark complete' })
    ).toHaveLength(2);
  });

  it('marks a backup complete and restores one', () => {
    render(<BackupsTemplate />);
    fireEvent.click(
      screen.getAllByRole('button', { name: 'Mark complete' })[0]
    );
    expect(screen.getByText('4 completed backups')).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(within(table).queryAllByText('Running')).toHaveLength(0);
    expect(within(table).getAllByText('Completed')).toHaveLength(4);
    fireEvent.click(screen.getAllByRole('button', { name: 'Restore' })[0]);
    expect(screen.getByText('3 completed backups')).toBeInTheDocument();
    expect(within(table).getAllByText('Running')).toHaveLength(1);
  });
});
