import { fireEvent, render, screen } from '@testing-library/react';
import { ProgressStepper } from '../ProgressStepper';

jest.mock('next/link', () => {
  return ({
    href,
    children,
    ...rest
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  );
});

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

const { usePathname } = jest.requireMock('next/navigation');

describe('ProgressStepper', () => {
  const steps = ['Cart', 'Shipping', 'Payment'];

  it('renders step labels and numbers', () => {
    render(<ProgressStepper steps={steps} activeStep={1} />);
    expect(screen.getByText('Cart')).toBeInTheDocument();
    expect(screen.getByText('Shipping')).toBeInTheDocument();
    expect(screen.getByText('Payment')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('marks completed and active steps', () => {
    const { container } = render(
      <ProgressStepper steps={steps} activeStep={1} />
    );
    expect(container.querySelectorAll('.bg-primary').length).toBe(1);
    expect(screen.getByText('Shipping').parentElement).toHaveAttribute(
      'aria-current',
      'step'
    );
  });

  it('makes only reachable steps clickable when onStepClick is provided', () => {
    const onStepClick = jest.fn();
    render(
      <ProgressStepper steps={steps} activeStep={1} onStepClick={onStepClick} />
    );
    fireEvent.click(screen.getByRole('button', { name: /Shipping/ }));
    expect(onStepClick).toHaveBeenCalledWith(1);
    expect(
      screen.queryByRole('button', { name: /Payment/ })
    ).not.toBeInTheDocument();
  });
});
