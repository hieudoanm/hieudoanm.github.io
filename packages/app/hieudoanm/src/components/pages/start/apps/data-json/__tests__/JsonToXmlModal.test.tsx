import { render, fireEvent, screen } from '@testing-library/react';
import { JsonToXmlModal } from '../JsonToXmlModal';

jest.mock('@hieudoanm.github.io/components/atoms', () => ({
  Dropzone: ({ onFile }: any) => (
    <div
      data-testid="dropzone"
      onClick={() => onFile(new File(['[{"a":1}]'], 'test.json'))}>
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

jest.mock('../JsonToXmlModal/utils', () => {
  const original = jest.requireActual('../JsonToXmlModal/utils');
  return { ...original, downloadBlob: jest.fn() };
});

describe('JsonToXmlModal', () => {
  const onClose = jest.fn();
  beforeEach(() => {
    onClose.mockClear();
  });

  it('renders modal title', () => {
    render(<JsonToXmlModal onClose={onClose} />);
    expect(screen.getByText('JSON to XML')).toBeInTheDocument();
  });

  it('renders textarea for JSON input', () => {
    render(<JsonToXmlModal onClose={onClose} />);
    expect(
      screen.getByPlaceholderText(/Paste JSON array here/)
    ).toBeInTheDocument();
  });

  it('convert button is disabled when input is empty', () => {
    render(<JsonToXmlModal onClose={onClose} />);
    expect(screen.getByText('Convert to XML')).toBeDisabled();
  });

  it('renders dropzone', () => {
    render(<JsonToXmlModal onClose={onClose} />);
    expect(screen.getByTestId('dropzone')).toBeInTheDocument();
  });

  it('calls onClose when close is clicked', () => {
    render(<JsonToXmlModal onClose={onClose} />);
    fireEvent.click(screen.getByText('Close'));
    expect(onClose).toHaveBeenCalled();
  });
});
