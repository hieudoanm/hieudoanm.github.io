import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { Base64Tool } from '@/components/tools/Base64Tool';

const makeBlob = () => new Blob(['fake'], { type: 'image/png' });

beforeAll(() => {
  Object.defineProperty(URL, 'createObjectURL', {
    writable: true,
    value: jest.fn(() => 'blob:fake'),
  });
  Object.defineProperty(URL, 'revokeObjectURL', {
    writable: true,
    value: jest.fn(),
  });
  Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
    writable: true,
    value: jest.fn((cb: (b: Blob | null) => void) => cb(makeBlob())),
  });
  Object.defineProperty(HTMLCanvasElement.prototype, 'toDataURL', {
    writable: true,
    value: jest.fn(() => 'data:image/png;base64,QUJD'),
  });
  Object.defineProperty(HTMLAnchorElement.prototype, 'click', {
    writable: true,
    value: jest.fn(),
  });
  Object.defineProperty(navigator, 'clipboard', {
    configurable: true,
    value: { writeText: jest.fn().mockResolvedValue(undefined) },
  });
});

beforeEach(() => {
  jest.clearAllMocks();
});

const cfg = (id: string) => ({
  id,
  title: id,
  emoji: 'x',
  description: id,
  category: 'edit' as const,
});

const clickDecode = () => {
  const buttons = screen.getAllByRole('button', { name: 'Decode' });
  fireEvent.click(buttons[buttons.length - 1]);
};

const clickEncode = () => {
  const buttons = screen.getAllByRole('button', { name: 'Encode' });
  fireEvent.click(buttons[buttons.length - 1]);
};

