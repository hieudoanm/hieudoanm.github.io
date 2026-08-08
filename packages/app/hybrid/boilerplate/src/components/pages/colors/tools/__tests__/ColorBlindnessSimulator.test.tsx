import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ColorBlindnessSimulator } from '../ColorBlindnessSimulator';

describe('ColorBlindnessSimulator', () => {
  it('renders all three vision deficiency types', () => {
    render(<ColorBlindnessSimulator baseColor="#ff0030" />);
    expect(screen.getByTestId('color-blindness')).toBeInTheDocument();
    expect(screen.getByText('Protanopia')).toBeInTheDocument();
    expect(screen.getByText('Deuteranopia')).toBeInTheDocument();
    expect(screen.getByText('Tritanopia')).toBeInTheDocument();
  });

  it('shows the simulated color for each type', () => {
    render(<ColorBlindnessSimulator baseColor="#ff0030" />);
    expect(
      screen.getByRole('button', { name: 'Copy #918e24' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Copy #9fb322' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Copy #f21b19' })
    ).toBeInTheDocument();
  });

  it('copies a simulated color to the clipboard', async () => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });
    render(<ColorBlindnessSimulator baseColor="#ff0030" />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy #918e24' }));
    await waitFor(() => expect(writeText).toHaveBeenCalledWith('#918e24'));
  });
});
