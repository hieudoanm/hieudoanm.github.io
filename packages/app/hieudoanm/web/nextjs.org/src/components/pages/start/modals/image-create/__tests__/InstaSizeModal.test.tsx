import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import { InstaSizeModal } from '../InstaSizeModal';

const DROPZONE_TEXT = 'Drop a file here or click to browse';

const mockRenderToCanvas = jest.fn();
jest.mock('../InstaSizeModal/utils/render', () => ({
  renderToCanvas: (...args: any[]) => {
    mockRenderToCanvas(...args);
    const cb = args[4];
    if (typeof cb === 'function') cb('data:image/png;base64,mock');
  },
}));

const renderInsta = (onClose = jest.fn()) =>
  render(<InstaSizeModal onClose={onClose} />);

const mockFileReader = (result: string) => {
  const fileReaderMock = {
    readAsDataURL: jest.fn(),
    onload: null as any,
    result,
  };
  jest
    .spyOn(window, 'FileReader')
    .mockImplementation(() => fileReaderMock as any);
  return fileReaderMock;
};

const dropFile = async (fileReaderMock: ReturnType<typeof mockFileReader>) => {
  const file = new File(['test'], 'test.png', { type: 'image/png' });
  Object.defineProperty(file, 'size', { value: 1024 });

  renderInsta();
  const dropZone = screen
    .getByText(DROPZONE_TEXT)
    .closest('[class*="cursor-pointer"]')!;
  fireEvent.drop(dropZone, { dataTransfer: { files: [file] } });
  fileReaderMock.onload({ target: fileReaderMock });
  await waitFor(() => {
    expect(screen.getByText('Preview')).toBeInTheDocument();
  });
};

describe('InstaSizeModal', () => {
  beforeEach(() => {
    mockRenderToCanvas.mockClear();
  });

  afterEach(() => {
    (window.FileReader as any)?.mockRestore?.();
  });

  it('should render upload area when no image', () => {
    renderInsta();
    expect(screen.getByText(DROPZONE_TEXT)).toBeInTheDocument();
  });

  it('should show dragging state on dragOver', () => {
    renderInsta();
    const dropZone = screen
      .getByText(DROPZONE_TEXT)
      .closest('[class*="cursor-pointer"]')!;
    fireEvent.dragOver(dropZone);
    expect(dropZone.className).toContain('border-primary');
  });

  it('should reset dragging state on dragLeave', () => {
    renderInsta();
    const dropZone = screen
      .getByText(DROPZONE_TEXT)
      .closest('[class*="cursor-pointer"]')!;
    fireEvent.dragOver(dropZone);
    expect(dropZone.className).toContain('border-primary');
    fireEvent.dragLeave(dropZone);
    expect(dropZone.className).not.toContain('border-primary');
  });

  it('should handle file drop', async () => {
    const fr = mockFileReader('data:image/png;base64,mock');
    await dropFile(fr);
  });

  it('should ignore non-image file drop', () => {
    const file = new File(['test'], 'test.txt', { type: 'text/plain' });
    renderInsta();
    const dropZone = screen
      .getByText(DROPZONE_TEXT)
      .closest('[class*="cursor-pointer"]')!;
    fireEvent.drop(dropZone, { dataTransfer: { files: [file] } });
    expect(screen.getByText(DROPZONE_TEXT)).toBeInTheDocument();
  });

  it('should handle file input change', async () => {
    const file = new File(['test'], 'test.png', { type: 'image/png' });
    const fr = mockFileReader('data:image/png;base64,mock');

    renderInsta();
    const inputEl = document.querySelector('input[type="file"]')!;
    Object.defineProperty(inputEl, 'files', { value: [file] });
    fireEvent.change(inputEl);
    fr.onload({ target: fr });
    await waitFor(() => {
      expect(screen.getByText('Preview')).toBeInTheDocument();
    });
  });

  it('should show preview and controls after image loaded', async () => {
    const fr = mockFileReader('data:image/png;base64,mock');
    await dropFile(fr);
    expect(screen.getByText('Padding')).toBeInTheDocument();
    expect(screen.getByText('Filter')).toBeInTheDocument();
    expect(screen.getByText('Download PNG')).toBeInTheDocument();
  });

  it('should change padding via slider', async () => {
    const fr = mockFileReader('data:image/png;base64,mock');
    await dropFile(fr);

    const slider = document.querySelector('input[type="range"]')!;
    fireEvent.change(slider, { target: { value: '25' } });
    const paddingDisplays = screen.getAllByText('25');
    expect(paddingDisplays.length).toBeGreaterThanOrEqual(1);
  });

  it('should change padding via preset buttons', async () => {
    const fr = mockFileReader('data:image/png;base64,mock');
    await dropFile(fr);

    fireEvent.click(screen.getByText('20%'));
    const paddingDisplays = screen.getAllByText('20');
    expect(paddingDisplays.length).toBeGreaterThanOrEqual(1);
  });

  it('should change filter on click', async () => {
    const fr = mockFileReader('data:image/png;base64,mock');
    await dropFile(fr);

    fireEvent.click(screen.getByText('Grayscale'));
    expect(screen.getByText('Grayscale')).toBeInTheDocument();
    expect(screen.getByText('Filter: Grayscale')).toBeInTheDocument();
  });

  it('should download PNG on download button click', async () => {
    const fr = mockFileReader('data:image/png;base64,mock');
    URL.createObjectURL = jest.fn().mockReturnValue('blob:mock');
    URL.revokeObjectURL = jest.fn();
    await dropFile(fr);

    const createSpy = jest.spyOn(document, 'createElement');
    await waitFor(() => {
      expect(
        screen.getByText('Download PNG').closest('button')
      ).not.toBeDisabled();
    });
    fireEvent.click(screen.getByText('Download PNG'));
    expect(createSpy).toHaveBeenCalledWith('a');
    createSpy.mockRestore();
  });

  it('should clear image on Clear button click', async () => {
    const fr = mockFileReader('data:image/png;base64,mock');
    await dropFile(fr);

    fireEvent.click(screen.getByText('✕ Clear'));
    expect(screen.getByText(DROPZONE_TEXT)).toBeInTheDocument();
  });

  it('should call renderToCanvas on process', async () => {
    const fr = mockFileReader('data:image/png;base64,mock');
    await dropFile(fr);
    await waitFor(() => {
      expect(mockRenderToCanvas).toHaveBeenCalled();
    });
  });
});
