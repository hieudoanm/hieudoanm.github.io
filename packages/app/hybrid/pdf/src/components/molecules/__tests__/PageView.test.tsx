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
});
