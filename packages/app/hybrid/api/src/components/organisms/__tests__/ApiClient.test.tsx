import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ApiClient } from '../ApiClient';

const response = {
  status: 200,
  statusText: 'OK',
  url: 'https://api.example.com/users',
  headers: { 'content-type': 'application/json' },
  body: '{"ok":true}',
  timeMs: 12,
  sizeBytes: 11,
};

describe('ApiClient', () => {
  beforeEach(() => {
    localStorage.clear();
    global.fetch = jest.fn().mockResolvedValue({
      status: 200,
      statusText: 'OK',
      url: 'https://api.example.com/users',
      headers: new Headers({ 'content-type': 'application/json' }),
      text: async () => response.body,
    });
  });

  it('renders composer, tabs and empty states', () => {
    render(<ApiClient />);
    expect(screen.getByLabelText('HTTP method')).toHaveValue('GET');
    expect(screen.getByText('No requests yet')).toBeInTheDocument();
    expect(
      screen.getByText('Send a request to see the response here.')
    ).toBeInTheDocument();
  });

  it('shows error when sending without a url', () => {
    render(<ApiClient />);
    fireEvent.click(screen.getByText('Send'));
    expect(screen.getByText('Please enter a URL')).toBeInTheDocument();
  });

  it('sends a request and shows the response', async () => {
    render(<ApiClient />);
    fireEvent.change(screen.getByLabelText('Request URL'), {
      target: { value: 'https://api.example.com/users' },
    });
    fireEvent.click(screen.getByText('Send'));

    expect(await screen.findByText('200')).toBeInTheDocument();
    expect(screen.getByText('OK')).toBeInTheDocument();
    expect(screen.getByText('11 B')).toBeInTheDocument();
  });

  it('records the request in history after sending', async () => {
    render(<ApiClient />);
    fireEvent.change(screen.getByLabelText('Request URL'), {
      target: { value: 'https://api.example.com/users' },
    });
    fireEvent.click(screen.getByText('Send'));

    expect(
      await screen.findByText('https://api.example.com/users')
    ).toBeInTheDocument();
  });

  it('reuses a history entry when selected', async () => {
    render(<ApiClient />);
    fireEvent.change(screen.getByLabelText('Request URL'), {
      target: { value: 'https://api.example.com/users' },
    });
    fireEvent.click(screen.getByText('Send'));
    await screen.findByText('https://api.example.com/users');

    fireEvent.change(screen.getByLabelText('Request URL'), {
      target: { value: 'https://api.example.com/other' },
    });
    fireEvent.click(screen.getByText('https://api.example.com/users'));

    await waitFor(() =>
      expect(screen.getByLabelText('Request URL')).toHaveValue(
        'https://api.example.com/users'
      )
    );
  });

  it('shows fetch failure as an error', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('Failed to fetch'));
    render(<ApiClient />);
    fireEvent.change(screen.getByLabelText('Request URL'), {
      target: { value: 'https://api.example.com/users' },
    });
    fireEvent.click(screen.getByText('Send'));

    expect(await screen.findByText('Failed to fetch')).toBeInTheDocument();
  });

  it('shows a generic error when the failure is not an Error', async () => {
    global.fetch = jest.fn().mockRejectedValue('boom');
    render(<ApiClient />);
    fireEvent.change(screen.getByLabelText('Request URL'), {
      target: { value: 'https://api.example.com/users' },
    });
    fireEvent.click(screen.getByText('Send'));

    expect(await screen.findByText('Request failed')).toBeInTheDocument();
  });

  it('restores a saved draft from localStorage', () => {
    localStorage.setItem(
      'api-client:draft',
      JSON.stringify({
        ...{
          method: 'GET',
          url: 'https://saved.com',
          params: [],
          headers: [],
          body: '',
          authType: 'none',
          token: '',
          username: '',
          password: '',
        },
      })
    );
    render(<ApiClient />);
    expect(screen.getByLabelText('Request URL')).toHaveValue(
      'https://saved.com'
    );
  });

  it('clears the request history', async () => {
    render(<ApiClient />);
    fireEvent.change(screen.getByLabelText('Request URL'), {
      target: { value: 'https://api.example.com/users' },
    });
    fireEvent.click(screen.getByText('Send'));
    await screen.findByText('https://api.example.com/users');

    fireEvent.click(screen.getByText('Clear'));
    expect(screen.getByText('No requests yet')).toBeInTheDocument();
  });

  it('toggles the history list on mobile', () => {
    render(<ApiClient />);
    const toggle = screen.getByRole('button', { name: /History/ });
    expect(screen.getAllByText('No requests yet')).toHaveLength(1);
    fireEvent.click(toggle);
    expect(screen.getAllByText('No requests yet')).toHaveLength(2);
    fireEvent.click(toggle);
    expect(screen.getAllByText('No requests yet')).toHaveLength(1);
  });
});
