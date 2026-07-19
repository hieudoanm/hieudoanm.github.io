import { render, act } from '@testing-library/react';
import PageTransitionTemplate from '../template';

describe('PageTransitionTemplate', () => {
  it('renders children', () => {
    const { getByText } = render(
      <PageTransitionTemplate>
        <p>child content</p>
      </PageTransitionTemplate>
    );
    expect(getByText('child content')).toBeInTheDocument();
  });

  it('applies animate-page-in class after mount', async () => {
    const { container } = render(
      <PageTransitionTemplate>
        <p>content</p>
      </PageTransitionTemplate>
    );
    await act(async () => {});
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.classList.contains('animate-page-in')).toBe(true);
  });

  it('removes animation class on animationend', async () => {
    const { container } = render(
      <PageTransitionTemplate>
        <p>content</p>
      </PageTransitionTemplate>
    );
    await act(async () => {});
    const wrapper = container.firstChild as HTMLElement;
    await act(async () => {
      wrapper.dispatchEvent(new Event('animationend'));
    });
    expect(wrapper.classList.contains('animate-page-in')).toBe(false);
  });
});
