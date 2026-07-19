import { render, screen } from '@testing-library/react';
import LeadsPage from '@/app/(templates)/crm/leads/page';

describe('LeadsPage', () => {
  it('renders the LeadsPage', () => {
    render(<LeadsPage />);
    expect(screen.getByText('6 leads')).toBeInTheDocument();
  });
});
