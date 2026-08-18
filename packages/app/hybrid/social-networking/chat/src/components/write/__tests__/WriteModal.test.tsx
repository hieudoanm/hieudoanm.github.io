import { render, screen, fireEvent } from '@testing-library/react';
import { WriteModal } from '../index';
import { preselectWriteTool } from '../config';

jest.mock('../WriteTool', () => ({
  WriteTool: ({ config }: { config: { title: string } }) => (
    <div data-testid="write-tool">{config.title}</div>
  ),
}));

describe('WriteModal', () => {
  beforeEach(() => {
    preselectWriteTool(null);
  });

  it('renders the write screen when no tool is selected', () => {
    render(<WriteModal onClose={jest.fn()} />);
    expect(screen.getByText('Write')).toBeInTheDocument();
    expect(screen.getByText('Select a writing tool')).toBeInTheDocument();
  });

  it('renders the category toolbar', () => {
    render(<WriteModal onClose={jest.fn()} />);
    expect(screen.getByText('Article')).toBeInTheDocument();
    expect(screen.getByText('Business')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
  });

  it('selects a tool when clicked', () => {
    render(<WriteModal onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('📝'));
    fireEvent.click(screen.getByText('Essay'));
    expect(screen.getByTestId('write-tool')).toHaveTextContent('Essay');
  });

  it('expands a category before tools can be selected', () => {
    render(<WriteModal onClose={jest.fn()} />);
    expect(screen.queryByText('Article Rewriter')).toBeNull();
    fireEvent.click(screen.getByText('Article'));
    expect(screen.getByText('Article Rewriter')).toBeInTheDocument();
  });

  it('opens a preselected tool on mount', () => {
    preselectWriteTool('write-essay');
    render(<WriteModal onClose={jest.fn()} />);
    expect(screen.getByTestId('write-tool')).toBeInTheDocument();
  });

  it('filters tools by search query', () => {
    render(<WriteModal onClose={jest.fn()} />);
    fireEvent.change(screen.getByPlaceholderText('Search tools...'), {
      target: { value: 'essay' },
    });
    expect(screen.getByText('Essay')).toBeInTheDocument();
  });

  it('hides tools that do not match the query', () => {
    render(<WriteModal onClose={jest.fn()} />);
    fireEvent.change(screen.getByPlaceholderText('Search tools...'), {
      target: { value: 'zzz-no-match' },
    });
    expect(screen.queryByText('Essay')).toBeNull();
  });

  it('closes via the FullScreen close button', () => {
    const onClose = jest.fn();
    render(<WriteModal onClose={onClose} />);
    fireEvent.click(screen.getByText('✕'));
    expect(onClose).toHaveBeenCalled();
  });
});
