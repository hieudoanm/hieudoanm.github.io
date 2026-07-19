import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ColorSchemes } from '../ColorSchemes';

describe('ColorSchemes', () => {
  it('renders all scheme rows', () => {
    render(<ColorSchemes baseColor="#ff0000" />);
    expect(screen.getByTestId('color-schemes')).toBeInTheDocument();
    expect(screen.getByText('Complementary')).toBeInTheDocument();
    expect(screen.getByText('Analogous')).toBeInTheDocument();
    expect(screen.getByText('Triadic')).toBeInTheDocument();
    expect(screen.getByText('Monochromatic')).toBeInTheDocument();
  });

  it('shows the complementary color of the base', () => {
    render(<ColorSchemes baseColor="#ff0000" />);
    expect(screen.getByText('#00ffff')).toBeInTheDocument();
  });

  it('copies a scheme hex to the clipboard', async () => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });
    render(<ColorSchemes baseColor="#ff0000" />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy #00ffff' }));
    await waitFor(() => expect(writeText).toHaveBeenCalledWith('#00ffff'));
  });

  it('renders nothing for an invalid base color', () => {
    render(<ColorSchemes baseColor="nope" />);
    expect(screen.queryByTestId('color-schemes')).not.toBeInTheDocument();
  });
});
