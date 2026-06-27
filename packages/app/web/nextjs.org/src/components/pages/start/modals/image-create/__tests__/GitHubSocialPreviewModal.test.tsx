import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { GitHubSocialPreviewModal } from '../GitHubSocialPreviewModal';

const mockRepo = {
  full_name: 'facebook/react',
  description:
    'A declarative, efficient, and flexible JavaScript library for building user interfaces.',
  stargazers_count: 200000,
  forks_count: 42000,
  watchers_count: 5000,
  language: 'TypeScript',
  topics: ['react', 'ui', 'javascript'],
  owner: {
    login: 'facebook',
    avatar_url: 'https://avatars.githubusercontent.com/u/69631?v=4',
  },
  license: { spdx_id: 'MIT' },
  open_issues_count: 500,
};

const renderGHS = (onClose = jest.fn()) =>
  render(<GitHubSocialPreviewModal onClose={onClose} />);

describe('GitHubSocialPreviewModal', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    HTMLCanvasElement.prototype.getContext = jest.fn().mockReturnValue({
      fillRect: jest.fn(),
      fillText: jest.fn(),
      measureText: jest.fn().mockReturnValue({ width: 100 }),
      createLinearGradient: jest
        .fn()
        .mockReturnValue({ addColorStop: jest.fn() }),
      beginPath: jest.fn(),
      moveTo: jest.fn(),
      lineTo: jest.fn(),
      quadraticCurveTo: jest.fn(),
      closePath: jest.fn(),
      arc: jest.fn(),
      clip: jest.fn(),
      drawImage: jest.fn(),
      save: jest.fn(),
      restore: jest.fn(),
      stroke: jest.fn(),
      strokeStyle: '',
      fillStyle: '',
      lineWidth: 1,
      font: '',
      textAlign: 'left' as CanvasTextAlign,
    });
    HTMLCanvasElement.prototype.toDataURL = jest
      .fn()
      .mockReturnValue('data:image/png;base64,mock');
    HTMLCanvasElement.prototype.toBlob = jest
      .fn()
      .mockImplementation((cb) => cb(new Blob()));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render with placeholder', () => {
    renderGHS();
    expect(
      screen.getByPlaceholderText('owner/repo or github.com/owner/repo')
    ).toBeInTheDocument();
    expect(screen.getByText(/Enter a GitHub repository/)).toBeInTheDocument();
  });

  it('should update input on change', () => {
    renderGHS();
    const input = screen.getByPlaceholderText(
      'owner/repo or github.com/owner/repo'
    );
    fireEvent.change(input, { target: { value: 'vercel/next.js' } });
    expect(input).toHaveValue('vercel/next.js');
  });

  it('should disable generate button when input is empty', () => {
    renderGHS();
    expect(screen.getByText('Generate').closest('button')).toBeDisabled();
  });

  it('should show loading spinner while fetching', () => {
    (global.fetch as jest.Mock).mockImplementation(() => new Promise(() => {}));
    renderGHS();
    const input = screen.getByPlaceholderText(
      'owner/repo or github.com/owner/repo'
    );
    fireEvent.change(input, { target: { value: 'facebook/react' } });
    fireEvent.click(screen.getByText('Generate'));
    expect(document.querySelector('.loading-spinner')).toBeInTheDocument();
  });

  it('should fetch repo on Generate click', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockRepo),
    });
    renderGHS();
    const input = screen.getByPlaceholderText(
      'owner/repo or github.com/owner/repo'
    );
    fireEvent.change(input, { target: { value: 'facebook/react' } });
    fireEvent.click(screen.getByText('Generate'));
    await waitFor(() => {
      expect(screen.getByText('facebook/react')).toBeInTheDocument();
    });
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.github.com/repos/facebook/react'
    );
  });

  it('should fetch repo on Enter key', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockRepo),
    });
    renderGHS();
    const input = screen.getByPlaceholderText(
      'owner/repo or github.com/owner/repo'
    );
    fireEvent.change(input, { target: { value: 'facebook/react' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    await waitFor(() => {
      expect(screen.getByText('facebook/react')).toBeInTheDocument();
    });
  });

  it('should close on Escape key', () => {
    const onClose = jest.fn();
    renderGHS(onClose);
    const input = screen.getByPlaceholderText(
      'owner/repo or github.com/owner/repo'
    );
    fireEvent.keyDown(input, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  it('should show error for invalid repo format', async () => {
    renderGHS();
    const input = screen.getByPlaceholderText(
      'owner/repo or github.com/owner/repo'
    );
    fireEvent.change(input, { target: { value: 'invalid' } });
    fireEvent.click(screen.getByText('Generate'));
    await waitFor(() => {
      expect(
        screen.getByText('Enter a valid repo in owner/repo format.')
      ).toBeInTheDocument();
    });
  });

  it('should show error for 404 repo', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 404,
    });
    renderGHS();
    const input = screen.getByPlaceholderText(
      'owner/repo or github.com/owner/repo'
    );
    fireEvent.change(input, { target: { value: 'nonexistent/repo' } });
    fireEvent.click(screen.getByText('Generate'));
    await waitFor(() => {
      expect(screen.getByText('Repository not found.')).toBeInTheDocument();
    });
  });

  it('should show generic error for bad API response', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
    });
    renderGHS();
    const input = screen.getByPlaceholderText(
      'owner/repo or github.com/owner/repo'
    );
    fireEvent.change(input, { target: { value: 'some/repo' } });
    fireEvent.click(screen.getByText('Generate'));
    await waitFor(() => {
      expect(screen.getByText('GitHub API error.')).toBeInTheDocument();
    });
  });

  it('should show error for network error', async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error('Network failure'));
    renderGHS();
    const input = screen.getByPlaceholderText(
      'owner/repo or github.com/owner/repo'
    );
    fireEvent.change(input, { target: { value: 'some/repo' } });
    fireEvent.click(screen.getByText('Generate'));
    await waitFor(() => {
      expect(screen.getByText('Network failure')).toBeInTheDocument();
    });
  });

  it('should handle non-Error thrown', async () => {
    (global.fetch as jest.Mock).mockRejectedValue('string error');
    renderGHS();
    const input = screen.getByPlaceholderText(
      'owner/repo or github.com/owner/repo'
    );
    fireEvent.change(input, { target: { value: 'some/repo' } });
    fireEvent.click(screen.getByText('Generate'));
    await waitFor(() => {
      expect(
        screen.getByText('Failed to fetch repository.')
      ).toBeInTheDocument();
    });
  });

  it('should clean github.com URL prefix', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockRepo),
    });
    renderGHS();
    const input = screen.getByPlaceholderText(
      'owner/repo or github.com/owner/repo'
    );
    fireEvent.change(input, {
      target: { value: 'https://github.com/facebook/react' },
    });
    fireEvent.click(screen.getByText('Generate'));
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.github.com/repos/facebook/react'
      );
    });
  });

  it('should render example buttons that trigger fetch', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockRepo),
    });
    renderGHS();
    fireEvent.click(screen.getByText('vercel/next.js'));
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.github.com/repos/vercel/next.js'
      );
    });
  });

  it('should show download button after successful fetch', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockRepo),
    });
    renderGHS();
    const input = screen.getByPlaceholderText(
      'owner/repo or github.com/owner/repo'
    );
    fireEvent.change(input, { target: { value: 'facebook/react' } });
    fireEvent.click(screen.getByText('Generate'));
    await waitFor(() => {
      expect(screen.getByText('⬇ Download PNG')).toBeInTheDocument();
    });
  });

  it('should show Copy button after successful fetch', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockRepo),
    });
    renderGHS();
    const input = screen.getByPlaceholderText(
      'owner/repo or github.com/owner/repo'
    );
    fireEvent.change(input, { target: { value: 'facebook/react' } });
    fireEvent.click(screen.getByText('Generate'));
    await waitFor(() => {
      expect(screen.getByText('📋 Copy')).toBeInTheDocument();
    });
  });

  it('should download image on Download button click', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockRepo),
    });
    const createSpy = jest.spyOn(document, 'createElement');
    renderGHS();
    const input = screen.getByPlaceholderText(
      'owner/repo or github.com/owner/repo'
    );
    fireEvent.change(input, { target: { value: 'facebook/react' } });
    fireEvent.click(screen.getByText('Generate'));
    await waitFor(() => {
      expect(screen.getByText('⬇ Download PNG')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText('⬇ Download PNG'));
    expect(createSpy).toHaveBeenCalledWith('a');
    createSpy.mockRestore();
  });

  it('should show language when available', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockRepo),
    });
    renderGHS();
    const input = screen.getByPlaceholderText(
      'owner/repo or github.com/owner/repo'
    );
    fireEvent.change(input, { target: { value: 'facebook/react' } });
    fireEvent.click(screen.getByText('Generate'));
    await waitFor(() => {
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
    });
  });

  it('should render 1200 x 630 px text', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockRepo),
    });
    renderGHS();
    const input = screen.getByPlaceholderText(
      'owner/repo or github.com/owner/repo'
    );
    fireEvent.change(input, { target: { value: 'facebook/react' } });
    fireEvent.click(screen.getByText('Generate'));
    await waitFor(() => {
      expect(screen.getByText('1200 × 630 px')).toBeInTheDocument();
    });
  });
});
