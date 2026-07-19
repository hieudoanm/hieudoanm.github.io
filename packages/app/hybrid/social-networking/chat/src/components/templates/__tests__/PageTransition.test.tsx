import { render, screen } from '@testing-library/react';
import { PageTransition } from '../PageTransition';

describe('PageTransition', () => {
  it('renders children', () => {
    render(
      <PageTransition>
        <p>Content</p>
      </PageTransition>
    );
    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});
