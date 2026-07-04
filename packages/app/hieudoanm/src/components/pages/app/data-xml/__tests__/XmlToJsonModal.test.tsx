import { render, fireEvent, screen } from '@testing-library/react';
import { XmlToJsonModal } from '../XmlToJsonModal';

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

jest.mock('../XmlToJsonModal/utils', () => {
  const original = jest.requireActual('../XmlToJsonModal/utils');
  return { ...original, downloadBlob: jest.fn() };
});

describe('XmlToJsonModal', () => {
  const onClose = jest.fn();
  beforeEach(() => {
    onClose.mockClear();
  });

  it('renders modal title', () => {
    render(<XmlToJsonModal onClose={onClose} />);
    expect(screen.getByText('XML to JSON')).toBeInTheDocument();
  });

  it('renders dropzone', () => {
    render(<XmlToJsonModal onClose={onClose} />);
    expect(screen.getByTestId('dropzone')).toBeInTheDocument();
  });

  it('calls onClose when close is clicked', () => {
    render(<XmlToJsonModal onClose={onClose} />);
    fireEvent.click(screen.getByText('Close'));
    expect(onClose).toHaveBeenCalled();
  });
});
