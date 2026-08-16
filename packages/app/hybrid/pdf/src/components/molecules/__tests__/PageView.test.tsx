import { render, screen } from '@testing-library/react';
import PageView from '@/components/molecules/PageView';

const basePage = {
  id: 'p1',
  documentId: 'doc1',
  pageNumber: 1,
  width: 595,
  height: 842,
  rotation: 0,
  textBlocks: [
    {
      id: 'tb1',
      x: 40,
      y: 60,
      width: 300,
      height: 20,
      content: 'Hello',
      fontSize: 12,
      fontFamily: 'sans-serif',
      bold: false,
      italic: false,
      color: '#1a1a1a',
    },
  ],
  images: [],
  labels: 'Page 1',
};

const annotation = {
  id: 'ann1',
  documentId: 'doc1',
  pageNumber: 1,
  type: 'sticky-note' as const,
  color: '#facc15',
  x: 10,
  y: 10,
  width: 100,
  height: 30,
  content: 'Note text',
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

describe('PageView molecule', () => {
  it('renders without interactivity when no click handler is provided', () => {
    render(<PageView page={basePage} zoom={100} />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Page 1' })).toBeNull();
  });

  it('applies a rotation transform when rotation is set', () => {
    render(<PageView page={basePage} zoom={100} rotation={90} />);
    expect(screen.queryByRole('button', { name: 'Page 1' })).toBeNull();
  });

  it('renders annotations for the page only', () => {
    const otherPage = {
      ...basePage,
      pageNumber: 2,
      textBlocks: [],
    };
    render(<PageView page={otherPage} zoom={100} annotations={[annotation]} />);
    expect(screen.queryByText('Note text')).toBeNull();
  });

  it('highlights the active search match distinctly', () => {
    const { container } = render(
      <PageView
        page={basePage}
        zoom={100}
        searchQuery="Hello"
        activeMatchId="tb1-m0"
      />
    );
    const marks = container.querySelectorAll('mark');
    expect(marks.length).toBe(1);
    expect(marks[0].className).toContain('bg-yellow-400');
  });

  it('renders non-active search matches in the muted style', () => {
    const { container } = render(
      <PageView page={basePage} zoom={100} searchQuery="Hello" />
    );
    const marks = container.querySelectorAll('mark');
    expect(marks[0].className).toContain('bg-yellow-200');
  });

  it('renders an image watermark with its label', () => {
    const watermarkedPage = {
      ...basePage,
      watermark: {
        id: 'wm1',
        documentId: 'doc1',
        type: 'image' as const,
        text: '',
        fontSize: 48,
        color: '#000000',
        opacity: 0.5,
        rotation: 0,
        position: 'center' as const,
        pageRange: '1',
        image: 'data:image/png;base64,iVBORw0KGgo=',
        label: 'Confidential',
      },
    };
    render(<PageView page={watermarkedPage} zoom={100} />);
    const img = screen.getByAltText('Confidential');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'data:image/png;base64,iVBORw0KGgo=');
  });

  it('renders an image watermark without a label using the default alt text', () => {
    const watermarkedPage = {
      ...basePage,
      watermark: {
        id: 'wm1',
        documentId: 'doc1',
        type: 'image' as const,
        text: '',
        fontSize: 48,
        color: '#000000',
        opacity: 0.5,
        rotation: 0,
        position: 'center' as const,
        pageRange: '1',
        image: 'data:image/png;base64,iVBORw0KGgo=',
      },
    };
    render(<PageView page={watermarkedPage} zoom={100} />);
    expect(screen.getByAltText('Watermark')).toBeInTheDocument();
  });

  it('renders a colored placeholder when an image watermark has no source', () => {
    const watermarkedPage = {
      ...basePage,
      watermark: {
        id: 'wm1',
        documentId: 'doc1',
        type: 'image' as const,
        text: '',
        fontSize: 48,
        color: '#123456',
        opacity: 0.5,
        rotation: 0,
        position: 'center' as const,
        pageRange: '1',
      },
    };
    const { container } = render(
      <PageView page={watermarkedPage} zoom={100} />
    );
    const placeholder = container.querySelector('div.h-40');
    expect(placeholder).toBeInTheDocument();
    expect(placeholder).toHaveStyle({ backgroundColor: '#123456' });
  });
});
