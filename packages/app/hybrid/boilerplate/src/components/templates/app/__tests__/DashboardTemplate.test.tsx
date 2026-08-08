import { fireEvent, render, screen } from '@testing-library/react';
import { DashboardTemplate } from '../DashboardTemplate';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/'),
}));

describe('DashboardTemplate', () => {
  it('renders header, stats, and user info', () => {
    render(<DashboardTemplate userName="Jane Doe" userEmail="jane@test.com" />);
    expect(
      screen.getAllByRole('heading', { name: 'Dashboard' }).length
    ).toBeGreaterThan(0);
    expect(screen.getByText('Total Revenue')).toBeInTheDocument();
    expect(screen.getByText('$48,250')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('jane@test.com')).toBeInTheDocument();
  });

  it('renders activity rows', () => {
    render(<DashboardTemplate />);
    expect(screen.getByText('Alice Chen')).toBeInTheDocument();
    expect(screen.getByText('created')).toBeInTheDocument();
    expect(screen.getByText('Project Alpha')).toBeInTheDocument();
    expect(screen.getByText('2 min ago')).toBeInTheDocument();
  });

  it('shows negative trend with error color', () => {
    render(<DashboardTemplate />);
    const trend = screen.getByText('-3.1%');
    expect(trend).toHaveClass('text-error');
  });

  it('shows positive trend with success color', () => {
    render(<DashboardTemplate />);
    expect(screen.getByText('+12.5%')).toHaveClass('text-success');
  });

  it('opens and closes the mobile sidebar', () => {
    render(<DashboardTemplate />);
    const menuButton = screen.getByRole('button', { name: '' });
    fireEvent.click(menuButton);
    expect(screen.getAllByText('Analytics').length).toBeGreaterThan(0);
    const overlay = document.querySelector('.fixed.inset-0');
    fireEvent.click(overlay!);
    expect(document.querySelector('.fixed.inset-0')).not.toBeInTheDocument();
  });

  it('switches active nav item', () => {
    render(<DashboardTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Analytics' }));
    expect(screen.getByRole('button', { name: 'Analytics' })).toHaveClass(
      'bg-primary/10'
    );
  });

  it('renders notification count badge', () => {
    render(<DashboardTemplate />);
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});
