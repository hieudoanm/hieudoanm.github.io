import { render, fireEvent, screen } from '@testing-library/react';
import { SplitExcel } from '../SplitExcelModal';

jest.mock('@hieudoanm.github.io/components/atoms', () => ({
  Dropzone: ({ onFile }: any) => (
    <div
      data-testid="dropzone"
      onClick={() => onFile(new File(['test'], 'test.xlsx'))}>
      Dropzone
    </div>
  ),
  FullScreen: ({ children, onClose, title }: any) => (
    <div>
      <h2>{title}</h2>
      {children}
      <button onClick={onClose}>Close</button>
    </div>
  ),
}));

jest.mock('../SplitExcelModal/utils', () => {
  const original = jest.requireActual('../SplitExcelModal/utils');
  return { ...original, downloadBlob: jest.fn() };
});

describe('SplitExcel', () => {
  const onClose = jest.fn();
  beforeEach(() => {
    onClose.mockClear();
  });

  it('renders modal title', () => {
    render(<SplitExcel onClose={onClose} />);
    expect(screen.getByText('Split Excel')).toBeInTheDocument();
  });

  it('renders rows per file input', () => {
    render(<SplitExcel onClose={onClose} />);
    expect(screen.getByText('Rows per file:')).toBeInTheDocument();
  });

  it('renders dropzone', () => {
    render(<SplitExcel onClose={onClose} />);
    expect(screen.getByTestId('dropzone')).toBeInTheDocument();
  });

  it('calls onClose when close is clicked', () => {
    render(<SplitExcel onClose={onClose} />);
    fireEvent.click(screen.getByText('Close'));
    expect(onClose).toHaveBeenCalled();
  });
});
