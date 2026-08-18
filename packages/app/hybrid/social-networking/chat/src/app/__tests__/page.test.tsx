import { render, screen, fireEvent } from '@testing-library/react';
import HomePage from '../page';

jest.mock('@/providers/Providers', () => ({
  Providers: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock('@/components/organisms/Sidebar', () => ({
  Sidebar: ({ isOpen }: { isOpen: boolean }) => (
    <div data-testid="sidebar" data-open={isOpen} />
  ),
}));

jest.mock('@/components/templates/PageTransition', () => ({
  PageTransition: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

describe('HomePage', () => {
  it('renders the heading and empty state message', () => {
    render(<HomePage />);
    expect(screen.getByText('Chat')).toBeInTheDocument();
    expect(
      screen.getByText('Select a conversation or start a new one')
    ).toBeInTheDocument();
  });

  it('opens the sidebar when the menu button is clicked', () => {
    render(<HomePage />);
    expect(screen.getByTestId('sidebar')).toHaveAttribute('data-open', 'false');
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByTestId('sidebar')).toHaveAttribute('data-open', 'true');
  });
});
