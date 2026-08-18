import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { GradientBuilder } from '../GradientBuilder';

describe('GradientBuilder', () => {
  it('builds a default linear gradient from the base color', () => {
    render(<GradientBuilder baseColor="#ff0030" />);
    expect(screen.getByTestId('gradient-builder')).toBeInTheDocument();
    expect(
      screen.getByText('linear-gradient(135deg, #ff0030, #ffffff)')
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Gradient preview')).toHaveStyle({
      background: 'linear-gradient(135deg, #ff0030, #ffffff)',
    });
  });

  it('adds and removes color stops', () => {
    render(<GradientBuilder baseColor="#ff0030" />);
    fireEvent.click(screen.getByRole('button', { name: '+ Add stop' }));
    expect(screen.getByLabelText('Stop 3 color')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Remove stop 3' }));
    expect(screen.queryByLabelText('Stop 3 color')).not.toBeInTheDocument();
  });

  it('updates the CSS when the angle changes', () => {
    render(<GradientBuilder baseColor="#ff0030" />);
    fireEvent.change(screen.getByRole('slider', { name: 'Gradient angle' }), {
      target: { value: '90' },
    });
    expect(
      screen.getByText('linear-gradient(90deg, #ff0030, #ffffff)')
    ).toBeInTheDocument();
  });

  it('switches to a radial gradient', () => {
    render(<GradientBuilder baseColor="#ff0030" />);
    fireEvent.click(screen.getByLabelText('Radial gradient'));
    expect(
      screen.getByText('radial-gradient(circle at center, #ff0030, #ffffff)')
    ).toBeInTheDocument();
  });

  it('updates the CSS when a stop color changes', () => {
    render(<GradientBuilder baseColor="#ff0030" />);
    fireEvent.change(screen.getByLabelText('Stop 1 color'), {
      target: { value: '#000000' },
    });
    expect(
      screen.getByText('linear-gradient(135deg, #000000, #ffffff)')
    ).toBeInTheDocument();
  });

  it('copies the CSS to the clipboard', async () => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });
    render(<GradientBuilder baseColor="#ff0030" />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy gradient' }));
    await waitFor(() =>
      expect(writeText).toHaveBeenCalledWith(
        'linear-gradient(135deg, #ff0030, #ffffff)'
      )
    );
  });
});
