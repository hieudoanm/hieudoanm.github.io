import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { OpacityOverlay } from '../OpacityOverlay';

describe('OpacityOverlay', () => {
  it('renders both background rows', () => {
    render(<OpacityOverlay baseColor="#ff0030" />);
    expect(screen.getByTestId('opacity-overlay')).toBeInTheDocument();
    expect(screen.getByText('On white')).toBeInTheDocument();
    expect(screen.getByText('On black')).toBeInTheDocument();
  });

  it('shows the opaque color at 100%', () => {
    render(<OpacityOverlay baseColor="#ff0030" />);
    expect(screen.getAllByText('#ff0030').length).toBeGreaterThan(0);
  });

  it('blends the color with the background at lower opacity', () => {
    render(<OpacityOverlay baseColor="#ff0030" />);
    expect(screen.getByText('#ffe6ea')).toBeInTheDocument();
    expect(screen.getByLabelText('On white at 10%')).toBeInTheDocument();
  });

  it('copies a blended color to the clipboard', async () => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });
    render(<OpacityOverlay baseColor="#ff0030" />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy #ffe6ea' }));
    await waitFor(() => expect(writeText).toHaveBeenCalledWith('#ffe6ea'));
  });
});
