import { render, fireEvent, screen } from '@testing-library/react';
import { ImageConvertJpgToGifModal } from '../ImageConvertJpgToGifModal';

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

jest.mock('../ImageConvertJpgToGifModal/utils', () => {
  try {
    const original = jest.requireActual('../ImageConvertJpgToGifModal/utils');
    return { ...original, downloadBlob: jest.fn() };
  } catch {
    return { downloadBlob: jest.fn() };
  }
});

describe('ImageConvertJpgToGifModal', () => {
  const onClose = jest.fn();
  beforeEach(() => {
    onClose.mockClear();
  });

  it('renders modal title', () => {
    render(<ImageConvertJpgToGifModal onClose={onClose} />);
    expect(screen.getByText('JPG to GIF')).toBeInTheDocument();
  });

  it('renders dropzone', () => {
    render(<ImageConvertJpgToGifModal onClose={onClose} />);
    expect(screen.getByTestId('dropzone')).toBeInTheDocument();
  });

  it('calls onClose when close is clicked', () => {
    render(<ImageConvertJpgToGifModal onClose={onClose} />);
    fireEvent.click(screen.getByText('Close'));
    expect(onClose).toHaveBeenCalled();
  });
});
