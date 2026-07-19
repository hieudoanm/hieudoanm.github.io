import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { QrReadTool } from '@/components/tools/QrReadTool';

jest.mock('jsqr', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockJsQR = require('jsqr').default as jest.Mock;

const cfg = {
  id: 'qr-read',
  title: 'QR Read',
  emoji: 'x',
  description: 'qr read',
  category: 'scan' as const,
};

const canvasCtxStub = {
  drawImage: jest.fn(),
  getImageData: jest.fn(() => ({
    data: new Uint8ClampedArray(16),
    width: 2,
    height: 2,
  })),
};

beforeAll(() => {
  Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
    writable: true,
    value: jest.fn(() => canvasCtxStub),
  });
});

beforeEach(() => {
  jest.clearAllMocks();
  mockJsQR.mockReturnValue(null);
  (global as any).createImageBitmap = jest.fn().mockResolvedValue({
    width: 100,
    height: 100,
  });
});

afterEach(() => {
  delete (global as any).createImageBitmap;
});

const makeFile = () => new File(['fake'], 'qr.png', { type: 'image/png' });

const uploadFile = (container: HTMLElement) => {
  const input = container.querySelector(
    'input[type="file"]'
  ) as HTMLInputElement;
  fireEvent.change(input, { target: { files: [makeFile()] } });
};

describe('QrReadTool', () => {
  it('renders with upload area', () => {
    render(<QrReadTool config={cfg} />);
    expect(screen.getByText(/Drop a file here/)).toBeTruthy();
  });

  it('reads QR code successfully', async () => {
    mockJsQR.mockReturnValue({ data: 'https://example.com' });
    const { container } = render(<QrReadTool config={cfg} />);
    uploadFile(container);
    await waitFor(() =>
      expect(screen.getByText('https://example.com')).toBeTruthy()
    );
  });

  it('shows no QR found message', async () => {
    mockJsQR.mockReturnValue(null);
    const { container } = render(<QrReadTool config={cfg} />);
    uploadFile(container);
    await waitFor(() =>
      expect(screen.getByText('No QR code found.')).toBeTruthy()
    );
  });

  it('handles Error instance', async () => {
    (global as any).createImageBitmap = jest
      .fn()
      .mockRejectedValue(new Error('bitmap failed'));
    const { container } = render(<QrReadTool config={cfg} />);
    uploadFile(container);
    await waitFor(() =>
      expect(screen.getByText('Error: bitmap failed')).toBeTruthy()
    );
  });

  it('handles non-Error exception', async () => {
    (global as any).createImageBitmap = jest
      .fn()
      .mockRejectedValue('string err');
    const { container } = render(<QrReadTool config={cfg} />);
    uploadFile(container);
    await waitFor(() =>
      expect(screen.getByText('Error: QR reading failed')).toBeTruthy()
    );
  });
});
