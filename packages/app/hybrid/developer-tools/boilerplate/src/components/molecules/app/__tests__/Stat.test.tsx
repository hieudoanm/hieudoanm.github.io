import { render, screen } from '@testing-library/react';
import { FiUser } from 'react-icons/fi';
import { Stat } from '../Stat';

describe('Stat', () => {
  it('renders label, value, and description', () => {
    render(<Stat label="Revenue" value="$1,234" description="vs last month" />);
    expect(screen.getByText('Revenue')).toBeInTheDocument();
    expect(screen.getByText('$1,234')).toBeInTheDocument();
    expect(screen.getByText('vs last month')).toBeInTheDocument();
  });

  it('renders icon with variant color', () => {
    const { container } = render(
      <Stat label="Revenue" value="$1" icon={<FiUser />} variant="success" />
    );
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg?.parentElement).toHaveClass('text-success');
  });
});
