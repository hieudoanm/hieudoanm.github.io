import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ClockTab } from '../ClockTab';

const mockFetch = jest.fn();
global.fetch = mockFetch;

jest.mock('@tanstack/react-query', () => ({
  useQueries: ({
    queries,
  }: {
    queries: Array<{ queryFn: () => Promise<unknown> }>;
  }) =>
    queries.map((q) => {
      q.queryFn();
      return { data: undefined };
    }),
}));

describe('ClockTab', () => {
  beforeEach(() => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        current: { temperature_2m: 22, weather_code: 0 },
      }),
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders the search input', () => {
    render(<ClockTab />);
    expect(
      screen.getByPlaceholderText('Search cities\u2026')
    ).toBeInTheDocument();
  });

  it('shows weather attribution', () => {
    render(<ClockTab />);
    expect(screen.getByText(/Weather via Open-Meteo/)).toBeInTheDocument();
  });

  it('renders city cards', () => {
    render(<ClockTab />);
    expect(screen.getByText('Dallas')).toBeInTheDocument();
    expect(screen.getByText('Ho Chi Minh City')).toBeInTheDocument();
  });

  it('renders all timezone labels', () => {
    render(<ClockTab />);
    expect(screen.getByText('Los Angeles')).toBeInTheDocument();
    expect(screen.getByText('New York')).toBeInTheDocument();
    expect(screen.getByText('London')).toBeInTheDocument();
    expect(screen.getByText('Tokyo')).toBeInTheDocument();
    expect(screen.getByText('Sydney')).toBeInTheDocument();
  });

  it('calls fetch for each timezone', () => {
    render(<ClockTab />);
    expect(mockFetch).toHaveBeenCalled();
  });

  it('handles fetch error gracefully', async () => {
    mockFetch.mockResolvedValue({ ok: false, status: 500 });
    render(<ClockTab />);
    expect(screen.getByText('Dallas')).toBeInTheDocument();
  });

  it('handles fetch network error', async () => {
    mockFetch.mockRejectedValue(new Error('Network error'));
    render(<ClockTab />);
    expect(screen.getByText('Dallas')).toBeInTheDocument();
  });
});
