import { render, screen } from '@testing-library/react';
import { PageTransition } from '@/components/atoms/PageTransition';

describe('PageTransition', () => {
  it('renders its children inside a motion wrapper', () => {
    render(
      <PageTransition>
        <div>content</div>
      </PageTransition>
    );
    expect(screen.getByText('content')).toBeInTheDocument();
  });
});
