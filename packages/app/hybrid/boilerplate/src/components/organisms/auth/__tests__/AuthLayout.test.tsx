import { render, screen } from '@testing-library/react';
import { AuthLayout } from '../AuthLayout';

describe('AuthLayout', () => {
  it('renders title and subtitle', () => {
    render(
      <AuthLayout title="Welcome back" subtitle="Sign in to continue">
        <p>Form content</p>
      </AuthLayout>
    );
    expect(screen.getByText('Welcome back')).toBeInTheDocument();
    expect(screen.getByText('Sign in to continue')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(
      <AuthLayout title="Welcome back">
        <p>Form content</p>
      </AuthLayout>
    );
    expect(screen.getByText('Form content')).toBeInTheDocument();
  });

  it('renders the footer and brand', () => {
    render(
      <AuthLayout
        title="Welcome"
        brand="Acme"
        footer={<a href="/signin">Have an account?</a>}>
        <p>Form</p>
      </AuthLayout>
    );
    expect(screen.getAllByText('Acme')).toHaveLength(2);
    expect(screen.getByText('Have an account?')).toBeInTheDocument();
  });
});
