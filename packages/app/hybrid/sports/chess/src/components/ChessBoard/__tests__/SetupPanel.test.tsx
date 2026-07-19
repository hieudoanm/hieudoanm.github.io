import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SetupPanel } from '../components/SetupPanel';

const props = (overrides: Record<string, unknown> = {}) => ({
  setupMode: false,
  setupFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  setupPalette: null as string | null,
  onStart: jest.fn(),
  onApply: jest.fn(),
  onCancel: jest.fn(),
  onClear: jest.fn(),
  onPaletteChange: jest.fn(),
  onSetupFenChange: jest.fn(),
  ...overrides,
});

describe('SetupPanel', () => {
  it('renders start button when not in setup mode', () => {
    render(<SetupPanel {...props()} />);
    expect(screen.getByText(/Start Setup/)).toBeTruthy();
  });

  it('calls onStart when start button is clicked', async () => {
    const p = props();
    render(<SetupPanel {...p} />);
    await userEvent.click(screen.getByText(/Start Setup/));
    expect(p.onStart).toHaveBeenCalled();
  });

  it('renders palette and buttons in setup mode', () => {
    render(<SetupPanel {...props({ setupMode: true })} />);
    expect(screen.getByText('Apply')).toBeTruthy();
    expect(screen.getByText('Clear')).toBeTruthy();
    expect(screen.getByText('Cancel')).toBeTruthy();
  });

  it('calls onApply when apply button is clicked', async () => {
    const p = props({ setupMode: true });
    render(<SetupPanel {...p} />);
    await userEvent.click(screen.getByText('Apply'));
    expect(p.onApply).toHaveBeenCalled();
  });

  it('calls onClear when clear button is clicked', async () => {
    const p = props({ setupMode: true });
    render(<SetupPanel {...p} />);
    await userEvent.click(screen.getByText('Clear'));
    expect(p.onClear).toHaveBeenCalled();
  });

  it('calls onCancel when cancel button is clicked', async () => {
    const p = props({ setupMode: true });
    render(<SetupPanel {...p} />);
    await userEvent.click(screen.getByText('Cancel'));
    expect(p.onCancel).toHaveBeenCalled();
  });

  it('calls onPaletteChange when a palette button is clicked', async () => {
    const p = props({ setupMode: true });
    render(<SetupPanel {...p} />);
    const buttons = screen.getAllByRole('button');
    const pawnButton = buttons.find((b) => b.textContent === '♙');
    if (pawnButton) {
      await userEvent.click(pawnButton);
      expect(p.onPaletteChange).toHaveBeenCalled();
    }
  });

  it('calls onSetupFenChange when textarea is edited', async () => {
    const p = props({ setupMode: true });
    render(<SetupPanel {...p} />);
    const textarea = screen.getByRole('textbox');
    await userEvent.clear(textarea);
    await userEvent.type(textarea, 'new fen');
    expect(p.onSetupFenChange).toHaveBeenCalled();
  });
});
