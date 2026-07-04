import { render, fireEvent, screen } from '@testing-library/react';
import { AiRemoveWatermarkModal } from '../AiRemoveWatermarkModal';

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

jest.mock('../AiRemoveWatermarkModal/utils', () => {
  const original = jest.requireActual('../AiRemoveWatermarkModal/utils');
  return { ...original, downloadBlob: jest.fn() };
});

describe('AiRemoveWatermarkModal', () => {
  const onClose = jest.fn();
  beforeEach(() => {
    onClose.mockClear();
  });

  it('renders modal title', () => {
    render(<AiRemoveWatermarkModal onClose={onClose} />);
    expect(
      screen.getByRole('heading', { name: /remove watermark/i })
    ).toBeInTheDocument();
  });

  it('renders dropzone', () => {
    render(<AiRemoveWatermarkModal onClose={onClose} />);
    expect(screen.getByTestId('dropzone')).toBeInTheDocument();
  });

  it('calls onClose when close is clicked', () => {
    render(<AiRemoveWatermarkModal onClose={onClose} />);
    fireEvent.click(screen.getByText('Close'));
    expect(onClose).toHaveBeenCalled();
  });
});
