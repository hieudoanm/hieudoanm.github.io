import { render, screen } from '@testing-library/react';
import { ColorBlindnessSimulator } from '../ColorBlindnessSimulator';

jest.mock('@/hooks/useClipboard', () => ({
  useClipboard: () => ({ copied: null, copy: jest.fn() }),
}));

describe('ColorBlindnessSimulator', () => {
  it('renders the Original section', () => {
    render(<ColorBlindnessSimulator baseColor="#ff0000" />);
    expect(screen.getByText('Original')).toBeInTheDocument();
  });

  it('renders Protanopia, Deuteranopia, and Tritanopia sections', () => {
    render(<ColorBlindnessSimulator baseColor="#ff0000" />);
    expect(screen.getByText(/Protanopia/)).toBeInTheDocument();
    expect(screen.getByText(/Deuteranopia/)).toBeInTheDocument();
    expect(screen.getByText(/Tritanopia/)).toBeInTheDocument();
  });

  it('renders descriptions for each deficiency type', () => {
    render(<ColorBlindnessSimulator baseColor="#ff0000" />);
    expect(screen.getByText(/Lacks long-wavelength/)).toBeInTheDocument();
    expect(screen.getByText(/Lacks medium-wavelength/)).toBeInTheDocument();
    expect(screen.getByText(/Lacks short-wavelength/)).toBeInTheDocument();
  });

  it('renders the TheoryNote about Color Vision Deficiency', () => {
    render(<ColorBlindnessSimulator baseColor="#ff0000" />);
    expect(screen.getByText('Color Vision Deficiency')).toBeInTheDocument();
  });

  it('renders the container with data-testid', () => {
    render(<ColorBlindnessSimulator baseColor="#6366f1" />);
    expect(screen.getByTestId('color-blindness-simulator')).toBeInTheDocument();
  });
});
