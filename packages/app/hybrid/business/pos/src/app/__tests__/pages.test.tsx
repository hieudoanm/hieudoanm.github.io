import { render } from '@testing-library/react';
import DefaultPage from '@/app/default';
import ForbiddenPage from '@/app/forbidden';
import LoadingPage from '@/app/loading';
import PageTransitionTemplate from '@/app/template';
import UnauthorizedPage from '@/app/unauthorized';

describe('App pages', () => {
  it('DefaultPage renders nothing', () => {
    const { container } = render(<DefaultPage />);
    expect(container.innerHTML).toBe('');
  });

  it('ForbiddenPage renders 403', () => {
    const { getByText } = render(<ForbiddenPage />);
    expect(getByText('403')).toBeInTheDocument();
  });

  it('LoadingPage renders spinner', () => {
    const { container } = render(<LoadingPage />);
    expect(container.querySelector('.loading')).toBeInTheDocument();
  });

  it('PageTransitionTemplate renders children', () => {
    const { getByText } = render(
      <PageTransitionTemplate>
        <span>child content</span>
      </PageTransitionTemplate>
    );
    expect(getByText('child content')).toBeInTheDocument();
  });

  it('UnauthorizedPage renders 401', () => {
    const { getByText } = render(<UnauthorizedPage />);
    expect(getByText('401')).toBeInTheDocument();
  });
});
