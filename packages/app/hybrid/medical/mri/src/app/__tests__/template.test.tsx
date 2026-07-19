import { fireEvent, render, screen } from '@testing-library/react';
import PageTransitionTemplate from '@/app/template';

describe('PageTransitionTemplate', () => {
  it('renders children with the page-in animation class', () => {
    render(
      <PageTransitionTemplate>
        <div data-testid="page">page content</div>
      </PageTransitionTemplate>
    );
    expect(screen.getByTestId('page')).toBeInTheDocument();
    expect(screen.getByTestId('page').parentElement).toHaveClass(
      'animate-page-in'
    );
  });

  it('removes the animation class on animationend', () => {
    const { container } = render(
      <PageTransitionTemplate>
        <div>page content</div>
      </PageTransitionTemplate>
    );
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).toHaveClass('animate-page-in');
    fireEvent.animationEnd(wrapper);
    expect(wrapper).not.toHaveClass('animate-page-in');
  });

  it('ignores repeated animationend events', () => {
    const { container } = render(
      <PageTransitionTemplate>
        <div>page content</div>
      </PageTransitionTemplate>
    );
    const wrapper = container.firstElementChild as HTMLElement;
    fireEvent.animationEnd(wrapper);
    expect(() => fireEvent.animationEnd(wrapper)).not.toThrow();
    expect(wrapper).not.toHaveClass('animate-page-in');
  });
});
