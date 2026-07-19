import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ConfigEditor } from '../ConfigEditor';
import { emptyRequest } from '@/lib/http';
import { requestToJson } from '@/lib/request-file';

describe('ConfigEditor', () => {
  const onChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    URL.createObjectURL = jest.fn(
      () => 'blob:mock'
    ) as unknown as typeof URL.createObjectURL;
    URL.revokeObjectURL = jest.fn() as unknown as typeof URL.revokeObjectURL;
    HTMLAnchorElement.prototype.click = jest.fn();
  });

  it('updates the timeout', () => {
    render(<ConfigEditor request={emptyRequest()} onChange={onChange} />);
    fireEvent.change(screen.getByLabelText('Request timeout (ms)'), {
      target: { value: '5000' },
    });
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ timeoutMs: '5000' })
    );
  });

  it('updates the redirect mode', () => {
    render(<ConfigEditor request={emptyRequest()} onChange={onChange} />);
    fireEvent.change(screen.getByLabelText('Redirect mode'), {
      target: { value: 'manual' },
    });
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ redirect: 'manual' })
    );
  });

  it('exports the request as a JSON download', () => {
    render(<ConfigEditor request={emptyRequest()} onChange={onChange} />);
    fireEvent.click(screen.getByText('Export request'));
    expect(URL.createObjectURL).toHaveBeenCalledWith(expect.any(Blob));
    expect(HTMLAnchorElement.prototype.click).toHaveBeenCalled();
  });

  it('imports a request from a file', async () => {
    render(<ConfigEditor request={emptyRequest()} onChange={onChange} />);
    const file = new File(
      [requestToJson({ ...emptyRequest(), url: 'https://imp.com' })],
      'r.json',
      {
        type: 'application/json',
      }
    );
    const input = screen.getByLabelText('Import request file');
    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() =>
      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({ url: 'https://imp.com' })
      )
    );
  });

  it('opens the file picker when the import button is clicked', () => {
    render(<ConfigEditor request={emptyRequest()} onChange={onChange} />);
    const input = screen.getByLabelText('Import request file');
    const clickSpy = jest.spyOn(input, 'click').mockImplementation(() => {});
    fireEvent.click(screen.getByText('Import request'));
    expect(clickSpy).toHaveBeenCalled();
  });
});
