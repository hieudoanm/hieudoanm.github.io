import { render, fireEvent, screen } from '@testing-library/react';
import { ExcelToXml } from '../ExcelToXmlModal';

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

jest.mock('../ExcelToXmlModal/utils', () => {
  const original = jest.requireActual('../ExcelToXmlModal/utils');
  return { ...original, downloadBlob: jest.fn() };
});

describe('ExcelToXml', () => {
  const onClose = jest.fn();
  beforeEach(() => {
    onClose.mockClear();
  });

  it('renders modal title', () => {
    render(<ExcelToXml onClose={onClose} />);
    expect(screen.getByText('Excel to XML')).toBeInTheDocument();
  });

  it('renders dropzone', () => {
    render(<ExcelToXml onClose={onClose} />);
    expect(screen.getByTestId('dropzone')).toBeInTheDocument();
  });

  it('calls onClose when close is clicked', () => {
    render(<ExcelToXml onClose={onClose} />);
    fireEvent.click(screen.getByText('Close'));
    expect(onClose).toHaveBeenCalled();
  });
});
