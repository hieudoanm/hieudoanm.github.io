import { render, screen, fireEvent } from '@testing-library/react';
import { StickerPicker } from '@/components/molecules/StickerPicker';

jest.mock('react-icons/fa', () => ({
  FaTimes: () => null,
  FaSearch: () => null,
}));

const defaultProps = {
  onSelect: jest.fn(),
  onClose: jest.fn(),
};

describe('StickerPicker', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders "Stickers" heading', () => {
    render(<StickerPicker {...defaultProps} />);
    const headings = screen.getAllByText('Stickers');
    const heading = headings.find((el) => el.tagName === 'H3');
    expect(heading).toBeInTheDocument();
  });

  it('shows Stickers and GIFs tabs', () => {
    render(<StickerPicker {...defaultProps} />);
    expect(screen.getByRole('tab', { name: 'Stickers' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'GIFs' })).toBeInTheDocument();
  });

  it('clicking a sticker calls onSelect with the emoji', () => {
    render(<StickerPicker {...defaultProps} />);
    const smiley = screen.getByText('😀');
    fireEvent.click(smiley);
    expect(defaultProps.onSelect).toHaveBeenCalledWith('😀');
  });

  it('switching to GIFs tab shows GIF images', () => {
    render(<StickerPicker {...defaultProps} />);
    fireEvent.click(screen.getByRole('tab', { name: 'GIFs' }));
    const images = screen.getAllByRole('img');
    expect(images.length).toBe(6);
  });

  it('clicking a GIF calls onSelect with the GIF URL', () => {
    render(<StickerPicker {...defaultProps} />);
    fireEvent.click(screen.getByRole('tab', { name: 'GIFs' }));
    const gifImage = screen.getByAltText('Thumbs up');
    fireEvent.click(gifImage.closest('button')!);
    expect(defaultProps.onSelect).toHaveBeenCalledWith(
      'https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif'
    );
  });

  it('close button calls onClose', () => {
    render(<StickerPicker {...defaultProps} />);
    fireEvent.click(screen.getByLabelText('Close'));
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('renders 5 sticker pack badges', () => {
    render(<StickerPicker {...defaultProps} />);
    expect(screen.getByText('Smileys')).toBeInTheDocument();
    expect(screen.getByText('Gestures')).toBeInTheDocument();
    expect(screen.getByText('Nature')).toBeInTheDocument();
    expect(screen.getByText('Food')).toBeInTheDocument();
    expect(screen.getByText('Objects')).toBeInTheDocument();
  });
});
