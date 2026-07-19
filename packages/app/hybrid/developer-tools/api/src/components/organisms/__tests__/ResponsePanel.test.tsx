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

  it('toggles back to body view', () => {
    render(<ResponsePanel response={response} loading={false} error={null} />);
    fireEvent.click(screen.getByText('Headers'));
    fireEvent.click(screen.getByText('Body'));
    expect(screen.getByText(/{\s*"name": "Ada"\s*}/)).toBeInTheDocument();
    expect(screen.queryByText('content-type')).not.toBeInTheDocument();
  });

  it('copies the response body', () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: jest.fn().mockResolvedValue(undefined) },
      configurable: true,
    });
    render(<ResponsePanel response={response} loading={false} error={null} />);
    fireEvent.click(screen.getByText('Copy'));
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      '{"name":"Ada"}'
    );
  });

  it('previews html responses in an iframe', () => {
    const html = {
      ...response,
      headers: { 'content-type': 'text/html' },
      body: '<h1>Hello</h1>',
    };
    render(<ResponsePanel response={html} loading={false} error={null} />);
    fireEvent.click(screen.getByText('Preview'));
    const frame = screen.getByTitle('Response preview');
    expect(frame.tagName).toBe('IFRAME');
    expect(frame).toHaveAttribute('srcdoc', '<h1>Hello</h1>');
  });

  it('shows raw body when preview is disabled', () => {
    const html = {
      ...response,
      headers: { 'content-type': 'text/html' },
      body: '<h1>Hello</h1>',
    };
    render(<ResponsePanel response={html} loading={false} error={null} />);
    expect(screen.getByText('<h1>Hello</h1>')).toBeInTheDocument();
  });

  it('renders a diff against the previous response', () => {
    const previous = { ...response, body: '{"name":"Bob"}' };
    render(
      <ResponsePanel
        response={response}
        loading={false}
        error={null}
        compareWith={previous}
      />
    );
    fireEvent.click(screen.getByText('Diff'));
    expect(screen.getByText(/"Bob"/)).toBeInTheDocument();
    expect(screen.getByText(/"Ada"/)).toBeInTheDocument();
  });

  it('does not show the diff button without a previous response', () => {
    render(<ResponsePanel response={response} loading={false} error={null} />);
    expect(screen.queryByText('Diff')).not.toBeInTheDocument();
  });
});
