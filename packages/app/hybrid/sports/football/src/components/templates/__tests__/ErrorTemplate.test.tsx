import { fireEvent, render, screen } from '@testing-library/react';
import { ErrorTemplate } from '@/components/templates/ErrorTemplate';

describe('ErrorTemplate', () => {
  it('renders code and description', () => {
    render(<ErrorTemplate code="500" description="Something went wrong" />);
    expect(screen.getByText('500')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('renders action node', () => {
    render(<ErrorTemplate code="404" action={<button>Go home</button>} />);
    expect(screen.getByRole('button', { name: 'Go home' })).toBeInTheDocument();
  });

  it('omits optional sections when absent', () => {
    render(<ErrorTemplate code="404" />);
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders not-found variant with default code and message', () => {
    render(<ErrorTemplate variant="not-found" />);
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });

  it('renders not-found variant with custom code and message', () => {
    render(
      <ErrorTemplate
        variant="not-found"
        code={418}
        description="I am a teapot"
      />
    );
    expect(screen.getByText('418')).toBeInTheDocument();
    expect(screen.getByText('I am a teapot')).toBeInTheDocument();
  });

  it('navigates back on go back in not-found variant', () => {
    const back = jest.spyOn(window.history, 'back');
    render(<ErrorTemplate variant="not-found" />);
    fireEvent.click(screen.getByRole('button', { name: /Go back/ }));
    expect(back).toHaveBeenCalledTimes(1);
  });

  it('links home in not-found variant', () => {
    render(<ErrorTemplate variant="not-found" />);
    expect(screen.getByRole('link', { name: /Go home/ })).toHaveAttribute(
      'href',
      '/'
    );
  });
});
