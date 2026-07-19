import { render, screen, fireEvent } from '@testing-library/react';
import { ResponsePanel } from '../ResponsePanel';

const response = {
  status: 200,
  statusText: 'OK',
  url: 'https://api.example.com/users',
  headers: { 'content-type': 'application/json' },
  body: '{"name":"Ada"}',
  timeMs: 42,
  sizeBytes: 15,
};

describe('ResponsePanel', () => {
  it('shows loading spinner', () => {
    render(<ResponsePanel response={null} loading={true} error={null} />);
    expect(document.querySelector('.loading')).toBeInTheDocument();
  });

  it('shows error message', () => {
    render(
      <ResponsePanel response={null} loading={false} error="Failed to fetch" />
    );
    expect(screen.getByText('Failed to fetch')).toBeInTheDocument();
  });

  it('shows empty state', () => {
    render(<ResponsePanel response={null} loading={false} error={null} />);
    expect(
      screen.getByText('Send a request to see the response here.')
    ).toBeInTheDocument();
  });

  it('renders status, meta and pretty body', () => {
    render(<ResponsePanel response={response} loading={false} error={null} />);
    expect(screen.getByText('200')).toBeInTheDocument();
    expect(screen.getByText('OK')).toBeInTheDocument();
    expect(screen.getByText('42 ms')).toBeInTheDocument();
    expect(screen.getByText('15 B')).toBeInTheDocument();
    expect(screen.getByText(/{\s*"name": "Ada"\s*}/)).toBeInTheDocument();
  });

  it('toggles to headers view', () => {
    render(<ResponsePanel response={response} loading={false} error={null} />);
    fireEvent.click(screen.getByText('Headers'));
    expect(screen.getByText('content-type')).toBeInTheDocument();
    expect(screen.getByText('application/json')).toBeInTheDocument();
  });
});
