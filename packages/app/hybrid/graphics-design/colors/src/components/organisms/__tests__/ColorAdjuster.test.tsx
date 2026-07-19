import { fireEvent, render, screen } from '@testing-library/react';
import { ColorAdjuster } from '../ColorAdjuster';

jest.mock('@/hooks/useClipboard', () => ({
  useClipboard: () => ({ copied: null, copy: jest.fn() }),
}));

describe('ColorAdjuster', () => {
  it('renders the color preview with the base color', () => {
    render(<ColorAdjuster baseColor="#ff0000" />);
    const preview = screen.getByLabelText('Adjusted color preview');
    expect(preview).toBeInTheDocument();
    expect(preview).toHaveStyle({ backgroundColor: '#ff0000' });
  });

  it('renders Hue, Saturation, and Lightness sliders', () => {
    render(<ColorAdjuster baseColor="#ff0000" />);
    expect(screen.getByRole('slider', { name: 'Hue' })).toBeInTheDocument();
    expect(
      screen.getByRole('slider', { name: 'Saturation' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('slider', { name: 'Lightness' })
    ).toBeInTheDocument();
  });

  it('renders HEX and HSL CopyRow labels', () => {
    render(<ColorAdjuster baseColor="#ff0000" />);
    expect(screen.getByText('HEX')).toBeInTheDocument();
    expect(screen.getByText('HSL')).toBeInTheDocument();
  });

  it('renders the TheoryNote about HSL Model', () => {
    render(<ColorAdjuster baseColor="#ff0000" />);
    expect(screen.getByText('The HSL Model')).toBeInTheDocument();
  });

  it('updates the preview when the hue slider changes', () => {
    render(<ColorAdjuster baseColor="#ff0000" />);
    const hueSlider = screen.getByRole('slider', { name: 'Hue' });
    fireEvent.change(hueSlider, { target: { value: '120' } });
    expect(screen.getByLabelText('Adjusted color preview')).toHaveStyle({
      backgroundColor: expect.any(String),
    });
  });
});
