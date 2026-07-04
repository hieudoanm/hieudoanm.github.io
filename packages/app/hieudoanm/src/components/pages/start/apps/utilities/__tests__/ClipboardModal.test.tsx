import { render, fireEvent, screen, act } from '@testing-library/react';
import { ClipboardModal } from '../ClipboardModal';

const mockClips = [
  { id: '1', content: 'clip 1' },
  { id: '2', content: 'clip 2' },
];

const mockSetTab = jest.fn();
const mockSetSelected = jest.fn();
const mockCapture = jest.fn();
const mockCopy = jest.fn();
const mockRemove = jest.fn();
const mockClearAll = jest.fn();

const createMockUseClipboard = (overrides: any = {}) => ({
  clips: mockClips,
  loading: false,
  tab: 'history' as const,
  setTab: mockSetTab,
  selected: null,
  setSelected: mockSetSelected,
  error: null,
  capture: mockCapture,
  copy: mockCopy,
  remove: mockRemove,
  clearAll: mockClearAll,
  ...overrides,
});

jest.mock('../ClipboardModal/useClipboard', () => ({
  useClipboard: jest.fn(),
}));

const { useClipboard } = jest.requireMock('../ClipboardModal/useClipboard');

describe('ClipboardModal', () => {
  const onClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useClipboard.mockReturnValue(createMockUseClipboard());
  });

  it('renders modal title', () => {
    render(<ClipboardModal onClose={onClose} />);
    expect(screen.getByText('Clipboard Manager')).toBeInTheDocument();
  });

  it('renders Capture button', () => {
    render(<ClipboardModal onClose={onClose} />);
    expect(screen.getByText('Capture')).toBeInTheDocument();
  });

  it('renders Clear button', () => {
    render(<ClipboardModal onClose={onClose} />);
    expect(screen.getByText('Clear')).toBeInTheDocument();
  });

  it('shows clip count', () => {
    render(<ClipboardModal onClose={onClose} />);
    expect(screen.getByText('2 items')).toBeInTheDocument();
  });

  it('renders clip items', () => {
    render(<ClipboardModal onClose={onClose} />);
    expect(screen.getByText('clip 1')).toBeInTheDocument();
    expect(screen.getByText('clip 2')).toBeInTheDocument();
  });

  it('calls capture when Capture button clicked', () => {
    render(<ClipboardModal onClose={onClose} />);
    fireEvent.click(screen.getByText('Capture'));
    expect(mockCapture).toHaveBeenCalled();
  });

  it('calls clearAll when Clear button clicked', () => {
    render(<ClipboardModal onClose={onClose} />);
    fireEvent.click(screen.getByText('Clear'));
    expect(mockClearAll).toHaveBeenCalled();
  });

  it('calls copy when Copy button on clip clicked', () => {
    render(<ClipboardModal onClose={onClose} />);
    const copyButtons = screen.getAllByText('Copy');
    expect(copyButtons.length).toBe(2);
    fireEvent.click(copyButtons[0]);
    expect(mockCopy).toHaveBeenCalledWith('clip 1');
  });

  it('calls remove when remove button on clip clicked', () => {
    const removeSpy = jest.fn();
    useClipboard.mockReturnValue(createMockUseClipboard({ remove: removeSpy }));
    render(<ClipboardModal onClose={onClose} />);
    const removeButtons = screen.getAllByText('✕');
    // [0] is FullScreen close button, [1] is first clip remove
    fireEvent.click(removeButtons[1]);
    expect(removeSpy).toHaveBeenCalledWith('1');
  });

  it('shows empty state when clips empty', () => {
    useClipboard.mockReturnValue(createMockUseClipboard({ clips: [] }));
    render(<ClipboardModal onClose={onClose} />);
    expect(screen.getByText('Clipboard is empty')).toBeInTheDocument();
  });

  it('shows tabs for history and preview', () => {
    render(<ClipboardModal onClose={onClose} />);
    expect(screen.getByText('history')).toBeInTheDocument();
    expect(screen.getByText('preview')).toBeInTheDocument();
  });

  it('calls setTab when clicking tabs', () => {
    render(<ClipboardModal onClose={onClose} />);
    fireEvent.click(screen.getByText('preview'));
    expect(mockSetTab).toHaveBeenCalledWith('preview');
  });

  it('shows preview content with selected item', () => {
    useClipboard.mockReturnValue(
      createMockUseClipboard({
        tab: 'preview' as const,
        selected: { id: '1', content: 'preview content' },
      })
    );
    render(<ClipboardModal onClose={onClose} />);
    expect(screen.getByText('preview content')).toBeInTheDocument();
  });

  it('shows select prompt in preview without selected', () => {
    useClipboard.mockReturnValue(
      createMockUseClipboard({ tab: 'preview' as const, selected: null })
    );
    render(<ClipboardModal onClose={onClose} />);
    expect(screen.getByText('Select an item to preview')).toBeInTheDocument();
  });

  it('copies from preview and goes back', () => {
    useClipboard.mockReturnValue(
      createMockUseClipboard({
        tab: 'preview' as const,
        selected: { id: '1', content: 'preview content' },
      })
    );
    render(<ClipboardModal onClose={onClose} />);
    fireEvent.click(screen.getByText('Back'));
    expect(mockSetTab).toHaveBeenCalledWith('history');
    jest.clearAllMocks();
    useClipboard.mockReturnValue(
      createMockUseClipboard({
        tab: 'preview' as const,
        selected: { id: '1', content: 'preview content' },
      })
    );
    const { unmount } = render(<ClipboardModal onClose={onClose} />);
    fireEvent.click(screen.getAllByText('Copy')[0]);
    expect(mockCopy).toHaveBeenCalled();
    unmount();
  });

  it('shows error when present', () => {
    useClipboard.mockReturnValue(
      createMockUseClipboard({ error: 'Some error occurred' })
    );
    render(<ClipboardModal onClose={onClose} />);
    expect(screen.getByText('Some error occurred')).toBeInTheDocument();
  });

  it('selects clip on click in history', () => {
    render(<ClipboardModal onClose={onClose} />);
    fireEvent.click(screen.getByText('clip 1'));
    expect(mockSetSelected).toHaveBeenCalledWith(mockClips[0]);
    expect(mockSetTab).toHaveBeenCalledWith('preview');
  });

  it('disables Clear when clips empty', () => {
    useClipboard.mockReturnValue(createMockUseClipboard({ clips: [] }));
    render(<ClipboardModal onClose={onClose} />);
    expect(screen.getByText('Clear')).toBeDisabled();
  });
});
