import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { EmojiAutocomplete } from '@/components/molecules/EmojiAutocomplete';

describe('EmojiAutocomplete', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns null for empty query', () => {
    const { container } = render(
      <EmojiAutocomplete query="" onSelect={jest.fn()} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('returns null for a single character query', () => {
    const { container } = render(
      <EmojiAutocomplete query=":" onSelect={jest.fn()} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('shows suggestions for a matching query', () => {
    render(<EmojiAutocomplete query=":)" onSelect={jest.fn()} />);
    expect(screen.getByTitle(':)')).toBeInTheDocument();
  });

  it('matches multiple shortcodes containing the term', () => {
    render(<EmojiAutocomplete query=":-" onSelect={jest.fn()} />);
    expect(screen.getByTitle(':-)')).toBeInTheDocument();
    expect(screen.getByTitle(':-(')).toBeInTheDocument();
    expect(screen.getByTitle(':-D')).toBeInTheDocument();
  });

  it('calls onSelect with the emoji when a suggestion is clicked', () => {
    const onSelect = jest.fn();
    render(<EmojiAutocomplete query=":)" onSelect={onSelect} />);
    fireEvent.click(screen.getByTitle(':)'));
    expect(onSelect).toHaveBeenCalledWith('😊');
  });

  it('limits results to 8 suggestions', () => {
    render(<EmojiAutocomplete query=":smile" onSelect={jest.fn()} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeLessThanOrEqual(8);
  });

  it('returns null when no shortcodes match the query', () => {
    const { container } = render(
      <EmojiAutocomplete query="zzzzz" onSelect={jest.fn()} />
    );
    expect(container).toBeEmptyDOMElement();
  });
});
