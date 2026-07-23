import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Manifest } from '../ManifestModal';

describe('Manifest', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    Object.assign(navigator, {
      clipboard: { writeText: jest.fn().mockResolvedValue(undefined) },
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should render PWA manifest by default', () => {
    const { container } = render(<Manifest onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });

  it('should switch between pwa and extension tabs', () => {
    render(<Manifest onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('🧩 Extension'));
  });

  it('should copy manifest to clipboard', async () => {
    render(<Manifest onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('Copy'));
    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(screen.getByText('✓ Copied')).toBeInTheDocument();
    });
  });

  it('should reset manifest to original', () => {
    render(<Manifest onClose={jest.fn()} />);
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    const original = textarea.value;
    fireEvent.change(textarea, { target: { value: 'modified' } });
    expect(textarea.value).toBe('modified');
    fireEvent.click(screen.getByText('Reset'));
    expect(textarea.value).toBe(original);
  });

  it('should display line count and bytes', () => {
    render(<Manifest onClose={jest.fn()} />);
    expect(screen.getByText(/lines/)).toBeInTheDocument();
    expect(screen.getByText(/bytes/)).toBeInTheDocument();
  });

  it('should reset copied state when switching tabs', async () => {
    render(<Manifest onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('Copy'));
    await waitFor(() => {
      expect(screen.getByText('✓ Copied')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText('🧩 Extension'));
    expect(screen.queryByText('✓ Copied')).not.toBeInTheDocument();
  });
});
