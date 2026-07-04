import { render, fireEvent, screen } from '@testing-library/react';
import { ImageConvertPngToJpgModal } from '../ImageConvertPngToJpgModal';

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

jest.mock('../ImageConvertPngToJpgModal/utils', () => {
  try {
    const original = jest.requireActual('../ImageConvertPngToJpgModal/utils');
    return { ...original, downloadBlob: jest.fn() };
  } catch {
    return { downloadBlob: jest.fn() };
  }
});

describe('ImageConvertPngToJpgModal', () => {
  const onClose = jest.fn();
  beforeEach(() => {
    onClose.mockClear();
  });

  it('renders modal title', () => {
    render(<ImageConvertPngToJpgModal onClose={onClose} />);
    expect(screen.getByText('Convert PNG to JPG')).toBeInTheDocument();
  });

  it('renders dropzone', () => {
    render(<ImageConvertPngToJpgModal onClose={onClose} />);
    expect(screen.getByTestId('dropzone')).toBeInTheDocument();
  });

  it('calls onClose when close is clicked', () => {
    render(<ImageConvertPngToJpgModal onClose={onClose} />);
    fireEvent.click(screen.getByText('Close'));
    expect(onClose).toHaveBeenCalled();
  });
});
