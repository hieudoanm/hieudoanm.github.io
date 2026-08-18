import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MediaGallery } from '@/components/organisms/MediaGallery';
import { DataProvider } from '@/providers/DataProvider';
import { ToastProvider } from '@/providers/ToastProvider';

jest.mock('@/lib/db', () => ({
  db: {
    account: {
      get: jest.fn(),
      getAll: jest.fn().mockResolvedValue([]),
      put: jest.fn(),
    },
    contacts: { getAll: jest.fn().mockResolvedValue([]), put: jest.fn() },
    chats: {
      getAll: jest.fn().mockResolvedValue([]),
      get: jest.fn(),
      put: jest.fn(),
    },
    messages: {
      getAll: jest.fn().mockResolvedValue([]),
      getByChat: jest.fn(),
      get: jest.fn(),
      put: jest.fn(),
    },
    settings: { get: jest.fn(), put: jest.fn() },
    auth: { get: jest.fn(), put: jest.fn(), delete: jest.fn() },
  },
}));

jest.mock('@/data/seed', () => ({
  seedDatabase: jest.fn().mockResolvedValue(undefined),
  generateId: jest.fn(() => 'test-id'),
}));

jest.mock('@/components/organisms/ImageLightbox', () => ({
  ImageLightbox: ({ images, initialIndex, onClose }: any) => (
    <div data-testid="lightbox">
      <span data-testid="lightbox-index">{initialIndex}</span>
      <span data-testid="lightbox-count">{images.length}</span>
      <button onClick={onClose}>Close Lightbox</button>
    </div>
  ),
}));

jest.mock('@/lib/format', () => ({
  formatChatTime: (ts: number) => new Date(ts).toLocaleTimeString(),
}));

const { db } = jest.requireMock('@/lib/db');

const wrap = (ui: React.ReactElement) =>
  render(
    <ToastProvider>
      <DataProvider>{ui}</DataProvider>
    </ToastProvider>
  );

const makeMessage = (overrides: Record<string, any>) => ({
  id: 'msg-1',
  chatId: 'c1',
  authorId: 'alice',
  type: 'text',
  text: 'Hello',
  status: 'sent' as const,
  createdAt: Date.now(),
  reactions: [],
  ...overrides,
});

beforeEach(() => {
  jest.clearAllMocks();
  db.auth.get.mockResolvedValue({
    id: 'session',
    method: 'phone',
    identifier: '+1 555 010 0000',
    signedInAt: 1000,
  });
  db.account.get.mockResolvedValue({
    id: 'me',
    name: 'You',
    username: 'you',
    avatarColor: '#ff0030',
    online: true,
  });
  db.contacts.getAll.mockResolvedValue([]);
  db.chats.getAll.mockResolvedValue([]);
  db.settings.get.mockResolvedValue({
    id: 'default',
    theme: 'nothing',
    notifications: true,
    readReceipts: true,
    typingIndicators: true,
    disappearingSeconds: 0,
  });
});

