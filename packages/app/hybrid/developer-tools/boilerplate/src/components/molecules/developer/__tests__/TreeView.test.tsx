import { fireEvent, render, screen } from '@testing-library/react';
import { TreeView } from '../TreeView';

describe('TreeView', () => {
  const nodes = [
    {
      id: 'root',
      label: 'Root',
      children: [{ id: 'leaf', label: 'Leaf' }],
    },
  ];

  it('renders nodes and collapses children initially', () => {
    render(<TreeView nodes={nodes} />);
    expect(screen.getByText('Root')).toBeInTheDocument();
    expect(screen.queryByText('Leaf')).not.toBeInTheDocument();
  });

  it('expands and collapses children on click', () => {
    render(<TreeView nodes={nodes} />);
    fireEvent.click(screen.getByText('Root'));
    expect(screen.getByText('Leaf')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Root'));
    expect(screen.queryByText('Leaf')).not.toBeInTheDocument();
  });
});
