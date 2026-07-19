import { render, screen } from '@testing-library/react';
import ShortcutsPage from '@/app/(templates)/landing/shortcuts/page';

describe('ShortcutsPage', () => {
  it('renders the ShortcutsPage', () => {
    render(<ShortcutsPage />);
    expect(screen.getByText('Go to home')).toBeInTheDocument();
  });
});
