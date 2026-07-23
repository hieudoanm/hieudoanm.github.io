import { render, screen, act, waitFor } from '@testing-library/react';
import { Sign } from '../SignModal';

const mockCreate = jest.fn();
jest.mock('onnxruntime-web', () => ({
  InferenceSession: { create: (...args: unknown[]) => mockCreate(...args) },
  Tensor: jest.fn(),
}));

jest.mock('@mediapipe/hands', () => ({
  Hands: jest.fn(() => ({
    setOptions: jest.fn(),
    onResults: jest.fn(),
    send: jest.fn(),
  })),
  HAND_CONNECTIONS: [
    [0, 1],
    [1, 2],
  ],
}));

jest.mock('@mediapipe/camera_utils', () => ({
  Camera: jest.fn(() => ({
    start: jest.fn().mockResolvedValue(undefined),
    stop: jest.fn(),
  })),
}));

jest.mock('@mediapipe/drawing_utils', () => ({
  drawConnectors: jest.fn(),
  drawLandmarks: jest.fn(),
}));

jest.useFakeTimers();

describe('Sign', () => {
  const onClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockCreate.mockResolvedValue({ inputNames: ['input'] });
  });

  it('renders modal title', () => {
    render(<Sign onClose={onClose} />);
    expect(screen.getByText('Sign Language')).toBeInTheDocument();
  });

  it('shows loading state initially', () => {
    render(<Sign onClose={onClose} />);
    act(() => {
      jest.advanceTimersByTime(0);
    });
    expect(screen.getByText('📦 Loading ONNX model...')).toBeInTheDocument();
  });

  it('renders video element', () => {
    render(<Sign onClose={onClose} />);
    expect(document.querySelector('video')).toBeInTheDocument();
  });

  it('renders canvas element', () => {
    render(<Sign onClose={onClose} />);
    expect(document.querySelector('canvas')).toBeInTheDocument();
  });

  it('shows mirroed text', () => {
    render(<Sign onClose={onClose} />);
    expect(
      screen.getByText('Mirrored • Single Hand Tracking')
    ).toBeInTheDocument();
  });

  it('shows error when model initialization fails', async () => {
    mockCreate.mockRejectedValue(new Error('Model load failed'));
    render(<Sign onClose={onClose} />);
    await act(async () => {
      jest.runAllTimers();
    });
    await waitFor(() => {
      expect(
        screen.getByText('❌ Error initializing AI. Please try again.')
      ).toBeInTheDocument();
    });
  });

  it('advances loading text through stages', async () => {
    jest.useFakeTimers();
    render(<Sign onClose={onClose} />);
    act(() => {
      jest.advanceTimersByTime(0);
    });
    expect(screen.getByText('📦 Loading ONNX model...')).toBeInTheDocument();
    await act(async () => {
      jest.advanceTimersByTime(300);
      await Promise.resolve();
    });
    expect(
      screen.getByText('⚙️ Initializing inference engine...')
    ).toBeInTheDocument();
  });
});
