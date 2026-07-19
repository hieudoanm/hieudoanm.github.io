import { render, screen } from '@testing-library/react';
import { List } from '../List';

describe('List', () => {
  const items = [
    {
      id: '1',
      title: 'Fix login bug',
      description: 'High priority',
      action: <button>Open</button>,
    },
    { id: '2', title: 'Write docs' },
  ];

  it('renders title, items, and descriptions', () => {
    render(<List items={items} title="Tasks" />);
    expect(screen.getByText('Tasks')).toBeInTheDocument();
    expect(screen.getByText('Fix login bug')).toBeInTheDocument();
    expect(screen.getByText('High priority')).toBeInTheDocument();
    expect(screen.getByText('Write docs')).toBeInTheDocument();
  });

  it('renders leading and action nodes', () => {
    render(<List items={items} />);
    expect(screen.getByRole('button', { name: 'Open' })).toBeInTheDocument();
  });
});
