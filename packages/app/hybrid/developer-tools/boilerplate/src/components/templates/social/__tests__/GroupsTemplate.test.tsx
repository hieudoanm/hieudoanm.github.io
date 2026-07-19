import { fireEvent, render, screen } from '@testing-library/react';
import { GroupsTemplate } from '../GroupsTemplate';

describe('GroupsTemplate', () => {
  it('renders groups with member counts', () => {
    render(<GroupsTemplate />);
    expect(screen.getByRole('heading', { name: 'Groups' })).toBeInTheDocument();
    expect(screen.getByText('3 groups joined')).toBeInTheDocument();
    expect(screen.getByText('Next.js Developers')).toBeInTheDocument();
    expect(screen.getByText('12,840 members')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Join' })).toHaveLength(3);
    expect(screen.getAllByRole('button', { name: 'Leave' })).toHaveLength(3);
  });

  it('joins and leaves a group updating the count', () => {
    render(<GroupsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Join' })[0]);
    expect(screen.getByText('4 groups joined')).toBeInTheDocument();
    fireEvent.click(screen.getAllByRole('button', { name: 'Leave' })[0]);
    expect(screen.getByText('3 groups joined')).toBeInTheDocument();
  });
});
