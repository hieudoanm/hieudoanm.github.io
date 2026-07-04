import { render, fireEvent, screen } from '@testing-library/react';
import { ImageConvertJpgToWebpModal } from '../ImageConvertJpgToWebpModal';

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

jest.mock('../ImageConvertJpgToWebpModal/utils', () => {
  try {
    const original = jest.requireActual('../ImageConvertJpgToWebpModal/utils');
    return { ...original, downloadBlob: jest.fn() };
  } catch {
    return { downloadBlob: jest.fn() };
  }
});

describe('ImageConvertJpgToWebpModal', () => {
  const onClose = jest.fn();
  beforeEach(() => {
    onClose.mockClear();
  });

  it('renders modal title', () => {
    render(<ImageConvertJpgToWebpModal onClose={onClose} />);
    expect(screen.getByText('Convert JPG to WebP')).toBeInTheDocument();
  });

  it('renders dropzone', () => {
    render(<ImageConvertJpgToWebpModal onClose={onClose} />);
    expect(screen.getByTestId('dropzone')).toBeInTheDocument();
  });

  it('calls onClose when close is clicked', () => {
    render(<ImageConvertJpgToWebpModal onClose={onClose} />);
    fireEvent.click(screen.getByText('Close'));
    expect(onClose).toHaveBeenCalled();
  });
});
