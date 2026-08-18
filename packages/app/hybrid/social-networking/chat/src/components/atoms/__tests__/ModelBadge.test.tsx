import { render, screen, fireEvent, act } from '@testing-library/react';
import { ModelBadge, CopyButton, Skeleton } from '../ModelBadge';

describe('ModelBadge', () => {
  it('renders the badge with the given color', () => {
    render(
      <ModelBadge model="gpt-4o" badge="GPT-4o" badgeColor="badge-primary" />
    );
    expect(screen.getByText('GPT-4o')).toHaveClass('badge-primary');
  });
});

describe('CopyButton', () => {
  const writeText = jest.fn();

  beforeEach(() => {
    writeText.mockReset();
    jest.useRealTimers();
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });
  });

  it('renders the default label', () => {
    render(<CopyButton text="hello" />);
    expect(screen.getByText('Copy')).toBeInTheDocument();
  });

  it('renders a custom label', () => {
    render(<CopyButton text="hello" label="Copy Code" />);
    expect(screen.getByText('Copy Code')).toBeInTheDocument();
  });

  it('shows Copied state on success', async () => {
    jest.useFakeTimers();
    writeText.mockResolvedValue(undefined);
    render(<CopyButton text="hello" />);
    fireEvent.click(screen.getByText('Copy'));
    await act(async () => {
      await Promise.resolve();
    });
    expect(writeText).toHaveBeenCalledWith('hello');
    expect(screen.getByText('Copied')).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(screen.getByText('Copy')).toBeInTheDocument();
  });

  it('swallows clipboard errors', async () => {
    writeText.mockRejectedValue(new Error('denied'));
    render(<CopyButton text="hello" />);
    fireEvent.click(screen.getByText('Copy'));
    await act(async () => {
      await Promise.resolve();
    });
    expect(screen.getByText('Copy')).toBeInTheDocument();
  });
});

describe('Skeleton', () => {
  it('renders the default number of lines', () => {
    render(<Skeleton />);
    expect(document.querySelectorAll('.skeleton')).toHaveLength(3);
  });

  it('renders a custom number of lines', () => {
    render(<Skeleton lines={5} />);
    expect(document.querySelectorAll('.skeleton')).toHaveLength(5);
  });
});
