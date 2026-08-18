import { fireEvent, render, screen } from '@testing-library/react';
import { AppShell } from '../AppShell';

describe('AppShell', () => {
  const navItems = [
    { label: 'Dashboard', active: true, badge: 3 },
    { label: 'Reports' },
  ];

  it('renders nav items and marks the active one', () => {
    render(
      <AppShell title="Acme" navItems={navItems}>
        <p>Main content</p>
      </AppShell>
    );
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Reports')).toBeInTheDocument();
    expect(screen.getByTestId('nav-Dashboard')).toHaveClass('bg-primary');
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('renders children and the user footer', () => {
    render(
      <AppShell
        title="Acme"
        navItems={navItems}
        user={{ name: 'Ada Lovelace', initials: 'AL' }}>
        <p>Main content</p>
      </AppShell>
    );
    expect(screen.getByText('Main content')).toBeInTheDocument();
    expect(screen.getByText('Ada Lovelace')).toBeInTheDocument();
    expect(screen.getByText('AL')).toBeInTheDocument();
  });

  it('fires onNavigate when a nav item is clicked', () => {
    const onNavigate = jest.fn();
    render(
      <AppShell title="Acme" navItems={navItems} onNavigate={onNavigate}>
        <p>Main content</p>
      </AppShell>
    );
    fireEvent.click(screen.getByTestId('nav-Reports'));
    expect(onNavigate).toHaveBeenCalledWith('Reports');
  });
});
