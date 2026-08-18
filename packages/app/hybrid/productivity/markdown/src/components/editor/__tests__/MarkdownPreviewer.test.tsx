import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { MarkdownPreviewer } from '@/components/editor/MarkdownPreviewer';

const renderPreviewer = (overrides = {}) => {
  const props = {
    html: '<p>rendered html</p>',
    isRendering: false,
    previewRef: createRef<HTMLDivElement | null>(),
    visible: true,
    ...overrides,
  };
  render(<MarkdownPreviewer {...props} />);
  return props;
};

describe('MarkdownPreviewer', () => {
  it('renders the html when not busy', () => {
    renderPreviewer();
    expect(screen.getByTestId('markdown-preview').innerHTML).toBe(
      '<p>rendered html</p>'
    );
  });

  it('shows the rendering spinner while busy', () => {
    renderPreviewer({ isRendering: true, html: '<p>x</p>' });
    expect(screen.getByText('Rendering…')).toBeInTheDocument();
    expect(screen.queryByTestId('markdown-preview')).not.toBeInTheDocument();
  });

  it('hides the panel when not visible', () => {
    const { container } = render(
      <MarkdownPreviewer
        html="<p>x</p>"
        isRendering={false}
        previewRef={createRef<HTMLDivElement | null>()}
        visible={false}
      />
    );
    expect(container.firstElementChild).toHaveClass('hidden');
  });

  it('attaches the ref to the wrapper', () => {
    const previewRef = createRef<HTMLDivElement | null>();
    renderPreviewer({ previewRef });
    expect(previewRef.current).not.toBeNull();
    expect(previewRef.current).toHaveAttribute(
      'aria-label',
      'Markdown preview'
    );
  });
});
