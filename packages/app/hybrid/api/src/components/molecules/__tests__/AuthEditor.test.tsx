import { render, screen, fireEvent } from '@testing-library/react';
import { emptyRequest } from '@/lib/http';
import { AuthEditor } from '../AuthEditor';
import { BodyEditor } from '../BodyEditor';

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
});

describe('BodyEditor', () => {
  const onChange = jest.fn();

  it('edits body text', () => {
    render(<BodyEditor body="" onChange={onChange} />);
    fireEvent.change(screen.getByLabelText('Request body'), {
      target: { value: '{"a":1}' },
    });
    expect(onChange).toHaveBeenCalledWith('{"a":1}');
  });

  it('beautifies json', () => {
    render(<BodyEditor body='{"a":1}' onChange={onChange} />);
    fireEvent.click(screen.getByText('Beautify JSON'));
    expect(onChange).toHaveBeenCalledWith('{\n  "a": 1\n}');
  });
});
