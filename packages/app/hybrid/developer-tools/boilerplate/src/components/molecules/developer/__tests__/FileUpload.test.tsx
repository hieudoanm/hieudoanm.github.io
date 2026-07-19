import { fireEvent, render, screen } from '@testing-library/react';
import { FileUpload } from '../FileUpload';

describe('FileUpload', () => {
  it('renders the drop zone with a browse button', () => {
    render(<FileUpload />);
    expect(screen.getByText('Upload files')).toBeInTheDocument();
    expect(screen.getByText('Browse')).toBeInTheDocument();
  });

  it('adds files from the file input', () => {
    const onChange = jest.fn();
    render(<FileUpload onFilesChange={onChange} />);
    const file = new File(['report'], 'report.pdf', {
      type: 'application/pdf',
    });
    fireEvent.change(screen.getByLabelText('Upload files'), {
      target: { files: [file] },
    });
    expect(screen.getByText('report.pdf')).toBeInTheDocument();
    expect(onChange).toHaveBeenCalledWith([
      expect.objectContaining({ name: 'report.pdf' }),
    ]);
  });

  it('adds files on drop and highlights while dragging', () => {
    render(<FileUpload />);
    const zone = screen.getByText('Upload files').parentElement as HTMLElement;
    fireEvent.dragOver(zone);
    expect(zone.className).toContain('border-primary');
    fireEvent.dragLeave(zone);
    expect(zone.className).not.toContain('border-primary');
    const dataTransfer = {
      files: [new File(['content'], 'notes.txt', { type: 'text/plain' })],
    } as unknown as DataTransfer;
    fireEvent.drop(zone, { dataTransfer });
    expect(screen.getByText('notes.txt')).toBeInTheDocument();
  });

  it('replaces files in single mode and appends in multiple mode', () => {
    const onChange = jest.fn();
    const { rerender } = render(<FileUpload onFilesChange={onChange} />);
    const input = screen.getByLabelText('Upload files');
    fireEvent.change(input, {
      target: { files: [new File(['a'], 'a.txt')] },
    });
    fireEvent.change(input, {
      target: { files: [new File(['b'], 'b.txt')] },
    });
    expect(screen.queryByText('a.txt')).not.toBeInTheDocument();
    expect(screen.getByText('b.txt')).toBeInTheDocument();

    rerender(<FileUpload onFilesChange={onChange} multiple />);
    fireEvent.change(screen.getByLabelText('Upload files'), {
      target: { files: [new File(['a'], 'a.txt')] },
    });
    fireEvent.change(screen.getByLabelText('Upload files'), {
      target: { files: [new File(['c'], 'c.txt')] },
    });
    expect(screen.getByText('a.txt')).toBeInTheDocument();
    expect(screen.getByText('c.txt')).toBeInTheDocument();
  });

  it('filters files over the max size', () => {
    render(<FileUpload maxSize={10} />);
    const file = new File(['this is a much larger file'], 'big.txt');
    fireEvent.change(screen.getByLabelText('Upload files'), {
      target: { files: [file] },
    });
    expect(screen.queryByText('big.txt')).not.toBeInTheDocument();
  });

  it('removes a file from the list', () => {
    const onChange = jest.fn();
    render(<FileUpload onFilesChange={onChange} multiple />);
    const input = screen.getByLabelText('Upload files');
    fireEvent.change(input, {
      target: { files: [new File(['a'], 'a.txt'), new File(['b'], 'b.txt')] },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Remove a.txt' }));
    expect(screen.queryByText('a.txt')).not.toBeInTheDocument();
    expect(screen.getByText('b.txt')).toBeInTheDocument();
    expect(onChange).toHaveBeenLastCalledWith([
      expect.objectContaining({ name: 'b.txt' }),
    ]);
  });
});
