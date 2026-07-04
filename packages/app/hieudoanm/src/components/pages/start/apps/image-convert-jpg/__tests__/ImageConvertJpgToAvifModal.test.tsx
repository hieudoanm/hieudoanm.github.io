import { render, fireEvent, screen } from '@testing-library/react';
import { ImageConvertJpgToAvifModal } from '../ImageConvertJpgToAvifModal';

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

jest.mock('../ImageConvertJpgToAvifModal/utils', () => {
  try {
    const original = jest.requireActual('../ImageConvertJpgToAvifModal/utils');
    return { ...original, downloadBlob: jest.fn() };
  } catch {
    return { downloadBlob: jest.fn() };
  }
});

describe('ImageConvertJpgToAvifModal', () => {
  const onClose = jest.fn();
  beforeEach(() => {
    onClose.mockClear();
  });

  it('renders modal title', () => {
    render(<ImageConvertJpgToAvifModal onClose={onClose} />);
    expect(screen.getByText('JPG to AVIF')).toBeInTheDocument();
  });

  it('renders dropzone', () => {
    render(<ImageConvertJpgToAvifModal onClose={onClose} />);
    expect(screen.getByTestId('dropzone')).toBeInTheDocument();
  });

  it('calls onClose when close is clicked', () => {
    render(<ImageConvertJpgToAvifModal onClose={onClose} />);
    fireEvent.click(screen.getByText('Close'));
    expect(onClose).toHaveBeenCalled();
  });
});
