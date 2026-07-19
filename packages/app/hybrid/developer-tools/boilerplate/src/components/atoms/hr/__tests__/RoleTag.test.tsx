import { render, screen } from '@testing-library/react';
import { RoleTag } from '../RoleTag';

describe('RoleTag', () => {
  it('renders the role', () => {
    render(<RoleTag role="Admin" />);
    expect(screen.getByTestId('role-tag')).toHaveTextContent('Admin');
  });

  it('applies the variant class', () => {
    render(<RoleTag role="Owner" variant="secondary" />);
    expect(screen.getByTestId('role-tag')).toHaveClass('badge-secondary');
  });
});
