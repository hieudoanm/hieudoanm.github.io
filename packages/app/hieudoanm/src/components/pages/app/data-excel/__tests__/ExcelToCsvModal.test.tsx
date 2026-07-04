import { render, fireEvent, screen } from '@testing-library/react';
import { ExcelToCsvModal } from '../ExcelToCsvModal';

jest.mock('@hieudoanm.github.io/components/atoms', () => ({
  Dropzone: ({ onFile }: any) => (
    <div
      data-testid="dropzone"
      onClick={() => onFile(new File(['test'], 'test.xlsx'))}>
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

jest.mock('../ExcelToCsvModal/utils', () => {
  const original = jest.requireActual('../ExcelToCsvModal/utils');
  return { ...original, downloadBlob: jest.fn() };
});

describe('ExcelToCsvModal', () => {
  const onClose = jest.fn();
  beforeEach(() => {
    onClose.mockClear();
  });

  it('renders modal title', () => {
    render(<ExcelToCsvModal onClose={onClose} />);
    expect(screen.getByText('Excel to CSV')).toBeInTheDocument();
  });

  it('renders dropzone', () => {
    render(<ExcelToCsvModal onClose={onClose} />);
    expect(screen.getByTestId('dropzone')).toBeInTheDocument();
  });

  it('calls onClose when close is clicked', () => {
    render(<ExcelToCsvModal onClose={onClose} />);
    fireEvent.click(screen.getByText('Close'));
    expect(onClose).toHaveBeenCalled();
  });
});
