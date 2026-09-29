import { fireEvent, render, screen } from '@testing-library/react';
import { ErpSimulator } from '../index';

const read = (label: string): string | null | undefined =>
  screen.getByText(label).previousElementSibling?.textContent;

const slider = (label: string): HTMLInputElement => {
  const input = screen
    .getAllByRole('slider')
    .find((el) => el.closest('div')?.textContent?.includes(label));
  if (!input) throw new Error(`no slider labelled ${label}`);
  return input as HTMLInputElement;
};

describe('ErpSimulator', () => {
  it('renders the trace canvas and the drift-rate readout', () => {
    render(<ErpSimulator />);
    expect(
      screen.getByRole('heading', { name: /Grand Average ERP/ })
    ).toBeInTheDocument();
    expect(screen.getByText('Drift rate v')).toBeInTheDocument();
  });

  it('draws the ERP canvas on mount', () => {
    const { container } = render(<ErpSimulator />);
    expect(container.querySelector('canvas')).toBeInTheDocument();
  });

  it('reports the noise reduction from averaging', () => {
    render(<ErpSimulator />);
    expect(screen.getByText('Noise reduction')).toBeInTheDocument();
    expect(screen.getByText('Noise before averaging')).toBeInTheDocument();
  });

  it('raises the drift rate when evidence increases', () => {
    render(<ErpSimulator />);
    const before = Number(read('Drift rate v'));
    fireEvent.change(slider('Coherence'), { target: { value: '1' } });
    expect(Number(read('Drift rate v'))).toBeGreaterThan(before);
  });

  it('lowers the noise after averaging as trials increase', () => {
    render(<ErpSimulator />);
    const before = Number(read('Noise reduction')?.replace('×', ''));
    fireEvent.change(slider('Trials averaged'), { target: { value: '200' } });
    expect(Number(read('Noise reduction')?.replace('×', ''))).toBeGreaterThan(
      before
    );
  });

  it('exposes one slider per artefact source', () => {
    render(<ErpSimulator />);
    [
      'Eye blink',
      'Muscle (EMG)',
      'Mains hum (50 Hz)',
      'Sweat / baseline drift',
    ].forEach((label) => expect(slider(label)).toBeInTheDocument());
  });

  it('keeps the artefact sliders at zero by default', () => {
    render(<ErpSimulator />);
    expect(slider('Eye blink').value).toBe('0');
  });
});
