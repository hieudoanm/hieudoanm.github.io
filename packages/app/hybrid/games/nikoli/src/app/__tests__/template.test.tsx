import { render, screen, act, fireEvent } from '@testing-library/react';
import PageTransitionTemplate from '../template';

describe('PageTransitionTemplate', () => {
  it('renders children', () => {
    render(
      <PageTransitionTemplate>
        <span>child content</span>
      </PageTransitionTemplate>
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });

  it('adds animate-page-in class after mount', () => {
    const { container } = render(
      <PageTransitionTemplate>
        <span>content</span>
      </PageTransitionTemplate>
    );
    const div = container.firstChild as HTMLElement;
    expect(div.className).toBe('animate-page-in');
  });

  it('removes animate class on animationend', () => {
    const { container } = render(
      <PageTransitionTemplate>
        <span>content</span>
      </PageTransitionTemplate>
    );
    act(() => {});
    const div = container.firstChild as HTMLElement;
    expect(div.className).toBe('animate-page-in');
    act(() => {
      fireEvent.animationEnd(div);
    });
    expect(div.className).toBe('');
  });

  it('does not throw if animationend fires without the class', () => {
    const { container } = render(
      <PageTransitionTemplate>
        <span>content</span>
      </PageTransitionTemplate>
    );
    const div = container.firstChild as HTMLElement;
    act(() => {});
    act(() => {
      fireEvent.animationEnd(div);
    });
    expect(div.className).toBe('');
  });

  it('cleans up event listener on unmount', () => {
    const { container, unmount } = render(
      <PageTransitionTemplate>
        <span>content</span>
      </PageTransitionTemplate>
    );
    const div = container.firstChild as HTMLElement;
    const spy = jest.spyOn(div, 'removeEventListener');
    unmount();
    expect(spy).toHaveBeenCalledWith('animationend', expect.any(Function));
    spy.mockRestore();
  });
});