describe('MediaGallery', () => {
  it('renders all tab buttons', () => {
    wrap(<MediaGallery chatId="c1" onClose={jest.fn()} />);
    expect(screen.getByRole('tab', { name: /images/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /videos/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /audio/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /files/i })).toBeInTheDocument();
  });

  it('shows empty state when no media exists', async () => {
    wrap(<MediaGallery chatId="c1" onClose={jest.fn()} />);
    expect(await screen.findByText('No images yet')).toBeInTheDocument();
  });

  it('switching tabs changes the empty state message', async () => {
    wrap(<MediaGallery chatId="c1" onClose={jest.fn()} />);
    await screen.findByText('No images yet');
    fireEvent.click(screen.getByRole('tab', { name: /videos/i }));
    expect(await screen.findByText('No videos yet')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('tab', { name: /audio/i }));
    expect(await screen.findByText('No audio yet')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('tab', { name: /files/i }));
    expect(await screen.findByText('No files yet')).toBeInTheDocument();
  });

  it('close button calls onClose', () => {
    const onClose = jest.fn();
    wrap(<MediaGallery chatId="c1" onClose={onClose} />);
    fireEvent.click(screen.getByLabelText('Close'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  describe('with image data', () => {
    beforeEach(() => {
      db.messages.getAll.mockResolvedValue([
        makeMessage({
          id: 'img-1',
          type: 'image',
          mediaUrl: 'http://example.com/img1.jpg',
          text: 'Photo 1',
        }),
        makeMessage({
          id: 'img-2',
          type: 'image',
          mediaUrl: 'http://example.com/img2.jpg',
          text: 'Photo 2',
        }),
      ]);
    });

    it('renders image thumbnails', async () => {
      wrap(<MediaGallery chatId="c1" onClose={jest.fn()} />);
      await waitFor(() => {
        expect(document.querySelectorAll('img').length).toBeGreaterThanOrEqual(
          2
        );
      });
    });

    it('opens lightbox when clicking an image', async () => {
      wrap(<MediaGallery chatId="c1" onClose={jest.fn()} />);
      await waitFor(() => {
        expect(document.querySelectorAll('img').length).toBeGreaterThanOrEqual(
          2
        );
      });
      const imageButtons = screen
        .getAllByRole('button')
        .filter((btn) => btn.querySelector('img'));
      fireEvent.click(imageButtons[0]);
      expect(screen.getByTestId('lightbox')).toBeInTheDocument();
      expect(screen.getByTestId('lightbox-index')).toHaveTextContent('0');
    });

    it('opens lightbox at the correct index', async () => {
      wrap(<MediaGallery chatId="c1" onClose={jest.fn()} />);
      await waitFor(() => {
        expect(document.querySelectorAll('img').length).toBeGreaterThanOrEqual(
          2
        );
      });
      const imageButtons = screen
        .getAllByRole('button')
        .filter((btn) => btn.querySelector('img'));
      fireEvent.click(imageButtons[1]);
      expect(screen.getByTestId('lightbox-index')).toHaveTextContent('1');
    });

    it('closes lightbox', async () => {
      wrap(<MediaGallery chatId="c1" onClose={jest.fn()} />);
      await waitFor(() => {
        expect(document.querySelectorAll('img').length).toBeGreaterThanOrEqual(
          2
        );
      });
      const imageButtons = screen
        .getAllByRole('button')
        .filter((btn) => btn.querySelector('img'));
      fireEvent.click(imageButtons[0]);
      fireEvent.click(screen.getByText('Close Lightbox'));
      expect(screen.queryByTestId('lightbox')).not.toBeInTheDocument();
    });

    it('images tab does not render video or audio elements', async () => {
      wrap(<MediaGallery chatId="c1" onClose={jest.fn()} />);
      await waitFor(() => {
        expect(document.querySelectorAll('img').length).toBeGreaterThanOrEqual(
          2
        );
      });
      expect(document.querySelector('video')).not.toBeInTheDocument();
      expect(document.querySelector('audio')).not.toBeInTheDocument();
    });
  });

  describe('with video data', () => {
    beforeEach(() => {
      db.messages.getAll.mockResolvedValue([
        makeMessage({
          id: 'vid-1',
          type: 'video',
          mediaUrl: 'http://example.com/vid1.mp4',
          text: 'Video 1',
        }),
      ]);
    });

    it('renders video items on the videos tab', async () => {
      wrap(<MediaGallery chatId="c1" onClose={jest.fn()} />);
      fireEvent.click(screen.getByRole('tab', { name: /videos/i }));
      await waitFor(() => {
        expect(document.querySelector('video')).toBeInTheDocument();
      });
    });

    it('shows empty for images when only videos exist', async () => {
      wrap(<MediaGallery chatId="c1" onClose={jest.fn()} />);
      expect(await screen.findByText('No images yet')).toBeInTheDocument();
    });
  });

  describe('with audio data', () => {
    beforeEach(() => {
      db.messages.getAll.mockResolvedValue([
        makeMessage({
          id: 'aud-1',
          type: 'audio',
          mediaUrl: 'http://example.com/aud1.mp3',
          text: 'Audio 1',
        }),
      ]);
    });

    it('renders audio items on the audio tab', async () => {
      wrap(<MediaGallery chatId="c1" onClose={jest.fn()} />);
      fireEvent.click(screen.getByRole('tab', { name: /audio/i }));
      await waitFor(() => {
        expect(document.querySelector('audio')).toBeInTheDocument();
      });
    });

    it('shows empty for images when only audio exists', async () => {
      wrap(<MediaGallery chatId="c1" onClose={jest.fn()} />);
      expect(await screen.findByText('No images yet')).toBeInTheDocument();
    });
  });

  describe('with file data', () => {
    beforeEach(() => {
      db.messages.getAll.mockResolvedValue([
        makeMessage({
          id: 'fil-1',
          type: 'file',
          fileName: 'doc.pdf',
          text: 'Document',
        }),
      ]);
    });

    it('renders file items on the files tab', async () => {
      wrap(<MediaGallery chatId="c1" onClose={jest.fn()} />);
      fireEvent.click(screen.getByRole('tab', { name: /files/i }));
      expect(await screen.findByText('doc.pdf')).toBeInTheDocument();
    });

    it('shows empty for images when only files exist', async () => {
      wrap(<MediaGallery chatId="c1" onClose={jest.fn()} />);
      expect(await screen.findByText('No images yet')).toBeInTheDocument();
    });
  });

  describe('file messages without fileName', () => {
    beforeEach(() => {
      db.messages.getAll.mockResolvedValue([
        makeMessage({ id: 'fil-2', type: 'file', text: 'No filename file' }),
      ]);
    });

    it('shows text fallback when no fileName on file messages', async () => {
      wrap(<MediaGallery chatId="c1" onClose={jest.fn()} />);
      fireEvent.click(screen.getByRole('tab', { name: /files/i }));
      expect(await screen.findByText('No filename file')).toBeInTheDocument();
    });
  });

  describe('images without mediaUrl', () => {
    beforeEach(() => {
      db.messages.getAll.mockResolvedValue([
        makeMessage({
          id: 'img-no-url',
          type: 'image',
          text: 'Image without URL',
        }),
      ]);
    });

    it('renders image buttons even without mediaUrl', async () => {
      wrap(<MediaGallery chatId="c1" onClose={jest.fn()} />);
      await waitFor(() => {
        const buttons = screen.getAllByRole('button');
        const imageButtons = buttons.filter((btn) => btn.querySelector('img'));
        expect(imageButtons.length).toBe(1);
      });
    });
  });

  describe('empty states for each tab', () => {
    beforeEach(() => {
      db.messages.getAll.mockResolvedValue([
        makeMessage({
          id: 'img-1',
          type: 'image',
          mediaUrl: 'http://example.com/img1.jpg',
        }),
      ]);
    });

    it('shows empty for videos when only images exist', async () => {
      wrap(<MediaGallery chatId="c1" onClose={jest.fn()} />);
      fireEvent.click(screen.getByRole('tab', { name: /videos/i }));
      expect(await screen.findByText('No videos yet')).toBeInTheDocument();
    });

    it('shows empty for audio when only images exist', async () => {
      wrap(<MediaGallery chatId="c1" onClose={jest.fn()} />);
      fireEvent.click(screen.getByRole('tab', { name: /audio/i }));
      expect(await screen.findByText('No audio yet')).toBeInTheDocument();
    });

    it('shows empty for files when only images exist', async () => {
      wrap(<MediaGallery chatId="c1" onClose={jest.fn()} />);
      fireEvent.click(screen.getByRole('tab', { name: /files/i }));
      expect(await screen.findByText('No files yet')).toBeInTheDocument();
    });
  });

  describe('mixed media with missing mediaUrl', () => {
    beforeEach(() => {
      db.messages.getAll.mockResolvedValue([
        makeMessage({
          id: 'v1',
          type: 'video',
          mediaUrl: 'http://example.com/v.mp4',
          text: 'Clip',
        }),
        makeMessage({ id: 'v2', type: 'video', text: 'Video no url' }),
      ]);
    });

    it('only renders video with mediaUrl', async () => {
      wrap(<MediaGallery chatId="c1" onClose={jest.fn()} />);
      fireEvent.click(screen.getByRole('tab', { name: /videos/i }));
      await waitFor(() => {
        expect(document.querySelectorAll('video').length).toBe(1);
      });
    });

    it('shows text for video without mediaUrl', async () => {
      wrap(<MediaGallery chatId="c1" onClose={jest.fn()} />);
      fireEvent.click(screen.getByRole('tab', { name: /videos/i }));
      expect(await screen.findByText('Video no url')).toBeInTheDocument();
    });
  });

  describe('tab aria-selected states', () => {
    it('images tab is selected by default', () => {
      wrap(<MediaGallery chatId="c1" onClose={jest.fn()} />);
      expect(screen.getByRole('tab', { name: /images/i })).toHaveAttribute(
        'aria-selected',
        'true'
      );
      expect(screen.getByRole('tab', { name: /videos/i })).toHaveAttribute(
        'aria-selected',
        'false'
      );
    });

    it('clicking a tab selects it', () => {
      wrap(<MediaGallery chatId="c1" onClose={jest.fn()} />);
      fireEvent.click(screen.getByRole('tab', { name: /videos/i }));
      expect(screen.getByRole('tab', { name: /videos/i })).toHaveAttribute(
        'aria-selected',
        'true'
      );
      expect(screen.getByRole('tab', { name: /images/i })).toHaveAttribute(
        'aria-selected',
        'false'
      );
    });
  });
});
