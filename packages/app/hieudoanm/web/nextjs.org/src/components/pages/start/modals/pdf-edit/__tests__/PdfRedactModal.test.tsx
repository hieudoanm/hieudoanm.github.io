const canvasEvents: Record<string, Function> = {};
const mockCanvasInstance = {
  setDimensions: jest.fn(),
  on: jest.fn((event: string, handler: Function) => {
    canvasEvents[event] = handler;
  }),
  getObjects: jest.fn().mockReturnValue([]),
  renderAll: jest.fn(),
  getViewportPoint: jest.fn(() => ({ x: 100, y: 100 })),
  add: jest.fn(),
  remove: jest.fn(),
};

jest.mock('react-pdf', () => ({
  Document: ({ children, onLoadSuccess }: any) => {
    setTimeout(() => onLoadSuccess?.({ numPages: 2 }), 0);
    return <div data-testid="pdf-document">{children}</div>;
  },
  Page: ({ pageNumber, onRenderSuccess }: any) => {
    setTimeout(() => onRenderSuccess?.({ width: 595, height: 842 }), 0);
    return <div data-testid={`pdf-page-${pageNumber}`}>Page {pageNumber}</div>;
  },
  pdfjs: {
    GlobalWorkerOptions: {},
    version: '1.2.3',
  },
}));

jest.mock('fabric', () => ({
  Canvas: jest.fn().mockImplementation(() => mockCanvasInstance),
  Rect: jest.fn().mockImplementation(() => ({ set: jest.fn() })),
}));

jest.mock('../PdfRedactModal/utils/pdf', () => ({
  exportRedactedPdf: jest.fn(),
}));

import { fireEvent, render, screen, act } from '@testing-library/react';
import { PdfRedactModal } from '../PdfRedactModal';

const createMockFile = () =>
  new File(['dummy pdf content'], 'test.pdf', {
    type: 'application/pdf',
  });

const uploadFile = () => {
  render(<PdfRedactModal onClose={jest.fn()} />);
  const fileInput = document.querySelector(
    'input[type="file"]'
  ) as HTMLInputElement;
  fireEvent.change(fileInput, { target: { files: [createMockFile()] } });
};

const setupCanvas = () => {
  uploadFile();
  act(() => {
    jest.advanceTimersByTime(0);
  });
  act(() => {
    jest.advanceTimersByTime(0);
  });
};

const createRedaction = () => {
  canvasEvents['mouse:down']({ e: {} });
  canvasEvents['mouse:move']({ e: {} });
  act(() => {
    canvasEvents['mouse:up']({ e: {} });
  });
};

describe('PdfRedactModal', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    mockCanvasInstance.getObjects.mockReturnValue([]);
    mockCanvasInstance.remove.mockClear();
    mockCanvasInstance.renderAll.mockClear();
    mockCanvasInstance.add.mockClear();
    mockCanvasInstance.setDimensions.mockClear();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should render with no document loaded state', () => {
    render(<PdfRedactModal onClose={jest.fn()} />);
    expect(screen.getByText('No document loaded')).toBeInTheDocument();
  });

  it('should upload a PDF file', () => {
    render(<PdfRedactModal onClose={jest.fn()} />);
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    expect(fileInput).toBeInTheDocument();
    const file = createMockFile();
    fireEvent.change(fileInput, { target: { files: [file] } });
  });

  it('should show undo and redo buttons after uploading a file', () => {
    uploadFile();
    expect(screen.getByText('Undo')).toBeInTheDocument();
    expect(screen.getByText('Redo')).toBeInTheDocument();
  });

  it('should show export button after uploading a file', () => {
    uploadFile();
    expect(screen.getByText('Export PDF')).toBeInTheDocument();
  });

  it('should handle undo when no redactions exist', () => {
    uploadFile();
    const undoBtn = screen.getByText('Undo');
    fireEvent.click(undoBtn);
  });

  it('should handle redo when no redo stack', () => {
    uploadFile();
    const redoBtn = screen.getByText('Redo');
    fireEvent.click(redoBtn);
  });

  it('should export PDF on export button click', () => {
    const { exportRedactedPdf } = require('../PdfRedactModal/utils/pdf');
    uploadFile();
    fireEvent.click(screen.getByText('Export PDF'));
    expect(exportRedactedPdf).toHaveBeenCalled();
  });

  it('should initialize fabric canvas after page renders', () => {
    const { Canvas } = require('fabric');
    setupCanvas();
    expect(Canvas).toHaveBeenCalled();
    expect(mockCanvasInstance.setDimensions).toHaveBeenCalled();
  });

  it('should register mouse event handlers on canvas', () => {
    setupCanvas();
    expect(canvasEvents['mouse:down']).toBeDefined();
    expect(canvasEvents['mouse:move']).toBeDefined();
    expect(canvasEvents['mouse:up']).toBeDefined();
  });

  it('should handle mouse move when isDown is false', () => {
    setupCanvas();
    canvasEvents['mouse:move']({ e: {} });
    expect(mockCanvasInstance.renderAll).not.toHaveBeenCalled();
  });

  it('should handle mouse move when isDown is true', () => {
    setupCanvas();
    canvasEvents['mouse:down']({ e: {} });
    canvasEvents['mouse:move']({ e: {} });
    expect(mockCanvasInstance.renderAll).toHaveBeenCalled();
  });

  it('should add redaction on mouse down and mouse up', () => {
    setupCanvas();
    canvasEvents['mouse:down']({ e: {} });
    act(() => {
      canvasEvents['mouse:up']({ e: {} });
    });
  });

  it('should handle undo with redactions to remove rect', () => {
    mockCanvasInstance.getObjects.mockReturnValue([{ some: 'rect' }]);
    setupCanvas();
    createRedaction();
    const undoBtn = screen.getByText('Undo');
    act(() => {
      fireEvent.click(undoBtn);
    });
    expect(mockCanvasInstance.remove).toHaveBeenCalled();
    expect(mockCanvasInstance.renderAll).toHaveBeenCalled();
  });

  it('should handle undo without canvas objects', () => {
    mockCanvasInstance.getObjects.mockReturnValue([]);
    setupCanvas();
    createRedaction();
    fireEvent.click(screen.getByText('Undo'));
    expect(mockCanvasInstance.remove).not.toHaveBeenCalled();
  });

  it('should handle redo with redo stack', () => {
    mockCanvasInstance.getObjects.mockReturnValue([{ some: 'rect' }]);
    setupCanvas();
    createRedaction();
    act(() => {
      fireEvent.click(screen.getByText('Undo'));
    });
    act(() => {
      fireEvent.click(screen.getByText('Redo'));
    });
    expect(mockCanvasInstance.add).toHaveBeenCalled();
  });
});
