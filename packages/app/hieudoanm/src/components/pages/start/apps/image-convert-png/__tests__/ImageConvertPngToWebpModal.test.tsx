import { render, fireEvent, screen } from '@testing-library/react';
import { ImageConvertPngToWebpModal } from '../ImageConvertPngToWebpModal';

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

jest.mock('../ImageConvertPngToWebpModal/utils', () => {
  try {
    const original = jest.requireActual('../ImageConvertPngToWebpModal/utils');
    return { ...original, downloadBlob: jest.fn() };
  } catch {
    return { downloadBlob: jest.fn() };
  }
});

describe('ImageConvertPngToWebpModal', () => {
  const onClose = jest.fn();
  beforeEach(() => {
    onClose.mockClear();
  });

  it('renders modal title', () => {
    render(<ImageConvertPngToWebpModal onClose={onClose} />);
    expect(screen.getByText('Convert PNG to WebP')).toBeInTheDocument();
  });

  it('renders dropzone', () => {
    render(<ImageConvertPngToWebpModal onClose={onClose} />);
    expect(screen.getByTestId('dropzone')).toBeInTheDocument();
  });

  it('calls onClose when close is clicked', () => {
    render(<ImageConvertPngToWebpModal onClose={onClose} />);
    fireEvent.click(screen.getByText('Close'));
    expect(onClose).toHaveBeenCalled();
  });
});
