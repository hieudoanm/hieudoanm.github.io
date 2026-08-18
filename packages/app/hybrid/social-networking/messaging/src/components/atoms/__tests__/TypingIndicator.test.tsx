import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TypingIndicator } from '@/components/atoms/TypingIndicator';

describe('TypingIndicator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders nothing for an empty array', () => {
    const { container } = render(<TypingIndicator names={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('shows single name with "is typing"', () => {
    render(<TypingIndicator names={['Alice']} />);
    expect(screen.getByText('Alice is typing')).toBeInTheDocument();
  });

  it('shows two names with "and" and "are typing"', () => {
    render(<TypingIndicator names={['Alice', 'Bob']} />);
    expect(screen.getByText('Alice and Bob are typing')).toBeInTheDocument();
  });

  it('shows three or more names with "and N others are typing"', () => {
    render(<TypingIndicator names={['Alice', 'Bob', 'Charlie']} />);
    expect(
      screen.getByText('Alice and 2 others are typing')
    ).toBeInTheDocument();
  });
});
