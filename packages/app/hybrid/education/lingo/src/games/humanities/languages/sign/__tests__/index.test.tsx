import { act, render, screen, waitFor } from '@testing-library/react';
import { Sign } from '../index';

const mockCreate = jest.fn();
jest.mock('onnxruntime-web', () => ({
  InferenceSession: { create: (...args: unknown[]) => mockCreate(...args) },
  Tensor: jest.fn(),
}));

const handsOnResults = jest.fn();
jest.mock('@mediapipe/hands', () => ({
  Hands: jest.fn(() => ({
    setOptions: jest.fn(),
    onResults: (callback: unknown) => handsOnResults(callback),
    send: jest.fn().mockResolvedValue(undefined),
  })),
  HAND_CONNECTIONS: Array.from({ length: 21 }, (_, i) => [i, (i + 1) % 21]) as [
    number,
    number,
  ][],
}));

jest.mock('@mediapipe/camera_utils', () => ({
  Camera: jest.fn(() => ({
    start: jest.fn().mockResolvedValue(undefined),
    stop: jest.fn(),
  })),
}));

const drawConnectors = jest.fn();
const drawLandmarks = jest.fn();
jest.mock('@mediapipe/drawing_utils', () => ({
  drawConnectors: (...args: unknown[]) => drawConnectors(...args),
  drawLandmarks: (...args: unknown[]) => drawLandmarks(...args),
}));

jest.mock('next/navigation', () => ({ useRouter: () => ({}) }));

describe('Sign', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
    mockCreate.mockResolvedValue({
      inputNames: ['input'],
      run: jest.fn().mockResolvedValue({ output_label: { cpuData: ['A'] } }),
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  const loadComponent = async (): Promise<void> => {
    render(<Sign />);
    await act(async () => {
      await jest.advanceTimersByTimeAsync(1000);
    });
  };

  it('shows loading state initially', () => {
    render(<Sign />);
    expect(screen.getByText('📦 Loading ONNX model...')).toBeInTheDocument();
  });

  it('renders hidden video and canvas elements', () => {
    const { container } = render(<Sign />);
    expect(container.querySelector('video')).toBeInTheDocument();
    expect(container.querySelector('canvas')).toBeInTheDocument();
  });

  it('shows mirrored caption', () => {
    render(<Sign />);
    expect(
      screen.getByText('Mirrored • Single Hand Tracking')
    ).toBeInTheDocument();
  });

  it('advances through loading stages to ready', async () => {
    await loadComponent();
    await waitFor(() => {
      expect(screen.queryByText(/Initializing AI model/)).toBeNull();
    });
  });

  it('shows error when model initialization fails', async () => {
    mockCreate.mockRejectedValue(new Error('Model load failed'));
    await loadComponent();
    await waitFor(() => {
      expect(
        screen.getByText('❌ Error initializing AI. Please try again.')
      ).toBeInTheDocument();
    });
  });

  it('detects and displays a sign from hand landmarks', async () => {
    await loadComponent();

    expect(handsOnResults).toHaveBeenCalled();
    const onResults = handsOnResults.mock.calls[0][0] as (
      results: unknown
    ) => Promise<void>;

    const landmarks = Array.from({ length: 21 }, (_, i) => ({
      x: 0.1 + i * 0.01,
      y: 0.2 + i * 0.01,
      z: 0.3,
    }));

    await act(async () => {
      await onResults({
        image: { width: 640, height: 480 },
        multiHandLandmarks: [landmarks],
      });
    });

    await waitFor(() => {
      expect(screen.getByTestId('detected-sign')).toHaveTextContent('A');
    });
    expect(drawConnectors).toHaveBeenCalled();
    expect(drawLandmarks).toHaveBeenCalled();
  });

  it('skips frames without detected hands', async () => {
    await loadComponent();

    const onResults = handsOnResults.mock.calls[0][0] as (
      results: unknown
    ) => Promise<void>;
    await act(async () => {
      await onResults({ image: { width: 640, height: 480 } });
    });
    expect(screen.queryByTestId('detected-sign')).toBeNull();
  });

  it('skips frames without an image', async () => {
    await loadComponent();
    const onResults = handsOnResults.mock.calls[0][0] as (
      results: unknown
    ) => Promise<void>;
    await act(async () => {
      await onResults({ multiHandLandmarks: [] });
    });
    expect(screen.queryByTestId('detected-sign')).toBeNull();
  });

  it('continues after inference errors', async () => {
    mockCreate.mockResolvedValue({
      inputNames: ['input'],
      run: jest.fn().mockRejectedValue(new Error('inference failed')),
    });
    await loadComponent();

    const onResults = handsOnResults.mock.calls[0][0] as (
      results: unknown
    ) => Promise<void>;
    const landmarks = Array.from({ length: 21 }, (_, i) => ({
      x: 0.1 + i * 0.01,
      y: 0.2 + i * 0.01,
      z: 0.3,
    }));
    await act(async () => {
      await onResults({
        image: { width: 640, height: 480 },
        multiHandLandmarks: [landmarks],
      });
    });
    expect(screen.queryByTestId('detected-sign')).toBeNull();
  });
});
