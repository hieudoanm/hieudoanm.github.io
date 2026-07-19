import { fireEvent, render, screen } from '@testing-library/react';
import CareersPage from '@/app/(templates)/landing/careers/page';

describe('CareersPage', () => {
  it('renders departments and open positions', () => {
    render(<CareersPage />);
    expect(screen.getByText('Work with us')).toBeInTheDocument();
    expect(screen.getByText(/6 open positions/)).toBeInTheDocument();
    expect(screen.getByText('Engineering')).toBeInTheDocument();
    expect(screen.getByText('Senior Frontend Engineer')).toBeInTheDocument();
    expect(screen.getByText('Product Designer')).toBeInTheDocument();
  });

  it('marks a job as applied', () => {
    render(<CareersPage />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Apply' })[0]);
    expect(screen.getByText('Application sent')).toBeInTheDocument();
    expect(screen.getByText(/5 open positions/)).toBeInTheDocument();
  });
});
