import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ToastProvider } from '@/providers/ToastProvider';
import { IconWorkbench } from '../IconWorkbench';
import {
  generateIcons,
  readSvgFile,
  downloadIconsZip,
} from '@/utils/iconGenerator';
import { DEFAULT_SVG, ICON_SIZES } from '@/data/iconPresets';

jest.mock('@/utils/iconGenerator', () => ({
  generateIcons: jest.fn(),
  readSvgFile: jest.fn(),
  downloadIconsZip: jest.fn(),
}));

const mockAddToast = jest.fn();

jest.mock('@/providers/ToastProvider', () => ({
  ToastProvider: ({ children }: { children: React.ReactNode }) => children,
  useToast: () => ({ addToast: mockAddToast }),
}));

const mockGenerateIcons = generateIcons as jest.MockedFunction<
  typeof generateIcons
>;

const mockCanvas = (): HTMLCanvasElement =>
  ({
    toDataURL: jest.fn(() => 'data:image/png;base64,aaa'),
  }) as unknown as HTMLCanvasElement;

const renderWorkbench = (value = DEFAULT_SVG) => {
  const onChange = jest.fn();
  render(
    <ToastProvider>
      <IconWorkbench value={value} onChange={onChange} />
    </ToastProvider>
  );
  return { onChange };
};

