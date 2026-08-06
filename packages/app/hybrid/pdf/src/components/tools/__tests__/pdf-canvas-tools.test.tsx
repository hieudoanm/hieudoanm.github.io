import React, { useEffect } from 'react';
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from '@testing-library/react';
import { PdfAnnotateTool } from '@/components/tools/PdfAnnotateTool';
import { PdfCropTool } from '@/components/tools/PdfCropTool';
import { PdfEsignTool } from '@/components/tools/PdfEsignTool';
import { PdfPageNumbersTool } from '@/components/tools/PdfPageNumbersTool';
import { PdfRedactTool } from '@/components/tools/PdfRedactTool';
import { PdfToImagesTool } from '@/components/tools/PdfToImagesTool';

jest.mock('@/components/atoms/PdfFileUpload');

jest.mock('@/lib/pdf-tools', () => ({
  exportRedactedPdf: jest.fn(),
}));

jest.mock('react-pdf', () => ({
  pdfjs: {
    version: '1.0.0',
    GlobalWorkerOptions: {},
    getDocument: jest.fn(),
  },
  Document: ({ onLoadSuccess, children }: any) => {
    useEffect(() => {
      onLoadSuccess?.({ numPages: 1 });
    }, []);
    return <div data-testid="redact-document">{children}</div>;
  },
  Page: ({ pageNumber, onRenderSuccess }: any) => {
    useEffect(() => {
      onRenderSuccess?.({ width: 595, height: 842, pageNumber });
    });
    return <div data-testid="redact-page" />;
  },
}));

jest.mock('fabric', () => {
  class Rect {
    left: number;
    top: number;
    width: number;
    height: number;
    set = jest.fn(function (this: Rect, p: any) {
      Object.assign(this, p);
    });
    constructor(opts: any) {
      this.left = 0;
      this.top = 0;
      this.width = 0;
      this.height = 0;
      Object.assign(this, opts);
    }
  }
  class Canvas {
    static instances: Canvas[] = [];
    handlers: Record<string, Function> = {};
    on = jest.fn((ev: string, cb: Function) => {
      this.handlers[ev] = cb;
    });
    add = jest.fn();
    remove = jest.fn();
    renderAll = jest.fn();
    setDimensions = jest.fn();
    getViewportPoint = jest.fn((o: any) => ({
      x: o.clientX ?? 0,
      y: o.clientY ?? 0,
    }));
    getObjects = jest.fn(() => [new Rect({})]);
    constructor(_el: any) {
      Canvas.instances.push(this);
    }
  }
  return { Canvas, Rect };
});

const { exportRedactedPdf } = jest.requireMock('@/lib/pdf-tools');
const fabric = jest.requireMock('fabric');
const { pdfjs } = jest.requireMock('react-pdf');

const ctx2d = {
  scale: jest.fn(),
  fillStyle: '',
  fillRect: jest.fn(),
  clearRect: jest.fn(),
  beginPath: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  stroke: jest.fn(),
  strokeRect: jest.fn(),
  setLineDash: jest.fn(),
  fillText: jest.fn(),
  measureText: jest.fn(() => ({ width: 50 })),
  font: '',
  lineWidth: 0,
  globalAlpha: 1,
  lineCap: '',
  strokeStyle: '',
};

const upload = async () => {
  await act(async () => {
    fireEvent.click(screen.getByText('PdfFileUpload'));
  });
};

const realCreateElement = document.createElement.bind(document);

const mockAnchor = (click: jest.Mock) =>
  jest
    .spyOn(document, 'createElement')
    .mockImplementation((tag: string) =>
      tag === 'a'
        ? ({ click, href: '', download: '' } as unknown as HTMLElement)
        : realCreateElement(tag)
    );

