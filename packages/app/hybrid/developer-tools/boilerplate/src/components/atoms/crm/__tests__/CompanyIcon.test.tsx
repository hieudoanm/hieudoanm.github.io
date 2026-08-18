import { render, screen } from '@testing-library/react';
import { CompanyIcon } from '../CompanyIcon';

describe('CompanyIcon', () => {
  it('renders the company initial', () => {
    render(<CompanyIcon name="Acme Inc" />);
    expect(screen.getByText('A')).toBeInTheDocument();
  });

  it('renders an image when src is provided', () => {
    render(<CompanyIcon name="Acme Inc" src="/acme.png" />);
    expect(screen.getByRole('img', { name: 'Acme Inc logo' })).toHaveAttribute(
      'src',
      '/acme.png'
    );
  });

  it('renders a placeholder for an empty name', () => {
    render(<CompanyIcon name="" />);
    expect(screen.getByText('?')).toBeInTheDocument();
  });
});
