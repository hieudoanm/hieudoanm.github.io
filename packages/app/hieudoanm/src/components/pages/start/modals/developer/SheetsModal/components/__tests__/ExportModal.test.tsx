jest.mock('../../icons', () => ({
  IcoCheck: () => <span data-testid="ico-check" />,
  IcoCopy: () => <span data-testid="ico-copy" />,
  IcoDownload: () => <span data-testid="ico-download" />,
  IcoX: () => <span data-testid="ico-x" />,
}));

import { render, screen, fireEvent } from '@testing-library/react';
import { ExportModal } from '../ExportModal';
import { CellVal } from '../../types';

const columns = ['id', 'name', 'email'];
const rows: CellVal[][] = [
  [1, 'Alice', 'alice@test.com'],
  [2, 'Bob', 'bob@test.com'],
];

describe('ExportModal', () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: { writeText: jest.fn().mockResolvedValue(undefined) },
    });
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders table name in title', () => {
    render(
      <ExportModal
        tableName="users"
        columns={columns}
        rows={rows}
        onClose={jest.fn()}
      />
    );
    expect(screen.getByText('users')).toBeInTheDocument();
  });

  it('renders row and column counts', () => {
    render(
      <ExportModal
        tableName="users"
        columns={columns}
        rows={rows}
        onClose={jest.fn()}
      />
    );
    expect(screen.getByText(/2 rows/)).toBeInTheDocument();
    expect(screen.getByText(/3 cols/)).toBeInTheDocument();
  });

  it('renders format buttons', () => {
    render(
      <ExportModal
        tableName="users"
        columns={columns}
        rows={rows}
        onClose={jest.fn()}
      />
    );
    expect(screen.getByText('CSV')).toBeInTheDocument();
    expect(screen.getByText('JSON')).toBeInTheDocument();
    expect(screen.getByText('Markdown')).toBeInTheDocument();
    expect(screen.getByText('SQL INSERT')).toBeInTheDocument();
  });

  it('renders CSV content by default', () => {
    render(
      <ExportModal
        tableName="users"
        columns={columns}
        rows={rows}
        onClose={jest.fn()}
      />
    );
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveValue();
    expect(textarea.textContent).toContain('id,name,email');
  });

  it('switches format when clicking format buttons', () => {
    render(
      <ExportModal
        tableName="users"
        columns={columns}
        rows={rows}
        onClose={jest.fn()}
      />
    );
    fireEvent.click(screen.getByText('JSON'));
    const textarea = screen.getByRole('textbox');
    expect(textarea.textContent).toContain('"id"');
  });

  it('calls onClose when backdrop clicked', () => {
    const onClose = jest.fn();
    render(
      <ExportModal
        tableName="users"
        columns={columns}
        rows={rows}
        onClose={onClose}
      />
    );
    const backdrop = screen.getByText('users').closest('.fixed')!;
    fireEvent.click(backdrop);
    expect(onClose).toHaveBeenCalled();
  });

  it('copies content to clipboard', async () => {
    render(
      <ExportModal
        tableName="users"
        columns={columns}
        rows={rows}
        onClose={jest.fn()}
      />
    );
    fireEvent.click(screen.getByText('Copy'));
    await screen.findByText('Copied!');
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });

  it('downloads file when download button clicked', () => {
    URL.createObjectURL = jest.fn().mockReturnValue('blob:url');
    URL.revokeObjectURL = jest.fn();
    const clickSpy = jest.fn();
    const origCreateElement = document.createElement.bind(document);
    jest
      .spyOn(document, 'createElement')
      .mockImplementation((tagName: string) => {
        if (tagName === 'a') {
          return { href: '', download: '', click: clickSpy } as any;
        }
        return origCreateElement(tagName);
      });

    render(
      <ExportModal
        tableName="users"
        columns={columns}
        rows={rows}
        onClose={jest.fn()}
      />
    );
    const downloadBtn = screen.getByText(/Download/);
    fireEvent.click(downloadBtn);
    expect(clickSpy).toHaveBeenCalled();
    jest.restoreAllMocks();
  });
});
