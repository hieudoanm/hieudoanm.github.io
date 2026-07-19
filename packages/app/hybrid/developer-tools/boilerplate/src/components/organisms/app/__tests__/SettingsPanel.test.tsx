import { render, screen } from '@testing-library/react';
import { SettingsPanel } from '../SettingsPanel';

const sections = [
  {
    id: 'profile',
    title: 'Profile',
    description: 'Manage your details',
    children: <button>Save</button>,
  },
  { id: 'theme', title: 'Appearance', children: <select>Theme</select> },
];

describe('SettingsPanel', () => {
  it('renders section titles and descriptions', () => {
    render(<SettingsPanel sections={sections} />);
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Manage your details')).toBeInTheDocument();
    expect(screen.getByText('Appearance')).toBeInTheDocument();
  });

  it('renders section children', () => {
    render(<SettingsPanel sections={sections} />);
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
    expect(screen.getByText('Theme')).toBeInTheDocument();
  });
});
