import { render, fireEvent, screen } from '@testing-library/react';
import { ImageConvertPsdToPngModal } from '../ImageConvertPsdToPngModal';

jest.mock('@hieudoanm.github.io/components/atoms', () => ({
  Dropzone: ({ onFile }: any) => (
    <div data-testid="dropzone" onClick={() => onFile(new File([''], 'test'))}>
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

jest.mock('../ImageConvertPsdToPngModal/utils', () => {
  try {
    const original = jest.requireActual('../ImageConvertPsdToPngModal/utils');
    return { ...original, downloadBlob: jest.fn() };
  } catch {
    return { downloadBlob: jest.fn() };
  }
});

describe('ImageConvertPsdToPngModal', () => {
  const onClose = jest.fn();
  beforeEach(() => {
    onClose.mockClear();
  });

  it('renders modal title', () => {
    render(<ImageConvertPsdToPngModal onClose={onClose} />);
    expect(screen.getByText('PSD to PNG')).toBeInTheDocument();
  });

  it('renders dropzone', () => {
    render(<ImageConvertPsdToPngModal onClose={onClose} />);
    expect(screen.getByTestId('dropzone')).toBeInTheDocument();
  });

  it('calls onClose when close is clicked', () => {
    render(<ImageConvertPsdToPngModal onClose={onClose} />);
    fireEvent.click(screen.getByText('Close'));
    expect(onClose).toHaveBeenCalled();
  });
});
