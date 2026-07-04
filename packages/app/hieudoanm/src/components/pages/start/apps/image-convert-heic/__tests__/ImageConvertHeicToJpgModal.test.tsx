import { render, fireEvent, screen } from '@testing-library/react';
import { ImageConvertHeicToJpgModal } from '../ImageConvertHeicToJpgModal';

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

jest.mock('../ImageConvertHeicToJpgModal/utils', () => {
  try {
    const original = jest.requireActual('../ImageConvertHeicToJpgModal/utils');
    return { ...original, downloadBlob: jest.fn() };
  } catch {
    return { downloadBlob: jest.fn() };
  }
});

describe('ImageConvertHeicToJpgModal', () => {
  const onClose = jest.fn();
  beforeEach(() => {
    onClose.mockClear();
  });

  it('renders modal title', () => {
    render(<ImageConvertHeicToJpgModal onClose={onClose} />);
    expect(screen.getByText('Convert HEIC to JPG')).toBeInTheDocument();
  });

  it('renders dropzone', () => {
    render(<ImageConvertHeicToJpgModal onClose={onClose} />);
    expect(screen.getByTestId('dropzone')).toBeInTheDocument();
  });

  it('calls onClose when close is clicked', () => {
    render(<ImageConvertHeicToJpgModal onClose={onClose} />);
    fireEvent.click(screen.getByText('Close'));
    expect(onClose).toHaveBeenCalled();
  });
});
