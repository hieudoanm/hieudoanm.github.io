import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import HomePage from '@/app/page';
import { useData } from '@/providers/DataProvider';
import type { SVGDocument, SVGShape } from '@/types';

const push = jest.fn();
const addToast = jest.fn();
const createNewDocument = jest.fn();
const createFromTemplate = jest.fn();
const deleteDocument = jest.fn().mockResolvedValue(undefined);
const renameDocument = jest.fn().mockResolvedValue(undefined);

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
}));

jest.mock('react-icons/fi', () => ({
  FiPlus: () => <span data-testid="plus" />,
  FiUpload: () => <span data-testid="upload" />,
  FiTrash2: () => <span data-testid="trash" />,
  FiEdit3: () => <span data-testid="edit" />,
  FiFile: () => <span data-testid="file" />,
  FiGrid: () => <span data-testid="grid" />,
  FiImage: () => <span data-testid="image" />,
  FiLayout: () => <span data-testid="layout" />,
  FiStar: () => <span data-testid="star" />,
  FiFolder: () => <span data-testid="folder" />,
}));

jest.mock('@/providers/Providers', () => ({
  Providers: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock('@/providers/DataProvider', () => ({
  useData: jest.fn(),
}));

jest.mock('@/providers/ToastProvider', () => ({
  useToast: () => ({ addToast }),
}));

jest.mock('@/data/models', () => ({
  SVG_TEMPLATES: [
    { id: 'tpl-blank', name: 'Blank', description: 'Empty canvas' },
    { id: 'tpl-logo', name: 'Logo', description: 'Logo layout' },
    { id: 'tpl-custom', name: 'Custom', description: 'Custom template' },
  ],
}));

const shape = (
  type: SVGDocument['shapes'][number]['type'],
  overrides: Partial<SVGShape> = {}
): SVGShape => ({
  id: `s-${type}-${Math.random()}`,
  type,
  name: type,
  x: 0,
  y: 0,
  width: 10,
  height: 10,
  rotation: 0,
  fill: { type: 'solid', color: '#3b82f6', opacity: 1 },
  stroke: {
    color: '#1e293b',
    width: 2,
    dashArray: '',
    cap: 'round',
    join: 'round',
  },
  opacity: 1,
  locked: false,
  visible: true,
  ...overrides,
});

const doc = (
  id: string,
  overrides: Partial<SVGDocument> = {}
): SVGDocument => ({
  id,
  title: `Doc ${id}`,
  width: 200,
  height: 100,
  shapes: [
    shape('rect'),
    shape('ellipse'),
    shape('line'),
    shape('path', { pathData: 'M0 0' }),
    shape('star'),
    shape('rect', { fill: { type: 'none', color: '', opacity: 0 } }),
  ],
  layers: [],
  symbols: [],
  gradients: [],
  createdAt: 1000,
  updatedAt: Date.now(),
  ...overrides,
});

const baseData = () => ({
  documents: [doc('d1'), doc('d2', { shapes: [shape('rect')] })],
  isLoading: false,
  createNewDocument,
  createFromTemplate,
  deleteDocument,
  renameDocument,
});

const renderHome = () => {
  jest.mocked(useData).mockReturnValue(baseData() as never);
  return render(<HomePage />);
};

describe('HomePage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    push.mockReset();
    addToast.mockReset();
    createNewDocument.mockReset();
    createFromTemplate.mockReset();
    deleteDocument.mockReset().mockResolvedValue(undefined);
    renameDocument.mockReset().mockResolvedValue(undefined);
    window.confirm = jest.fn(() => true);
  });

  it('shows loading skeletons while loading', () => {
    jest.mocked(useData).mockReturnValue({
      ...baseData(),
      documents: [],
      isLoading: true,
    } as never);
    render(<HomePage />);
    expect(document.querySelectorAll('.skeleton')).toHaveLength(3);
  });

  it('shows the empty state when there are no documents', () => {
    jest.mocked(useData).mockReturnValue({
      ...baseData(),
      documents: [],
    } as never);
    render(<HomePage />);
    expect(screen.getByText('No documents yet')).toBeInTheDocument();
    expect(
      screen.getByText('Create your first SVG document')
    ).toBeInTheDocument();
  });

  it('opens the new document modal from the empty state', () => {
    jest.mocked(useData).mockReturnValue({
      ...baseData(),
      documents: [],
    } as never);
    render(<HomePage />);
    fireEvent.click(screen.getAllByText('New Document')[1]);
    expect(screen.getByText('Title')).toBeInTheDocument();
  });

  it('renders the document grid with metadata and shapes', () => {
    renderHome();
    expect(screen.getByText('SVG Library')).toBeInTheDocument();
    expect(screen.getByText('Doc d1')).toBeInTheDocument();
    expect(screen.getByText('Doc d2')).toBeInTheDocument();
    expect(screen.getByText('6 shapes')).toBeInTheDocument();
    expect(screen.getByText('1 shape')).toBeInTheDocument();
    expect(screen.getAllByText(/200 x 100/)).toHaveLength(2);
    expect(document.querySelectorAll('svg rect')).toHaveLength(3);
    expect(document.querySelectorAll('svg ellipse')).toHaveLength(1);
    expect(document.querySelectorAll('svg line')).toHaveLength(1);
    expect(document.querySelectorAll('svg path')).toHaveLength(1);
  });

  it('renders a path shape without pathData', () => {
    jest.mocked(useData).mockReturnValue({
      ...baseData(),
      documents: [doc('d-p', { shapes: [shape('path')] })],
    } as never);
    render(<HomePage />);
    expect(document.querySelector('svg path')).toHaveAttribute('d', '');
  });

  it('opens an editor when a document card is clicked', () => {
    renderHome();
    fireEvent.click(screen.getByText('Doc d1'));
    expect(push).toHaveBeenCalledWith('/edit?id=d1');
  });

  it('opens and cancels the new document modal', () => {
    renderHome();
    fireEvent.click(screen.getByText('New Document'));
    expect(screen.getByText('Title')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Cancel'));
    expect(screen.queryByText('Title')).not.toBeInTheDocument();
  });

  it('rejects creating a document without a title', () => {
    renderHome();
    fireEvent.click(screen.getByText('New Document'));
    fireEvent.click(screen.getByText('Create'));
    expect(addToast).toHaveBeenCalledWith('Please enter a title', 'error');
    expect(createNewDocument).not.toHaveBeenCalled();
  });

  it('creates a document and navigates to the editor', async () => {
    createNewDocument.mockResolvedValue({ id: 'new-doc' });
    renderHome();
    fireEvent.click(screen.getByText('New Document'));
    fireEvent.change(screen.getByPlaceholderText('My SVG'), {
      target: { value: 'My Logo' },
    });
    fireEvent.change(screen.getByDisplayValue('800'), {
      target: { value: '400' },
    });
    fireEvent.change(screen.getByDisplayValue('600'), {
      target: { value: '700' },
    });
    fireEvent.click(screen.getByText('Create'));
    await waitFor(() =>
      expect(createNewDocument).toHaveBeenCalledWith('My Logo', 400, 700)
    );
    expect(push).toHaveBeenCalledWith('/edit?id=new-doc');
  });

  it('creates a document from a template', async () => {
    createFromTemplate.mockResolvedValue({ id: 'tpl-doc' });
    renderHome();
    fireEvent.click(screen.getByText('Templates'));
    expect(screen.getByText('Choose Template')).toBeInTheDocument();
    expect(screen.getByText('Blank')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Logo'));
    await waitFor(() =>
      expect(createFromTemplate).toHaveBeenCalledWith('tpl-logo')
    );
    expect(push).toHaveBeenCalledWith('/edit?id=tpl-doc');
  });

  it('creates a document from a template without a registered icon', async () => {
    createFromTemplate.mockResolvedValue({ id: 'tpl-doc' });
    renderHome();
    fireEvent.click(screen.getByText('Templates'));
    fireEvent.click(screen.getByText('Custom'));
    await waitFor(() =>
      expect(createFromTemplate).toHaveBeenCalledWith('tpl-custom')
    );
  });

  it('cancels the template modal', () => {
    renderHome();
    fireEvent.click(screen.getByText('Templates'));
    fireEvent.click(screen.getByText('Cancel'));
    expect(screen.queryByText('Choose Template')).not.toBeInTheDocument();
  });

  it('renames a document on Enter and blur', async () => {
    renderHome();
    fireEvent.click(screen.getAllByTestId('edit')[0]);
    const input = screen.getByDisplayValue('Doc d1');
    fireEvent.click(input);
    fireEvent.change(input, { target: { value: 'Renamed' } });
    fireEvent.keyDown(input, { key: 'a' });
    expect(renameDocument).not.toHaveBeenCalled();
    fireEvent.keyDown(input, { key: 'Enter' });
    await waitFor(() =>
      expect(renameDocument).toHaveBeenCalledWith('d1', 'Renamed')
    );
    expect(screen.queryByDisplayValue('Renamed')).not.toBeInTheDocument();
    fireEvent.click(screen.getAllByTestId('edit')[0]);
    const input2 = screen.getByDisplayValue('Doc d1');
    fireEvent.change(input2, { target: { value: 'Blurred' } });
    fireEvent.blur(input2);
    await waitFor(() =>
      expect(renameDocument).toHaveBeenCalledWith('d1', 'Blurred')
    );
  });

  it('does not rename with an empty title', () => {
    renderHome();
    fireEvent.click(screen.getAllByTestId('edit')[0]);
    const input = screen.getByDisplayValue('Doc d1');
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(renameDocument).not.toHaveBeenCalled();
  });

  it('deletes a document after confirmation', async () => {
    window.confirm = jest.fn(() => true);
    renderHome();
    fireEvent.click(screen.getAllByTestId('trash')[0]);
    await waitFor(() => expect(deleteDocument).toHaveBeenCalledWith('d1'));
    expect(addToast).toHaveBeenCalledWith('Document deleted', 'success');
  });

  it('skips deletion when confirmation is cancelled', () => {
    window.confirm = jest.fn(() => false);
    renderHome();
    fireEvent.click(screen.getAllByTestId('trash')[0]);
    expect(deleteDocument).not.toHaveBeenCalled();
  });
});
