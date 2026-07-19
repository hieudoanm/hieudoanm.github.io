import { render, screen } from '@testing-library/react';
import { ViewerCanvas } from '@/components/organisms/ViewerCanvas';

describe('ViewerCanvas', () => {
  const props = {
    raster: {
      width: 2,
      height: 1,
      data: new Uint8ClampedArray([255, 0, 0, 255, 0, 255, 0, 255]),
    },
    transform: { scale: 1, offsetX: 0, offsetY: 0 },
    onTransformChange: jest.fn(),
    onSizeChange: jest.fn(),
  };

  it('renders a canvas element', () => {
    render(<ViewerCanvas {...props} />);
    expect(screen.getByTestId('viewer-canvas')).toBeInTheDocument();
  });
});
