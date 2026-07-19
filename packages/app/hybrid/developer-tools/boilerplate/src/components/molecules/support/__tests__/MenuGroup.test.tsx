import { fireEvent, render, screen } from '@testing-library/react';
import { MenuGroup } from '../MenuGroup';

describe('MenuGroup', () => {
  const sections = [
    {
      id: 'general',
      title: 'General',
      items: [
        { id: 'profile', label: 'Profile', active: true },
        { id: 'billing', label: 'Billing' },
      ],
    },
    {
      id: 'account',
      title: 'Account',
      items: [{ id: 'logout', label: 'Log out' }],
    },
  ];

  it('renders section titles and items', () => {
    render(<MenuGroup sections={sections} />);
    expect(screen.getByText('General')).toBeInTheDocument();
    expect(screen.getByText('Account')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Log out')).toBeInTheDocument();
  });

  it('marks the active item', () => {
    render(<MenuGroup sections={sections} />);
    expect(screen.getByText('Profile')).toHaveAttribute('aria-current', 'page');
    expect(screen.getByText('Billing')).not.toHaveAttribute('aria-current');
  });

  it('calls onClick when an item is pressed', () => {
    const onClick = jest.fn();
    render(
      <MenuGroup
        sections={[
          {
            id: 'general',
            title: 'General',
            items: [{ id: 'billing', label: 'Billing', onClick }],
          },
        ]}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Billing' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
