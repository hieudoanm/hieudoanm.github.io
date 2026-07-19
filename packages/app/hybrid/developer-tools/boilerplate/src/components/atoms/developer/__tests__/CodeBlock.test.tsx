import { fireEvent, render, screen } from '@testing-library/react';
import { CodeBlock } from '../CodeBlock';

describe('CodeBlock', () => {
  it('renders code and language title', () => {
    render(<CodeBlock code="const x = 1;" language="ts" />);
    expect(screen.getByText('ts')).toBeInTheDocument();
    expect(screen.getByText('const x = 1;')).toBeInTheDocument();
  });

  it('renders custom title', () => {
    render(<CodeBlock code="x" title="Example.ts" />);
    expect(screen.getByText('Example.ts')).toBeInTheDocument();
  });

  it('copies code when copy button is clicked', () => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });
    render(<CodeBlock code="const x = 1;" />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy code' }));
    expect(writeText).toHaveBeenCalledWith('const x = 1;');
  });

  it('hides copy button when showCopy is false', () => {
    render(<CodeBlock code="x" showCopy={false} />);
    expect(
      screen.queryByRole('button', { name: 'Copy code' })
    ).not.toBeInTheDocument();
  });
});
