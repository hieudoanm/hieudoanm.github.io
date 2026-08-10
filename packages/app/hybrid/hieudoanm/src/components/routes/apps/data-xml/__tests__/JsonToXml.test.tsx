import { render, fireEvent, screen } from '@testing-library/react';
import { JsonToXml } from '../JsonToXml';

jest.mock('@hieudoanm.github.io/components/atoms', () => ({
  Dropzone: ({ onFile }: any) => (
    <div
      data-testid="dropzone"
      onClick={() => onFile(new File(['[{"a":1}]'], 'test.json'))}>
      Dropzone
    </div>
  ),
}));

jest.mock('../JsonToXml/utils', () => {
  const original = jest.requireActual('../JsonToXml/utils');
  return { ...original, downloadBlob: jest.fn() };
});

describe('JsonToXml', () => {
  const onClose = jest.fn();
  beforeEach(() => {
    onClose.mockClear();
  });

  it('renders textarea for JSON input', () => {
    render(<JsonToXml onClose={onClose} />);
    expect(
      screen.getByPlaceholderText(/Paste JSON array here/)
    ).toBeInTheDocument();
  });

  it('convert button is disabled when input is empty', () => {
    render(<JsonToXml onClose={onClose} />);
    expect(screen.getByText('Convert to XML')).toBeDisabled();
  });

  it('renders dropzone', () => {
    render(<JsonToXml onClose={onClose} />);
    expect(screen.getByTestId('dropzone')).toBeInTheDocument();
  });
});
