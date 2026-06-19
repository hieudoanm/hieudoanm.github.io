import { render } from '@testing-library/react';
import { CameraModal } from '../CameraModal';

// Mock MediaDevices
Object.defineProperty(navigator, 'mediaDevices', {
  value: {
    getUserMedia: jest.fn().mockResolvedValue({
      getTracks: () => [{ stop: jest.fn() }],
    }),
  },
  writable: true,
});

describe('CameraModal', () => {
  it('should render', () => {
    const { container } = render(<CameraModal onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
});
