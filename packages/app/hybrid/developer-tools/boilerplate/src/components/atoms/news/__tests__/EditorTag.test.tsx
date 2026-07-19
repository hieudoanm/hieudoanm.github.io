import { render, screen } from '@testing-library/react';
import { EditorTag } from '../EditorTag';

describe('EditorTag', () => {
  it('renders default editor label', () => {
    render(<EditorTag />);
    expect(screen.getByTestId('editor-tag')).toHaveTextContent("Editor's Pick");
  });

  it('applies info badge class', () => {
    render(<EditorTag />);
    expect(screen.getByTestId('editor-tag')).toHaveClass('badge-info');
  });

  it('renders editor name when provided', () => {
    render(<EditorTag name="Jane Doe" />);
    expect(screen.getByTestId('editor-tag')).toHaveTextContent('by Jane Doe');
  });

  it('renders custom label', () => {
    render(<EditorTag label="Staff Pick" />);
    expect(screen.getByTestId('editor-tag')).toHaveTextContent('Staff Pick');
  });
});
