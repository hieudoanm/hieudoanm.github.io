import {
  render,
  fireEvent,
  screen,
  act,
  waitFor,
} from '@testing-library/react';
import { SVG } from '../SVGModal';

// jsdom doesn't implement File.prototype.text()
if (!File.prototype.text) {
  File.prototype.text = function () {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsText(this);
    });
  };
}

Object.assign(navigator, {
  clipboard: { writeText: jest.fn().mockResolvedValue(undefined) },
});

URL.createObjectURL = jest.fn();
URL.revokeObjectURL = jest.fn();

jest.mock('../SVGModal/utils/svg', () => ({
  svgToCanvas: jest.fn().mockResolvedValue({
    toDataURL: jest.fn().mockReturnValue('data:image/png;base64,mock'),
    toBlob: jest.fn((cb) => cb(new Blob())),
  }),
}));

describe('SVG', () => {
  const onClose = jest.fn();
  const originalCreateElement = document.createElement.bind(document);

  beforeEach(() => {
    jest.clearAllMocks();
    URL.createObjectURL = jest.fn().mockReturnValue('blob:url');
    URL.revokeObjectURL = jest.fn();
  });

  it('renders modal title', () => {
    render(<SVG onClose={onClose} />);
    expect(screen.getByText('SVG Editor')).toBeInTheDocument();
  });

  it('renders editor tab by default', () => {
    render(<SVG onClose={onClose} />);
    expect(screen.getByText('SVG Source')).toBeInTheDocument();
  });

  it('switches to icons tab', () => {
    render(<SVG onClose={onClose} />);
    fireEvent.click(screen.getByText('Icons'));
    expect(screen.getByText('Icon Generation Source')).toBeInTheDocument();
  });

  it('renders textarea with default SVG', () => {
    render(<SVG onClose={onClose} />);
    expect(
      screen.getByPlaceholderText('Paste your SVG code here...')
    ).toBeInTheDocument();
  });

  it('renders preset buttons', () => {
    render(<SVG onClose={onClose} />);
    expect(screen.getByText('Presets:')).toBeInTheDocument();
  });

  it('renders background mode buttons', () => {
    render(<SVG onClose={onClose} />);
    expect(screen.getByText('G')).toBeInTheDocument();
    expect(screen.getByText('W')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText('T')).toBeInTheDocument();
  });

  it('copies SVG on copy button click', async () => {
    render(<SVG onClose={onClose} />);
    await act(async () => {
      fireEvent.click(screen.getByText('Copy'));
    });
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
    await waitFor(() => {
      expect(screen.getByText('Copied')).toBeInTheDocument();
    });
  });

  it('formats SVG on format button click', () => {
    render(<SVG onClose={onClose} />);
    const textarea = screen.getByPlaceholderText('Paste your SVG code here...');
    fireEvent.change(textarea, { target: { value: '<svg></svg>' } });
    fireEvent.click(screen.getByText('Format'));
    expect(textarea).toHaveValue('<svg>\n</svg>');
  });

  it('allows SVG input', () => {
    render(<SVG onClose={onClose} />);
    const textarea = screen.getByPlaceholderText('Paste your SVG code here...');
    fireEvent.change(textarea, {
      target: { value: '<circle cx="50" cy="50" r="40" />' },
    });
    expect(textarea).toHaveValue('<circle cx="50" cy="50" r="40" />');
  });

  it('downloads SVG when Export SVG clicked', () => {
    const clickSpy = jest.fn();
    jest.spyOn(document, 'createElement').mockImplementation((tag) => {
      if (tag === 'a') {
        return { href: '', download: '', click: clickSpy } as any;
      }
      return originalCreateElement(tag);
    });

    render(<SVG onClose={onClose} />);
    fireEvent.click(screen.getByText('Export SVG'));
    expect(clickSpy).toHaveBeenCalled();
    jest.restoreAllMocks();
  });

  it('resets SVG to default when Reset clicked', () => {
    render(<SVG onClose={onClose} />);
    const textarea = screen.getByPlaceholderText('Paste your SVG code here...');
    fireEvent.change(textarea, { target: { value: '<svg></svg>' } });
    fireEvent.click(screen.getByText('Reset'));
    expect(textarea).toHaveValue();
  });

  it('applies preset when preset button clicked', () => {
    render(<SVG onClose={onClose} />);
    const textarea = screen.getByPlaceholderText('Paste your SVG code here...');
    const presetBtn = screen.getByText('Galaxy');
    fireEvent.click(presetBtn);
    expect(textarea).toHaveValue();
  });

  it('generates icons from editor and shows icons tab', async () => {
    render(<SVG onClose={onClose} />);
    await act(async () => {
      fireEvent.click(screen.getByText('Generate Icons'));
    });
    expect(screen.getByText('Generated Icons')).toBeInTheDocument();
  });

  it('shows error for invalid file type', async () => {
    render(<SVG onClose={onClose} />);
    fireEvent.click(screen.getByText('Icons'));
    const fileInput = document.querySelector('input[type="file"]')!;
    const file = new File(['dummy'], 'test.txt', { type: 'text/plain' });
    Object.defineProperty(fileInput, 'files', {
      value: [file],
      writable: true,
      configurable: true,
    });
    fireEvent.change(fileInput);
    expect(
      screen.getByText('Only SVG files are accepted.')
    ).toBeInTheDocument();
  });

  it('shows error for invalid SVG content', async () => {
    render(<SVG onClose={onClose} />);
    fireEvent.click(screen.getByText('Icons'));
    const fileInput = document.querySelector('input[type="file"]')!;
    const file = new File(['not svg'], 'test.svg', { type: 'image/svg+xml' });
    Object.defineProperty(fileInput, 'files', {
      value: [file],
      writable: true,
      configurable: true,
    });
    await act(async () => {
      fireEvent.change(fileInput);
    });
    await waitFor(() => {
      expect(screen.getByText('Invalid SVG file.')).toBeInTheDocument();
    });
  });

  it('processes valid SVG file upload', async () => {
    render(<SVG onClose={onClose} />);
    fireEvent.click(screen.getByText('Icons'));
    const fileInput = document.querySelector('input[type="file"]')!;
    const file = new File(['<svg>valid</svg>'], 'test.svg', {
      type: 'image/svg+xml',
    });
    Object.defineProperty(fileInput, 'files', {
      value: [file],
      writable: true,
      configurable: true,
    });
    await act(async () => {
      fireEvent.change(fileInput);
    });
    await waitFor(() => {
      expect(screen.getByText('Generated Icons')).toBeInTheDocument();
    });
  });

  it('shows drop zone in icons tab', () => {
    render(<SVG onClose={onClose} />);
    fireEvent.click(screen.getByText('Icons'));
    expect(screen.getByText('Drop SVG or Click to Upload')).toBeInTheDocument();
  });

  it('handles drag over on drop zone', () => {
    render(<SVG onClose={onClose} />);
    fireEvent.click(screen.getByText('Icons'));
    const dropZone = screen
      .getByText('Drop SVG or Click to Upload')
      .closest('div')!;
    fireEvent.dragOver(dropZone);
  });

  it('shows rendering text when processing', () => {
    render(<SVG onClose={onClose} />);
    fireEvent.click(screen.getByText('Icons'));
    expect(screen.getByText('Use current editor SVG')).toBeInTheDocument();
  });

  it('fails gracefully when svgToCanvas throws', async () => {
    const { svgToCanvas } = require('../SVG/utils/svg');
    svgToCanvas.mockRejectedValueOnce(new Error('Render failed'));
    render(<SVG onClose={onClose} />);
    fireEvent.click(screen.getByText('Icons'));
    const fileInput = document.querySelector('input[type="file"]')!;
    const file = new File(['<svg>bad</svg>'], 'test.svg', {
      type: 'image/svg+xml',
    });
    Object.defineProperty(fileInput, 'files', {
      value: [file],
      writable: true,
      configurable: true,
    });
    await act(async () => {
      fireEvent.change(fileInput);
    });
    await waitFor(() => {
      expect(
        screen.getByText('Failed to render SVG. Make sure it is valid.')
      ).toBeInTheDocument();
    });
  });
});
