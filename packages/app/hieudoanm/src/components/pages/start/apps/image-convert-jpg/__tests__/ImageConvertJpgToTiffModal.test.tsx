import { render, fireEvent, screen } from '@testing-library/react';
import { ImageConvertJpgToTiffModal } from '../ImageConvertJpgToTiffModal';

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

jest.mock('../ImageConvertJpgToTiffModal/utils', () => {
  try {
    const original = jest.requireActual('../ImageConvertJpgToTiffModal/utils');
    return { ...original, downloadBlob: jest.fn() };
  } catch {
    return { downloadBlob: jest.fn() };
  }
});

describe('ImageConvertJpgToTiffModal', () => {
  const onClose = jest.fn();
  beforeEach(() => {
    onClose.mockClear();
  });

  it('renders modal title', () => {
    render(<ImageConvertJpgToTiffModal onClose={onClose} />);
    expect(screen.getByText('JPG to TIFF')).toBeInTheDocument();
  });

  it('renders dropzone', () => {
    render(<ImageConvertJpgToTiffModal onClose={onClose} />);
    expect(screen.getByTestId('dropzone')).toBeInTheDocument();
  });

  it('calls onClose when close is clicked', () => {
    render(<ImageConvertJpgToTiffModal onClose={onClose} />);
    fireEvent.click(screen.getByText('Close'));
    expect(onClose).toHaveBeenCalled();
  });
});
