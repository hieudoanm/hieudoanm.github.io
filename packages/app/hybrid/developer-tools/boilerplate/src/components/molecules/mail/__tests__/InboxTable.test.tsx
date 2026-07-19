import { fireEvent, render, screen } from '@testing-library/react';
import { InboxTable } from '../InboxTable';

const emails = [
  {
    id: '1',
    from: 'Alice',
    subject: 'Hello',
    preview: 'Hi there',
    time: '09:00',
  },
  {
    id: '2',
    from: 'Bob',
    subject: 'Report',
    preview: 'Q3 numbers',
    time: '10:00',
    unread: true,
  },
];

describe('InboxTable', () => {
  it('renders headers and rows', () => {
    render(<InboxTable emails={emails} />);
    expect(screen.getByText('From')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getAllByTestId('inbox-row')).toHaveLength(2);
  });

  it('marks unread rows with bold text', () => {
    render(<InboxTable emails={emails} />);
    const rows = screen.getAllByTestId('inbox-row');
    expect(rows[1]).toHaveClass('font-semibold');
    expect(rows[0]).not.toHaveClass('font-semibold');
  });

  it('calls onSelect with the row id', () => {
    const onSelect = jest.fn();
    render(<InboxTable emails={emails} onSelect={onSelect} />);
    fireEvent.click(screen.getByText('Alice'));
    expect(onSelect).toHaveBeenCalledWith('1');
  });

  it('renders no rows when empty', () => {
    render(<InboxTable emails={[]} />);
    expect(screen.getByTestId('inbox-table')).toBeInTheDocument();
    expect(screen.queryAllByTestId('inbox-row')).toHaveLength(0);
  });
});
