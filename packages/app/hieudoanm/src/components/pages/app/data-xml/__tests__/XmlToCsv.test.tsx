import { render, fireEvent, screen } from '@testing-library/react';
import { XmlToCsv } from '../XmlToCsvModal';

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

jest.mock('../XmlToCsvModal/utils', () => {
  const original = jest.requireActual('../XmlToCsvModal/utils');
  return { ...original, downloadBlob: jest.fn() };
});

describe('XmlToCsv', () => {
  const onClose = jest.fn();
  beforeEach(() => {
    onClose.mockClear();
  });

  it('renders modal title', () => {
    render(<XmlToCsv onClose={onClose} />);
    expect(screen.getByText('XML to CSV')).toBeInTheDocument();
  });

  it('renders dropzone', () => {
    render(<XmlToCsv onClose={onClose} />);
    expect(screen.getByTestId('dropzone')).toBeInTheDocument();
  });

  it('calls onClose when close is clicked', () => {
    render(<XmlToCsv onClose={onClose} />);
    fireEvent.click(screen.getByText('Close'));
    expect(onClose).toHaveBeenCalled();
  });
});
