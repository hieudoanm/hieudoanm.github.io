import { render, fireEvent, screen } from '@testing-library/react';
import { ImageConvertPngToGifModal } from '../ImageConvertPngToGifModal';

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

jest.mock('../ImageConvertPngToGifModal/utils', () => {
  try {
    const original = jest.requireActual('../ImageConvertPngToGifModal/utils');
    return { ...original, downloadBlob: jest.fn() };
  } catch {
    return { downloadBlob: jest.fn() };
  }
});

describe('ImageConvertPngToGifModal', () => {
  const onClose = jest.fn();
  beforeEach(() => {
    onClose.mockClear();
  });

  it('renders modal title', () => {
    render(<ImageConvertPngToGifModal onClose={onClose} />);
    expect(screen.getByText('PNG to GIF')).toBeInTheDocument();
  });

  it('renders dropzone', () => {
    render(<ImageConvertPngToGifModal onClose={onClose} />);
    expect(screen.getByTestId('dropzone')).toBeInTheDocument();
  });

  it('calls onClose when close is clicked', () => {
    render(<ImageConvertPngToGifModal onClose={onClose} />);
    fireEvent.click(screen.getByText('Close'));
    expect(onClose).toHaveBeenCalled();
  });
});
