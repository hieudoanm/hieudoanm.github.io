import { render, screen } from '@testing-library/react';
import ThemePicker from '../ThemePicker';

jest.mock('@/hooks/useTheme', () => ({
  __esModule: true,
  useTheme: jest.fn(() => ({
    theme: 'business',
    setTheme: jest.fn(),
  })),
}));

describe('ThemePicker', () => {
  it('renders Theme label', () => {
    render(<ThemePicker />);
    expect(screen.getByText('Theme')).toBeInTheDocument();
  });

  it('renders current theme name', () => {
    render(<ThemePicker />);
    expect(screen.getByText('business')).toBeInTheDocument();
  });

  it('renders Show all button when themes > 10', () => {
    render(<ThemePicker />);
    expect(screen.getByText(/Show all/)).toBeInTheDocument();
  });

  it('renders first 10 themes by default', () => {
    render(<ThemePicker />);
    expect(screen.getByText('Dark')).toBeInTheDocument();
    expect(screen.getByText('Light')).toBeInTheDocument();
  });
});
