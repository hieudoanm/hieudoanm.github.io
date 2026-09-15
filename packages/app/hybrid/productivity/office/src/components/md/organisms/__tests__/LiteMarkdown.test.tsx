import { act, render, screen, waitFor } from '@testing-library/react';
import { LiteMarkdown } from '@/components/md/organisms/LiteMarkdown';
import { saveNotes } from '@/lib/md/storage';
import * as storage from '@/lib/md/storage';

let mockOnEditorChange: ((content: string) => void) | undefined;
let mockInitialDoc: string | undefined;

jest.mock('@/hooks/md/useCodeMirror', () => ({
  useCodeMirror: (options: {
    initialDoc?: string;
    onChange?: (content: string) => void;
  }) => {
    mockOnEditorChange = options.onChange;
    mockInitialDoc = options.initialDoc;
    return {
      view: null,
      setDoc: jest.fn(),
      getDoc: () => '',
      focus: jest.fn(),
    };
  },
}));

jest.mock('@/hooks/md/useMarkdownRender', () => ({
  useMarkdownRender: (content: string) => ({
    html: `<p>${content}</p>`,
    isRendering: false,
  }),
}));

jest.mock('@/lib/md/storage', () => {
  const actual = jest.requireActual('@/lib/md/storage');
  return { ...actual, saveNotes: jest.fn() };
});

describe('LiteMarkdown', () => {
  beforeEach(() => {
    window.localStorage.clear();
    mockOnEditorChange = undefined;
    mockInitialDoc = undefined;
    jest.clearAllMocks();
  });

  it('renders the editor and a live preview', () => {
    render(<LiteMarkdown />);
    expect(screen.getByTestId('editor')).toBeInTheDocument();
    expect(screen.getByTestId('markdown-preview')).toBeInTheDocument();
    expect(mockInitialDoc).toBe(
      screen.getByTestId('markdown-preview').textContent
    );
  });

  it('updates the preview as the editor changes', () => {
    render(<LiteMarkdown />);
    const preview = screen.getByTestId('markdown-preview');
    const onEditorChange = mockOnEditorChange;
    if (!onEditorChange) throw new Error('onChange not captured');
    act(() => onEditorChange('# Updated'));
    expect(preview).toHaveTextContent('# Updated');
  });

  it('auto-saves note changes', async () => {
    render(<LiteMarkdown />);
    const onEditorChange = mockOnEditorChange;
    if (!onEditorChange) throw new Error('onChange not captured');
    act(() => onEditorChange('Saved content'));
    await waitFor(() => expect(saveNotes).toHaveBeenCalled());
    const notes = (saveNotes as jest.Mock).mock.calls.at(-1)?.[0] as Array<{
      content: string;
    }>;
    expect(notes?.[0]?.content).toBe('Saved content');
  });
});
