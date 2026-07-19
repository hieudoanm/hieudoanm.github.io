import { render, fireEvent, screen } from '@testing-library/react';
import { JsonToCsvModal } from '../JsonToCsvModal';

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

jest.mock('../JsonToCsvModal/utils', () => {
  const original = jest.requireActual('../JsonToCsvModal/utils');
  return { ...original, downloadBlob: jest.fn() };
});

describe('JsonToCsvModal', () => {
  const onClose = jest.fn();
  beforeEach(() => {
    onClose.mockClear();
  });

  it('renders modal title', () => {
    render(<JsonToCsvModal onClose={onClose} />);
    expect(screen.getByText('JSON to CSV')).toBeInTheDocument();
  });

  it('renders textarea for JSON input', () => {
    render(<JsonToCsvModal onClose={onClose} />);
    expect(
      screen.getByPlaceholderText(/Paste JSON array here/)
    ).toBeInTheDocument();
  });

  it('convert button is disabled when input is empty', () => {
    render(<JsonToCsvModal onClose={onClose} />);
    expect(screen.getByText('Convert to CSV')).toBeDisabled();
  });

  it('renders dropzone', () => {
    render(<JsonToCsvModal onClose={onClose} />);
    expect(screen.getByTestId('dropzone')).toBeInTheDocument();
  });

  it('calls onClose when close is clicked', () => {
    render(<JsonToCsvModal onClose={onClose} />);
    fireEvent.click(screen.getByText('Close'));
    expect(onClose).toHaveBeenCalled();
  });
});
