import { fireEvent, render, screen } from '@testing-library/react';
import { GroupsHub } from '../GroupsHub';

const groups = [
  {
    id: 'g1',
    name: 'Hikers Club',
    category: 'Outdoors',
    members: 3400,
    joined: true,
  },
  {
    id: 'g2',
    name: 'Book Lovers',
    category: 'Books',
    members: 1200,
  },
];

describe('GroupsHub', () => {
  it('renders group names, categories and member counts', () => {
    render(<GroupsHub groups={groups} />);
    expect(screen.getByText('Hikers Club')).toBeInTheDocument();
    expect(screen.getByText('Outdoors')).toBeInTheDocument();
    expect(screen.getByText('Book Lovers')).toBeInTheDocument();
    expect(screen.getByText(/1,200 members/)).toBeInTheDocument();
  });

  it('shows the joined stats count', () => {
    render(<GroupsHub groups={groups} />);
    expect(screen.getByTestId('joined-count')).toHaveTextContent('1');
  });

  it('fires onJoin for a group that is not joined', () => {
    const onJoin = jest.fn();
    render(<GroupsHub groups={groups} onJoin={onJoin} />);
    fireEvent.click(screen.getByRole('button', { name: 'Join' }));
    expect(onJoin).toHaveBeenCalledWith('g2');
  });
});
