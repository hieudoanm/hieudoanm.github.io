import { render, screen } from '@testing-library/react';
import SmartHomeSettingsPage from '@/app/(templates)/developer/settings/page';

describe('SmartHomeSettingsPage', () => {
  it('renders the SmartHomeSettingsPage', () => {
    render(<SmartHomeSettingsPage />);
    expect(
      screen.getByRole('heading', { name: 'Smart Home Settings' })
    ).toBeInTheDocument();
    expect(screen.getByText('5 settings')).toBeInTheDocument();
  });
});
