import { render, fireEvent, screen } from '@testing-library/react';
import { CsvToJson } from '../CsvToJsonModal';

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

jest.mock('../CsvToJsonModal/utils', () => {
  const original = jest.requireActual('../CsvToJsonModal/utils');
  return { ...original, downloadBlob: jest.fn() };
});

describe('CsvToJson', () => {
  const onClose = jest.fn();
  beforeEach(() => {
    onClose.mockClear();
  });

  it('renders modal title', () => {
    render(<CsvToJson onClose={onClose} />);
    expect(screen.getByText('CSV to JSON')).toBeInTheDocument();
  });

  it('renders textarea for CSV input', () => {
    render(<CsvToJson onClose={onClose} />);
    expect(
      screen.getByPlaceholderText('Paste CSV data here...')
    ).toBeInTheDocument();
  });

  it('convert button is disabled when input is empty', () => {
    render(<CsvToJson onClose={onClose} />);
    expect(screen.getByText('Convert to JSON')).toBeDisabled();
  });

  it('convert button is enabled with input', () => {
    render(<CsvToJson onClose={onClose} />);
    fireEvent.change(screen.getByPlaceholderText('Paste CSV data here...'), {
      target: { value: 'a,b\n1,2' },
    });
    expect(screen.getByText('Convert to JSON')).not.toBeDisabled();
  });

  it('renders dropzone', () => {
    render(<CsvToJson onClose={onClose} />);
    expect(screen.getByTestId('dropzone')).toBeInTheDocument();
  });

  it('calls onClose when close is clicked', () => {
    render(<CsvToJson onClose={onClose} />);
    fireEvent.click(screen.getByText('Close'));
    expect(onClose).toHaveBeenCalled();
  });
});
