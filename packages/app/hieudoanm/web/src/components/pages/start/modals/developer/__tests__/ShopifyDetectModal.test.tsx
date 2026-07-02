import {
  render,
  fireEvent,
  screen,
  act,
  waitFor,
} from '@testing-library/react';
import { ShopifyDetectModal } from '../ShopifyDetectModal';

let mockHistoryStore: any[] = [];

jest.mock('../ShopifyDetectModal/utils/detect', () => ({
  detectFromHTML: jest.fn().mockReturnValue({
    url: 'https://example.com',
    isShopify: true,
    isPlus: false,
    confidence: 85,
    signals: ['X-ShopId header'],
    checkedAt: Date.now(),
  }),
}));

jest.mock('../ShopifyDetectModal/utils/storage', () => {
  let historyStorage: any[] = [];
  return {
    loadHistory: jest.fn(() => historyStorage),
    saveHistory: jest.fn((results: any[]) => {
      historyStorage = results;
      return results;
    }),
    clearHistory: jest.fn(() => {
      historyStorage = [];
    }),
  };
});

const { detectFromHTML } = jest.requireMock(
  '../ShopifyDetectModal/utils/detect'
);
const { loadHistory, saveHistory, clearHistory } = jest.requireMock(
  '../ShopifyDetectModal/utils/storage'
);

const mockHistoryData = [
  {
    url: 'https://shopify.com',
    isShopify: true,
    isPlus: true,
    confidence: 95,
    signals: ['Shopify theme detected'],
    checkedAt: Date.now() - 1000,
  },
  {
    url: 'https://not-shopify.com',
    isShopify: false,
    isPlus: false,
    confidence: 10,
    signals: ['No Shopify signals'],
    checkedAt: Date.now() - 2000,
  },
];

global.fetch = jest.fn();

const setupHistoryData = () => {
  saveHistory(mockHistoryData);
};

beforeEach(() => {
  saveHistory([]);
});

describe('ShopifyDetectModal', () => {
  const onClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockResolvedValue({
      text: jest.fn().mockResolvedValue('<html>shopify content</html>'),
    });
  });

  it('renders modal title', () => {
    render(<ShopifyDetectModal onClose={onClose} />);
    expect(screen.getByText('Shopify Detector')).toBeInTheDocument();
  });

  it('renders Check tab', () => {
    render(<ShopifyDetectModal onClose={onClose} />);
    expect(screen.getByText('🔍 Check')).toBeInTheDocument();
  });

  it('renders History tab', () => {
    render(<ShopifyDetectModal onClose={onClose} />);
    expect(screen.getByText('🕐 History')).toBeInTheDocument();
  });

  it('renders textarea for URL input', () => {
    render(<ShopifyDetectModal onClose={onClose} />);
    expect(screen.getByPlaceholderText(/example\.com/)).toBeInTheDocument();
  });

  it('renders Check sites button', () => {
    render(<ShopifyDetectModal onClose={onClose} />);
    expect(screen.getByText('Check sites')).toBeInTheDocument();
  });

  it('shows No history yet in History tab', () => {
    render(<ShopifyDetectModal onClose={onClose} />);
    fireEvent.click(screen.getByText('🕐 History'));
    expect(screen.getByText('No history yet')).toBeInTheDocument();
  });

  it('shows loading state while checking', async () => {
    (global.fetch as jest.Mock).mockImplementation(() => new Promise(() => {}));
    render(<ShopifyDetectModal onClose={onClose} />);
    const textarea = screen.getByPlaceholderText(/example\.com/);
    fireEvent.change(textarea, { target: { value: 'example.com' } });

    await act(async () => {
      fireEvent.click(screen.getByText('Check sites'));
    });

    expect(screen.getByText('Checking…')).toBeInTheDocument();
  });

  it('handles fetch failure gracefully', async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));
    render(<ShopifyDetectModal onClose={onClose} />);
    const textarea = screen.getByPlaceholderText(/example\.com/);
    fireEvent.change(textarea, { target: { value: 'example.com' } });

    await act(async () => {
      fireEvent.click(screen.getByText('Check sites'));
    });

    await waitFor(() => {
      expect(screen.getByText('✖ Not Shopify')).toBeInTheDocument();
    });
  });

  it('shows history entries when history exists', () => {
    setupHistoryData();
    render(<ShopifyDetectModal onClose={onClose} />);
    fireEvent.click(screen.getByText('🕐 History'));
    expect(screen.getByText('https://shopify.com')).toBeInTheDocument();
    expect(screen.getByText('https://not-shopify.com')).toBeInTheDocument();
  });

  it('shows Plus badge for plus stores in history', () => {
    setupHistoryData();
    render(<ShopifyDetectModal onClose={onClose} />);
    fireEvent.click(screen.getByText('🕐 History'));
    const plusBadges = screen.getAllByText('Plus');
    expect(plusBadges.length).toBeGreaterThanOrEqual(1);
  });

  it('clears history on Clear all click', () => {
    setupHistoryData();
    render(<ShopifyDetectModal onClose={onClose} />);
    fireEvent.click(screen.getByText('🕐 History'));
    fireEvent.click(screen.getByText('Clear all'));
    expect(clearHistory).toHaveBeenCalled();
  });

  it('shows history badge count', () => {
    jest.mocked(loadHistory).mockReturnValue(mockHistoryData);
    render(<ShopifyDetectModal onClose={onClose} />);
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('shows results with confidence progress bar', async () => {
    render(<ShopifyDetectModal onClose={onClose} />);
    const textarea = screen.getByPlaceholderText(/example\.com/);
    fireEvent.change(textarea, { target: { value: 'test.com' } });

    await act(async () => {
      fireEvent.click(screen.getByText('Check sites'));
    });

    await waitFor(() => {
      expect(screen.getByText('85%')).toBeInTheDocument();
    });
  });
});
