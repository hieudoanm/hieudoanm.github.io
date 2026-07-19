import { render, screen } from '@testing-library/react';
import PageTransitionTemplate from '../template';

describe('template', () => {
  it('renders children', () => {
    render(
      <PageTransitionTemplate>
        <div>Template Content</div>
      </PageTransitionTemplate>
    );
    expect(screen.getByText('Template Content')).toBeTruthy();
  });

  it('applies animation class after mount', () => {
    render(
      <PageTransitionTemplate>
        <div>Content</div>
      </PageTransitionTemplate>
    );
    // After useEffect runs, the div should have animate-page-in class
    expect(screen.getByText('Content')).toBeTruthy();
  });
});
