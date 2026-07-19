import { render, screen } from '@testing-library/react';
import { InfoList } from '../InfoList';

describe('InfoList', () => {
  const items = [
    { key: 'name', label: 'Name', value: 'Jane Doe' },
    { key: 'role', label: 'Role', value: 'Engineer' },
  ];

  it('renders title, labels, and values', () => {
    render(<InfoList title="Profile" items={items} />);
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('Engineer')).toBeInTheDocument();
  });

  it('renders icons', () => {
    render(<InfoList items={[{ ...items[0], icon: '⭐' }]} />);
    expect(screen.getByText('⭐')).toBeInTheDocument();
  });

  it('applies a two-column layout', () => {
    const { container } = render(<InfoList items={items} columns={2} />);
    expect(container.querySelector('dl')).toHaveClass('sm:grid-cols-2');
  });
});
