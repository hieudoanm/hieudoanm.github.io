import { render, screen, fireEvent } from '@testing-library/react';
import { DashboardTemplate } from '../DashboardTemplate';

describe('DashboardTemplate', () => {
  it('to match snapshot', () => {
    const { container } = render(<DashboardTemplate />);
    expect(container).toMatchSnapshot();
  });

  it('renders the dashboard heading', () => {
    render(<DashboardTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Dashboard' })
    ).toBeInTheDocument();
  });

  it('renders a welcome message with default name', () => {
    render(<DashboardTemplate />);
    expect(screen.getByText(/welcome back/i)).toBeInTheDocument();
  });

  it('renders stat cards', () => {
    render(<DashboardTemplate />);
    expect(screen.getByText('Total Revenue')).toBeInTheDocument();
    expect(screen.getByText('Active Users')).toBeInTheDocument();
    expect(screen.getByText('Orders')).toBeInTheDocument();
    expect(screen.getByText('Growth Rate')).toBeInTheDocument();
  });

  it('renders stat values', () => {
    render(<DashboardTemplate />);
    expect(screen.getByText('$48,250')).toBeInTheDocument();
    expect(screen.getByText('2,847')).toBeInTheDocument();
    expect(screen.getByText('1,423')).toBeInTheDocument();
    expect(screen.getByText('23.6%')).toBeInTheDocument();
  });

  it('renders the sidebar with nav items', () => {
    render(<DashboardTemplate />);
    expect(screen.getByText('Forma')).toBeInTheDocument();
    expect(screen.getByText('Analytics')).toBeInTheDocument();
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('renders recent activity table', () => {
    render(<DashboardTemplate />);
    expect(screen.getByText('Recent Activity')).toBeInTheDocument();
    expect(screen.getByText('Alice Chen')).toBeInTheDocument();
    expect(screen.getByText('Bob Martinez')).toBeInTheDocument();
    expect(screen.getByText('Carol Smith')).toBeInTheDocument();
  });

  it('renders chart sections', () => {
    render(<DashboardTemplate />);
    expect(screen.getByText('Revenue Overview')).toBeInTheDocument();
    expect(screen.getByText('Traffic Sources')).toBeInTheDocument();
  });

  it('renders notification badge with count', () => {
    render(<DashboardTemplate />);
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('opens the mobile sidebar', () => {
    render(<DashboardTemplate />);

    const menuButton = screen.getByText('☰');
    fireEvent.click(menuButton);

    const sidebar = document.querySelector('aside');
    expect(sidebar?.classList.contains('translate-x-0')).toBe(true);
  });

  it('accepts a custom user name', () => {
    render(<DashboardTemplate userName="Hieu" />);
    // The heading welcome message uses the name
    expect(screen.getByText(/welcome back, Hieu/i)).toBeInTheDocument();
  });

  it('renders search input', () => {
    render(<DashboardTemplate />);
    const search = screen.getByPlaceholderText('Search...');
    expect(search).toBeInTheDocument();
    expect(search).toHaveAttribute('type', 'search');
  });

  it('renders the View all link in activity section', () => {
    render(<DashboardTemplate />);
    expect(screen.getByText('View all →')).toBeInTheDocument();
  });
});
