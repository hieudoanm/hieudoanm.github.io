import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CompareControls } from '@/components/molecules/CompareControls';
import type { ImageRaster } from '@/types/image';

const raster: ImageRaster = {
  width: 2,
  height: 2,
  data: new Uint8ClampedArray(16),
};

describe('CompareControls', () => {
  it('loads a compare image from the file input', async () => {
    const user = userEvent.setup();
    const onLoadFiles = jest.fn();
    render(
      <CompareControls
        compareRaster={null}
        mode="off"
        onModeChange={jest.fn()}
        onLoadFiles={onLoadFiles}
        onClear={jest.fn()}
      />
    );
    const input = screen.getByTestId('compare-input');
    const file = new File(['x'], 'other.png', { type: 'image/png' });
    await user.upload(input, file);
    expect(onLoadFiles).toHaveBeenCalledWith([file]);
  });

  it('switches compare modes once a compare image is loaded', async () => {
    const user = userEvent.setup();
    const onModeChange = jest.fn();
    render(
      <CompareControls
        compareRaster={raster}
        mode="off"
        onModeChange={onModeChange}
        onLoadFiles={jest.fn()}
        onClear={jest.fn()}
      />
    );
    await user.click(
      screen.getByRole('button', { name: 'Compare mode: side by side' })
    );
    expect(onModeChange).toHaveBeenCalledWith('side');
    await user.click(
      screen.getByRole('button', { name: 'Compare mode: swipe divider' })
    );
    expect(onModeChange).toHaveBeenCalledWith('swipe');
  });

  it('clears the loaded compare image', async () => {
    const user = userEvent.setup();
    const onClear = jest.fn();
    render(
      <CompareControls
        compareRaster={raster}
        mode="side"
        onModeChange={jest.fn()}
        onLoadFiles={jest.fn()}
        onClear={onClear}
      />
    );
    await user.click(
      screen.getByRole('button', { name: 'Clear compare image' })
    );
    expect(onClear).toHaveBeenCalledTimes(1);
  });
});
