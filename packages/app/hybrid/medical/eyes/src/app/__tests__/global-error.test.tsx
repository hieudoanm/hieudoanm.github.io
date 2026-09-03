import { render, screen, fireEvent } from '@testing-library/react';
import GlobalError from '@/app/global-error';

jest.mock('@/components/templates/ErrorTemplate', () => ({
  ErrorTemplate: ({ code, description, action }: { code: string; description: string; action: React.ReactNode }) => (
    <div>
      <span>{code}</span>
      <p>{description}</p>
      {action}
    </div>
  ),
}));

jest.mock('@/components/atoms/Button', () => ({
  Button: ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => (
    <button onClick={onClick}>{children}</button>
  ),
}));

describe('GlobalError', () => {
  it('renders 500 and try again button', () => {
    const reset = jest.fn();
    render(<GlobalError error={new Error('test')} reset={reset} />);
    expect(screen.getByText('500')).toBeInTheDocument();
    expect(screen.getByText('Try again')).toBeInTheDocument();
  });

  it('calls reset when try again is clicked', () => {
    const reset = jest.fn();
    render(<GlobalError error={new Error('test')} reset={reset} />);
    fireEvent.click(screen.getByText('Try again'));
    expect(reset).toHaveBeenCalled();
  });
});