describe('IconWorkbench', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAddToast.mockReset();
  });

  it('renders editor tab with textarea and presets by default', () => {
    renderWorkbench();
    expect(
      screen.getByPlaceholderText('Paste your SVG code here...')
    ).toBeInTheDocument();
    expect(screen.getByText('Presets:')).toBeInTheDocument();
    expect(screen.getByText('Preview')).toBeInTheDocument();
  });

  it('renders background mode buttons', () => {
    renderWorkbench();
    expect(screen.getByText('G')).toBeInTheDocument();
    expect(screen.getByText('W')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText('T')).toBeInTheDocument();
  });

  it('shows line count in preview', () => {
    renderWorkbench();
    expect(screen.getByText('Lines: 11')).toBeInTheDocument();
  });

  it('switches to icons tab', () => {
    renderWorkbench();
    fireEvent.click(screen.getByText('Icons'));
    expect(screen.getByText('Icon Generation Source')).toBeInTheDocument();
  });

  it('switches back to the editor tab', () => {
    renderWorkbench();
    fireEvent.click(screen.getByText('Icons'));
    fireEvent.click(screen.getByText('Editor'));
    expect(
      screen.getByPlaceholderText('Paste your SVG code here...')
    ).toBeInTheDocument();
  });

  it('edits the textarea value', () => {
    const { onChange } = renderWorkbench('<svg></svg>');
    fireEvent.change(
      screen.getByPlaceholderText('Paste your SVG code here...'),
      { target: { value: '<svg><circle/></svg>' } }
    );
    expect(onChange).toHaveBeenCalledWith('<svg><circle/></svg>');
  });

  it('switches the preview background mode', () => {
    renderWorkbench();
    fireEvent.click(screen.getByText('W'));
    expect(screen.getByText('W').className).toContain('btn-primary');
  });

  it('applies preset code on preset click', () => {
    const { onChange } = renderWorkbench();
    fireEvent.click(screen.getByText('Galaxy'));
    expect(onChange).toHaveBeenCalledWith(expect.stringContaining('#020617'));
  });

  it('formats code on Format click', () => {
    const { onChange } = renderWorkbench('<svg></svg>');
    fireEvent.click(screen.getByText('Format'));
    expect(onChange).toHaveBeenCalledWith('<svg>\n</svg>');
  });

  it('resets code to default on Reset click', () => {
    const { onChange } = renderWorkbench('<svg></svg>');
    fireEvent.click(screen.getByText('Reset'));
    expect(onChange).toHaveBeenCalledWith(DEFAULT_SVG);
  });

  it('generates icons from editor and shows them in icons tab', async () => {
    mockGenerateIcons.mockResolvedValue([
      { size: 72, dataUrl: 'data:image/png;base64,aaa', canvas: mockCanvas() },
    ]);

    renderWorkbench();
    fireEvent.click(screen.getByText('Generate Icons'));

    await waitFor(() =>
      expect(screen.getByText('Generated Icons')).toBeInTheDocument()
    );
    expect(mockGenerateIcons).toHaveBeenCalledWith(DEFAULT_SVG, ICON_SIZES);
    expect(screen.getByText('Source: SVG Editor')).toBeInTheDocument();
  });

  it('shows error when generation fails', async () => {
    mockGenerateIcons.mockRejectedValue(new Error('Render failed'));

    renderWorkbench();
    fireEvent.click(screen.getByText('Generate Icons'));

    await waitFor(() =>
      expect(
        screen.getByText('Failed to render SVG. Make sure it is valid.')
      ).toBeInTheDocument()
    );
  });

  it('downloads all icons as zip', async () => {
    (downloadIconsZip as jest.Mock).mockResolvedValue(undefined);
    mockGenerateIcons.mockResolvedValue([
      { size: 72, dataUrl: 'data:image/png;base64,aaa', canvas: mockCanvas() },
    ]);

    renderWorkbench();
    fireEvent.click(screen.getByText('Generate Icons'));
    await waitFor(() =>
      expect(screen.getByText('Generated Icons')).toBeInTheDocument()
    );

    fireEvent.click(screen.getByText('Download ZIP (All Sizes)'));
    await waitFor(() => expect(downloadIconsZip).toHaveBeenCalled());
  });

  it('shows an error toast when the zip download fails', async () => {
    (downloadIconsZip as jest.Mock).mockRejectedValue(new Error('ZIP failed'));
    mockGenerateIcons.mockResolvedValue([
      { size: 72, dataUrl: 'data:image/png;base64,aaa', canvas: mockCanvas() },
    ]);

    renderWorkbench();
    fireEvent.click(screen.getByText('Generate Icons'));
    await waitFor(() =>
      expect(screen.getByText('Generated Icons')).toBeInTheDocument()
    );

    fireEvent.click(screen.getByText('Download ZIP (All Sizes)'));
    await waitFor(() =>
      expect(mockAddToast).toHaveBeenCalledWith(
        'Failed to download ZIP',
        'error'
      )
    );
  });

  it('downloads a single icon', async () => {
    const clickSpy = jest.fn();
    const originalCreateElement = document.createElement.bind(document);
    jest.spyOn(document, 'createElement').mockImplementation((tag: string) => {
      if (tag === 'a') {
        return {
          href: '',
          download: '',
          click: clickSpy,
        } as unknown as HTMLElement;
      }
      return originalCreateElement(tag);
    });
    mockGenerateIcons.mockResolvedValue([
      { size: 72, dataUrl: 'data:image/png;base64,aaa', canvas: mockCanvas() },
    ]);

    renderWorkbench();
    fireEvent.click(screen.getByText('Generate Icons'));
    await waitFor(() =>
      expect(screen.getByText('Generated Icons')).toBeInTheDocument()
    );

    fireEvent.click(screen.getByText('72px'));
    expect(clickSpy).toHaveBeenCalled();
    expect(clickSpy.mock.instances[0]).toMatchObject({
      href: 'data:image/png;base64,aaa',
      download: 'icon-72x72.png',
    });
    jest.restoreAllMocks();
  });

  it('processes valid svg file upload', async () => {
    (readSvgFile as jest.Mock).mockResolvedValue({
      ok: true,
      text: '<svg>ok</svg>',
    });
    mockGenerateIcons.mockResolvedValue([
      { size: 72, dataUrl: 'data:image/png;base64,aaa', canvas: mockCanvas() },
    ]);

    renderWorkbench();
    fireEvent.click(screen.getByText('Icons'));
    const input = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    const file = new File(['<svg>ok</svg>'], 'test.svg', {
      type: 'image/svg+xml',
    });
    Object.defineProperty(input, 'files', {
      value: [file],
      configurable: true,
    });
    fireEvent.change(input);

    await waitFor(() =>
      expect(screen.getByText('Generated Icons')).toBeInTheDocument()
    );
    expect(readSvgFile).toHaveBeenCalledWith(file);
  });

  it('shows error for invalid file type', async () => {
    (readSvgFile as jest.Mock).mockResolvedValue({
      ok: false,
      reason: 'type',
    });

    renderWorkbench();
    fireEvent.click(screen.getByText('Icons'));
    const input = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    const file = new File(['dummy'], 'test.txt', { type: 'text/plain' });
    Object.defineProperty(input, 'files', {
      value: [file],
      configurable: true,
    });
    fireEvent.change(input);

    await waitFor(() =>
      expect(
        screen.getByText('Only SVG files are accepted.')
      ).toBeInTheDocument()
    );
  });
});
