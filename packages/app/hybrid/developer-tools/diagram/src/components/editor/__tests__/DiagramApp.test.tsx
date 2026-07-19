import { fireEvent, render, screen } from '@testing-library/react';
import Editor from '@/components/editor/Editor';
import ErrorStrip from '@/components/editor/ErrorStrip';
import HelpModal from '@/components/editor/HelpModal';
import StatusBar from '@/components/editor/StatusBar';

jest.mock('@/lib/export', () => ({
  downloadDiagram: jest.fn(),
  downloadSvg: jest.fn(),
  downloadPng: jest.fn(),
  buildSnippet: jest.fn(() => 'snippet'),
}));
import {
  buildSnippet,
  downloadDiagram,
  downloadPng,
  downloadSvg,
} from '@/lib/export';

const mockDownloadDiagram = downloadDiagram as jest.Mock;
const mockDownloadSvg = downloadSvg as jest.Mock;
const mockDownloadPng = downloadPng as jest.Mock;
const mockBuildSnippet = buildSnippet as jest.Mock;

beforeEach(() => {
  mockDownloadDiagram.mockClear();
  mockDownloadSvg.mockClear();
  mockDownloadPng.mockClear();
  mockBuildSnippet.mockClear();
});

describe('StatusBar', () => {
  it('shows counts and title', () => {
    render(
      <StatusBar errors={0} edges={2} nodes={3} title="Flow" kind="flow" />
    );
    expect(screen.getByText('Flow')).toBeInTheDocument();
    expect(screen.getByText('Flow diagram')).toBeInTheDocument();
    expect(screen.getByLabelText('Node count')).toHaveTextContent('3 nodes');
    expect(screen.getByLabelText('Edge count')).toHaveTextContent('2 edges');
  });

  it('shows an error count when present', () => {
    render(
      <StatusBar errors={2} edges={0} nodes={0} title="" kind="sequence" />
    );
    expect(screen.getByText('Untitled diagram')).toBeInTheDocument();
    expect(screen.getByText('Sequence diagram')).toBeInTheDocument();
    expect(screen.getByText('2 error(s)')).toBeInTheDocument();
  });
});

describe('ErrorStrip', () => {
  it('lists parse errors with their lines', () => {
    render(<ErrorStrip errors={[{ line: 3, message: 'bad line' }]} />);
    expect(screen.getByText('Parse errors')).toBeInTheDocument();
    expect(screen.getByText('line 3: bad line')).toBeInTheDocument();
  });
});

