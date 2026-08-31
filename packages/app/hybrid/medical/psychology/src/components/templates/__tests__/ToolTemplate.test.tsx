import { render, screen } from '@testing-library/react';
import { ToolTemplate } from '@/components/templates/ToolTemplate';

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children, ...rest }: any) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

describe('ToolTemplate', () => {
  it('renders the header title and children', () => {
    render(<ToolTemplate title="BDI">content</ToolTemplate>);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/');
    expect(screen.getByText('BDI')).toBeInTheDocument();
    expect(screen.getByText('content')).toBeInTheDocument();
  });
});
