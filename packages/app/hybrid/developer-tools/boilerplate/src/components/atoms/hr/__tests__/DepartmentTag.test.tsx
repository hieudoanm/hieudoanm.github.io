import { render, screen } from '@testing-library/react';
import { DepartmentTag } from '../DepartmentTag';

describe('DepartmentTag', () => {
  it('renders the department name', () => {
    render(<DepartmentTag name="Engineering" />);
    expect(screen.getByText('Engineering')).toBeInTheDocument();
  });

  it('applies the outline badge class', () => {
    render(<DepartmentTag name="Finance" />);
    expect(screen.getByTestId('department-tag')).toHaveClass('badge-outline');
  });

  it('appends the className prop', () => {
    render(<DepartmentTag name="Design" className="mt-2" />);
    expect(screen.getByTestId('department-tag')).toHaveClass('mt-2');
  });
});