describe('HelpModal', () => {
  it('renders nothing when closed', () => {
    const { container } = render(
      <HelpModal onClose={jest.fn()} open={false} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('documents the syntax and closes', () => {
    const onClose = jest.fn();
    render(<HelpModal onClose={onClose} open />);
    expect(screen.getByText('Diagram syntax')).toBeInTheDocument();
    expect(screen.getByText(/node <id>:/)).toBeInTheDocument();
    expect(screen.getByText(/edge <from>/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Close help' }));
    expect(onClose).toHaveBeenCalled();
  });
});

describe('Editor', () => {
  beforeEach(() => window.localStorage.clear());

  it('renders the default diagram and renders its nodes on the canvas', () => {
    render(<Editor />);
    const editor = screen.getByLabelText(
      'Diagram source'
    ) as HTMLTextAreaElement;
    expect(editor.value).toContain('title: Web App Architecture');
    expect(screen.getByText('API Server')).toBeInTheDocument();
    expect(screen.getByText('PostgreSQL')).toBeInTheDocument();
    expect(screen.getByLabelText('Node count')).toHaveTextContent('6 nodes');
  });

  it('re-renders the canvas as the source text changes', () => {
    render(<Editor />);
    const editor = screen.getByLabelText('Diagram source');
    fireEvent.change(editor, {
      target: { value: 'node x: X\nnode y: Y\nedge x -> y' },
    });
    expect(screen.getByText('X')).toBeInTheDocument();
    expect(screen.getByText('Y')).toBeInTheDocument();
    expect(screen.getByLabelText('Node count')).toHaveTextContent('2 nodes');
  });

  it('shows parse errors for broken lines', () => {
    render(<Editor />);
    const editor = screen.getByLabelText('Diagram source');
    fireEvent.change(editor, { target: { value: 'garbage here' } });
    expect(screen.getByText('Parse errors')).toBeInTheDocument();
    expect(screen.getByText('1 error(s)')).toBeInTheDocument();
  });

  it('resets to the default diagram on New', () => {
    render(<Editor />);
    const editor = screen.getByLabelText(
      'Diagram source'
    ) as HTMLTextAreaElement;
    fireEvent.change(editor, { target: { value: 'node x: X' } });
    fireEvent.click(screen.getByRole('button', { name: 'New' }));
    expect(editor.value).toContain('title: Web App Architecture');
    expect(editor.value).not.toContain('node x: X');
  });

  it('zooms the canvas in and out', () => {
    render(<Editor />);
    fireEvent.click(screen.getByRole('button', { name: 'Zoom in' }));
    expect(screen.getByText('125%')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Zoom out' }));
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  it('resets zoom with the reset button', () => {
    render(<Editor />);
    fireEvent.click(screen.getByRole('button', { name: 'Zoom in' }));
    fireEvent.click(screen.getByRole('button', { name: 'Zoom in' }));
    expect(screen.getByText('150%')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Reset zoom' }));
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  it('saves the diagram source', () => {
    render(<Editor />);
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    expect(mockDownloadDiagram).toHaveBeenCalledTimes(1);
    const [text, name] = mockDownloadDiagram.mock.calls[0];
    expect(name).toBe('Web App Architecture');
    expect(text).toContain('node api: API Server');
  });

  it('exports the diagram as svg', () => {
    render(<Editor />);
    fireEvent.click(screen.getByRole('button', { name: 'Export SVG' }));
    expect(mockDownloadSvg).toHaveBeenCalledTimes(1);
    expect(mockDownloadSvg.mock.calls[0][2]).toBe('Web App Architecture');
  });

  it('disables export when the diagram is empty', () => {
    render(<Editor />);
    fireEvent.change(screen.getByLabelText('Diagram source'), {
      target: { value: 'title: Empty' },
    });
    expect(screen.getByRole('button', { name: 'Export SVG' })).toBeDisabled();
  });

  it('opens a diagram file into the editor', async () => {
    render(<Editor />);
    const input = screen.getByLabelText(
      'Open diagram file'
    ) as HTMLInputElement;
    const file = new File(['placeholder'], 'from_file.diagram', {
      type: 'text/plain',
    });
    file.text = async () => 'title: From File\nnode f: F';
    fireEvent.change(input, { target: { files: [file] } });
    expect(await screen.findByText('F')).toBeInTheDocument();
    expect((await screen.findAllByText('From File')).length).toBeGreaterThan(0);
  });

  it('opens the hidden file picker from the Open button', () => {
    render(<Editor />);
    const input = screen.getByLabelText('Open diagram file');
    const clickSpy = jest.spyOn(input, 'click').mockImplementation(() => {});
    fireEvent.click(screen.getByRole('button', { name: 'Open' }));
    expect(clickSpy).toHaveBeenCalled();
    clickSpy.mockRestore();
  });

  it('opens and closes the help modal', () => {
    render(<Editor />);
    fireEvent.click(screen.getByRole('button', { name: 'Help' }));
    expect(screen.getByText('Diagram syntax')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Close help' }));
    expect(screen.queryByText('Diagram syntax')).not.toBeInTheDocument();
  });

  it('loads an example diagram from the examples modal', () => {
    render(<Editor />);
    fireEvent.click(screen.getByRole('button', { name: 'Browse examples' }));
    fireEvent.click(screen.getByRole('button', { name: /Uber/ }));
    const editor = screen.getByLabelText(
      'Diagram source'
    ) as HTMLTextAreaElement;
    expect(editor.value).toContain('title: Uber Ride Hailing');
    expect(editor.value).toContain(
      'node rider: Rider App [round, icon=browser]'
    );
    expect(screen.getByText('Ride Matching')).toBeInTheDocument();
    expect(screen.getByLabelText('Node count')).toHaveTextContent('12 nodes');
    expect(screen.queryByLabelText('Example diagrams')).not.toBeInTheDocument();
  });

  it('searches and filters examples in the modal', () => {
    render(<Editor />);
    fireEvent.click(screen.getByRole('button', { name: 'Browse examples' }));
    const search = screen.getByLabelText('Search examples');
    fireEvent.change(search, { target: { value: 'netflix' } });
    expect(screen.getByRole('button', { name: /Netflix/ })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Uber/ })).toBeNull();
    fireEvent.change(search, { target: { value: 'nonsense' } });
    expect(screen.getByText(/No examples match/)).toBeInTheDocument();
  });

  it('closes the examples modal', () => {
    render(<Editor />);
    fireEvent.click(screen.getByRole('button', { name: 'Browse examples' }));
    expect(screen.getByLabelText('Example diagrams')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Close examples' }));
    expect(screen.queryByLabelText('Example diagrams')).not.toBeInTheDocument();
  });

  it('renders node icons on the canvas for the default diagram', () => {
    render(<Editor />);
    const canvas = screen.getByLabelText('Diagram canvas');
    const svg = canvas.querySelector('svg')!;
    expect(svg.querySelector('svg[data-icon="browser"]')).not.toBeNull();
    expect(svg.querySelector('svg[data-icon="database"]')).not.toBeNull();
  });

  it('shows the sequence kind in the status bar for a sequence diagram', () => {
    render(<Editor />);
    fireEvent.change(screen.getByLabelText('Diagram source'), {
      target: {
        value: 'kind: sequence\nnode a: A\nnode b: B\nedge a -> b: ping',
      },
    });
    expect(screen.getByTestId('status-kind')).toHaveTextContent(
      'Sequence diagram'
    );
    expect(screen.getByText('ping')).toBeInTheDocument();
  });

  it('inserts a shape node from the toolbar shape menu', () => {
    render(<Editor />);
    fireEvent.click(screen.getByRole('button', { name: 'Shape' }));
    fireEvent.click(screen.getByRole('button', { name: 'Cloud' }));
    const editor = screen.getByLabelText(
      'Diagram source'
    ) as HTMLTextAreaElement;
    expect(editor.value).toContain('node shape7: Cloud [cloud]');
    expect(screen.getByText('Cloud')).toBeInTheDocument();
    expect(screen.getByLabelText('Node count')).toHaveTextContent('7 nodes');
  });

  it('switches the layout direction to top-to-bottom', () => {
    render(<Editor />);
    fireEvent.click(screen.getByRole('button', { name: 'Layout' }));
    fireEvent.click(screen.getByRole('button', { name: 'Top → Bottom' }));
    expect(screen.getByText('Top → Bottom')).toBeInTheDocument();
  });

  it('renders a self-loop edge path on the canvas', () => {
    render(<Editor />);
    fireEvent.change(screen.getByLabelText('Diagram source'), {
      target: { value: 'node a: Alpha\nedge a -> a: retry' },
    });
    const canvas = screen.getByLabelText('Diagram canvas');
    const svg = canvas.querySelector('svg')!;
    expect(svg.querySelector('path[d*="A "]')).not.toBeNull();
  });

  it('exports a print-friendly A4 svg', () => {
    render(<Editor />);
    fireEvent.click(
      screen.getByRole('button', { name: 'More export options' })
    );
    fireEvent.click(screen.getByRole('button', { name: 'SVG (A4 print)' }));
    expect(mockDownloadSvg).toHaveBeenCalledTimes(1);
    expect(mockDownloadSvg.mock.calls[0][3]).toEqual({
      print: true,
      page: 'a4-landscape',
    });
  });

  it('exports a png', () => {
    render(<Editor />);
    fireEvent.click(
      screen.getByRole('button', { name: 'More export options' })
    );
    fireEvent.click(screen.getByRole('button', { name: 'PNG' }));
    expect(mockDownloadPng).toHaveBeenCalledTimes(1);
    expect(mockDownloadPng.mock.calls[0][3]).toEqual({ page: 'a4-landscape' });
  });

  it('copies a markdown snippet', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: jest.fn().mockResolvedValue(undefined) },
    });
    render(<Editor />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy' }));
    fireEvent.click(screen.getByRole('button', { name: 'Markdown' }));
    expect(mockBuildSnippet).toHaveBeenCalledWith(
      expect.objectContaining({ kind: 'flow' }),
      'markdown'
    );
  });

  it('drags a node on the canvas and updates its position', () => {
    render(<Editor />);
    const svg = screen.getByLabelText('Diagram canvas').querySelector('svg')!;
    const group = svg.querySelector('g.cursor-move')!;
    const rect = group.querySelector('rect')!;
    const before = Number(rect.getAttribute('x'));
    fireEvent.pointerDown(group, {
      pointerId: 1,
      clientX: 100,
      clientY: 100,
    });
    fireEvent.pointerMove(group, { clientX: 130, clientY: 100 });
    fireEvent.pointerUp(group);
    const movedRect = svg.querySelector('g.cursor-move rect')!;
    expect(Number(movedRect.getAttribute('x'))).toBeGreaterThan(before);
  });
});
