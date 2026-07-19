import { render, fireEvent, screen } from '@testing-library/react';
import { SplitCsv } from '../SplitCsvModal';

jest.mock('@hieudoanm.github.io/components/atoms', () => ({
  Dropzone: ({ onFile }: any) => (
    <div
      data-testid="dropzone"
      onClick={() => onFile(new File(['a,b\n1,2'], 'test.csv'))}>
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

jest.mock('../SplitCsvModal/utils', () => {
  const original = jest.requireActual('../SplitCsvModal/utils');
  return { ...original, downloadBlob: jest.fn() };
});

describe('SplitCsv', () => {
  const onClose = jest.fn();
  beforeEach(() => {
    onClose.mockClear();
  });

  it('renders modal title', () => {
    render(<SplitCsv onClose={onClose} />);
    expect(screen.getByText('Split CSV')).toBeInTheDocument();
  });

  it('renders rows per file input', () => {
    render(<SplitCsv onClose={onClose} />);
    expect(screen.getByText('Rows per file:')).toBeInTheDocument();
  });

  it('renders dropzone', () => {
    render(<SplitCsv onClose={onClose} />);
    expect(screen.getByTestId('dropzone')).toBeInTheDocument();
  });

  it('calls onClose when close is clicked', () => {
    render(<SplitCsv onClose={onClose} />);
    fireEvent.click(screen.getByText('Close'));
    expect(onClose).toHaveBeenCalled();
  });
});
