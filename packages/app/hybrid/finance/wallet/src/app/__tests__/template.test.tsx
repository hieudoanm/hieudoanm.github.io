import { render, screen } from '@testing-library/react';

import Template from '../template';

describe('Template', () => {
  it('renders children', () => {
    render(
      <Template>
        <div>child</div>
      </Template>
    );
    expect(screen.getByText('child')).toBeInTheDocument();
  });

  it('wraps children in a container', () => {
    const { container } = render(
      <Template>
        <div>content</div>
      </Template>
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('renders single child', () => {
    render(
      <Template>
        <span>single</span>
      </Template>
    );
    expect(screen.getByText('single')).toBeInTheDocument();
  });

  it('renders multiple children', () => {
    render(
      <Template>
        <div>first</div>
        <div>second</div>
      </Template>
    );
    expect(screen.getByText('first')).toBeInTheDocument();
    expect(screen.getByText('second')).toBeInTheDocument();
  });

  it('preserves child elements', () => {
    render(
      <Template>
        <div data-testid="target">preserved</div>
      </Template>
    );
    expect(screen.getByTestId('target')).toBeInTheDocument();
  });
});
