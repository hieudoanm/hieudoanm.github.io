import { render, fireEvent, screen } from '@testing-library/react';
import { ImageConvertWebpToJpgModal } from '../ImageConvertWebpToJpgModal';

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

jest.mock('../ImageConvertWebpToJpgModal/utils', () => {
  try {
    const original = jest.requireActual('../ImageConvertWebpToJpgModal/utils');
    return { ...original, downloadBlob: jest.fn() };
  } catch {
    return { downloadBlob: jest.fn() };
  }
});

describe('ImageConvertWebpToJpgModal', () => {
  const onClose = jest.fn();
  beforeEach(() => {
    onClose.mockClear();
  });

  it('renders modal title', () => {
    render(<ImageConvertWebpToJpgModal onClose={onClose} />);
    expect(screen.getByText('Convert WebP to JPG')).toBeInTheDocument();
  });

  it('renders dropzone', () => {
    render(<ImageConvertWebpToJpgModal onClose={onClose} />);
    expect(screen.getByTestId('dropzone')).toBeInTheDocument();
  });

  it('calls onClose when close is clicked', () => {
    render(<ImageConvertWebpToJpgModal onClose={onClose} />);
    fireEvent.click(screen.getByText('Close'));
    expect(onClose).toHaveBeenCalled();
  });
});
