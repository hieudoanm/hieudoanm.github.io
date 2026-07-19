import { render, screen } from '@testing-library/react';
import { ManagerName } from '../ManagerName';

describe('ManagerName', () => {
  it('renders the manager name', () => {
    render(<ManagerName name="Alice Wong" />);
    expect(screen.getByTestId('manager-name')).toHaveTextContent('Alice Wong');
  });

  it('appends the className prop', () => {
    render(<ManagerName name="Bob" className="font-medium" />);
    expect(screen.getByTestId('manager-name')).toHaveClass('font-medium');
  });
});
