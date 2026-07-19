import { render, screen } from '@testing-library/react';
import Template from '@/app/template';

describe('Template', () => {
  it('renders children', () => {
    render(
      <Template>
        <p>Hello page</p>
      </Template>
    );
    expect(screen.getByText('Hello page')).toBeInTheDocument();
  });

  it('applies an entrance animation wrapper', () => {
    const { container } = render(
      <Template>
        <p>content</p>
      </Template>
    );
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveStyle({ opacity: 0 });
  });
});
