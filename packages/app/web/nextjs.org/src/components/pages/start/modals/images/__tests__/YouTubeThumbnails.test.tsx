import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import { YouTubeThumbnailsModal } from '../YouTubeThumbnailsModal';

const renderYT = (onClose = jest.fn()) =>
  render(<YouTubeThumbnailsModal onClose={onClose} />);

describe('YouTubeThumbnailsModal', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    URL.createObjectURL = jest.fn().mockReturnValue('blob:mock');
    URL.revokeObjectURL = jest.fn();
  });

  it('should render with placeholder', () => {
    renderYT();
    expect(
      screen.getByPlaceholderText('Paste YouTube URL or video ID…')
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Supports youtube\.com\/watch/)
    ).toBeInTheDocument();
  });

  it('should update input on change', () => {
    renderYT();
    const input = screen.getByPlaceholderText('Paste YouTube URL or video ID…');
    fireEvent.change(input, {
      target: { value: 'https://youtube.com/watch?v=dQw4w9WgXcQ' },
    });
    expect(input).toHaveValue('https://youtube.com/watch?v=dQw4w9WgXcQ');
  });

  it('should clear error on input change', () => {
    renderYT();
    const input = screen.getByPlaceholderText('Paste YouTube URL or video ID…');
    fireEvent.change(input, { target: { value: 'invalid' } });
    fireEvent.click(screen.getByText('Load'));
    expect(screen.getByText(/Could not find/)).toBeInTheDocument();
    fireEvent.change(input, { target: { value: 'dQw4w9WgXcQ' } });
    expect(screen.queryByText(/Could not find/)).not.toBeInTheDocument();
  });

  it('should disable Load button when input is empty', () => {
    renderYT();
    expect(screen.getByText('Load').closest('button')).toBeDisabled();
  });

  it('should show error for invalid video URL', () => {
    renderYT();
    const input = screen.getByPlaceholderText('Paste YouTube URL or video ID…');
    fireEvent.change(input, { target: { value: 'not-a-valid-url' } });
    fireEvent.click(screen.getByText('Load'));
    expect(
      screen.getByText(/Could not find a valid YouTube video ID/)
    ).toBeInTheDocument();
  });

  it('should extract video ID on Load click', () => {
    renderYT();
    const input = screen.getByPlaceholderText('Paste YouTube URL or video ID…');
    fireEvent.change(input, {
      target: { value: 'https://www.youtube.com/watch?v=owosAu5aycM' },
    });
    fireEvent.click(screen.getByText('Load'));
    expect(screen.getByText('owosAu5aycM')).toBeInTheDocument();
  });

  it('should extract video ID on Enter key', () => {
    renderYT();
    const input = screen.getByPlaceholderText('Paste YouTube URL or video ID…');
    fireEvent.change(input, {
      target: { value: 'https://youtu.be/dQw4w9WgXcQ' },
    });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(screen.getByText('dQw4w9WgXcQ')).toBeInTheDocument();
  });

  it('should close on Escape key', () => {
    const onClose = jest.fn();
    renderYT(onClose);
    const input = screen.getByPlaceholderText('Paste YouTube URL or video ID…');
    fireEvent.keyDown(input, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  it('should render thumbnails after video ID extracted', () => {
    renderYT();
    const input = screen.getByPlaceholderText('Paste YouTube URL or video ID…');
    fireEvent.change(input, { target: { value: 'dQw4w9WgXcQ' } });
    fireEvent.click(screen.getByText('Load'));
    expect(screen.getByText('Max Resolution')).toBeInTheDocument();
    expect(screen.getByText('SD')).toBeInTheDocument();
    expect(screen.getByText('HQ')).toBeInTheDocument();
  });

  it('should render resolution text', () => {
    renderYT();
    const input = screen.getByPlaceholderText('Paste YouTube URL or video ID…');
    fireEvent.change(input, { target: { value: 'dQw4w9WgXcQ' } });
    fireEvent.click(screen.getByText('Load'));
    expect(screen.getByText('1280×720')).toBeInTheDocument();
  });

  it('should show download selected button with count 2 by default', () => {
    renderYT();
    const input = screen.getByPlaceholderText('Paste YouTube URL or video ID…');
    fireEvent.change(input, { target: { value: 'dQw4w9WgXcQ' } });
    fireEvent.click(screen.getByText('Load'));
    expect(screen.getByText(/Download selected \(2\)/)).toBeInTheDocument();
  });

  it('should toggle selection on thumbnail click', () => {
    renderYT();
    const input = screen.getByPlaceholderText('Paste YouTube URL or video ID…');
    fireEvent.change(input, { target: { value: 'dQw4w9WgXcQ' } });
    fireEvent.click(screen.getByText('Load'));
    expect(screen.getByText(/Download selected \(2\)/)).toBeInTheDocument();
    const maxResThumb = screen
      .getByText('Max Resolution')
      .closest('[class*="cursor-pointer"]')!;
    fireEvent.click(maxResThumb);
    expect(screen.getByText(/Download selected \(1\)/)).toBeInTheDocument();
    fireEvent.click(maxResThumb);
    expect(screen.getByText(/Download selected \(2\)/)).toBeInTheDocument();
  });

  it('should select all on All button click', () => {
    renderYT();
    const input = screen.getByPlaceholderText('Paste YouTube URL or video ID…');
    fireEvent.change(input, { target: { value: 'dQw4w9WgXcQ' } });
    fireEvent.click(screen.getByText('Load'));
    fireEvent.click(screen.getByText('All'));
    expect(screen.getByText(/Download selected \(9\)/)).toBeInTheDocument();
  });

  it('should select none on None button click', () => {
    renderYT();
    const input = screen.getByPlaceholderText('Paste YouTube URL or video ID…');
    fireEvent.change(input, { target: { value: 'dQw4w9WgXcQ' } });
    fireEvent.click(screen.getByText('Load'));
    fireEvent.click(screen.getByText('None'));
    expect(screen.getByText(/Download selected \(0\)/)).toBeInTheDocument();
  });

  it('should disable download selected when nothing selected', () => {
    renderYT();
    const input = screen.getByPlaceholderText('Paste YouTube URL or video ID…');
    fireEvent.change(input, { target: { value: 'dQw4w9WgXcQ' } });
    fireEvent.click(screen.getByText('Load'));
    fireEvent.click(screen.getByText('None'));
    expect(
      screen.getByText(/Download selected \(0\)/).closest('button')
    ).toBeDisabled();
  });

  it('should show loading state while downloading single thumbnail', async () => {
    (global.fetch as jest.Mock).mockImplementation(
      () =>
        new Promise((r) =>
          setTimeout(() => r({ blob: () => Promise.resolve(new Blob()) }), 200)
        )
    );
    renderYT();
    const input = screen.getByPlaceholderText('Paste YouTube URL or video ID…');
    fireEvent.change(input, { target: { value: 'dQw4w9WgXcQ' } });
    fireEvent.click(screen.getByText('Load'));
    const downloadBtns = screen.getAllByText('⬇');
    fireEvent.click(downloadBtns[0]);
    expect(screen.getAllByText('…').length).toBeGreaterThanOrEqual(1);
  });

  it('should render example buttons', () => {
    renderYT();
    const examples = screen.getAllByText(/youtube/);
    expect(examples.length).toBeGreaterThanOrEqual(1);
  });

  it('should show video id when example clicked', () => {
    renderYT();
    const exampleBtn = screen.getByText(/owosAu/);
    fireEvent.click(exampleBtn);
    expect(screen.getByText('owosAu5aycM')).toBeInTheDocument();
  });

  it('should extract short URL format', () => {
    renderYT();
    const input = screen.getByPlaceholderText('Paste YouTube URL or video ID…');
    fireEvent.change(input, {
      target: { value: 'https://youtu.be/dQw4w9WgXcQ' },
    });
    fireEvent.click(screen.getByText('Load'));
    expect(screen.getByText('dQw4w9WgXcQ')).toBeInTheDocument();
  });
});
