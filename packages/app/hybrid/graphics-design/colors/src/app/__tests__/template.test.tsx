import { act, render, screen } from '@testing-library/react';
import PageTransitionTemplate from '../template';

describe('PageTransitionTemplate', () => {
  it('renders its children', () => {
    act(() => {
      render(<PageTransitionTemplate>content</PageTransitionTemplate>);
    });
    expect(screen.getByText('content')).toBeInTheDocument();
  });

  it('adds the animate-page-in class after mount', () => {
    const { container } = render(
      <PageTransitionTemplate>content</PageTransitionTemplate>
    );
    const el = container.querySelector('div');
    expect(el).not.toBeNull();
    expect(el!.className).toContain('animate-page-in');
  });
});
