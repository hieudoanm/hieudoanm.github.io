import { render, fireEvent, screen } from '@testing-library/react';
import { CsvToExcelModal } from '../CsvToExcelModal';

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

jest.mock('../CsvToExcelModal/utils', () => {
  const original = jest.requireActual('../CsvToExcelModal/utils');
  return { ...original, downloadBlob: jest.fn() };
});

describe('CsvToExcelModal', () => {
  const onClose = jest.fn();
  beforeEach(() => {
    onClose.mockClear();
  });

  it('renders modal title', () => {
    render(<CsvToExcelModal onClose={onClose} />);
    expect(screen.getByText('CSV to Excel')).toBeInTheDocument();
  });

  it('renders dropzone', () => {
    render(<CsvToExcelModal onClose={onClose} />);
    expect(screen.getByTestId('dropzone')).toBeInTheDocument();
  });

  it('calls onClose when close is clicked', () => {
    render(<CsvToExcelModal onClose={onClose} />);
    fireEvent.click(screen.getByText('Close'));
    expect(onClose).toHaveBeenCalled();
  });
});
