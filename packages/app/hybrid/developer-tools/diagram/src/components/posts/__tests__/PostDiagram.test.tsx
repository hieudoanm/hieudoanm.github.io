import { fireEvent, render, screen } from '@testing-library/react';
import PostDiagram from '@/components/posts/PostDiagram';
import { downloadSvg } from '@/lib/export';

jest.mock('@/components/editor/Canvas', () => ({
  __esModule: true,
  default: () => <div>mock-canvas</div>,
}));

jest.mock('@/lib/export', () => ({
  downloadSvg: jest.fn(),
}));

const VALID = 'title: Demo\nnode a: Alpha\nnode b: Beta\nedge a -> b: go';

describe('PostDiagram', () => {
  it('renders the canvas for a valid diagram', () => {
    render(<PostDiagram text={VALID} name="Demo Post" />);
    expect(screen.getByText('mock-canvas')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Diagram' })
    ).toBeInTheDocument();
  });

  it('exports the svg with the diagram title', () => {
    render(<PostDiagram text={VALID} name="Demo Post" />);
    fireEvent.click(screen.getByRole('button', { name: 'Export SVG' }));
    expect(downloadSvg).toHaveBeenCalledWith(
      expect.anything(),
      'Demo',
      'Demo Post'
    );
  });

  it('shows parse errors instead of the canvas for invalid text', () => {
    render(
      <PostDiagram text="this is not a diagram line" name="Broken Post" />
    );
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.queryByText('mock-canvas')).not.toBeInTheDocument();
  });
});
