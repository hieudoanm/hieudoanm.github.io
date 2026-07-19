import { render, screen } from '@testing-library/react';
import { ToolSection } from '../ToolSection';

describe('ToolSection', () => {
  it('renders the description', () => {
    render(
      <ToolSection description="Color picker">
        <div />
      </ToolSection>
    );
    expect(screen.getByText('Color picker')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(
      <ToolSection description="Details">
        <p>Child content</p>
      </ToolSection>
    );
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });
});
