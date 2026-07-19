import { render, screen } from '@testing-library/react';
import AutomationsPage from '@/app/(templates)/developer/automations/page';

describe('AutomationsPage', () => {
  it('renders the AutomationsPage', () => {
    render(<AutomationsPage />);
    expect(
      screen.getByRole('heading', { name: 'Automations' })
    ).toBeInTheDocument();
    expect(screen.getByText('4 automations')).toBeInTheDocument();
  });
});
