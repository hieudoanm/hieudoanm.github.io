import { render, fireEvent, screen } from '@testing-library/react';
import { XmlToExcel } from '../XmlToExcelModal';

jest.mock('@hieudoanm.github.io/components/atoms', () => ({
  Dropzone: ({ onFile }: any) => (
    <div
      data-testid="dropzone"
      onClick={() => onFile(new File(['<r><a>1</a></r>'], 'test.xml'))}>
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

jest.mock('../XmlToExcelModal/utils', () => {
  const original = jest.requireActual('../XmlToExcelModal/utils');
  return { ...original, downloadBlob: jest.fn() };
});

describe('XmlToExcel', () => {
  const onClose = jest.fn();
  beforeEach(() => {
    onClose.mockClear();
  });

  it('renders modal title', () => {
    render(<XmlToExcel onClose={onClose} />);
    expect(screen.getByText('XML to Excel')).toBeInTheDocument();
  });

  it('renders dropzone', () => {
    render(<XmlToExcel onClose={onClose} />);
    expect(screen.getByTestId('dropzone')).toBeInTheDocument();
  });

  it('calls onClose when close is clicked', () => {
    render(<XmlToExcel onClose={onClose} />);
    fireEvent.click(screen.getByText('Close'));
    expect(onClose).toHaveBeenCalled();
  });
});
