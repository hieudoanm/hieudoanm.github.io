import { render, screen } from '@testing-library/react';
import { EmployeeAvatar } from '../EmployeeAvatar';

describe('EmployeeAvatar', () => {
  it('renders initials from the name', () => {
    render(<EmployeeAvatar name="Jane Smith" />);
    expect(screen.getByText('JS')).toBeInTheDocument();
  });

  it('renders a single initial for short names', () => {
    render(<EmployeeAvatar name="Sam" />);
    expect(screen.getByText('S')).toBeInTheDocument();
  });

  it('renders the image when src is provided', () => {
    render(<EmployeeAvatar name="Jane Smith" src="/jane.png" />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', '/jane.png');
    expect(img).toHaveAttribute('alt', 'Jane Smith');
  });

  it('applies the size class', () => {
    render(<EmployeeAvatar name="Ada" size="lg" />);
    expect(screen.getByTestId('employee-avatar')).toHaveClass('h-14', 'w-14');
  });
});
