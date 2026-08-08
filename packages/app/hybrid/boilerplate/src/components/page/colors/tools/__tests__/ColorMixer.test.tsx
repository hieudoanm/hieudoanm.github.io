import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ColorMixer } from '../ColorMixer';

describe('ColorMixer', () => {
  it('mixes the base color with blue at 50% by default', () => {
    render(<ColorMixer baseColor="#ff0030" />);
    expect(screen.getByTestId('color-mixer')).toBeInTheDocument();
    expect(screen.getByText('#800098')).toBeInTheDocument();
  });

  it('recalculates when the second color changes', () => {
    render(<ColorMixer baseColor="#ff0030" />);
    fireEvent.change(screen.getByLabelText('Second color'), {
      target: { value: '#00ff00' },
    });
    expect(screen.getByText('#808018')).toBeInTheDocument();
  });

  it('uses the first color at 0% weight and the second at 100%', () => {
    render(<ColorMixer baseColor="#ff0030" />);
    fireEvent.change(screen.getByLabelText('Mix weight'), {
      target: { value: '0' },
    });
    expect(screen.getByText('#ff0030')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Mix weight'), {
      target: { value: '100' },
    });
    expect(screen.getByText('#0000ff')).toBeInTheDocument();
  });

  it('copies the mixed color to the clipboard', async () => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });
    render(<ColorMixer baseColor="#ff0030" />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy HEX' }));
    await waitFor(() => expect(writeText).toHaveBeenCalledWith('#800098'));
  });
});
