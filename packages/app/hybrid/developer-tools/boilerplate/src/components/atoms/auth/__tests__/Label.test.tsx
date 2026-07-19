import { render, screen } from '@testing-library/react';
import { Label } from '../Label';

describe('Label', () => {
  it('renders children', () => {
    render(<Label>Email</Label>);
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('passes htmlFor and extra classes', () => {
    const { container } = render(
      <Label htmlFor="email" className="font-bold">
        Email
      </Label>
    );
    expect(container.querySelector('label')).toHaveAttribute('for', 'email');
    expect(container.querySelector('label')).toHaveClass('font-bold');
  });
});
