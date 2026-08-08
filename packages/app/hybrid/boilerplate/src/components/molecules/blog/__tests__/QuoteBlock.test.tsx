import { render, screen } from '@testing-library/react';
import { QuoteBlock } from '../QuoteBlock';

describe('QuoteBlock', () => {
  it('renders the quote text', () => {
    render(<QuoteBlock quote="Simplicity is the ultimate sophistication." />);
    expect(
      screen.getByText('Simplicity is the ultimate sophistication.')
    ).toBeInTheDocument();
  });

  it('renders author and source attribution', () => {
    render(
      <QuoteBlock
        quote="Q"
        author="Leonardo da Vinci"
        source="Collected Works"
      />
    );
    expect(screen.getByText('Leonardo da Vinci')).toBeInTheDocument();
    expect(screen.getByText('Collected Works')).toBeInTheDocument();
  });

  it('omits the attribution when author and source are absent', () => {
    const { container } = render(<QuoteBlock quote="Q" />);
    expect(container.querySelector('figcaption')).not.toBeInTheDocument();
  });
});
