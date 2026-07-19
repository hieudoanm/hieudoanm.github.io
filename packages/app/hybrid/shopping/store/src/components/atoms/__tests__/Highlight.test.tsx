import { render, screen } from '@testing-library/react';
import { Highlight } from '../Highlight';

describe('Highlight', () => {
  it('renders plain text without a query', () => {
    render(<Highlight text="Chess" query="" />);
    expect(screen.getByText('Chess')).toBeTruthy();
    expect(screen.queryByRole('mark')).toBeNull();
  });

  it('wraps matched text in mark', () => {
    render(<Highlight text="Chess" query="che" />);
    expect(screen.getByRole('mark')).toHaveTextContent('Che');
    expect(screen.getByText('ss')).toBeTruthy();
  });

  it('renders no marks when nothing matches', () => {
    render(<Highlight text="Chess" query="xyz" />);
    expect(screen.getByText('Chess')).toBeTruthy();
    expect(screen.queryByRole('mark')).toBeNull();
  });

  it('splits label into multiple highlight parts', () => {
    const { container } = render(
      <Highlight text="Calendar Clock" query="cal" />
    );
    expect(container.querySelectorAll('mark')).toHaveLength(1);
  });
});
