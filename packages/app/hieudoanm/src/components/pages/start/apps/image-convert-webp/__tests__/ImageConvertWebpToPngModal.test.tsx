import { render, fireEvent, screen } from '@testing-library/react';
import { ImageConvertWebpToPngModal } from '../ImageConvertWebpToPngModal';

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

jest.mock('../ImageConvertWebpToPngModal/utils', () => {
  try {
    const original = jest.requireActual('../ImageConvertWebpToPngModal/utils');
    return { ...original, downloadBlob: jest.fn() };
  } catch {
    return { downloadBlob: jest.fn() };
  }
});

describe('ImageConvertWebpToPngModal', () => {
  const onClose = jest.fn();
  beforeEach(() => {
    onClose.mockClear();
  });

  it('renders modal title', () => {
    render(<ImageConvertWebpToPngModal onClose={onClose} />);
    expect(screen.getByText('Convert WebP to PNG')).toBeInTheDocument();
  });

  it('renders dropzone', () => {
    render(<ImageConvertWebpToPngModal onClose={onClose} />);
    expect(screen.getByTestId('dropzone')).toBeInTheDocument();
  });

  it('calls onClose when close is clicked', () => {
    render(<ImageConvertWebpToPngModal onClose={onClose} />);
    fireEvent.click(screen.getByText('Close'));
    expect(onClose).toHaveBeenCalled();
  });
});
