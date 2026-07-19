import { render, screen } from '@testing-library/react';
import ThemePicker from '../ThemePicker';

jest.mock('@/hooks/useTheme', () => ({
  __esModule: true,
  useTheme: jest.fn(() => ({
    theme: 'wallet-dark',
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
    expect(screen.getByText('wallet-dark')).toBeInTheDocument();
  });

  it('renders both theme options', () => {
    render(<ThemePicker />);
    expect(screen.getByText('Wallet Light')).toBeInTheDocument();
    expect(screen.getByText('Wallet Dark')).toBeInTheDocument();
  });

  it('renders Wallet Light and Wallet Dark themes', () => {
    render(<ThemePicker />);
    expect(screen.getByText('Wallet Light')).toBeInTheDocument();
    expect(screen.getByText('Wallet Dark')).toBeInTheDocument();
  });
});
