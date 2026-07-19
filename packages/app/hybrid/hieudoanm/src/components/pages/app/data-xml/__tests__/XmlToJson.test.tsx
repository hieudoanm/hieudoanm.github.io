import { render, fireEvent, screen } from '@testing-library/react';
import { XmlToJson } from '../XmlToJsonModal';

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

describe('XmlToJson', () => {
  const onClose = jest.fn();
  beforeEach(() => {
    onClose.mockClear();
  });

  it('renders modal title', () => {
    render(<XmlToJson onClose={onClose} />);
    expect(screen.getByText('XML to JSON')).toBeInTheDocument();
  });

  it('renders dropzone', () => {
    render(<XmlToJson onClose={onClose} />);
    expect(screen.getByTestId('dropzone')).toBeInTheDocument();
  });

  it('calls onClose when close is clicked', () => {
    render(<XmlToJson onClose={onClose} />);
    fireEvent.click(screen.getByText('Close'));
    expect(onClose).toHaveBeenCalled();
  });
});
