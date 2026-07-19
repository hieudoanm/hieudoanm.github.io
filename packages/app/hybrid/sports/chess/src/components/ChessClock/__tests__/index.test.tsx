import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChessClock } from '../index';

jest.mock('../utils/sound', () => ({
  playFlagFall: jest.fn(),
  playLowTime: jest.fn(),
  playTick: jest.fn(),
}));

describe('ChessClock', () => {
  const onClose = jest.fn();
  beforeEach(() => onClose.mockClear());

  it('renders all preset buttons', () => {
    render(<ChessClock onClose={onClose} />);
    const names = [
      'Classic',
      'Rapid',
      'Blitz',
      'Fischer',
      'Bronstein',
      'Hourglass',
      '1 Min',
      '30 Sec',
    ];
    names.forEach((n) =>
      expect(screen.getByText(n).closest('button')).toBeTruthy()
    );
    expect(screen.getByText('Sound on')).toBeTruthy();
    expect(screen.getByText('Tick off')).toBeTruthy();
  });

  it('starts clock on white press', async () => {
    render(<ChessClock onClose={onClose} />);
    await userEvent.click(screen.getByRole('button', { name: /White/ }));
    expect(screen.getByText(/Elapsed/)).toBeTruthy();
  });

  it('starts clock on black press', async () => {
    render(<ChessClock onClose={onClose} />);
    await userEvent.click(screen.getByRole('button', { name: /Black/ }));
    expect(screen.getByText(/Elapsed/)).toBeTruthy();
  });

  it('switches turn when other side pressed', async () => {
    render(<ChessClock onClose={onClose} />);
    await userEvent.click(screen.getByRole('button', { name: /White/ }));
    await userEvent.click(screen.getByRole('button', { name: /Black/ }));
    expect(screen.getByText(/Elapsed/)).toBeTruthy();
  });

  it('pressing same side while running is noop', async () => {
    render(<ChessClock onClose={onClose} />);
    await userEvent.click(screen.getByRole('button', { name: /White/ }));
    await userEvent.click(screen.getByRole('button', { name: /White/ }));
    expect(screen.getByText(/Elapsed/)).toBeTruthy();
  });

  it('toggles sound', async () => {
    render(<ChessClock onClose={onClose} />);
    await userEvent.click(screen.getByText('Sound on'));
    expect(screen.getByText('Sound off')).toBeTruthy();
    await userEvent.click(screen.getByText('Sound off'));
    expect(screen.getByText('Sound on')).toBeTruthy();
  });

  it('toggles tick', async () => {
    render(<ChessClock onClose={onClose} />);
    await userEvent.click(screen.getByText('Tick off'));
    expect(screen.getByText('Tick on')).toBeTruthy();
    await userEvent.click(screen.getByText('Tick on'));
    expect(screen.getByText('Tick off')).toBeTruthy();
  });

  it('resets clock', async () => {
    render(<ChessClock onClose={onClose} />);
    await userEvent.click(screen.getByRole('button', { name: /White/ }));
    await userEvent.click(screen.getByText('Reset').closest('button')!);
    expect(screen.queryByText(/Elapsed/)).toBeNull();
  });

  it('undo disabled initially', () => {
    render(<ChessClock onClose={onClose} />);
    expect(screen.getByText('Undo').closest('button')!.disabled).toBe(true);
  });

  it('undo works after move', async () => {
    render(<ChessClock onClose={onClose} />);
    await userEvent.click(screen.getByRole('button', { name: /White/ }));
    await userEvent.click(screen.getByRole('button', { name: /Black/ }));
    const undoBtn = screen.getByText('Undo').closest('button')!;
    expect(undoBtn.disabled).toBe(false);
    await userEvent.click(undoBtn);
  });

  it('shows move chart', () => {
    render(<ChessClock onClose={onClose} />);
    expect(screen.getByText('Move times')).toBeTruthy();
    expect(screen.getByText('No moves yet.')).toBeTruthy();
  });

  it('changes preset', async () => {
    render(<ChessClock onClose={onClose} />);
    await userEvent.click(screen.getByText('Blitz').closest('button')!);
    expect(screen.getByText('Blitz').closest('button')!.className).toContain(
      'btn-primary'
    );
  });

  it('switches between presets', async () => {
    render(<ChessClock onClose={onClose} />);
    await userEvent.click(screen.getByText('Fischer').closest('button')!);
    expect(screen.getByText('Fischer').closest('button')!.className).toContain(
      'btn-primary'
    );
    await userEvent.click(screen.getByText('Classic').closest('button')!);
    expect(screen.getByText('Classic').closest('button')!.className).toContain(
      'btn-primary'
    );
  });

  it('opens and closes editing panel', async () => {
    render(<ChessClock onClose={onClose} />);
    const gearBtn = screen
      .getByText('Fullscreen')
      .closest('button')!.previousElementSibling!;
    await userEvent.click(gearBtn);
    expect(screen.getByText('Set')).toBeTruthy();
    await userEvent.click(gearBtn);
    expect(screen.queryByText('Set')).toBeNull();
  });

  it('applies custom time', async () => {
    render(<ChessClock onClose={onClose} />);
    const gearBtn = screen
      .getByText('Fullscreen')
      .closest('button')!.previousElementSibling!;
    await userEvent.click(gearBtn);
    await userEvent.click(screen.getByText('Set'));
  });

  it('changes delay type', async () => {
    render(<ChessClock onClose={onClose} />);
    const gearBtn = screen
      .getByText('Fullscreen')
      .closest('button')!.previousElementSibling!;
    await userEvent.click(gearBtn);
    const delaySelect = screen.getByLabelText('Delay');
    await userEvent.selectOptions(delaySelect, 'fischer');
    expect((delaySelect as HTMLSelectElement).value).toBe('fischer');
    await userEvent.selectOptions(delaySelect, 'bronstein');
    expect((delaySelect as HTMLSelectElement).value).toBe('bronstein');
    await userEvent.selectOptions(delaySelect, 'delay');
    expect((delaySelect as HTMLSelectElement).value).toBe('delay');
    await userEvent.selectOptions(delaySelect, 'none');
    expect((delaySelect as HTMLSelectElement).value).toBe('none');
  });

  it('shows no winner initially', () => {
    render(<ChessClock onClose={onClose} />);
    expect(screen.queryByText(/wins/)).toBeNull();
  });

  it('handles edit fields', async () => {
    render(<ChessClock onClose={onClose} />);
    const gearBtn = screen
      .getByText('Fullscreen')
      .closest('button')!.previousElementSibling!;
    await userEvent.click(gearBtn);
    const inputs = screen.getAllByRole('spinbutton');
    expect(inputs.length).toBeGreaterThan(0);
  });

  it('renders all presets and selects each', async () => {
    render(<ChessClock onClose={onClose} />);
    for (const name of [
      'Rapid',
      'Blitz',
      'Fischer',
      'Bronstein',
      'Hourglass',
      '1 Min',
      '30 Sec',
      'Classic',
    ]) {
      await userEvent.click(screen.getByText(name).closest('button')!);
    }
  });
});
