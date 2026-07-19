import { render, screen, fireEvent } from '@testing-library/react';
import { CameraCapture } from '@/components/gallery/molecules/CameraCapture';

describe('CameraCapture', () => {
  it('captures a photo', () => {
    const onCapture = jest.fn();
    render(<CameraCapture onCapture={onCapture} onClose={jest.fn()} />);
    fireEvent.click(screen.getByLabelText('Capture photo'));
    expect(onCapture).toHaveBeenCalled();
  });

  it('closes the camera', () => {
    const onClose = jest.fn();
    render(<CameraCapture onCapture={jest.fn()} onClose={onClose} />);
    fireEvent.click(screen.getByLabelText('Close camera'));
    expect(onClose).toHaveBeenCalled();
  });
});
