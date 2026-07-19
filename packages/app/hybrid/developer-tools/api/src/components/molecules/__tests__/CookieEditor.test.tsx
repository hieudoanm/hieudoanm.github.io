import { render, screen, fireEvent } from '@testing-library/react';
import { CookieEditor } from '../CookieEditor';
import { StoredCookie } from '@/types/api-client';

const cookies: StoredCookie[] = [
  {
    id: '1',
    domain: 'example.com',
    name: 'session',
    value: 'abc',
    path: '/',
    secure: false,
    enabled: true,
  },
  {
    id: '2',
    domain: 'example.com',
    name: 'theme',
    value: 'dark',
    path: '/',
    secure: false,
    enabled: true,
  },
];

describe('CookieEditor', () => {
  const onChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows cookies for the current host', () => {
    render(
      <CookieEditor
        cookies={cookies}
        url="https://example.com/x"
        onChange={onChange}
      />
    );
    expect(screen.getByText('session')).toBeInTheDocument();
    expect(screen.getByText('theme')).toBeInTheDocument();
    expect(screen.getByText(/2 cookies for example\.com/)).toBeInTheDocument();
  });

  it('shows an empty state for other hosts', () => {
    render(
      <CookieEditor
        cookies={cookies}
        url="https://other.com/x"
        onChange={onChange}
      />
    );
    expect(screen.getByText(/No cookies for this host/)).toBeInTheDocument();
  });

  it('falls back to localhost for empty urls', () => {
    render(<CookieEditor cookies={[]} url="" onChange={onChange} />);
    fireEvent.change(screen.getByLabelText('Cookie name'), {
      target: { value: 'sid' },
    });
    fireEvent.click(screen.getByText('Add'));
    expect(onChange).toHaveBeenCalledWith([
      expect.objectContaining({ domain: 'localhost' }),
    ]);
  });

  it('pluralises the cookie count', () => {
    render(
      <CookieEditor
        cookies={[cookies[0]]}
        url="https://example.com/x"
        onChange={onChange}
      />
    );
    expect(screen.getByText(/1 cookie for example\.com/)).toBeInTheDocument();
  });

  it('adds a cookie', () => {
    render(
      <CookieEditor
        cookies={[]}
        url="https://example.com/x"
        onChange={onChange}
      />
    );
    fireEvent.change(screen.getByLabelText('Cookie name'), {
      target: { value: 'sid' },
    });
    fireEvent.change(screen.getByLabelText('Cookie value'), {
      target: { value: '123' },
    });
    fireEvent.click(screen.getByText('Add'));
    expect(onChange).toHaveBeenCalledWith([
      expect.objectContaining({
        domain: 'example.com',
        name: 'sid',
        value: '123',
        enabled: true,
      }),
    ]);
  });

  it('does not add empty cookies', () => {
    render(
      <CookieEditor
        cookies={[]}
        url="https://example.com/x"
        onChange={onChange}
      />
    );
    fireEvent.click(screen.getByText('Add'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('toggles and removes cookies', () => {
    render(
      <CookieEditor
        cookies={cookies}
        url="https://example.com/x"
        onChange={onChange}
      />
    );
    fireEvent.click(screen.getByLabelText('Toggle session'));
    expect(onChange).toHaveBeenCalledWith([
      expect.objectContaining({ id: '1', enabled: false }),
      expect.objectContaining({ id: '2' }),
    ]);

    fireEvent.click(screen.getByLabelText('Remove session'));
    expect(onChange).toHaveBeenCalledWith([
      expect.objectContaining({ id: '2' }),
    ]);
  });
});
