import { render, screen } from '@testing-library/react';
import TimeOffPage from '@/app/(templates)/hr/time-off/page';

describe('TimeOffPage', () => {
  it('renders the TimeOffPage', () => {
    render(<TimeOffPage />);
    expect(screen.getByText('6 requests')).toBeInTheDocument();
  });
});
