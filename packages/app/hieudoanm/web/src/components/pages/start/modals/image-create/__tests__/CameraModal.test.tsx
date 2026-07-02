import {
  act,
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import { CameraModal } from '../CameraModal';

const mockGetUserMedia = jest.fn();
const mockTrackStop = jest.fn();
const mockCreateObjectURL = jest
  .fn()
  .mockReturnValue('blob:http://localhost/test');
const mockRevokeObjectURL = jest.fn();

beforeAll(() => {
  HTMLCanvasElement.prototype.toBlob = function (callback: BlobCallback) {
    callback(new Blob(['test'], { type: 'image/png' }));
  };
});

beforeEach(() => {
  jest.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({
    setTransform: jest.fn(),
    translate: jest.fn(),
    scale: jest.fn(),
    drawImage: jest.fn(),
  } as unknown as CanvasRenderingContext2D);
});

beforeEach(() => {
  mockGetUserMedia.mockReset();
  mockTrackStop.mockReset();
  mockGetUserMedia.mockResolvedValue({
    getTracks: () => [{ stop: mockTrackStop }],
  });
  Object.defineProperty(navigator, 'mediaDevices', {
    value: {
      getUserMedia: mockGetUserMedia,
    },
    writable: true,
  });
  (globalThis as any).URL.createObjectURL = mockCreateObjectURL;
  (globalThis as any).URL.revokeObjectURL = mockRevokeObjectURL;
});

const renderCamera = (onClose = jest.fn()) =>
  render(<CameraModal onClose={onClose} />);

describe('CameraModal', () => {
  it('should render camera interface', () => {
    renderCamera();
    expect(screen.getByText('Camera')).toBeInTheDocument();
    expect(screen.getByText('Front')).toBeInTheDocument();
  });

  it('should render control buttons', () => {
    renderCamera();
    expect(screen.getByText('Ratio')).toBeInTheDocument();
    expect(screen.getByText('Clean')).toBeInTheDocument();
  });

  it('should call getUserMedia on mount', () => {
    renderCamera();
    expect(mockGetUserMedia).toHaveBeenCalledWith({
      video: { facingMode: 'user' },
      audio: false,
    });
  });

  it('should switch camera on Flip click', () => {
    renderCamera();
    const buttons = screen.getAllByRole('button');
    const flipBtn = buttons.find((b) =>
      b.querySelector('svg[stroke="currentColor"]')
    );
    if (flipBtn) fireEvent.click(flipBtn);
    expect(mockGetUserMedia).toHaveBeenLastCalledWith({
      video: { facingMode: 'environment' },
      audio: false,
    });
  });

  it('should stop previous stream when switching camera', async () => {
    renderCamera();
    await act(async () => {});
    mockTrackStop.mockReset();
    const buttons = screen.getAllByRole('button');
    const flipBtn = buttons.find((b) =>
      b.querySelector('svg[stroke="currentColor"]')
    );
    if (flipBtn) fireEvent.click(flipBtn);
    expect(mockTrackStop).toHaveBeenCalled();
  });

  it('should cycle through overlays', () => {
    renderCamera();
    fireEvent.click(screen.getByText('thirds'));
    expect(screen.getByText('thirds')).toBeInTheDocument();
    fireEvent.click(screen.getByText('symmetry'));
    expect(screen.getByText('symmetry')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Clean'));
    expect(screen.getByText('Clean')).toBeInTheDocument();
  });

  it('should cycle through ratios', () => {
    renderCamera();
    expect(screen.getByText('1:1')).toBeInTheDocument();
    fireEvent.click(screen.getByText('1:1'));
    expect(screen.getByText('4:3')).toBeInTheDocument();
    fireEvent.click(screen.getByText('4:3'));
    expect(screen.getByText('3:2')).toBeInTheDocument();
    fireEvent.click(screen.getByText('3:2'));
    expect(screen.getByText('16:9')).toBeInTheDocument();
    fireEvent.click(screen.getByText('16:9'));
    expect(screen.getByText('1:1')).toBeInTheDocument();
  });

  it('should show error when camera access fails', async () => {
    mockGetUserMedia.mockRejectedValue(new Error('Camera denied'));
    renderCamera();
    await waitFor(() => {
      expect(screen.getByText('Camera denied')).toBeInTheDocument();
    });
  });

  it('should show generic error for non-Error rejection', async () => {
    mockGetUserMedia.mockRejectedValue('Some string error');
    renderCamera();
    await waitFor(() => {
      expect(screen.getByText('Could not access camera')).toBeInTheDocument();
    });
  });

  it('should handle capture creating a downloadable blob', async () => {
    await act(async () => {
      renderCamera();
    });
    const buttons = screen.getAllByRole('button');
    const captureBtn = buttons.find((b) => b.querySelector('.rounded-full'));
    if (captureBtn) {
      await act(async () => {
        fireEvent.click(captureBtn);
      });
    }
    expect(mockCreateObjectURL).toHaveBeenCalled();
    expect(mockRevokeObjectURL).toHaveBeenCalled();
  });

  it('should show Rear after Flip click', () => {
    renderCamera();
    expect(screen.getByText('Front')).toBeInTheDocument();
    const buttons = screen.getAllByRole('button');
    const flipBtn = buttons.find((b) =>
      b.querySelector('svg[stroke="currentColor"]')
    );
    if (flipBtn) fireEvent.click(flipBtn);
    expect(screen.getByText('Rear')).toBeInTheDocument();
  });
});
