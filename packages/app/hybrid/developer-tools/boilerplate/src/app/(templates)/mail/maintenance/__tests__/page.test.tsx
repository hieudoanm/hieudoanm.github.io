import { render, screen } from '@testing-library/react';
import MaintenancePage from '../page';

describe('MaintenancePage', () => {
  it('renders maintenance notice', () => {
    render(<MaintenancePage />);
    expect(screen.getAllByText(/maintenance/i).length).toBeGreaterThan(0);
  });
});
