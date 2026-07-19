import { render, screen, fireEvent } from '@testing-library/react';
import SettingsPage from '../settings/page';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

describe('SettingsPage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders theme picker and data management', () => {
    render(<SettingsPage />);
    expect(screen.getByRole('combobox')).toHaveValue('night');
    expect(screen.getByText('Clear history and draft')).toBeInTheDocument();
  });

  it('applies and persists a theme', () => {
    render(<SettingsPage />);
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'dracula' },
    });
    expect(localStorage.getItem('api-client:theme')).toBe('dracula');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dracula');
  });

  it('restores saved theme on mount', () => {
    localStorage.setItem('api-client:theme', 'synthwave');
    render(<SettingsPage />);
    expect(screen.getByRole('combobox')).toHaveValue('synthwave');
  });

  it('clears history and draft', () => {
    localStorage.setItem('api-client:history', '[1,2]');
    localStorage.setItem('api-client:draft', '{"method":"GET"}');
    render(<SettingsPage />);
    fireEvent.click(screen.getByText('Clear history and draft'));
    expect(localStorage.getItem('api-client:history')).toBeNull();
    expect(localStorage.getItem('api-client:draft')).toBeNull();
  });
});
