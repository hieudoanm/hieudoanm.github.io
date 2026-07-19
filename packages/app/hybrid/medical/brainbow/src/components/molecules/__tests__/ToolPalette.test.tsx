import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ToolPalette } from '@/components/molecules/ToolPalette';

describe('ToolPalette', () => {
  it('switches tools on click', async () => {
    const user = userEvent.setup();
    const onToolChange = jest.fn();
    render(<ToolPalette tool="pan" onToolChange={onToolChange} />);
    await user.click(screen.getByRole('button', { name: 'Polygon tool' }));
    expect(onToolChange).toHaveBeenCalledWith('polygon');
  });

  it('marks the active tool as pressed', () => {
    render(<ToolPalette tool="freehand" onToolChange={jest.fn()} />);
    expect(
      screen.getByRole('button', { name: 'Freehand tool' })
    ).toHaveAttribute('aria-pressed', 'true');
  });

  it('switches to measurement tools', async () => {
    const user = userEvent.setup();
    const onToolChange = jest.fn();
    render(<ToolPalette tool="pan" onToolChange={onToolChange} />);
    await user.click(
      screen.getByRole('button', { name: 'Measure distance tool' })
    );
    expect(onToolChange).toHaveBeenCalledWith('measureDistance');
    await user.click(
      screen.getByRole('button', { name: 'Measure angle tool' })
    );
    expect(onToolChange).toHaveBeenCalledWith('measureAngle');
    await user.click(screen.getByRole('button', { name: 'Measure area tool' }));
    expect(onToolChange).toHaveBeenCalledWith('measureArea');
  });

  it('switches to the eraser and lasso subtract tools', async () => {
    const user = userEvent.setup();
    const onToolChange = jest.fn();
    render(<ToolPalette tool="pan" onToolChange={onToolChange} />);
    await user.click(screen.getByRole('button', { name: 'Erase tool' }));
    expect(onToolChange).toHaveBeenCalledWith('erase');
    await user.click(
      screen.getByRole('button', { name: 'Lasso subtract tool' })
    );
    expect(onToolChange).toHaveBeenCalledWith('lassoSubtract');
  });
});
