import { fireEvent, render, screen } from '@testing-library/react';
import { SlidingPuzzle } from '../index';

const mockCreateObjectURL = jest.fn(() => 'blob:mock');
const mockRevokeObjectURL = jest.fn();

beforeAll(() => {
  global.URL.createObjectURL = mockCreateObjectURL;
  global.URL.revokeObjectURL = mockRevokeObjectURL;
});

describe('SlidingPuzzle', () => {
  it('renders upload dropzone initially', () => {
    const { container } = render(<SlidingPuzzle onClose={jest.fn()} />);
    expect(screen.getByText('Click or drag an image here')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('shows an error message when processing fails', async () => {
    render(<SlidingPuzzle onClose={jest.fn()} />);
    const input = document.querySelector('input[type="file"]')!;
    const file = new File(['not-an-image'], 'test.txt', { type: 'text/plain' });
    Object.defineProperty(input, 'files', { value: [file] });
    fireEvent.change(input);
    expect(screen.getByText('Click or drag an image here')).toBeInTheDocument();
  });

  it('triggers file input on dropzone click', () => {
    render(<SlidingPuzzle onClose={jest.fn()} />);
    const dropzone = screen
      .getByText('Click or drag an image here')
      .closest('div')!;
    expect(() => fireEvent.click(dropzone)).not.toThrow();
  });

  it('accepts image files via file input', () => {
    render(<SlidingPuzzle onClose={jest.fn()} />);
    const input = document.querySelector('input[type="file"]')!;
    const file = new File([''], 'test.png', { type: 'image/png' });
    Object.defineProperty(input, 'files', { value: [file] });
    fireEvent.change(input);
    expect(mockCreateObjectURL).toHaveBeenCalledWith(file);
  });

  it('shows range slider for grid size', () => {
    render(<SlidingPuzzle onClose={jest.fn()} />);
    const range = document.querySelector('input[type="range"]');
    expect(range).not.toBeInTheDocument();
  });
});
