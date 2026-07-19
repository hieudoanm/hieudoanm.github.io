import { render, screen } from '@testing-library/react';
import { OrgChart } from '../OrgChart';

const nodes = [
  {
    name: 'Alice',
    role: 'CTO',
    children: [
      { name: 'Bob', role: 'Engineering Manager' },
      { name: 'Carol', role: 'Product Manager' },
    ],
  },
];

describe('OrgChart', () => {
  it('renders the title and top-level nodes', () => {
    render(<OrgChart title="Org" nodes={nodes} />);
    expect(screen.getByText('Org')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('CTO')).toBeInTheDocument();
  });

  it('renders nested child nodes', () => {
    render(<OrgChart nodes={nodes} />);
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('Engineering Manager')).toBeInTheDocument();
    expect(screen.getByText('Carol')).toBeInTheDocument();
  });

  it('renders an empty state when no nodes are provided', () => {
    render(<OrgChart nodes={[]} />);
    expect(screen.getByText('No team to display')).toBeInTheDocument();
  });
});