beforeEach(() => {
  jest.clearAllMocks();
  fabric.Canvas.instances.length = 0;
  jest
    .spyOn(HTMLCanvasElement.prototype, 'getContext')
    .mockReturnValue(ctx2d as unknown as CanvasRenderingContext2D);
  jest
    .spyOn(HTMLCanvasElement.prototype, 'toBlob')
    .mockImplementation((cb: any) => cb(new Blob(['png'])));
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('PdfAnnotateTool', () => {
  it('draws with the default pen tool and ignores moves before mouse down', async () => {
    const { container } = render(<PdfAnnotateTool />);
    await upload();
    const canvas = container.querySelector('canvas') as HTMLCanvasElement;

    fireEvent.mouseMove(canvas, { clientX: 5, clientY: 5 });
    expect(ctx2d.lineTo).not.toHaveBeenCalled();

    fireEvent.mouseDown(canvas, { clientX: 1, clientY: 1 });
    fireEvent.mouseMove(canvas, { clientX: 2, clientY: 2 });
    expect(ctx2d.lineWidth).toBe(2);
    fireEvent.mouseUp(canvas);
  });

  it('does not draw when the 2d context is unavailable', () => {
    (HTMLCanvasElement.prototype.getContext as jest.Mock).mockReturnValue(null);
    const { container } = render(<PdfAnnotateTool />);
    const canvas = container.querySelector('canvas') as HTMLCanvasElement;
    fireEvent.mouseDown(canvas, { clientX: 1, clientY: 1 });
    fireEvent.mouseUp(canvas);
    fireEvent.click(screen.getByRole('button', { name: 'Clear' }));
    expect(ctx2d.fillRect).not.toHaveBeenCalled();
    expect(ctx2d.clearRect).not.toHaveBeenCalled();
  });

  it('ignores drawing when the context disappears mid-stroke', () => {
    const { container } = render(<PdfAnnotateTool />);
    const canvas = container.querySelector('canvas') as HTMLCanvasElement;
    fireEvent.mouseDown(canvas, { clientX: 1, clientY: 1 });
    (HTMLCanvasElement.prototype.getContext as jest.Mock).mockReturnValue(null);
    fireEvent.mouseMove(canvas, { clientX: 2, clientY: 2 });
    expect(ctx2d.lineTo).not.toHaveBeenCalled();
  });

  it('draws, clears and downloads an annotated canvas', async () => {
    const click = jest.fn();
    mockAnchor(click);
    const { container } = render(<PdfAnnotateTool />);
    await upload();
    expect(screen.getByText('a.pdf')).toBeInTheDocument();
    const canvas = container.querySelector('canvas') as HTMLCanvasElement;

    fireEvent.mouseDown(canvas, { clientX: 10, clientY: 10 });
    fireEvent.mouseMove(canvas, { clientX: 30, clientY: 40 });
    expect(ctx2d.lineTo).toHaveBeenCalledWith(30, 40);
    fireEvent.mouseUp(canvas);

    fireEvent.click(screen.getByRole('button', { name: 'Highlight' }));
    fireEvent.mouseDown(canvas, { clientX: 1, clientY: 1 });
    fireEvent.mouseMove(canvas, { clientX: 2, clientY: 2 });
    fireEvent.mouseUp(canvas);
    expect(ctx2d.lineWidth).toBe(16);

    fireEvent.click(screen.getByRole('button', { name: 'Underline' }));
    fireEvent.mouseDown(canvas, { clientX: 3, clientY: 3 });
    fireEvent.mouseMove(canvas, { clientX: 4, clientY: 4 });
    fireEvent.mouseUp(canvas);
    expect(ctx2d.lineWidth).toBe(3);

    fireEvent.change(
      container.querySelector('input[type="color"]') as HTMLInputElement,
      { target: { value: '#00ff00' } }
    );
    fireEvent.click(screen.getByRole('button', { name: 'Clear' }));
    expect(ctx2d.clearRect).toHaveBeenCalled();

    fireEvent.click(screen.getByRole('button', { name: 'Download PNG' }));
    expect(click).toHaveBeenCalled();
    expect(URL.createObjectURL).toHaveBeenCalled();
  });

  it('does not download when the canvas has no blob', async () => {
    (HTMLCanvasElement.prototype.toBlob as jest.Mock).mockImplementation(
      (cb: any) => cb(null)
    );
    render(<PdfAnnotateTool />);
    fireEvent.click(screen.getByRole('button', { name: 'Download PNG' }));
    expect(URL.createObjectURL).not.toHaveBeenCalled();
  });
});

describe('PdfCropTool', () => {
  it('redraws the preview when margins change and downloads it', async () => {
    const click = jest.fn();
    mockAnchor(click);
    const { container } = render(<PdfCropTool />);
    await upload();
    expect(screen.getByText(/a.pdf/)).toBeInTheDocument();
    expect(ctx2d.fillText).toHaveBeenCalledWith(
      expect.stringContaining('Crop: 256×192px'),
      10,
      20
    );

    const inputs = container.querySelectorAll('input');
    fireEvent.change(inputs[0], { target: { value: '5' } });
    fireEvent.change(inputs[1], { target: { value: '5' } });
    fireEvent.change(inputs[2], { target: { value: '5' } });
    fireEvent.change(inputs[3], { target: { value: '5' } });
    expect(ctx2d.fillText).toHaveBeenCalledWith(
      expect.stringContaining('Crop: 288×216px'),
      10,
      20
    );

    fireEvent.click(screen.getByRole('button', { name: 'Download Preview' }));
    expect(click).toHaveBeenCalled();
  });

  it('does not download when the canvas has no blob', async () => {
    (HTMLCanvasElement.prototype.toBlob as jest.Mock).mockImplementation(
      (cb: any) => cb(null)
    );
    render(<PdfCropTool />);
    fireEvent.click(screen.getByRole('button', { name: 'Download Preview' }));
    expect(URL.createObjectURL).not.toHaveBeenCalled();
  });

  it('does not draw the preview when the 2d context is unavailable', () => {
    (HTMLCanvasElement.prototype.getContext as jest.Mock).mockReturnValue(null);
    render(<PdfCropTool />);
    expect(ctx2d.fillText).not.toHaveBeenCalled();
    expect(ctx2d.fillRect).not.toHaveBeenCalled();
  });
});

describe('PdfEsignTool', () => {
  it('ignores pointer moves before drawing starts', () => {
    const { container } = render(<PdfEsignTool />);
    const canvas = container.querySelector('canvas') as HTMLCanvasElement;
    fireEvent.mouseMove(canvas, { clientX: 5, clientY: 5 });
    expect(ctx2d.lineTo).not.toHaveBeenCalled();
  });

  it('does not draw when the 2d context is unavailable', () => {
    (HTMLCanvasElement.prototype.getContext as jest.Mock).mockReturnValue(null);
    const { container } = render(<PdfEsignTool />);
    const canvas = container.querySelector('canvas') as HTMLCanvasElement;
    fireEvent.mouseDown(canvas, { clientX: 1, clientY: 1 });
    fireEvent.mouseMove(canvas, { clientX: 2, clientY: 2 });
    fireEvent.click(screen.getByRole('button', { name: 'Clear' }));
    expect(ctx2d.fillRect).not.toHaveBeenCalled();
    expect(ctx2d.clearRect).not.toHaveBeenCalled();
  });

  it('draws with mouse and touch input, clears and downloads', async () => {
    const click = jest.fn();
    mockAnchor(click);
    const { container } = render(<PdfEsignTool />);
    expect(screen.getByText('3px')).toBeInTheDocument();
    const canvas = container.querySelector('canvas') as HTMLCanvasElement;

    fireEvent.mouseDown(canvas, { clientX: 10, clientY: 10 });
    fireEvent.mouseMove(canvas, { clientX: 20, clientY: 25 });
    expect(ctx2d.lineTo).toHaveBeenCalledWith(20, 25);
    fireEvent.mouseUp(canvas);

    fireEvent.touchStart(canvas, { touches: [{ clientX: 5, clientY: 6 }] });
    fireEvent.touchMove(canvas, { touches: [{ clientX: 15, clientY: 16 }] });
    fireEvent.touchEnd(canvas);

    fireEvent.change(
      container.querySelector('input[type="color"]') as HTMLInputElement,
      { target: { value: '#123456' } }
    );
    fireEvent.change(
      container.querySelector('input[type="range"]') as HTMLInputElement,
      { target: { value: '5' } }
    );
    expect(screen.getByText('5px')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Clear' }));
    expect(ctx2d.clearRect).toHaveBeenCalled();

    fireEvent.click(screen.getByRole('button', { name: 'Download PNG' }));
    expect(click).toHaveBeenCalled();
    expect(URL.createObjectURL).toHaveBeenCalled();
  });

  it('does not download when the canvas has no blob', async () => {
    (HTMLCanvasElement.prototype.toBlob as jest.Mock).mockImplementation(
      (cb: any) => cb(null)
    );
    render(<PdfEsignTool />);
    fireEvent.click(screen.getByRole('button', { name: 'Download PNG' }));
    expect(URL.createObjectURL).not.toHaveBeenCalled();
  });
});

describe('PdfPageNumbersTool', () => {
  it('renders left-aligned page numbers', async () => {
    const { container } = render(<PdfPageNumbersTool />);
    await upload();
    fireEvent.change(container.querySelector('select') as HTMLSelectElement, {
      target: { value: 'top-left' },
    });
    expect(ctx2d.fillText).toHaveBeenCalledWith('1', 20, 24);
  });

  it('does not draw when the 2d context is unavailable', () => {
    (HTMLCanvasElement.prototype.getContext as jest.Mock).mockReturnValue(null);
    render(<PdfPageNumbersTool />);
    expect(ctx2d.fillRect).not.toHaveBeenCalled();
  });

  it('updates the preview and downloads it', async () => {
    const click = jest.fn();
    mockAnchor(click);
    const { container } = render(<PdfPageNumbersTool />);
    await upload();
    expect(screen.getByText('a.pdf')).toBeInTheDocument();

    expect(ctx2d.fillText).toHaveBeenCalledWith('1', 250, 220);

    fireEvent.change(container.querySelector('select') as HTMLSelectElement, {
      target: { value: 'top-center' },
    });
    expect(ctx2d.fillText).toHaveBeenCalledWith('1', 135, 24);

    const inputs = container.querySelectorAll('input');
    fireEvent.change(inputs[0], { target: { value: '2' } });
    fireEvent.change(inputs[1], { target: { value: '{n}/{total}' } });
    expect(ctx2d.fillText).toHaveBeenCalledWith('2/1', 135, 24);

    fireEvent.click(screen.getByRole('button', { name: 'Download Preview' }));
    expect(click).toHaveBeenCalled();
  });

  it('does not download when the canvas has no blob', async () => {
    (HTMLCanvasElement.prototype.toBlob as jest.Mock).mockImplementation(
      (cb: any) => cb(null)
    );
    render(<PdfPageNumbersTool />);
    fireEvent.click(screen.getByRole('button', { name: 'Download Preview' }));
    expect(URL.createObjectURL).not.toHaveBeenCalled();
  });
});

describe('PdfRedactTool', () => {
  it('loads a document, draws, undoes, redoes and exports redactions', async () => {
    render(<PdfRedactTool />);
    expect(screen.getByText('No document loaded')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Upload PDF') as HTMLInputElement, {
      target: {
        files: [new File(['x'], 'redact.pdf', { type: 'application/pdf' })],
      },
    });

    await waitFor(() => expect(fabric.Canvas.instances).toHaveLength(1));
    const canvas = fabric.Canvas.instances[0];

    const moveCb = canvas.handlers['mouse:move'];
    moveCb({ e: { clientX: 100, clientY: 100 } });
    expect(canvas.renderAll).not.toHaveBeenCalled();

    await act(async () => {
      canvas.handlers['mouse:down']({ e: { clientX: 10, clientY: 10 } });
      expect(canvas.add).toHaveBeenCalled();
      canvas.handlers['mouse:move']({ e: { clientX: 50, clientY: 40 } });
      expect(canvas.renderAll).toHaveBeenCalled();
      canvas.handlers['mouse:up']({});
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Undo' }));
    });
    expect(canvas.remove).toHaveBeenCalled();

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Redo' }));
    });
    expect(canvas.add).toHaveBeenCalledTimes(2);

    fireEvent.click(screen.getByRole('button', { name: 'Export PDF' }));
    expect(exportRedactedPdf).toHaveBeenCalledWith(
      expect.any(File),
      expect.any(Object),
      1.5
    );
  });

  it('does nothing when undo or redo has no history', async () => {
    render(<PdfRedactTool />);
    fireEvent.change(screen.getByLabelText('Upload PDF') as HTMLInputElement, {
      target: {
        files: [new File(['x'], 'redact.pdf', { type: 'application/pdf' })],
      },
    });

    await waitFor(() => expect(fabric.Canvas.instances).toHaveLength(1));
    const canvas = fabric.Canvas.instances[0];

    fireEvent.click(screen.getByRole('button', { name: 'Undo' }));
    expect(canvas.remove).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'Redo' }));
    expect(canvas.add).not.toHaveBeenCalled();
  });

  it('does nothing when no file is picked', async () => {
    render(<PdfRedactTool />);
    fireEvent.change(screen.getByLabelText('Upload PDF') as HTMLInputElement, {
      target: { files: [] },
    });
    expect(screen.getByText('No document loaded')).toBeInTheDocument();
    expect(fabric.Canvas.instances).toHaveLength(0);
  });

  it('skips canvas setup when the canvas element is missing', async () => {
    jest.spyOn(document, 'getElementById').mockReturnValue(null);
    render(<PdfRedactTool />);
    fireEvent.change(screen.getByLabelText('Upload PDF') as HTMLInputElement, {
      target: {
        files: [new File(['x'], 'redact.pdf', { type: 'application/pdf' })],
      },
    });
    await act(async () => {});
    expect(fabric.Canvas.instances).toHaveLength(0);
  });

  it('undoes when the canvas has no drawable objects', async () => {
    render(<PdfRedactTool />);
    fireEvent.change(screen.getByLabelText('Upload PDF') as HTMLInputElement, {
      target: {
        files: [new File(['x'], 'redact.pdf', { type: 'application/pdf' })],
      },
    });

    await waitFor(() => expect(fabric.Canvas.instances).toHaveLength(1));
    const canvas = fabric.Canvas.instances[0];

    canvas.handlers['mouse:down']({ e: { clientX: 10, clientY: 10 } });
    canvas.handlers['mouse:move']({ e: { clientX: 50, clientY: 40 } });
    canvas.handlers['mouse:up']({});

    canvas.getObjects.mockReturnValue([]);
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Undo' }));
    });
    expect(canvas.remove).not.toHaveBeenCalled();
  });
});

