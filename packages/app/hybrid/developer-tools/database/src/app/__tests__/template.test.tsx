import { render, screen, fireEvent } from '@testing-library/react';

import PageTransitionTemplate from '@/app/template';

describe('PageTransitionTemplate', () => {
  it('renders children', () => {
    render(
      <PageTransitionTemplate>
        <p>Hello page</p>
      </PageTransitionTemplate>
    );
    expect(screen.getByText('Hello page')).toBeInTheDocument();
  });

  it('adds the animate-page-in class after mount', () => {
    const { container } = render(
      <PageTransitionTemplate>content</PageTransitionTemplate>
    );
    const el = container.firstChild as HTMLElement;
    expect(el.className).toBe('animate-page-in');
  });

  it('removes the animate-page-in class when the animation ends', () => {
    const { container } = render(
      <PageTransitionTemplate>content</PageTransitionTemplate>
    );
    const el = container.firstChild as HTMLElement;
    fireEvent.animationEnd(el);
    expect(el.className).not.toContain('animate-page-in');
  });

  it('ignores animationend when the class is already gone', () => {
    const { container } = render(
      <PageTransitionTemplate>content</PageTransitionTemplate>
    );
    const el = container.firstChild as HTMLElement;
    fireEvent.animationEnd(el);
    fireEvent.animationEnd(el);
    expect(el.className).not.toContain('animate-page-in');
  });

  it('removes the animationend listener on unmount', () => {
    const { container, unmount } = render(
      <PageTransitionTemplate>content</PageTransitionTemplate>
    );
    const el = container.firstChild as HTMLElement;
    const spy = jest.spyOn(el, 'removeEventListener');
    unmount();
    expect(spy).toHaveBeenCalledWith('animationend', expect.any(Function));
    spy.mockRestore();
  });
});
