import { fireEvent, render, screen } from '@testing-library/react';
import { BoldSimulator } from '../index';

const slider = (label: string): HTMLInputElement => {
  const input = screen
    .getAllByRole('slider')
    .find((el) => el.closest('div')?.textContent?.includes(label));
  if (!input) throw new Error(`no slider labelled ${label}`);
  return input as HTMLInputElement;
};

const read = (label: string): string | null | undefined =>
  screen.getByText(label).previousElementSibling?.textContent;

describe('BoldSimulator', () => {
  it('renders the trace canvas', () => {
    const { container } = render(<BoldSimulator />);
    expect(container.querySelector('canvas')).toBeInTheDocument();
  });

  it('labels the lag and the acquisition constants', () => {
    render(<BoldSimulator />);
    expect(screen.getByText('Neural → BOLD lag')).toBeInTheDocument();
    expect(screen.getByText('T1 (3 T)')).toBeInTheDocument();
    expect(screen.getByText('Effective T2*')).toBeInTheDocument();
  });

  it('lags the BOLD response by seconds rather than milliseconds', () => {
    render(<BoldSimulator />);
    expect(
      Number(read('Neural → BOLD lag')?.replace(' s', ''))
    ).toBeGreaterThan(1);
  });

  it('samples fewer volumes at a longer TR', () => {
    render(<BoldSimulator />);
    const before = Number(read('Volumes sampled'));
    fireEvent.change(slider('Repetition time (TR)'), {
      target: { value: '3' },
    });
    expect(Number(read('Volumes sampled'))).toBeLessThan(before);
  });

  it('shortens the lag when the time to peak is reduced', () => {
    render(<BoldSimulator />);
    const before = Number(read('Neural → BOLD lag')?.replace(' s', ''));
    fireEvent.change(slider('Time to peak'), { target: { value: '2' } });
    expect(Number(read('Neural → BOLD lag')?.replace(' s', ''))).toBeLessThan(
      before
    );
  });

  it('raises the peak response for a longer block', () => {
    render(<BoldSimulator />);
    fireEvent.change(slider('Block duration'), { target: { value: '25' } });
    const peak = screen.getByText('Neural drive → BOLD').closest('div');
    expect(peak).toBeInTheDocument();
  });

  it('explains why event-related fMRI is not trial-averaged', () => {
    render(<BoldSimulator />);
    expect(
      screen.getByText(/never returns exactly to baseline/i)
    ).toBeInTheDocument();
  });
});
