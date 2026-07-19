import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ImageToolbar } from '@/components/molecules/ImageToolbar';

describe('ImageToolbar', () => {
  it('shows the current zoom percentage', () => {
    render(
      <ImageToolbar
        zoom={1.5}
        onZoomIn={jest.fn()}
        onZoomOut={jest.fn()}
        onFit={jest.fn()}
        onRotateCW={jest.fn()}
        onRotateCCW={jest.fn()}
        onFlipX={jest.fn()}
        onFlipY={jest.fn()}
      />
    );
    expect(screen.getByText('150%')).toBeInTheDocument();
  });

  it('wires zoom and fit actions', async () => {
    const user = userEvent.setup();
    const onZoomIn = jest.fn();
    const onZoomOut = jest.fn();
    const onFit = jest.fn();
    render(
      <ImageToolbar
        zoom={1}
        onZoomIn={onZoomIn}
        onZoomOut={onZoomOut}
        onFit={onFit}
        onRotateCW={jest.fn()}
        onRotateCCW={jest.fn()}
        onFlipX={jest.fn()}
        onFlipY={jest.fn()}
      />
    );
    await user.click(screen.getByRole('button', { name: 'Zoom in' }));
    await user.click(screen.getByRole('button', { name: 'Zoom out' }));
    await user.click(screen.getByRole('button', { name: 'Fit' }));
    expect(onZoomIn).toHaveBeenCalledTimes(1);
    expect(onZoomOut).toHaveBeenCalledTimes(1);
    expect(onFit).toHaveBeenCalledTimes(1);
  });
});
