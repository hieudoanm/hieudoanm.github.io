import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CodeEditorPage from '@/app/edit/code/page';
import type { SVGDocument } from '@/types';

const push = jest.fn();
const searchParamsGet = jest.fn();
const updateDocument = jest.fn().mockResolvedValue(undefined);
const addToast = jest.fn();
const writeText = jest.fn().mockResolvedValue(undefined);

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
  useSearchParams: () => ({ get: searchParamsGet }),
}));

jest.mock('react-icons/fi', () => ({
  FiArrowLeft: () => <span data-testid="arrow-left" />,
  FiCopy: () => <span data-testid="copy" />,
  FiDownload: () => <span data-testid="download" />,
  FiSave: () => <span data-testid="save" />,
}));

jest.mock('@/providers/Providers', () => ({
  Providers: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock('@/providers/DataProvider', () => ({
  useData: () => ({ documents, updateDocument }),
}));

jest.mock('@/providers/ToastProvider', () => ({
  useToast: () => ({ addToast }),
}));

jest.mock('@/components/organisms/IconWorkbench', () => ({
  IconWorkbench: ({
    value,
    onChange,
  }: {
    value: string;
    onChange: (v: string) => void;
  }) => (
    <textarea
      data-testid="code-editor"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  ),
}));

const documentShape = {
  id: 's1',
  type: 'rect' as const,
  name: 'Rect',
  x: 10,
  y: 20,
  width: 100,
  height: 50,
  rotation: 0,
  fill: { type: 'solid' as const, color: '#3b82f6', opacity: 1 },
  stroke: {
    color: '#1e293b',
    width: 2,
    dashArray: '',
    cap: 'round' as const,
    join: 'round' as const,
  },
  opacity: 1,
  locked: false,
  visible: true,
};

const documents: SVGDocument[] = [
  {
    id: 'doc-1',
    title: 'My Doc',
    width: 200,
    height: 100,
    shapes: [documentShape],
    layers: [],
    symbols: [],
    gradients: [],
    createdAt: 0,
    updatedAt: 0,
  },
];

describe('CodeEditorPage', () => {
  beforeEach(() => {
    push.mockReset();
    searchParamsGet.mockReset();
    updateDocument.mockReset();
    addToast.mockReset();
    writeText.mockReset().mockResolvedValue(undefined);
    searchParamsGet.mockReturnValue('doc-1');
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });
    URL.createObjectURL = jest.fn(() => 'blob:url');
    URL.revokeObjectURL = jest.fn();
  });

  const waitForEditor = async () =>
    waitFor(() => {
      expect(
        (screen.getByTestId('code-editor') as HTMLTextAreaElement).value
      ).toContain('<svg');
    });

  it('shows a spinner when no document id is given', () => {
    searchParamsGet.mockReturnValue(null);
    render(<CodeEditorPage />);
    expect(
      document.querySelector('.loading.loading-spinner')
    ).toBeInTheDocument();
  });

  it('shows a spinner when the document is not found', () => {
    searchParamsGet.mockReturnValue('missing');
    render(<CodeEditorPage />);
    expect(
      document.querySelector('.loading.loading-spinner')
    ).toBeInTheDocument();
  });

  it('renders the serialized svg in the editor', async () => {
    render(<CodeEditorPage />);
    await waitForEditor();
    expect(
      (screen.getByTestId('code-editor') as HTMLTextAreaElement).value
    ).toContain('<svg xmlns="http://www.w3.org/2000/svg"');
  });

  it('saves the document and shows a toast', async () => {
    render(<CodeEditorPage />);
    await waitForEditor();
    fireEvent.click(screen.getByText('Save'));
    expect(updateDocument).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'doc-1', title: 'My Doc' })
    );
    expect(addToast).toHaveBeenCalledWith('Saved', 'success');
  });

  it('copies the code to the clipboard', async () => {
    render(<CodeEditorPage />);
    await waitForEditor();
    fireEvent.click(screen.getByText('Copy'));
    await waitFor(() =>
      expect(addToast).toHaveBeenCalledWith('Copied to clipboard', 'success')
    );
    expect(writeText).toHaveBeenCalledWith(
      expect.stringContaining('<svg xmlns="http://www.w3.org/2000/svg"')
    );
  });

  it('does not toast when the copy fails', async () => {
    writeText.mockRejectedValue(new Error('denied'));
    render(<CodeEditorPage />);
    await waitForEditor();
    fireEvent.click(screen.getByText('Copy'));
    await waitFor(() => expect(writeText).toHaveBeenCalled());
    expect(addToast).not.toHaveBeenCalledWith('Copied to clipboard', 'success');
  });

  it('downloads the svg file', async () => {
    render(<CodeEditorPage />);
    await waitForEditor();
    fireEvent.click(screen.getByText('Download'));
    expect(URL.createObjectURL).toHaveBeenCalled();
    expect(addToast).toHaveBeenCalledWith('Downloaded', 'success');
  });

  it('navigates back to the editor', async () => {
    render(<CodeEditorPage />);
    await waitForEditor();
    fireEvent.click(screen.getByTestId('arrow-left').closest('button')!);
    expect(push).toHaveBeenCalledWith('/edit?id=doc-1');
  });
});
