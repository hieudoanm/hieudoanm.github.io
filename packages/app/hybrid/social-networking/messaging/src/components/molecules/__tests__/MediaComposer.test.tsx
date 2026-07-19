import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MediaComposer } from '@/components/molecules/MediaComposer';

jest.mock('react-icons/fa', () => ({
  FaImage: () => <span data-testid="icon-image" />,
  FaVideo: () => <span data-testid="icon-video" />,
  FaFile: () => <span data-testid="icon-file" />,
  FaMicrophone: () => <span data-testid="icon-mic" />,
  FaSmile: () => <span data-testid="icon-smile" />,
}));

const defaultProps = {
  onImageSelect: jest.fn(),
  onVideoSelect: jest.fn(),
  onFileSelect: jest.fn(),
  onVoiceRecord: jest.fn(),
  onStickerToggle: jest.fn(),
};

describe('MediaComposer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all 5 buttons', () => {
    render(<MediaComposer {...defaultProps} />);
    expect(screen.getByLabelText('Send image')).toBeInTheDocument();
    expect(screen.getByLabelText('Send video')).toBeInTheDocument();
    expect(screen.getByLabelText('Send file')).toBeInTheDocument();
    expect(screen.getByLabelText('Voice message')).toBeInTheDocument();
    expect(screen.getByLabelText('Stickers')).toBeInTheDocument();
  });

  it('calls onVoiceRecord when voice button is clicked', () => {
    render(<MediaComposer {...defaultProps} />);
    fireEvent.click(screen.getByLabelText('Voice message'));
    expect(defaultProps.onVoiceRecord).toHaveBeenCalledTimes(1);
  });

  it('calls onStickerToggle when sticker button is clicked', () => {
    render(<MediaComposer {...defaultProps} />);
    fireEvent.click(screen.getByLabelText('Stickers'));
    expect(defaultProps.onStickerToggle).toHaveBeenCalledTimes(1);
  });

  it('triggers the hidden file input when image button is clicked', () => {
    render(<MediaComposer {...defaultProps} />);
    const fileInput = document.querySelector(
      'input[type="file"][accept="image/*"]'
    ) as HTMLInputElement;
    expect(fileInput).toBeInTheDocument();
    expect(fileInput).toHaveClass('hidden');

    const clickSpy = jest.spyOn(fileInput, 'click');
    fireEvent.click(screen.getByLabelText('Send image'));
    expect(clickSpy).toHaveBeenCalled();
    clickSpy.mockRestore();
  });

  it('triggers the hidden file input when video button is clicked', () => {
    render(<MediaComposer {...defaultProps} />);
    const fileInput = document.querySelector(
      'input[type="file"][accept="video/*"]'
    ) as HTMLInputElement;
    const clickSpy = jest.spyOn(fileInput, 'click');
    fireEvent.click(screen.getByLabelText('Send video'));
    expect(clickSpy).toHaveBeenCalled();
    clickSpy.mockRestore();
  });

  it('triggers the hidden file input when file button is clicked', () => {
    render(<MediaComposer {...defaultProps} />);
    const fileInputs = document.querySelectorAll('input[type="file"]');
    const fileInput = fileInputs[2] as HTMLInputElement;
    const clickSpy = jest.spyOn(fileInput, 'click');
    fireEvent.click(screen.getByLabelText('Send file'));
    expect(clickSpy).toHaveBeenCalled();
    clickSpy.mockRestore();
  });

  it('calls onImageSelect when image file is selected', () => {
    render(<MediaComposer {...defaultProps} />);
    const fileInput = document.querySelector(
      'input[type="file"][accept="image/*"]'
    ) as HTMLInputElement;
    const file = new File(['test'], 'test.png', { type: 'image/png' });
    Object.defineProperty(fileInput, 'files', {
      value: [file],
      configurable: true,
    });
    fireEvent.change(fileInput);
    expect(defaultProps.onImageSelect).toHaveBeenCalledWith(file);
  });

  it('calls onVideoSelect when video file is selected', () => {
    render(<MediaComposer {...defaultProps} />);
    const fileInput = document.querySelector(
      'input[type="file"][accept="video/*"]'
    ) as HTMLInputElement;
    const file = new File(['test'], 'test.mp4', { type: 'video/mp4' });
    Object.defineProperty(fileInput, 'files', {
      value: [file],
      configurable: true,
    });
    fireEvent.change(fileInput);
    expect(defaultProps.onVideoSelect).toHaveBeenCalledWith(file);
  });

  it('calls onFileSelect when file is selected', () => {
    render(<MediaComposer {...defaultProps} />);
    const fileInputs = document.querySelectorAll('input[type="file"]');
    const fileInput = fileInputs[2] as HTMLInputElement;
    const file = new File(['test'], 'test.pdf', { type: 'application/pdf' });
    Object.defineProperty(fileInput, 'files', {
      value: [file],
      configurable: true,
    });
    fireEvent.change(fileInput);
    expect(defaultProps.onFileSelect).toHaveBeenCalledWith(file);
  });

  it('does not call onImageSelect when no file is selected', () => {
    render(<MediaComposer {...defaultProps} />);
    const fileInput = document.querySelector(
      'input[type="file"][accept="image/*"]'
    ) as HTMLInputElement;
    fireEvent.change(fileInput);
    expect(defaultProps.onImageSelect).not.toHaveBeenCalled();
  });

  it('does not call onVideoSelect when no file is selected', () => {
    render(<MediaComposer {...defaultProps} />);
    const fileInput = document.querySelector(
      'input[type="file"][accept="video/*"]'
    ) as HTMLInputElement;
    fireEvent.change(fileInput);
    expect(defaultProps.onVideoSelect).not.toHaveBeenCalled();
  });

  it('does not call onFileSelect when no file is selected', () => {
    render(<MediaComposer {...defaultProps} />);
    const fileInputs = document.querySelectorAll('input[type="file"]');
    const fileInput = fileInputs[2] as HTMLInputElement;
    fireEvent.change(fileInput);
    expect(defaultProps.onFileSelect).not.toHaveBeenCalled();
  });
});
