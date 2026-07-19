import { render, screen } from '@testing-library/react';
import { ScrollArea } from '../ScrollArea';

describe('ScrollArea', () => {
  it('renders children with a max height', () => {
    const { container } = render(
      <ScrollArea maxHeight={300}>
        <p>Line</p>
      </ScrollArea>
    );
    expect(screen.getByText('Line')).toBeInTheDocument();
    expect(container.querySelector('.overflow-y-auto')).toHaveStyle(
      'max-height: 300px'
    );
  });
});
