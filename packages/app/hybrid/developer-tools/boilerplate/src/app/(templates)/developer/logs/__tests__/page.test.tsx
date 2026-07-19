import { render, screen } from '@testing-library/react';
import LogsPage from '@/app/(templates)/developer/logs/page';

describe('LogsPage', () => {
  it('renders the LogsPage', () => {
    render(<LogsPage />);
    expect(screen.getByText('8 logs')).toBeInTheDocument();
  });
});
