import { render, screen, fireEvent } from '@testing-library/react';
import { emptyRequest } from '@/lib/http';
import { AuthEditor } from '../AuthEditor';

describe('AuthEditor', () => {
  const onChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows no auth inputs by default', () => {
    render(<AuthEditor request={emptyRequest()} onChange={onChange} />);
    expect(screen.queryByLabelText('Bearer token')).not.toBeInTheDocument();
  });

  it('switches to bearer and shows token input', () => {
    render(<AuthEditor request={emptyRequest()} onChange={onChange} />);
    fireEvent.change(screen.getByLabelText('Auth type'), {
      target: { value: 'bearer' },
    });
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ authType: 'bearer' })
    );
  });

  it('updates token', () => {
    const request = { ...emptyRequest(), authType: 'bearer' as const };
    render(<AuthEditor request={request} onChange={onChange} />);
    fireEvent.change(screen.getByLabelText('Bearer token'), {
      target: { value: 'tok' },
    });
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ token: 'tok' })
    );
  });

  it('shows basic auth fields', () => {
    const request = { ...emptyRequest(), authType: 'basic' as const };
    render(<AuthEditor request={request} onChange={onChange} />);
    expect(screen.getByLabelText('Basic username')).toBeInTheDocument();
    expect(screen.getByLabelText('Basic password')).toBeInTheDocument();
  });

  it('updates basic auth credentials', () => {
    const request = { ...emptyRequest(), authType: 'basic' as const };
    render(<AuthEditor request={request} onChange={onChange} />);
    fireEvent.change(screen.getByLabelText('Basic username'), {
      target: { value: 'user' },
    });
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ username: 'user' })
    );
    fireEvent.change(screen.getByLabelText('Basic password'), {
      target: { value: 'pass' },
    });
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ password: 'pass' })
    );
  });
});
