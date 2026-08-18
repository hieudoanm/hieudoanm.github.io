import { render, screen, fireEvent } from '@testing-library/react';
import { SetupPanel } from '../SetupPanel';

const baseProps = {
  setupMode: false,
  setupFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  setupPalette: null as string | null,
  onStart: jest.fn(),
  onApply: jest.fn(),
  onCancel: jest.fn(),
  onClear: jest.fn(),
  onPaletteChange: jest.fn(),
  onSetupFenChange: jest.fn(),
};

describe('SetupPanel', () => {
  it('shows Start Setup button when not in setup mode', () => {
    render(<SetupPanel {...baseProps} />);
    expect(screen.getByRole('button', { name: /Start Setup/ })).toBeTruthy();
  });

  it('calls onStart when clicking Start Setup', () => {
    const onStart = jest.fn();
    render(<SetupPanel {...baseProps} onStart={onStart} />);
    fireEvent.click(screen.getByRole('button', { name: /Start Setup/ }));
    expect(onStart).toHaveBeenCalled();
  });

  it('shows palette and action buttons in setup mode', () => {
    render(<SetupPanel {...baseProps} setupMode={true} />);
    expect(screen.getByTitle('wK')).toBeTruthy();
    expect(screen.getByTitle('Erase')).toBeTruthy();
    expect(screen.getByText('Apply')).toBeTruthy();
    expect(screen.getByText('Clear')).toBeTruthy();
    expect(screen.getByText('Cancel')).toBeTruthy();
  });

  it('highlights selected palette piece', () => {
    render(<SetupPanel {...baseProps} setupMode={true} setupPalette="wQ" />);
    const wqBtn = screen.getByTitle('wQ');
    expect(wqBtn.className).toContain('btn-primary');
    const wkBtn = screen.getByTitle('wK');
    expect(wkBtn.className).toContain('btn-ghost');
  });

  it('highlights erase when palette is null', () => {
    render(<SetupPanel {...baseProps} setupMode={true} setupPalette="wK" />);
    const eraseBtn = screen.getByTitle('Erase');
    expect(eraseBtn.className).toContain('btn-ghost');
  });

  it('calls onPaletteChange with piece key', () => {
    const onPaletteChange = jest.fn();
    render(
      <SetupPanel
        {...baseProps}
        setupMode={true}
        onPaletteChange={onPaletteChange}
      />
    );
    fireEvent.click(screen.getByTitle('wR'));
    expect(onPaletteChange).toHaveBeenCalledWith('wR');
  });

  it('calls onPaletteChange with null for erase', () => {
    const onPaletteChange = jest.fn();
    render(
      <SetupPanel
        {...baseProps}
        setupMode={true}
        onPaletteChange={onPaletteChange}
      />
    );
    fireEvent.click(screen.getByTitle('Erase'));
    expect(onPaletteChange).toHaveBeenCalledWith(null);
  });

  it('calls onApply', () => {
    const onApply = jest.fn();
    render(<SetupPanel {...baseProps} setupMode={true} onApply={onApply} />);
    fireEvent.click(screen.getByText('Apply'));
    expect(onApply).toHaveBeenCalled();
  });

  it('calls onCancel', () => {
    const onCancel = jest.fn();
    render(<SetupPanel {...baseProps} setupMode={true} onCancel={onCancel} />);
    fireEvent.click(screen.getByText('Cancel'));
    expect(onCancel).toHaveBeenCalled();
  });

  it('calls onClear', () => {
    const onClear = jest.fn();
    render(<SetupPanel {...baseProps} setupMode={true} onClear={onClear} />);
    fireEvent.click(screen.getByText('Clear'));
    expect(onClear).toHaveBeenCalled();
  });

  it('updates FEN textarea', () => {
    const onSetupFenChange = jest.fn();
    render(
      <SetupPanel
        {...baseProps}
        setupMode={true}
        onSetupFenChange={onSetupFenChange}
      />
    );
    const textarea = screen.getAllByRole('textbox')[0]!;
    fireEvent.change(textarea, { target: { value: 'new fen' } });
    expect(onSetupFenChange).toHaveBeenCalledWith('new fen');
  });
});
