import { render, screen, fireEvent } from '@testing-library/react';
import { emptyRequest } from '@/lib/http';
import { RequestComposer } from '../RequestComposer';

describe('RequestComposer', () => {
  const onChange = jest.fn();
  const onSend = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders method, url and send button', () => {
    render(
      <RequestComposer
        request={emptyRequest()}
        loading={false}
        onChange={onChange}
        onSend={onSend}
      />
    );
    expect(screen.getByLabelText('HTTP method')).toHaveValue('GET');
    expect(screen.getByLabelText('Request URL')).toHaveValue('');
    expect(screen.getByText('Send')).toBeInTheDocument();
  });

  it('changes method', () => {
    render(
      <RequestComposer
        request={emptyRequest()}
        loading={false}
        onChange={onChange}
        onSend={onSend}
      />
    );
    fireEvent.change(screen.getByLabelText('HTTP method'), {
      target: { value: 'POST' },
    });
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ method: 'POST' })
    );
  });

  it('updates url on change', () => {
    render(
      <RequestComposer
        request={emptyRequest()}
        loading={false}
        onChange={onChange}
        onSend={onSend}
      />
    );
    fireEvent.change(screen.getByLabelText('Request URL'), {
      target: { value: 'https://a.com' },
    });
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ url: 'https://a.com' })
    );
  });

  it('sends on enter in url field', () => {
    render(
      <RequestComposer
        request={emptyRequest()}
        loading={false}
        onChange={onChange}
        onSend={onSend}
      />
    );
    fireEvent.keyDown(screen.getByLabelText('Request URL'), { key: 'Enter' });
    expect(onSend).toHaveBeenCalled();
  });

  it('sends on button click', () => {
    render(
      <RequestComposer
        request={emptyRequest()}
        loading={false}
        onChange={onChange}
        onSend={onSend}
      />
    );
    fireEvent.click(screen.getByText('Send'));
    expect(onSend).toHaveBeenCalled();
  });

  it('shows sending state and disables button', () => {
    render(
      <RequestComposer
        request={emptyRequest()}
        loading={true}
        onChange={onChange}
        onSend={onSend}
      />
    );
    expect(screen.getByText('Sending')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sending/ })).toBeDisabled();
  });
});
