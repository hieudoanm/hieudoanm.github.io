import { render, screen } from '@testing-library/react';
import { PixelModal } from '../index';

describe('PixelModal', () => {
  it('renders the title', () => {
    render(<PixelModal onClose={jest.fn()} />);
    expect(screen.getByText('Pixel Art Grid')).toBeInTheDocument();
  });

  it('renders the subtitle', () => {
    render(<PixelModal onClose={jest.fn()} />);
    expect(screen.getByText('32×32')).toBeInTheDocument();
  });

  it('renders the dropzone', () => {
    render(<PixelModal onClose={jest.fn()} />);
    expect(
      screen.getByText('Drop an image here or click to browse')
    ).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(<PixelModal onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
});
