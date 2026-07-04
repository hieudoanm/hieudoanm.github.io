import { render, fireEvent, screen } from '@testing-library/react';
import { ImageConvertWebpToAvifModal } from '../ImageConvertWebpToAvifModal';

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

jest.mock('../ImageConvertWebpToAvifModal/utils', () => {
  try {
    const original = jest.requireActual('../ImageConvertWebpToAvifModal/utils');
    return { ...original, downloadBlob: jest.fn() };
  } catch {
    return { downloadBlob: jest.fn() };
  }
});

describe('ImageConvertWebpToAvifModal', () => {
  const onClose = jest.fn();
  beforeEach(() => {
    onClose.mockClear();
  });

  it('renders modal title', () => {
    render(<ImageConvertWebpToAvifModal onClose={onClose} />);
    expect(screen.getByText('WebP to AVIF')).toBeInTheDocument();
  });

  it('renders dropzone', () => {
    render(<ImageConvertWebpToAvifModal onClose={onClose} />);
    expect(screen.getByTestId('dropzone')).toBeInTheDocument();
  });

  it('calls onClose when close is clicked', () => {
    render(<ImageConvertWebpToAvifModal onClose={onClose} />);
    fireEvent.click(screen.getByText('Close'));
    expect(onClose).toHaveBeenCalled();
  });
});
