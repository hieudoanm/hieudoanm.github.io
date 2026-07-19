import { fireEvent, render, screen } from '@testing-library/react';
import { FilesTemplate } from '../FilesTemplate';

describe('FilesTemplate', () => {
  it('renders the file table sorted by name', () => {
    render(<FilesTemplate />);
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(5);
    expect(rows[1]).toHaveTextContent('invoice.pdf');
    expect(rows[1]).toHaveTextContent('file');
    expect(rows[1]).toHaveTextContent('245 KB');
    expect(rows[4]).toHaveTextContent('reports');
    expect(rows[4]).toHaveTextContent('—');
  });

  it('uploads a new file row', () => {
    render(<FilesTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Upload' }));
    expect(screen.getByText('uploaded.txt')).toBeInTheDocument();
    expect(screen.getByText('12 KB')).toBeInTheDocument();
    expect(screen.getByText('Just now')).toBeInTheDocument();
    expect(screen.getAllByRole('row')).toHaveLength(6);
  });

  it('filters files by name and shows an empty state', () => {
    render(<FilesTemplate />);
    fireEvent.change(screen.getByPlaceholderText('Search files...'), {
      target: { value: 'readme' },
    });
    expect(screen.getByText('readme.txt')).toBeInTheDocument();
    expect(screen.queryByText('invoice.pdf')).not.toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText('Search files...'), {
      target: { value: 'zzz' },
    });
    expect(screen.getByText('No files')).toBeInTheDocument();
  });

  it('sorts files by size then back to name', () => {
    render(<FilesTemplate />);
    fireEvent.change(screen.getByLabelText('Sort by'), {
      target: { value: 'size' },
    });
    let rows = screen.getAllByRole('row');
    expect(rows[1]).toHaveTextContent('readme.txt');
    expect(rows[2]).toHaveTextContent('invoice.pdf');
    expect(rows[4]).toHaveTextContent('reports');
    fireEvent.change(screen.getByLabelText('Sort by'), {
      target: { value: 'name' },
    });
    rows = screen.getAllByRole('row');
    expect(rows[1]).toHaveTextContent('invoice.pdf');
  });
});
