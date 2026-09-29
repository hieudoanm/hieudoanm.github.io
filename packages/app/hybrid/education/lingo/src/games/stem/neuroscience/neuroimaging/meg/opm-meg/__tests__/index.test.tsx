import { fireEvent, render, screen } from '@testing-library/react';
import { OpmSimulator } from '../index';

const slider = (label: string): HTMLInputElement => {
  const input = screen
    .getAllByRole('slider')
    .find((el) => el.closest('div')?.textContent?.includes(label));
  if (!input) throw new Error(`no slider labelled ${label}`);
  return input as HTMLInputElement;
};

const read = (label: string): string | null | undefined =>
  screen.getAllByText(label).at(-1)?.previousElementSibling?.textContent;

describe('OpmSimulator', () => {
  it('renders the SNR canvas and the noise budget', () => {
    const { container } = render(<OpmSimulator />);
    expect(container.querySelector('canvas')).toBeInTheDocument();
    expect(screen.getAllByText('Ambient field').length).toBeGreaterThan(0);
  });

  it('shows the 1/r³ signal-versus-distance chart', () => {
    render(<OpmSimulator />);
    expect(screen.getByText('Signal versus distance')).toBeInTheDocument();
  });

  it('reports a geometric OPM advantage over the helmet', () => {
    render(<OpmSimulator />);
    expect(Number(read('OPM advantage')?.replace('×', ''))).toBeGreaterThan(1);
  });

  it('keeps the advantage when shielded, since it is geometric', () => {
    render(<OpmSimulator />);
    const before = read('OPM advantage');
    fireEvent.click(screen.getByRole('checkbox'));
    expect(read('OPM advantage')).toBe(before);
  });

  it('raises the absolute SNR once shielded', () => {
    render(<OpmSimulator />);
    const before = Number(read('OPM SNR'));
    fireEvent.click(screen.getByRole('checkbox'));
    expect(Number(read('OPM SNR'))).toBeGreaterThan(before);
  });

  it('grows the cortical signal as the sensor closes the gap', () => {
    render(<OpmSimulator />);
    const before = Number(read('Cortical signal')?.replace(' fT', ''));
    fireEvent.change(slider('Sensor-to-cortex gap'), {
      target: { value: '0.2' },
    });
    expect(Number(read('Cortical signal')?.replace(' fT', ''))).toBeGreaterThan(
      before
    );
  });

  it('shrinks the cortical signal as the source deepens', () => {
    render(<OpmSimulator />);
    const before = Number(read('Cortical signal')?.replace(' fT', ''));
    fireEvent.change(slider('Source depth below scalp'), {
      target: { value: '6' },
    });
    expect(Number(read('Cortical signal')?.replace(' fT', ''))).toBeLessThan(
      before
    );
  });

  it('names the practical OPM constraints', () => {
    render(<OpmSimulator />);
    expect(screen.getByText(/hair must be parted/i)).toBeInTheDocument();
  });
});
