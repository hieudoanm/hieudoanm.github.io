import { fireEvent, render, screen } from '@testing-library/react';
import { ExportPanel } from '../ExportPanel';

jest.mock('@chess/ts', () => ({
  getMoves: () => [{ san: 'e4' }, { san: 'e5' }, { san: 'Nf3' }],
}));

const baseProps = {
  pgn: '',
  gifLoading: false,
  onExportPNG: jest.fn(),
  onExportGIF: jest.fn(),
};

describe('ExportPanel', () => {
  it('renders Export heading', () => {
    render(<ExportPanel {...baseProps} />);
    expect(screen.getByText('Export')).toBeInTheDocument();
  });

  it('renders FEN to PNG section', () => {
    render(<ExportPanel {...baseProps} />);
    expect(screen.getByText('FEN → PNG')).toBeInTheDocument();
    expect(
      screen.getByText('Snapshot current board position')
    ).toBeInTheDocument();
  });

  it('renders PGN to GIF section', () => {
    render(<ExportPanel {...baseProps} />);
    expect(screen.getByText('PGN → GIF')).toBeInTheDocument();
    expect(screen.getByText('Animate the game from PGN')).toBeInTheDocument();
  });

  it('shows placeholder when no PGN loaded', () => {
    render(<ExportPanel {...baseProps} />);
    expect(
      screen.getByText('Paste PGN in the Position tab first')
    ).toBeInTheDocument();
  });

  it('shows move count when PGN loaded', () => {
    render(<ExportPanel {...baseProps} pgn="1. e4 e5" />);
    expect(screen.getByText('3 moves loaded')).toBeInTheDocument();
  });

  it('disables GIF button when no PGN', () => {
    render(<ExportPanel {...baseProps} />);
    expect(
      screen.getByRole('button', { name: /download gif/i })
    ).toBeDisabled();
  });

  it('enables GIF button when PGN loaded and not loading', () => {
    render(<ExportPanel {...baseProps} pgn="1. e4 e5" />);
    expect(
      screen.getByRole('button', { name: /download gif/i })
    ).not.toBeDisabled();
  });

  it('shows loading spinner during GIF rendering', () => {
    render(<ExportPanel {...baseProps} pgn="1. e4 e5" gifLoading />);
    expect(screen.getByText('Rendering…')).toBeInTheDocument();
  });

  it('calls onExportPNG when PNG button clicked', () => {
    const onExportPNG = jest.fn();
    render(<ExportPanel {...baseProps} onExportPNG={onExportPNG} />);
    fireEvent.click(screen.getByRole('button', { name: /download png/i }));
    expect(onExportPNG).toHaveBeenCalled();
  });

  it('calls onExportGIF when GIF button clicked', () => {
    const onExportGIF = jest.fn();
    render(
      <ExportPanel {...baseProps} pgn="1. e4 e5" onExportGIF={onExportGIF} />
    );
    fireEvent.click(screen.getByRole('button', { name: /download gif/i }));
    expect(onExportGIF).toHaveBeenCalled();
  });

  it('to match snapshot', () => {
    const { container } = render(<ExportPanel {...baseProps} />);
    expect(container).toMatchSnapshot();
  });
});