describe('PdfToImagesTool', () => {
  const makeFile = () => {
    const file = new File(['x'], 'a.pdf', { type: 'application/pdf' });
    Object.defineProperty(file, 'arrayBuffer', {
      value: async () => new ArrayBuffer(8),
    });
    return file;
  };

  it('renders each page and downloads PNG snapshots', async () => {
    const click = jest.fn();
    mockAnchor(click);
    const pdf = {
      numPages: 2,
      getPage: jest.fn(async (n: number) => ({
        getViewport: jest.fn(() => ({ width: 300, height: 400 })),
        render: jest.fn(() => ({ promise: Promise.resolve() })),
      })),
    };
    pdfjs.getDocument.mockReturnValue({ promise: Promise.resolve(pdf) });
    render(<PdfToImagesTool />);
    await act(async () => {
      fireEvent.click(screen.getByText('PdfFileUpload'));
    });
    await act(async () => {});
    expect(pdfjs.getDocument).toHaveBeenCalled();
    expect(pdf.getPage).toHaveBeenCalledTimes(2);
    expect(click).toHaveBeenCalledTimes(2);
    expect(URL.createObjectURL).toHaveBeenCalledTimes(2);
  });

  it('logs an error when rendering fails', async () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    pdfjs.getDocument.mockReturnValue({
      promise: Promise.reject(new Error('render failed')),
    });
    render(<PdfToImagesTool />);
    await act(async () => {
      fireEvent.click(screen.getByText('PdfFileUpload'));
    });
    await act(async () => {});
    expect(spy).toHaveBeenCalled();
  });
});
