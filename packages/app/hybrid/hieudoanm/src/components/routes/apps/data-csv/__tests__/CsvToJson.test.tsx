import { render, fireEvent, screen } from '@testing-library/react';
import { CsvToJson } from '../CsvToJson';

jest.mock('@hieudoanm.github.io/components/atoms', () => ({
  Dropzone: ({ onFile }: any) => (
    <div
      data-testid="dropzone"
      onClick={() => onFile(new File(['a,b\n1,2'], 'test.csv'))}>
      Dropzone
    </div>
  ),
}));

jest.mock('../CsvToJson/utils', () => {
  const original = jest.requireActual('../CsvToJson/utils');
  return { ...original, downloadBlob: jest.fn() };
});

describe('CsvToJson', () => {
  const onClose = jest.fn();
  beforeEach(() => {
    onClose.mockClear();
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
});
