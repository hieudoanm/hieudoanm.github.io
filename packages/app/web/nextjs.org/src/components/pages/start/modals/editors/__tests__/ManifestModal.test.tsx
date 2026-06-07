import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ManifestModal } from '../ManifestModal';

describe('ManifestModal', () => {
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
    const { container } = render(<ManifestModal onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });

  it('should switch between pwa and extension tabs', () => {
    render(<ManifestModal onClose={jest.fn()} />);
    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(2);
    fireEvent.click(tabs[1]);
  });

  it('should copy manifest to clipboard', async () => {
    render(<ManifestModal onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('Copy'));
    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(screen.getByText('✓ Copied')).toBeInTheDocument();
    });
  });

  it('should reset manifest to original', () => {
    render(<ManifestModal onClose={jest.fn()} />);
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    const original = textarea.value;
    fireEvent.change(textarea, { target: { value: 'modified' } });
    expect(textarea.value).toBe('modified');
    fireEvent.click(screen.getByText('Reset'));
    expect(textarea.value).toBe(original);
  });

  it('should display line count and bytes', () => {
    render(<ManifestModal onClose={jest.fn()} />);
    expect(screen.getByText(/lines/)).toBeInTheDocument();
    expect(screen.getByText(/bytes/)).toBeInTheDocument();
  });

  it('should reset copied state when switching tabs', async () => {
    render(<ManifestModal onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('Copy'));
    await waitFor(() => {
      expect(screen.getByText('✓ Copied')).toBeInTheDocument();
    });
    const tabs = screen.getAllByRole('tab');
    fireEvent.click(tabs[1]);
    expect(screen.queryByText('✓ Copied')).not.toBeInTheDocument();
  });
});
