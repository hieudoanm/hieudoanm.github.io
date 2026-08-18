import { render, screen } from '@testing-library/react';
import { MiniMap } from '../MiniMap';

describe('MiniMap', () => {
  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'settings', label: 'Settings' },
    { id: 'billing', label: 'Billing' },
  ];

  it('renders all sections', () => {
    render(<MiniMap sections={sections} active="settings" />);
    expect(screen.getByLabelText('Page overview')).toBeInTheDocument();
    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('Billing')).toBeInTheDocument();
  });

  it('marks the active section', () => {
    render(<MiniMap sections={sections} active="settings" />);
    expect(screen.getByText('Settings')).toHaveAttribute(
      'aria-current',
      'location'
    );
    expect(screen.getByText('Overview')).not.toHaveAttribute('aria-current');
  });
});
