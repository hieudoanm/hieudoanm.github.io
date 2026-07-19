import { render, fireEvent, screen } from '@testing-library/react';
import { ExcelToPdfModal } from '../ExcelToPdfModal';

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

jest.mock('../ExcelToPdfModal/utils', () => {
  const original = jest.requireActual('../ExcelToPdfModal/utils');
  return { ...original, downloadBlob: jest.fn() };
});

describe('ExcelToPdfModal', () => {
  const onClose = jest.fn();
  beforeEach(() => {
    onClose.mockClear();
  });

  it('renders modal title', () => {
    render(<ExcelToPdfModal onClose={onClose} />);
    expect(screen.getByText('Excel to PDF')).toBeInTheDocument();
  });

  it('renders dropzone', () => {
    render(<ExcelToPdfModal onClose={onClose} />);
    expect(screen.getByTestId('dropzone')).toBeInTheDocument();
  });

  it('calls onClose when close is clicked', () => {
    render(<ExcelToPdfModal onClose={onClose} />);
    fireEvent.click(screen.getByText('Close'));
    expect(onClose).toHaveBeenCalled();
  });
});
