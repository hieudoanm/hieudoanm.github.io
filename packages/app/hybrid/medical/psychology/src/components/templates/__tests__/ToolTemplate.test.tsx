import { render, screen } from '@testing-library/react';
import { ToolTemplate } from '@/components/templates/ToolTemplate';

describe('ToolTemplate', () => {
  it('renders children', () => {
    render(<ToolTemplate title="BDI">content</ToolTemplate>);
    expect(screen.getByText('content')).toBeInTheDocument();
  });
});
