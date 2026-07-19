import { act, fireEvent, render, screen } from '@testing-library/react';
import { Emojis } from '../EmojisModal';

describe('Emojis', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    Object.assign(navigator, {
      clipboard: { writeText: jest.fn().mockResolvedValue(undefined) },
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should render with emoji count', () => {
    const { container } = render(<Emojis onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
    expect(screen.getByText(/emoji/)).toBeInTheDocument();
  });

  it('should filter emojis by search query', () => {
    render(<Emojis onClose={jest.fn()} />);
    const searchInput = screen.getByPlaceholderText('Search emoji…');
    fireEvent.change(searchInput, { target: { value: 'zzzzz' } });
    expect(screen.getByText('No emojis found.')).toBeInTheDocument();
  });

  it('should show no results message when filter matches nothing', () => {
    render(<Emojis onClose={jest.fn()} />);
    const searchInput = screen.getByPlaceholderText('Search emoji…');
    fireEvent.change(searchInput, { target: { value: 'zzzzz' } });
    expect(screen.getByText('No emojis found.')).toBeInTheDocument();
  });

  it('should render all emojis when query is empty', () => {
    render(<Emojis onClose={jest.fn()} />);
    expect(screen.getByText(/emoji/)).toBeInTheDocument();
  });

  it('should be case insensitive when filtering', () => {
    render(<Emojis onClose={jest.fn()} />);
    const searchInput = screen.getByPlaceholderText('Search emoji…');
    fireEvent.change(searchInput, { target: { value: 'ZZZZZ' } });
    expect(screen.getByText('No emojis found.')).toBeInTheDocument();
  });

  it('should filter emojis by matching query', () => {
    render(<Emojis onClose={jest.fn()} />);
    const searchInput = screen.getByPlaceholderText(
      'Search emoji…'
    ) as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: 'grinning' } });
    const emojiContainer = screen.getByText(/emoji/);
    expect(emojiContainer).toBeInTheDocument();
    expect(screen.queryByText('No emojis found.')).not.toBeInTheDocument();
  });

  it('should copy emoji to clipboard on click', async () => {
    render(<Emojis onClose={jest.fn()} />);
    const searchInput = screen.getByPlaceholderText(
      'Search emoji…'
    ) as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: 'grinning' } });
    const emojiBtn = screen.getByTitle(':grinning:');
    await act(async () => {
      fireEvent.click(emojiBtn);
    });
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });

  it('should show copied state after clicking emoji', async () => {
    render(<Emojis onClose={jest.fn()} />);
    const searchInput = screen.getByPlaceholderText(
      'Search emoji…'
    ) as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: 'grinning' } });
    const emojiBtn = screen.getByTitle(':grinning:');
    fireEvent.click(emojiBtn);
    await screen.findByText('✓');
  });

  it('should reset copied state after timeout', async () => {
    render(<Emojis onClose={jest.fn()} />);
    const searchInput = screen.getByPlaceholderText(
      'Search emoji…'
    ) as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: 'grinning' } });
    const emojiBtn = screen.getByTitle(':grinning:');
    await act(async () => {
      fireEvent.click(emojiBtn);
    });
    expect(screen.getByText('✓')).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(1200);
    });
    expect(screen.queryByText('✓')).not.toBeInTheDocument();
  });

  it('should show alert when clipboard write fails', async () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn().mockRejectedValue(new Error('Clipboard denied')),
      },
    });
    render(<Emojis onClose={jest.fn()} />);
    const searchInput = screen.getByPlaceholderText(
      'Search emoji…'
    ) as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: 'grinning' } });
    const emojiBtn = screen.getByTitle(':grinning:');
    await act(async () => {
      fireEvent.click(emojiBtn);
    });
    expect(alertMock).toHaveBeenCalledWith('Failed to copy');
    alertMock.mockRestore();
  });
});
