import { render, fireEvent, screen } from '@testing-library/react';
import { JsonToCsv } from '../JsonToCsv';

jest.mock('@hieudoanm.github.io/components/atoms', () => ({
  Dropzone: ({ onFile }: any) => (
    <div
      data-testid="dropzone"
      onClick={() => onFile(new File(['[{"a":1}]'], 'test.json'))}>
      Dropzone
    </div>
  ),
}));

jest.mock('../JsonToCsv/utils', () => {
  const original = jest.requireActual('../JsonToCsv/utils');
  return { ...original, downloadBlob: jest.fn() };
});

describe('JsonToCsv', () => {
  const onClose = jest.fn();
  beforeEach(() => {
    onClose.mockClear();
  });

  it('renders textarea for JSON input', () => {
    render(<JsonToCsv onClose={onClose} />);
    expect(
      screen.getByPlaceholderText(/Paste JSON array here/)
    ).toBeInTheDocument();
  });

  it('convert button is disabled when input is empty', () => {
    render(<JsonToCsv onClose={onClose} />);
    expect(screen.getByText('Convert to CSV')).toBeDisabled();
  });

  it('renders dropzone', () => {
    render(<JsonToCsv onClose={onClose} />);
    expect(screen.getByTestId('dropzone')).toBeInTheDocument();
  });
});
