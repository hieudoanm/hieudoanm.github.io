import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { IP } from '../IPModal';

const mockIPInfo = {
  ip: '8.8.8.8',
  version: 'IPv4',
  city: 'Mountain View',
  region: 'California',
  country_name: 'United States',
  country_code: 'US',
  postal: '94043',
  latitude: '37.386',
  longitude: '-122.084',
  timezone: 'America/Los_Angeles',
  org: 'GOOGLE',
  asn: 'AS15169 Google',
};

const mockFetch = jest.fn();

beforeEach(() => {
  jest.useFakeTimers();
  globalThis.fetch = mockFetch;
});

afterEach(() => {
  jest.useRealTimers();
});

describe('IP', () => {
  beforeEach(() => {
    mockFetch.mockReset();
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ ip: '8.8.8.8' }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockIPInfo,
      });
  });

  it('should render and fetch IP info on mount', async () => {
    const { container } = render(<IP onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });

  it('should display network info when data is loaded', async () => {
    render(<IP onClose={jest.fn()} />);
    await screen.findByText('8.8.8.8');
    expect(screen.getByText('8.8.8.8')).toBeInTheDocument();
    const googleElements = screen.getAllByText('GOOGLE');
    expect(googleElements.length).toBeGreaterThanOrEqual(1);
  });

  it('should show VPN badge for known orgs', async () => {
    render(<IP onClose={jest.fn()} />);
    await screen.findByText('8.8.8.8');
    expect(screen.getByText(/VPN \/ shared hosting/)).toBeInTheDocument();
  });

  it('should show provider badge', async () => {
    render(<IP onClose={jest.fn()} />);
    await screen.findByText(/via IPinfo/);
    expect(screen.getByText(/via IPinfo/)).toBeInTheDocument();
  });

  it('should switch to location tab', async () => {
    render(<IP onClose={jest.fn()} />);
    await screen.findByText('8.8.8.8');
    fireEvent.click(screen.getByText('location'));
    expect(screen.getByText('Mountain View')).toBeInTheDocument();
    expect(screen.getByText('California')).toBeInTheDocument();
  });

  it('should switch to dns tab', async () => {
    render(<IP onClose={jest.fn()} />);
    await screen.findByText('8.8.8.8');
    fireEvent.click(screen.getByText('dns'));
    expect(screen.getByPlaceholderText('example.com')).toBeInTheDocument();
  });

  it('should perform DNS lookup on Enter key', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        Answer: [{ name: 'example.com', type: 1, TTL: 300, data: '1.2.3.4' }],
      }),
    });
    render(<IP onClose={jest.fn()} />);
    await screen.findByText('8.8.8.8');
    fireEvent.click(screen.getByText('dns'));
    const input = screen.getByPlaceholderText('example.com');
    fireEvent.change(input, { target: { value: 'example.com' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    await waitFor(() => {
      expect(screen.getByText(/1.2.3.4/)).toBeInTheDocument();
    });
  });

  it('should show DNS error on failed lookup', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
    });
    render(<IP onClose={jest.fn()} />);
    await screen.findByText('8.8.8.8');
    fireEvent.click(screen.getByText('dns'));
    const input = screen.getByPlaceholderText('example.com');
    fireEvent.change(input, { target: { value: 'example.com' } });
    fireEvent.click(screen.getByText('Lookup'));
    await waitFor(() => {
      expect(screen.getByText('DNS lookup failed')).toBeInTheDocument();
    });
  });

  it('should toggle raw JSON display', async () => {
    render(<IP onClose={jest.fn()} />);
    await screen.findByText('8.8.8.8');
    fireEvent.click(screen.getByText(/Show raw JSON/));
    const rawJson = screen.getByText(/Mountain View/);
    expect(rawJson).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Hide raw JSON/));
  });

  it('should refresh IP info on refresh button click', async () => {
    render(<IP onClose={jest.fn()} />);
    await screen.findByText('8.8.8.8');
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ ip: '1.1.1.1' }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ ...mockIPInfo, ip: '1.1.1.1', org: 'Cloudflare' }),
      });
    fireEvent.click(screen.getByText('↺ Refresh'));
  });

  it('should show error state when fetch fails', async () => {
    mockFetch.mockReset();
    mockFetch.mockRejectedValue(new Error('Network error'));
    render(<IP onClose={jest.fn()} />);
    await waitFor(() => {
      expect(screen.getByText('Network error')).toBeInTheDocument();
    });
  });

  it('should disable lookup button when domain is empty', async () => {
    render(<IP onClose={jest.fn()} />);
    await screen.findByText('8.8.8.8');
    fireEvent.click(screen.getByText('dns'));
    expect(screen.getByText('Lookup')).toBeDisabled();
  });
});
