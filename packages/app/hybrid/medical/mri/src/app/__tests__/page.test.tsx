import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe('HomePage', () => {
  it('links to the workspace', () => {
    render(<HomePage />);
    const link = screen.getByTestId('open-workspace');
    expect(link).toHaveAttribute('href', '/workspace');
    expect(
      screen.getByRole('button', { name: /Open workspace/ })
    ).toBeVisible();
  });

  it('shows the supported format badges', () => {
    render(<HomePage />);
    expect(screen.getByText('DICOM')).toBeVisible();
    expect(screen.getByText('NIfTI')).toBeVisible();
  });

  it('links to the info pages', () => {
    render(<HomePage />);
    expect(screen.getByTestId('open-about')).toHaveAttribute('href', '/about');
    expect(screen.getByTestId('open-downloads')).toHaveAttribute(
      'href',
      '/downloads'
    );
    expect(screen.getByTestId('open-version')).toHaveAttribute(
      'href',
      '/version'
    );
  });

  it('links to the pipelines workspace', () => {
    render(<HomePage />);
    expect(screen.getByTestId('open-pipelines')).toHaveAttribute(
      'href',
      '/pipelines'
    );
  });

  it('links to the model registry', () => {
    render(<HomePage />);
    expect(screen.getByTestId('open-models')).toHaveAttribute(
      'href',
      '/models'
    );
  });
});
