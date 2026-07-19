import { render, screen } from '@testing-library/react';
import PageTransitionTemplate from '@/app/template';

describe('PageTransitionTemplate', () => {
  it('renders children', () => {
    render(
      <PageTransitionTemplate>
        <p>hello</p>
      </PageTransitionTemplate>
    );
    expect(screen.getByText('hello')).toBeInTheDocument();
  });

  it('renders a motion wrapper div', () => {
    const { container } = render(
      <PageTransitionTemplate>
        <p>content</p>
      </PageTransitionTemplate>
    );
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.tagName).toBe('DIV');
  });
});
