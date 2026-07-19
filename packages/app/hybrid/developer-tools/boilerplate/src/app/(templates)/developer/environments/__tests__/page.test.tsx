import { render, screen } from '@testing-library/react';
import EnvironmentsPage from '@/app/(templates)/developer/environments/page';

describe('EnvironmentsPage', () => {
  it('renders the EnvironmentsPage', () => {
    render(<EnvironmentsPage />);
    expect(screen.getByText('3 of 5 healthy')).toBeInTheDocument();
  });
});
