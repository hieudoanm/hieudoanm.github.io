import { fireEvent, render, screen } from '@testing-library/react';
import { TabsTemplate } from '../TabsTemplate';

describe('TabsTemplate', () => {
  it('renders the overview tab by default', () => {
    render(<TabsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Tabs showcase' })
    ).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveAttribute(
      'aria-selected',
      'true'
    );
    expect(
      screen.getByText('A quick look at your workspace metrics and activity.')
    ).toBeInTheDocument();
    expect(
      screen.queryByText('You have 3 unread notifications.')
    ).not.toBeInTheDocument();
  });

  it('switches to the activity tab', () => {
    render(<TabsTemplate />);
    fireEvent.click(screen.getByRole('tab', { name: 'Activity' }));
    expect(screen.getByRole('tab', { name: 'Activity' })).toHaveAttribute(
      'aria-selected',
      'true'
    );
    expect(
      screen.getByText('You have 3 unread notifications.')
    ).toBeInTheDocument();
    expect(screen.getByText('Alice updated the roadmap')).toBeInTheDocument();
  });

  it('marks notifications as read on the activity tab only', () => {
    render(<TabsTemplate />);
    fireEvent.click(screen.getByRole('tab', { name: 'Activity' }));
    fireEvent.click(screen.getByRole('button', { name: 'Mark all read' }));
    expect(
      screen.getByText('All caught up. No unread notifications.')
    ).toBeInTheDocument();
    expect(
      screen.queryByText('You have 3 unread notifications.')
    ).not.toBeInTheDocument();
  });

  it('shows the details tab', () => {
    render(<TabsTemplate />);
    fireEvent.click(screen.getByRole('tab', { name: 'Details' }));
    expect(
      screen.getByText('Workspace version 2.4.1, plan Pro, owner Alice Smith.')
    ).toBeInTheDocument();
  });
});
