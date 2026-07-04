import { render, fireEvent, screen } from '@testing-library/react';
import { ImageConvertHeicToAvifModal } from '../ImageConvertHeicToAvifModal';

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

jest.mock('../ImageConvertHeicToAvifModal/utils', () => {
  try {
    const original = jest.requireActual('../ImageConvertHeicToAvifModal/utils');
    return { ...original, downloadBlob: jest.fn() };
  } catch {
    return { downloadBlob: jest.fn() };
  }
});

describe('ImageConvertHeicToAvifModal', () => {
  const onClose = jest.fn();
  beforeEach(() => {
    onClose.mockClear();
  });

  it('renders modal title', () => {
    render(<ImageConvertHeicToAvifModal onClose={onClose} />);
    expect(screen.getByText('HEIC to AVIF')).toBeInTheDocument();
  });

  it('renders dropzone', () => {
    render(<ImageConvertHeicToAvifModal onClose={onClose} />);
    expect(screen.getByTestId('dropzone')).toBeInTheDocument();
  });

  it('calls onClose when close is clicked', () => {
    render(<ImageConvertHeicToAvifModal onClose={onClose} />);
    fireEvent.click(screen.getByText('Close'));
    expect(onClose).toHaveBeenCalled();
  });
});
