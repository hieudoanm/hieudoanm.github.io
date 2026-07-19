import { render, screen } from '@testing-library/react';
import TabsPage from '@/app/(templates)/hr/tabs/page';

describe('TabsPage', () => {
  it('renders the tabs page', () => {
    render(<TabsPage />);
    expect(
      screen.getByRole('heading', { name: 'Tabs showcase' })
    ).toBeInTheDocument();
  });
});
