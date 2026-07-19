import { render, fireEvent, screen } from '@testing-library/react';
import { CsvToXml } from '../CsvToXmlModal';

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

jest.mock('../CsvToXmlModal/utils', () => {
  const original = jest.requireActual('../CsvToXmlModal/utils');
  return { ...original, downloadBlob: jest.fn() };
});

describe('CsvToXml', () => {
  const onClose = jest.fn();
  beforeEach(() => {
    onClose.mockClear();
  });

  it('renders modal title', () => {
    render(<CsvToXml onClose={onClose} />);
    expect(screen.getByText('CSV to XML')).toBeInTheDocument();
  });

  it('renders textarea for CSV input', () => {
    render(<CsvToXml onClose={onClose} />);
    expect(
      screen.getByPlaceholderText('Paste CSV data here...')
    ).toBeInTheDocument();
  });

  it('convert button is disabled when input is empty', () => {
    render(<CsvToXml onClose={onClose} />);
    expect(screen.getByText('Convert to XML')).toBeDisabled();
  });

  it('renders dropzone', () => {
    render(<CsvToXml onClose={onClose} />);
    expect(screen.getByTestId('dropzone')).toBeInTheDocument();
  });

  it('calls onClose when close is clicked', () => {
    render(<CsvToXml onClose={onClose} />);
    fireEvent.click(screen.getByText('Close'));
    expect(onClose).toHaveBeenCalled();
  });
});
