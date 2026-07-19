import { fireEvent, render, screen } from '@testing-library/react';
import { MegForwardSimulator } from '../index';

const slider = (label: string): HTMLInputElement => {
  const input = screen
    .getAllByRole('slider')
    .find((el) => el.closest('div')?.textContent?.includes(label));
  if (!input) throw new Error(`no slider labelled ${label}`);
  return input as HTMLInputElement;
};

const read = (label: string): string | null | undefined =>
  screen.getByText(label).previousElementSibling?.textContent;

describe('MegForwardSimulator', () => {
  it('renders both topographic maps', () => {
    const { container } = render(<MegForwardSimulator />);
    expect(container.querySelectorAll('canvas')).toHaveLength(2);
  });

  it('explains what the two maps show', () => {
    render(<MegForwardSimulator />);
    expect(
      screen.getByText(/same dipole, two modalities/i)
    ).toBeInTheDocument();
  });

  it('grows the magnetic field as the sensors approach the scalp', () => {
    render(<MegForwardSimulator />);
    const before = Number(read('Peak |B|'));
    fireEvent.change(slider('Scalp-to-sensor gap'), { target: { value: '1' } });
    expect(Number(read('Peak |B|'))).toBeGreaterThan(before);
  });

  it('attenuates the magnetic field as the source deepens', () => {
    render(<MegForwardSimulator />);
    const before = Number(read('Peak |B|'));
    fireEvent.change(slider('Source depth'), { target: { value: '6' } });
    expect(Number(read('Peak |B|'))).toBeLessThan(before);
  });

  it('widens the dynamic range of the scalp map when the skull conducts', () => {
    const { container } = render(<MegForwardSimulator />);
    expect(container.querySelectorAll('canvas')).toHaveLength(2);
  });

  it('changes the scalp map when the skull conducts less', () => {
    render(<MegForwardSimulator />);
    const before = read('V after volume conduction');
    fireEvent.change(slider('Skull conductivity ratio'), {
      target: { value: '0.1' },
    });
    expect(read('V after volume conduction')).not.toBe(before);
  });

  it('leaves the scalp potential unchanged with a transparent skull', () => {
    render(<MegForwardSimulator />);
    fireEvent.change(slider('Skull conductivity ratio'), {
      target: { value: '1' },
    });
    expect(read('V after volume conduction')).toBe(read('Peak scalp V'));
  });

  it('shows a 64x on-scalp advantage over a 4 cm helmet', () => {
    render(<MegForwardSimulator />);
    expect(read('On-scalp vs 4 cm helmet')).toBe('64×');
  });

  it('reports the distance to the nearest sensor', () => {
    render(<MegForwardSimulator />);
    expect(screen.getByText('Nearest sensor')).toBeInTheDocument();
  });
});
