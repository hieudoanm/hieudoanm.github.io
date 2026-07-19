import { render, screen, fireEvent } from '@testing-library/react';
import { emptyRequest } from '@/lib/http';
import { BodyEditor } from '../BodyEditor';

describe('BodyEditor', () => {
  const onChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('edits body text', () => {
    render(<BodyEditor request={emptyRequest()} onChange={onChange} />);
    fireEvent.change(screen.getByLabelText('Request body'), {
      target: { value: '{"a":1}' },
    });
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ body: '{"a":1}' })
    );
  });

  it('beautifies json', () => {
    const request = { ...emptyRequest(), body: '{"a":1}' };
    render(<BodyEditor request={request} onChange={onChange} />);
    fireEvent.click(screen.getByText('Beautify JSON'));
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ body: '{\n  "a": 1\n}' })
    );
  });

  it('shows the form data editor', () => {
    const request = { ...emptyRequest(), bodyType: 'form' as const };
    render(<BodyEditor request={request} onChange={onChange} />);
    fireEvent.click(screen.getByText('Add field'));
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        bodyType: 'form',
        formData: expect.any(Array),
      })
    );
  });

  it('edits urlencoded fields', () => {
    const request = { ...emptyRequest(), bodyType: 'urlencoded' as const };
    render(<BodyEditor request={request} onChange={onChange} />);
    expect(screen.getByPlaceholderText('Value')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Add row'));
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ bodyType: 'urlencoded' })
    );
  });

  it('shows the graphql editor', () => {
    const request = { ...emptyRequest(), bodyType: 'graphql' as const };
    render(<BodyEditor request={request} onChange={onChange} />);
    fireEvent.change(screen.getByLabelText('GraphQL query'), {
      target: { value: 'query { viewer }' },
    });
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ graphqlQuery: 'query { viewer }' })
    );
  });

  it('switches body types via the tabs', () => {
    render(<BodyEditor request={emptyRequest()} onChange={onChange} />);
    fireEvent.click(screen.getByText('Form Data'));
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ bodyType: 'form' })
    );
    fireEvent.click(screen.getByText('GraphQL'));
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ bodyType: 'graphql' })
    );
  });

  it('forwards files changes from the form editor', () => {
    const onFilesChange = jest.fn();
    const request = {
      ...emptyRequest(),
      bodyType: 'form' as const,
      formData: [{ id: '1', key: 'f', value: '', enabled: true }],
    };
    render(
      <BodyEditor
        request={request}
        onChange={onChange}
        onFilesChange={onFilesChange}
      />
    );
    const file = new File(['abc'], 'data.txt', { type: 'text/plain' });
    fireEvent.change(screen.getAllByLabelText('Attach file')[0], {
      target: { files: [file] },
    });
    expect(onFilesChange).toHaveBeenCalledWith({ '1': file });
  });
});
