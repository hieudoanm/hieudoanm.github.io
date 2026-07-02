jest.mock('../../icons', () => ({
  IcoUpload: () => <span data-testid="ico-upload" />,
  IcoPlus: () => <span data-testid="ico-plus" />,
  IcoDatabase: () => <span data-testid="ico-database" />,
  IcoSave: () => <span data-testid="ico-save" />,
  IcoDownload: () => <span data-testid="ico-download" />,
}));

import { render, screen, fireEvent } from '@testing-library/react';
import { Topbar } from '../Topbar';

describe('Topbar', () => {
  const defaultProps = {
    loading: false,
    dbFileName: null,
    opfsFiles: [] as string[],
    dbInstance: false,
    onOpen: jest.fn(),
    onNewDb: jest.fn(),
    onLoadOpfs: jest.fn(),
    onSave: jest.fn(),
    onExport: jest.fn(),
  };

  it('renders Open .db button', () => {
    render(<Topbar {...defaultProps} />);
    expect(screen.getByText('Open .db')).toBeInTheDocument();
  });

  it('renders New DB button', () => {
    render(<Topbar {...defaultProps} />);
    expect(screen.getByText('New DB')).toBeInTheDocument();
  });

  it('shows db filename when provided', () => {
    render(<Topbar {...defaultProps} dbFileName="test.db" />);
    expect(screen.getByText('test.db')).toBeInTheDocument();
  });

  it('calls onOpen when Open button clicked', () => {
    const onOpen = jest.fn();
    render(<Topbar {...defaultProps} onOpen={onOpen} />);
    fireEvent.click(screen.getByText('Open .db'));
    expect(onOpen).toHaveBeenCalled();
  });

  it('calls onNewDb when New DB button clicked', () => {
    const onNewDb = jest.fn();
    render(<Topbar {...defaultProps} onNewDb={onNewDb} />);
    fireEvent.click(screen.getByText('New DB'));
    expect(onNewDb).toHaveBeenCalled();
  });

  it('disables New DB button when loading', () => {
    render(<Topbar {...defaultProps} loading={true} />);
    expect(screen.getByText('New DB').closest('button')).toBeDisabled();
  });

  it('disables Save and Export when no dbInstance', () => {
    render(<Topbar {...defaultProps} />);
    expect(screen.getByText('Save OPFS').closest('button')).toBeDisabled();
    expect(screen.getByText('Export .db').closest('button')).toBeDisabled();
  });

  it('shows OPFS dropdown when files exist', () => {
    render(<Topbar {...defaultProps} opfsFiles={['test.db']} />);
    expect(screen.getByText('OPFS (1)')).toBeInTheDocument();
  });

  it('calls onSave when Save button clicked', () => {
    const onSave = jest.fn();
    render(<Topbar {...defaultProps} dbInstance={true} onSave={onSave} />);
    fireEvent.click(screen.getByText('Save OPFS'));
    expect(onSave).toHaveBeenCalled();
  });

  it('calls onExport when Export button clicked', () => {
    const onExport = jest.fn();
    render(<Topbar {...defaultProps} dbInstance={true} onExport={onExport} />);
    fireEvent.click(screen.getByText('Export .db'));
    expect(onExport).toHaveBeenCalled();
  });

  it('calls onLoadOpfs when OPFS file item clicked', () => {
    const onLoadOpfs = jest.fn();
    render(
      <Topbar
        {...defaultProps}
        opfsFiles={['saved.db', 'backup.db']}
        onLoadOpfs={onLoadOpfs}
      />
    );
    expect(screen.getByText('OPFS (2)')).toBeInTheDocument();
    const fileLinks = screen.getAllByText(/saved\.db|backup\.db/);
    fireEvent.click(fileLinks[0]);
    expect(onLoadOpfs).toHaveBeenCalledWith('saved.db');
  });

  it('does not show OPFS dropdown when no files', () => {
    render(<Topbar {...defaultProps} opfsFiles={[]} />);
    expect(screen.queryByText(/OPFS \(\d+\)/)).not.toBeInTheDocument();
    expect(screen.getByText('Save OPFS')).toBeInTheDocument();
  });
});
