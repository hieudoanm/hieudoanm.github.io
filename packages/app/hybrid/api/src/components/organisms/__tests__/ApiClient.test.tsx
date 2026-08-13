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

  it('sends a request with Ctrl+Enter', async () => {
    render(<ApiClient />);
    fireEvent.change(screen.getByLabelText('Request URL'), {
      target: { value: 'https://api.example.com/users' },
    });
    fireEvent.keyDown(window, { key: 'Enter', ctrlKey: true });

    expect(await screen.findByText('200')).toBeInTheDocument();
  });

  it('clears the request with Ctrl+L', () => {
    render(<ApiClient />);
    fireEvent.change(screen.getByLabelText('Request URL'), {
      target: { value: 'https://api.example.com/users' },
    });
    fireEvent.keyDown(window, { key: 'l', ctrlKey: true });

    expect(screen.getByLabelText('Request URL')).toHaveValue('');
  });

  it('opens, edits and closes request tabs', () => {
    render(<ApiClient />);
    fireEvent.click(screen.getByLabelText('New tab'));
    fireEvent.change(screen.getByLabelText('Request URL'), {
      target: { value: 'https://api.example.com/one' },
    });
    expect(screen.getByText('/one')).toBeInTheDocument();

    fireEvent.click(screen.getByText('New Request'));
    expect(screen.getByLabelText('Request URL')).toHaveValue('');

    fireEvent.click(screen.getByLabelText('Close tab /one'));
    expect(screen.getByText('New Request')).toBeInTheDocument();
    expect(screen.queryByLabelText('Close tab /one')).not.toBeInTheDocument();
  });

  it('keeps the active tab when closing an inactive one', () => {
    render(<ApiClient />);
    fireEvent.change(screen.getByLabelText('Request URL'), {
      target: { value: 'https://api.example.com/one' },
    });
    fireEvent.click(screen.getByLabelText('New tab'));
    fireEvent.change(screen.getByLabelText('Request URL'), {
      target: { value: 'https://api.example.com/two' },
    });
    expect(screen.getByLabelText('Request URL')).toHaveValue(
      'https://api.example.com/two'
    );

    fireEvent.click(screen.getByLabelText('Close tab /one'));
    expect(screen.getByLabelText('Request URL')).toHaveValue(
      'https://api.example.com/two'
    );
  });

  it('substitutes environment variables in the request', async () => {
    render(<ApiClient />);
    fireEvent.click(screen.getByText('Env'));
    fireEvent.click(screen.getByText('Add variable'));
    fireEvent.change(screen.getByLabelText('Environment variable key'), {
      target: { value: 'host' },
    });
    fireEvent.change(screen.getByLabelText('Environment variable value'), {
      target: { value: 'api.example.com' },
    });
    fireEvent.change(screen.getByLabelText('Request URL'), {
      target: { value: 'https://{{host}}/users' },
    });
    fireEvent.click(screen.getByText('Send'));

    expect(await screen.findByText('200')).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.example.com/users',
      expect.anything()
    );
  });

  it('shows a timeout message when the request aborts', async () => {
    global.fetch = jest
      .fn()
      .mockRejectedValue(new DOMException('Aborted', 'AbortError'));
    render(<ApiClient />);
    fireEvent.change(screen.getByLabelText('Request URL'), {
      target: { value: 'https://api.example.com/slow' },
    });
    fireEvent.click(screen.getByText('Send'));

    expect(await screen.findByText('Request timed out')).toBeInTheDocument();
  });

  it('saves and loads a collection entry', async () => {
    render(<ApiClient />);
    fireEvent.change(screen.getByLabelText('Sidebar section'), {
      target: { value: 'collections' },
    });
    expect(screen.getByText('No collections yet')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Request URL'), {
      target: { value: 'https://api.example.com/users' },
    });
    fireEvent.change(screen.getByLabelText('Collection entry name'), {
      target: { value: 'List users' },
    });
    fireEvent.click(screen.getByText('Save'));

    fireEvent.change(screen.getByLabelText('Request URL'), {
      target: { value: 'https://other.com' },
    });
    fireEvent.click(await screen.findByText('List users'));
    expect(screen.getByLabelText('Request URL')).toHaveValue(
      'https://api.example.com/users'
    );
  });

  it('diffs the response against the previous one', async () => {
    let call = 0;
    global.fetch = jest.fn().mockImplementation(
      () =>
        Promise.resolve({
          status: 200,
          statusText: 'OK',
          url: 'https://api.example.com/users',
          headers: new Headers({ 'content-type': 'application/json' }),
          text: async () => {
            call += 1;
            return call === 1 ? '{"v":1}' : '{"v":2}';
          },
        }) as Promise<Response>
    );

    render(<ApiClient />);
    fireEvent.change(screen.getByLabelText('Request URL'), {
      target: { value: 'https://api.example.com/users' },
    });
    fireEvent.click(screen.getByText('Send'));
    await screen.findByText('200');

    fireEvent.click(screen.getByText('Send'));
    await screen.findByText('Diff');

    fireEvent.click(screen.getByText('Diff'));
    expect(screen.getByText('{"v":1}')).toBeInTheDocument();
    expect(screen.getByText('{"v":2}')).toBeInTheDocument();
  });
});
