import { render, fireEvent, screen } from '@testing-library/react';
import { ExcelToPdf } from '../ExcelToPdfModal';

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

describe('ExcelToPdf', () => {
  const onClose = jest.fn();
  beforeEach(() => {
    onClose.mockClear();
  });

  it('renders modal title', () => {
    render(<ExcelToPdf onClose={onClose} />);
    expect(screen.getByText('Excel to PDF')).toBeInTheDocument();
  });

  it('renders dropzone', () => {
    render(<ExcelToPdf onClose={onClose} />);
    expect(screen.getByTestId('dropzone')).toBeInTheDocument();
  });

  it('calls onClose when close is clicked', () => {
    render(<ExcelToPdf onClose={onClose} />);
    fireEvent.click(screen.getByText('Close'));
    expect(onClose).toHaveBeenCalled();
  });
});