describe('Base64Tool', () => {
  it('renders without throwing', () => {
    const { container } = render(<Base64Tool config={cfg('base64')} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('clears state when switching tabs', async () => {
    render(<Base64Tool config={cfg('base64')} />);
    const input = screen.getByPlaceholderText(/Paste Base64/i);
    fireEvent.change(input, { target: { value: 'test data' } });
    fireEvent.click(screen.getAllByRole('button', { name: 'Encode' })[0]);
    const decoded = screen.getByPlaceholderText(/Type text/i);
    expect((decoded as HTMLTextAreaElement).value).toBe('');
  });

  it('decodes plain base64', async () => {
    render(<Base64Tool config={cfg('base64')} />);
    const input = screen.getByPlaceholderText(/Paste Base64/i);
    fireEvent.change(input, { target: { value: 'aGVsbG8=' } });
    clickDecode();
    expect(await screen.findByText('hello')).toBeTruthy();
  });

  it('decodes a data URL and renders a preview', async () => {
    render(<Base64Tool config={cfg('base64')} />);
    const input = screen.getByPlaceholderText(/Paste Base64/i);
    fireEvent.change(input, {
      target: { value: 'data:image/png;base64,aGVsbG8=' },
    });
    clickDecode();
    expect(await screen.findByAltText('Preview')).toBeTruthy();
  });

  it('takes first token when base64 has trailing text', async () => {
    render(<Base64Tool config={cfg('base64')} />);
    const input = screen.getByPlaceholderText(/Paste Base64/i);
    fireEvent.change(input, {
      target: { value: 'aGVsbG8= trailing junk' },
    });
    clickDecode();
    expect(await screen.findByText('hello')).toBeTruthy();
  });

  it('does not decode empty input', async () => {
    render(<Base64Tool config={cfg('base64')} />);
    clickDecode();
    expect(screen.queryByText('hello')).toBeNull();
    expect(screen.queryByText('Invalid Base64 input')).toBeNull();
  });

  it('does not encode empty input', async () => {
    render(<Base64Tool config={cfg('base64')} />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Encode' })[0]);
    clickEncode();
    expect(screen.queryByText(/Output/)).toBeNull();
  });

  it('shows error for invalid base64', async () => {
    render(<Base64Tool config={cfg('base64')} />);
    const input = screen.getByPlaceholderText(/Paste Base64/i);
    fireEvent.change(input, { target: { value: '!!!invalid!!!' } });
    clickDecode();
    expect(await screen.findByText('Invalid Base64 input')).toBeTruthy();
  });

  it('shows error for non-Latin1 encode input', async () => {
    render(<Base64Tool config={cfg('base64')} />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Encode' })[0]);
    const input = screen.getByPlaceholderText(/Type text/i);
    fireEvent.change(input, { target: { value: '\ud800\udc00' } });
    clickEncode();
    expect(
      await screen.findByText('Invalid input — check for non-Latin1 characters')
    ).toBeTruthy();
  });

  it('encodes text', async () => {
    render(<Base64Tool config={cfg('base64')} />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Encode' })[0]);
    const input = screen.getByPlaceholderText(/Type text/i);
    fireEvent.change(input, { target: { value: 'hello' } });
    clickEncode();
    expect(await screen.findByText('aGVsbG8=')).toBeTruthy();
  });

  it('decodes via Ctrl+Enter', async () => {
    render(<Base64Tool config={cfg('base64')} />);
    const input = screen.getByPlaceholderText(/Paste Base64/i);
    fireEvent.change(input, { target: { value: 'aGVsbG8=' } });
    fireEvent.keyDown(input, { key: 'Enter', ctrlKey: true });
    expect(await screen.findByText('hello')).toBeTruthy();
  });

  it('decodes via Cmd+Enter', async () => {
    render(<Base64Tool config={cfg('base64')} />);
    const input = screen.getByPlaceholderText(/Paste Base64/i);
    fireEvent.change(input, { target: { value: 'aGVsbG8=' } });
    fireEvent.keyDown(input, { key: 'Enter', metaKey: true });
    expect(await screen.findByText('hello')).toBeTruthy();
  });

  it('encodes via Ctrl+Enter in encode tab', async () => {
    render(<Base64Tool config={cfg('base64')} />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Encode' })[0]);
    const input = screen.getByPlaceholderText(/Type text/i);
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.keyDown(input, { key: 'Enter', ctrlKey: true });
    expect(await screen.findByText('dGVzdA==')).toBeTruthy();
  });

  it('does nothing on non-Enter key', async () => {
    render(<Base64Tool config={cfg('base64')} />);
    const input = screen.getByPlaceholderText(/Paste Base64/i);
    fireEvent.change(input, { target: { value: 'aGVsbG8=' } });
    fireEvent.keyDown(input, { key: 'a', ctrlKey: true });
    expect(screen.queryByText('hello')).toBeNull();
  });

  it('sniffs PNG mime type', async () => {
    render(<Base64Tool config={cfg('base64')} />);
    const input = screen.getByPlaceholderText(/Paste Base64/i);
    const b64 = btoa('\x89PNG\r\n\x1a\n');
    fireEvent.change(input, { target: { value: b64 } });
    clickDecode();
    expect(await screen.findByAltText('Preview')).toBeTruthy();
  });

  it('sniffs JPEG mime type', async () => {
    render(<Base64Tool config={cfg('base64')} />);
    const input = screen.getByPlaceholderText(/Paste Base64/i);
    const b64 = btoa('\xff\xd8\xff');
    fireEvent.change(input, { target: { value: b64 } });
    clickDecode();
    expect(await screen.findByAltText('Preview')).toBeTruthy();
  });

  it('sniffs GIF89a mime type', async () => {
    render(<Base64Tool config={cfg('base64')} />);
    const input = screen.getByPlaceholderText(/Paste Base64/i);
    const b64 = btoa('GIF89a');
    fireEvent.change(input, { target: { value: b64 } });
    clickDecode();
    expect(await screen.findByAltText('Preview')).toBeTruthy();
  });

  it('sniffs GIF87a mime type', async () => {
    render(<Base64Tool config={cfg('base64')} />);
    const input = screen.getByPlaceholderText(/Paste Base64/i);
    const b64 = btoa('GIF87a');
    fireEvent.change(input, { target: { value: b64 } });
    clickDecode();
    expect(await screen.findByAltText('Preview')).toBeTruthy();
  });

  it('sniffs WEBP mime type', async () => {
    render(<Base64Tool config={cfg('base64')} />);
    const input = screen.getByPlaceholderText(/Paste Base64/i);
    const b64 = btoa('RIFF\x00\x00\x00WEBP');
    fireEvent.change(input, { target: { value: b64 } });
    clickDecode();
    expect(await screen.findByAltText('Preview')).toBeTruthy();
  });

  it('sniffs SVG from <svg prefix', async () => {
    render(<Base64Tool config={cfg('base64')} />);
    const input = screen.getByPlaceholderText(/Paste Base64/i);
    const b64 = btoa('<svg></svg>');
    fireEvent.change(input, { target: { value: b64 } });
    clickDecode();
    expect(await screen.findByAltText('Preview')).toBeTruthy();
  });

  it('sniffs SVG from <?xml prefix', async () => {
    render(<Base64Tool config={cfg('base64')} />);
    const input = screen.getByPlaceholderText(/Paste Base64/i);
    const b64 = btoa('<?xml version="1.0"?>');
    fireEvent.change(input, { target: { value: b64 } });
    clickDecode();
    expect(await screen.findByAltText('Preview')).toBeTruthy();
  });

  it('sniffs BMP mime type', async () => {
    render(<Base64Tool config={cfg('base64')} />);
    const input = screen.getByPlaceholderText(/Paste Base64/i);
    const b64 = btoa('BM');
    fireEvent.change(input, { target: { value: b64 } });
    clickDecode();
    expect(await screen.findByAltText('Preview')).toBeTruthy();
  });

  it('does not show preview for unknown binary data', async () => {
    render(<Base64Tool config={cfg('base64')} />);
    const input = screen.getByPlaceholderText(/Paste Base64/i);
    const b64 = btoa('plain text data');
    fireEvent.change(input, { target: { value: b64 } });
    clickDecode();
    await waitFor(() => {});
    expect(screen.queryByAltText('Preview')).toBeNull();
  });

  it('falls back to data URL mime when sniffMime returns null', async () => {
    render(<Base64Tool config={cfg('base64')} />);
    const input = screen.getByPlaceholderText(/Paste Base64/i);
    fireEvent.change(input, {
      target: {
        value: 'data:application/octet-stream;base64,aGVsbG8=',
      },
    });
    clickDecode();
    expect(await screen.findByText('hello')).toBeTruthy();
    expect(screen.queryByAltText('Preview')).toBeNull();
  });

  it('does not show preview when sniffMime null and not data URL', async () => {
    render(<Base64Tool config={cfg('base64')} />);
    const input = screen.getByPlaceholderText(/Paste Base64/i);
    fireEvent.change(input, { target: { value: 'aGVsbG8=' } });
    clickDecode();
    expect(await screen.findByText('hello')).toBeTruthy();
    expect(screen.queryByAltText('Preview')).toBeNull();
  });

  it('copies output to clipboard', async () => {
    render(<Base64Tool config={cfg('base64')} />);
    const input = screen.getByPlaceholderText(/Paste Base64/i);
    fireEvent.change(input, { target: { value: 'aGVsbG8=' } });
    clickDecode();
    await screen.findByText('hello');
    fireEvent.click(screen.getByRole('button', { name: 'Copy' }));
    await waitFor(() =>
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('hello')
    );
  });

  it('handles clipboard write failure', async () => {
    (navigator.clipboard.writeText as jest.Mock).mockRejectedValueOnce(
      new Error('denied')
    );
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    render(<Base64Tool config={cfg('base64')} />);
    const input = screen.getByPlaceholderText(/Paste Base64/i);
    fireEvent.change(input, { target: { value: 'aGVsbG8=' } });
    clickDecode();
    await screen.findByText('hello');
    fireEvent.click(screen.getByRole('button', { name: 'Copy' }));
    await waitFor(() =>
      expect(window.alert).toHaveBeenCalledWith('Failed to copy')
    );
    (window.alert as jest.Mock).mockRestore();
  });

  it('downloads output with known mime type', async () => {
    render(<Base64Tool config={cfg('base64')} />);
    const input = screen.getByPlaceholderText(/Paste Base64/i);
    const b64 = btoa('\x89PNG\r\n\x1a\n');
    fireEvent.change(input, { target: { value: b64 } });
    clickDecode();
    await screen.findByAltText('Preview');
    fireEvent.click(screen.getByRole('button', { name: 'Download' }));
    expect(HTMLAnchorElement.prototype.click).toHaveBeenCalled();
  });

  it('downloads output with unknown mime type (bin extension)', async () => {
    render(<Base64Tool config={cfg('base64')} />);
    const input = screen.getByPlaceholderText(/Paste Base64/i);
    fireEvent.change(input, { target: { value: 'aGVsbG8=' } });
    clickDecode();
    await screen.findByText('hello');
    fireEvent.click(screen.getByRole('button', { name: 'Download' }));
    expect(HTMLAnchorElement.prototype.click).toHaveBeenCalled();
  });

  it('shows output size in bytes', async () => {
    render(<Base64Tool config={cfg('base64')} />);
    const input = screen.getByPlaceholderText(/Paste Base64/i);
    fireEvent.change(input, { target: { value: 'aGVsbG8=' } });
    clickDecode();
    await screen.findByText('hello');
    expect(screen.getByText(/B\)/)).toBeTruthy();
  });

  it('shows text output when no previewUrl', async () => {
    render(<Base64Tool config={cfg('base64')} />);
    const input = screen.getByPlaceholderText(/Paste Base64/i);
    fireEvent.change(input, { target: { value: 'aGVsbG8=' } });
    clickDecode();
    await screen.findByText('hello');
    expect(screen.queryByAltText('Preview')).toBeNull();
  });

  it('shows file upload only in encode tab', () => {
    const { container } = render(<Base64Tool config={cfg('base64')} />);
    expect(container.querySelector('input[type="file"]')).toBeNull();
    fireEvent.click(screen.getAllByRole('button', { name: 'Encode' })[0]);
    expect(container.querySelector('input[type="file"]')).toBeTruthy();
  });

  it('reads file and sets input in encode mode', async () => {
    const { container } = render(<Base64Tool config={cfg('base64')} />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Encode' })[0]);
    const fileInput = container.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    const file = new File(['hello'], 'test.txt', { type: 'text/plain' });
    fireEvent.change(fileInput, { target: { files: [file] } });
    await waitFor(() => {
      const textarea = screen.getByPlaceholderText(/Type text/i);
      expect((textarea as HTMLTextAreaElement).value).toBeTruthy();
    });
  });

  it('handles FileReader error', async () => {
    const origFileReader = global.FileReader;
    class FailingReader {
      result: string | null = null;
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;
      readAsDataURL() {
        setTimeout(() => this.onerror?.(), 0);
      }
    }
    global.FileReader = FailingReader as unknown as typeof FileReader;

    const { container } = render(<Base64Tool config={cfg('base64')} />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Encode' })[0]);
    const fileInput = container.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    const file = new File(['x'], 'bad.txt', { type: 'text/plain' });
    fireEvent.change(fileInput, { target: { files: [file] } });
    await waitFor(() => {
      expect(screen.getByText('Failed to read file')).toBeTruthy();
    });
    global.FileReader = origFileReader;
  });

  it('decodes non-image data URL as text output', async () => {
    render(<Base64Tool config={cfg('base64')} />);
    const input = screen.getByPlaceholderText(/Paste Base64/i);
    fireEvent.change(input, {
      target: { value: 'data:text/plain;base64,aGVsbG8=' },
    });
    clickDecode();
    await waitFor(() => {
      expect(screen.queryByAltText('Preview')).toBeNull();
    });
  });

  it('switches back to decode and clears encode input', async () => {
    render(<Base64Tool config={cfg('base64')} />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Encode' })[0]);
    const textarea = screen.getByPlaceholderText(/Type text/i);
    fireEvent.change(textarea, { target: { value: 'some text' } });
    fireEvent.click(screen.getAllByRole('button', { name: 'Decode' })[0]);
    const decodedTextarea = screen.getByPlaceholderText(/Paste Base64/i);
    expect((decodedTextarea as HTMLTextAreaElement).value).toBe('');
  });
});
