import { render, fireEvent, screen } from '@testing-library/react';
import { AiUpscaleModal } from '../AiUpscaleModal';

jest.mock('@hieudoanm.github.io/components/atoms', () => ({
  Dropzone: ({ onFile }: any) => (
    <div
      data-testid="dropzone"
      onClick={() => onFile(new File([''], 'test.png', { type: 'image/png' }))}>
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

jest.mock('../AiUpscaleModal/utils', () => {
  const original = jest.requireActual('../AiUpscaleModal/utils');
  return { ...original, downloadBlob: jest.fn() };
});

describe('AiUpscaleModal', () => {
  const onClose = jest.fn();
  beforeEach(() => {
    onClose.mockClear();
  });

  it('renders modal title', () => {
    render(<AiUpscaleModal onClose={onClose} />);
    expect(screen.getByText('Upscale')).toBeInTheDocument();
  });

  it('renders dropzone', () => {
    render(<AiUpscaleModal onClose={onClose} />);
    expect(screen.getByTestId('dropzone')).toBeInTheDocument();
  });

  it('renders algorithm toggle buttons', () => {
    render(<AiUpscaleModal onClose={onClose} />);
    expect(screen.getByText('Bilinear')).toBeInTheDocument();
    expect(screen.getByText('Nearest')).toBeInTheDocument();
  });

  it('calls onClose when close is clicked', () => {
    render(<AiUpscaleModal onClose={onClose} />);
    fireEvent.click(screen.getByText('Close'));
    expect(onClose).toHaveBeenCalled();
  });
});
