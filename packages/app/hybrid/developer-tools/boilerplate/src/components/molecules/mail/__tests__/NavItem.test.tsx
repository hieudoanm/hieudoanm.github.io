import { fireEvent, render, screen } from '@testing-library/react';
import { FiUser } from 'react-icons/fi';
import { NavItem } from '../NavItem';

describe('NavItem', () => {
  it('renders a link with label and href', () => {
    render(<NavItem label="Dashboard" href="/app/dashboard" />);
    expect(screen.getByRole('link', { name: /Dashboard/ })).toHaveAttribute(
      'href',
      '/app/dashboard'
    );
  });

  it('marks active item', () => {
    render(<NavItem label="Dashboard" href="/app/dashboard" active />);
    expect(screen.getByRole('link', { name: /Dashboard/ })).toHaveAttribute(
      'aria-current',
      'page'
    );
  });

  it('renders icon and badge', () => {
    render(<NavItem label="Inbox" href="/inbox" icon={<FiUser />} badge="3" />);
    const link = screen.getByRole('link', { name: /Inbox/ });
    expect(link.querySelector('svg')).toBeInTheDocument();
    expect(link).toHaveTextContent('3');
  });

  it('calls onClick when clicked', () => {
    const onClick = jest.fn();
    render(<NavItem label="Inbox" href="/inbox" onClick={onClick} />);
    fireEvent.click(screen.getByRole('link', { name: /Inbox/ }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
