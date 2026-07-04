import { render, fireEvent, screen } from '@testing-library/react';
import { ImageConvertWebpToGifModal } from '../ImageConvertWebpToGifModal';

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

jest.mock('../ImageConvertWebpToGifModal/utils', () => {
  try {
    const original = jest.requireActual('../ImageConvertWebpToGifModal/utils');
    return { ...original, downloadBlob: jest.fn() };
  } catch {
    return { downloadBlob: jest.fn() };
  }
});

describe('ImageConvertWebpToGifModal', () => {
  const onClose = jest.fn();
  beforeEach(() => {
    onClose.mockClear();
  });

  it('renders modal title', () => {
    render(<ImageConvertWebpToGifModal onClose={onClose} />);
    expect(screen.getByText('WebP to GIF')).toBeInTheDocument();
  });

  it('renders dropzone', () => {
    render(<ImageConvertWebpToGifModal onClose={onClose} />);
    expect(screen.getByTestId('dropzone')).toBeInTheDocument();
  });

  it('calls onClose when close is clicked', () => {
    render(<ImageConvertWebpToGifModal onClose={onClose} />);
    fireEvent.click(screen.getByText('Close'));
    expect(onClose).toHaveBeenCalled();
  });
});
