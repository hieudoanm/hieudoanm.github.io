import { render, screen } from '@testing-library/react';
import DeploymentsPage from '@/app/(templates)/developer/deployments/page';

describe('DeploymentsPage', () => {
  it('renders the DeploymentsPage', () => {
    render(<DeploymentsPage />);
    expect(screen.getByText('6 deployments')).toBeInTheDocument();
  });
});
