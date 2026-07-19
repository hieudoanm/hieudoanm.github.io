import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import SettingsPage from '../settings/page';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const mockPush = jest.fn();

describe('SettingsPage', () => {
  beforeEach(() => {
    localStorage.clear();
    mockPush.mockClear();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it('renders theme picker and data management', () => {
    render(<SettingsPage />);
    expect(screen.getByRole('combobox')).toHaveValue('api-light');
    expect(screen.getByText('Clear history and draft')).toBeInTheDocument();
  });

  it('applies and persists a theme', () => {
    render(<SettingsPage />);
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'api-dark' },
    });
    expect(localStorage.getItem('api-client:theme')).toBe('api-dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe(
      'api-dark'
    );
  });

  it('restores saved theme on mount', () => {
    localStorage.setItem('api-client:theme', 'api-dark');
    render(<SettingsPage />);
    expect(screen.getByRole('combobox')).toHaveValue('api-dark');
  });

  it('clears history and draft', () => {
    localStorage.setItem('api-client:history', '[1,2]');
    localStorage.setItem('api-client:draft', '{"method":"GET"}');
    render(<SettingsPage />);
    fireEvent.click(screen.getByText('Clear history and draft'));
    expect(localStorage.getItem('api-client:history')).toBeNull();
    expect(localStorage.getItem('api-client:draft')).toBeNull();
  });

  it('navigates back to the client on back button click', () => {
    render(<SettingsPage />);
    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(mockPush).toHaveBeenCalledWith('/');
  });
});
