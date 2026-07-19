import { render, fireEvent, screen } from '@testing-library/react';
import { CsvToXml } from '../CsvToXml';

jest.mock('@hieudoanm.github.io/components/atoms', () => ({
  Dropzone: ({ onFile }: any) => (
    <div
      data-testid="dropzone"
      onClick={() => onFile(new File(['a,b\n1,2'], 'test.csv'))}>
      Dropzone
    </div>
  ),
}));

jest.mock('../CsvToXml/utils', () => {
  const original = jest.requireActual('../CsvToXml/utils');
  return { ...original, downloadBlob: jest.fn() };
});

describe('CsvToXml', () => {
  const onClose = jest.fn();
  beforeEach(() => {
    onClose.mockClear();
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
});
