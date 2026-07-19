import { render } from '@testing-library/react';
import PageTransitionTemplate from '@/app/template';

describe('PageTransitionTemplate', () => {
  it('renders children', () => {
    const { getByText } = render(
      <PageTransitionTemplate>
        <span>child content</span>
      </PageTransitionTemplate>
    );
    expect(getByText('child content')).toBeInTheDocument();
  });
});
