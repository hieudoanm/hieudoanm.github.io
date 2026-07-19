import { render, screen, fireEvent } from '@testing-library/react';
import { emptyRequest } from '@/lib/http';
import { RequestTabs } from '../RequestTabs';

describe('RequestTabs', () => {
  const onChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all tabs', () => {
    render(<RequestTabs request={emptyRequest()} onChange={onChange} />);
    expect(screen.getByText('Params')).toBeInTheDocument();
    expect(screen.getByText('Headers')).toBeInTheDocument();
    expect(screen.getByText('Body')).toBeInTheDocument();
    expect(screen.getByText('Auth')).toBeInTheDocument();
  });

  it('shows params editor by default', () => {
    render(<RequestTabs request={emptyRequest()} onChange={onChange} />);
    expect(screen.getByLabelText('Query parameter key')).toBeInTheDocument();
  });

  it('switches to headers', () => {
    render(<RequestTabs request={emptyRequest()} onChange={onChange} />);
    fireEvent.click(screen.getByText('Headers'));
    expect(screen.getByLabelText('Header key')).toBeInTheDocument();
  });

  it('switches to body editor', () => {
    render(<RequestTabs request={emptyRequest()} onChange={onChange} />);
    fireEvent.click(screen.getByText('Body'));
    expect(screen.getByLabelText('Request body')).toBeInTheDocument();
  });

  it('shows the form data editor for form bodies', () => {
    const request = { ...emptyRequest(), bodyType: 'form' as const };
    render(<RequestTabs request={request} onChange={onChange} />);
    fireEvent.click(screen.getByText('Body'));
    expect(screen.getByText('Add field')).toBeInTheDocument();
  });

  it('shows the graphql editor for graphql bodies', () => {
    const request = { ...emptyRequest(), bodyType: 'graphql' as const };
    render(<RequestTabs request={request} onChange={onChange} />);
    fireEvent.click(screen.getByText('Body'));
    expect(screen.getByLabelText('GraphQL query')).toBeInTheDocument();
  });

  it('passes file changes from the body editor', () => {
    const onFilesChange = jest.fn();
    const request = {
      ...emptyRequest(),
      bodyType: 'form' as const,
      formData: [{ id: '1', key: 'f', value: '', enabled: true }],
    };
    render(
      <RequestTabs
        request={request}
        onChange={onChange}
        onFilesChange={onFilesChange}
      />
    );
    fireEvent.click(screen.getByText('Body'));
    const file = new File(['abc'], 'data.txt', { type: 'text/plain' });
    fireEvent.change(screen.getAllByLabelText('Attach file')[0], {
      target: { files: [file] },
    });
    expect(onFilesChange).toHaveBeenCalledWith({ '1': file });
  });

  it('switches to auth editor', () => {
    render(<RequestTabs request={emptyRequest()} onChange={onChange} />);
    fireEvent.click(screen.getByText('Auth'));
    expect(screen.getByLabelText('Auth type')).toHaveValue('none');
  });

  it('updates params from the params tab', () => {
    render(<RequestTabs request={emptyRequest()} onChange={onChange} />);
    fireEvent.change(screen.getByLabelText('Query parameter key'), {
      target: { value: 'q' },
    });
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ params: expect.any(Array) })
    );
  });

  it('updates headers from the headers tab', () => {
    render(<RequestTabs request={emptyRequest()} onChange={onChange} />);
    fireEvent.click(screen.getByText('Headers'));
    fireEvent.change(screen.getByLabelText('Header key'), {
      target: { value: 'X-K' },
    });
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ headers: expect.any(Array) })
    );
  });

  it('updates the body from the body tab', () => {
    render(<RequestTabs request={emptyRequest()} onChange={onChange} />);
    fireEvent.click(screen.getByText('Body'));
    fireEvent.change(screen.getByLabelText('Request body'), {
      target: { value: '{"a":1}' },
    });
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ body: '{"a":1}' })
    );
  });

  it('updates auth from the auth tab', () => {
    render(<RequestTabs request={emptyRequest()} onChange={onChange} />);
    fireEvent.click(screen.getByText('Auth'));
    fireEvent.change(screen.getByLabelText('Auth type'), {
      target: { value: 'bearer' },
    });
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ authType: 'bearer' })
    );
  });

  it('renders the env, config and code tabs', () => {
    render(<RequestTabs request={emptyRequest()} onChange={onChange} />);
    expect(screen.getByText('Env')).toBeInTheDocument();
    expect(screen.getByText('Config')).toBeInTheDocument();
    expect(screen.getByText('Code')).toBeInTheDocument();
  });

  it('edits environment variables', () => {
    const onEnvChange = jest.fn();
    render(
      <RequestTabs
        request={emptyRequest()}
        onChange={onChange}
        env={[{ id: '1', key: 'host', value: 'x', enabled: true }]}
        onEnvChange={onEnvChange}
      />
    );
    fireEvent.click(screen.getByText('Env'));
    fireEvent.change(screen.getByLabelText('Environment variable key'), {
      target: { value: 'baseUrl' },
    });
    expect(onEnvChange).toHaveBeenCalledWith([
      expect.objectContaining({ key: 'baseUrl' }),
    ]);
  });

  it('edits request config', () => {
    render(<RequestTabs request={emptyRequest()} onChange={onChange} />);
    fireEvent.click(screen.getByText('Config'));
    fireEvent.change(screen.getByLabelText('Request timeout (ms)'), {
      target: { value: '1000' },
    });
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ timeoutMs: '1000' })
    );
  });

  it('shows the code generator', () => {
    render(
      <RequestTabs
        request={{ ...emptyRequest(), url: 'https://api.example.com/users' }}
        onChange={onChange}
      />
    );
    fireEvent.click(screen.getByText('Code'));
    expect(
      screen.getByText(/curl -X GET 'https:\/\/api.example.com\/users'/)
    ).toBeInTheDocument();
  });
});
