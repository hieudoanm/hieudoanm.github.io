import { render, fireEvent, screen } from '@testing-library/react';
import { AiGenerateModal } from '../AiGenerateModal';

jest.mock('@hieudoanm.github.io/components/atoms/FullScreen', () => ({
  FullScreen: ({ children, onClose, title }: any) => (
    <div>
      <h2>{title}</h2>
      {children}
      <button onClick={onClose}>Close</button>
    </div>
  ),
}));

jest.mock('../AiGenerateModal/utils', () => ({
  STYLES: ['Realistic', 'Cartoon', 'Watercolor'],
  SIZES: ['512×512', '1024×1024'],
  ASPECTS: ['1:1', '16:9'],
  downloadBlob: jest.fn(),
  generatePattern: jest.fn(),
}));

describe('AiGenerateModal', () => {
  const onClose = jest.fn();
  beforeEach(() => {
    onClose.mockClear();
  });

  it('renders modal title', () => {
    render(<AiGenerateModal onClose={onClose} />);
    expect(screen.getByText('AI Generate')).toBeInTheDocument();
  });

  it('renders prompt textarea', () => {
    render(<AiGenerateModal onClose={onClose} />);
    expect(
      screen.getByPlaceholderText(/describe the image/i)
    ).toBeInTheDocument();
  });

  it('generate button is disabled when prompt is empty', () => {
    render(<AiGenerateModal onClose={onClose} />);
    expect(screen.getByText('Generate')).toBeDisabled();
  });

  it('generate button is enabled with prompt', () => {
    render(<AiGenerateModal onClose={onClose} />);
    fireEvent.change(screen.getByPlaceholderText(/describe the image/i), {
      target: { value: 'test prompt' },
    });
    expect(screen.getByText('Generate')).not.toBeDisabled();
  });

  it('renders style selection buttons', () => {
    render(<AiGenerateModal onClose={onClose} />);
    expect(screen.getByText('Realistic')).toBeInTheDocument();
    expect(screen.getByText('Cartoon')).toBeInTheDocument();
  });

  it('calls onClose when close is clicked', () => {
    render(<AiGenerateModal onClose={onClose} />);
    fireEvent.click(screen.getByText('Close'));
    expect(onClose).toHaveBeenCalled();
  });
});
