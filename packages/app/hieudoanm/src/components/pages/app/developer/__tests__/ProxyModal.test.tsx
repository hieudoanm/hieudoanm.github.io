import { fireEvent, render, screen } from '@testing-library/react';
import { ProxyModal } from '../ProxyModal';

describe('ProxyModal', () => {
  const onClose = jest.fn();

  it('should render and match snapshot', () => {
    const { container } = render(<ProxyModal onClose={onClose} />);
    expect(container).toMatchSnapshot();
  });

  it('should update code snippets when URL changes', () => {
    render(<ProxyModal onClose={onClose} />);
    const input = screen.getByPlaceholderText(/api.example.com/i);
    const newUrl = 'https://my-api.com/data';

    fireEvent.change(input, { target: { value: newUrl } });

    const encodedUrl = encodeURIComponent(newUrl);
    expect(screen.getByText(new RegExp(encodedUrl, 'i'))).toBeInTheDocument();
  });

  it('should switch tabs and show different snippets', () => {
    render(<ProxyModal onClose={onClose} />);

    // Default tab is curl
    expect(screen.getByText(/curl "/i)).toBeInTheDocument();

    // Switch to fetch
    const fetchTab = screen.getByText(/fetch/i);
    fireEvent.click(fetchTab);
    expect(screen.getByText(/fetch\("/i)).toBeInTheDocument();

    // Switch to axios
    const axiosTab = screen.getByText(/axios/i);
    fireEvent.click(axiosTab);
    expect(screen.getByText(/axios\.get\("/i)).toBeInTheDocument();

    // Switch to TanStack Query
    const queryTab = screen.getByText(/tanstack query/i);
    fireEvent.click(queryTab);
    expect(screen.getByText(/isPending/i)).toBeInTheDocument();
  });

  it('should copy code to clipboard', async () => {
    // Mock clipboard
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn().mockImplementation(() => Promise.resolve()),
      },
    });

    render(<ProxyModal onClose={onClose} />);
    const copyButton = screen.getByRole('button', { name: /copy/i });

    fireEvent.click(copyButton);

    expect(navigator.clipboard.writeText).toHaveBeenCalled();
    expect(await screen.findByText(/copied/i)).toBeInTheDocument();
  });

  it('should call onClose when close button is clicked', () => {
    render(<ProxyModal onClose={onClose} />);
    const closeButton = screen.getByText('✕');

    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalled();
  });
});
