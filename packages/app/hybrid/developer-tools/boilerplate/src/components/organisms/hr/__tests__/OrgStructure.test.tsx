import { render, screen } from '@testing-library/react';
import { OrgStructure } from '../OrgStructure';

describe('OrgStructure', () => {
  const nodes = [
    {
      id: 'ceo',
      name: 'Ada Lovelace',
      title: 'CEO',
      children: [
        {
          id: 'eng',
          name: 'Grace Hopper',
          title: 'VP Engineering',
          children: [
            { id: 'lead', name: 'Alan Turing', title: 'Engineering Lead' },
          ],
        },
      ],
    },
  ];

  it('renders the top-level node', () => {
    render(<OrgStructure nodes={nodes} />);
    expect(screen.getByText('Ada Lovelace')).toBeInTheDocument();
    expect(screen.getByText('CEO')).toBeInTheDocument();
  });

  it('renders nested child nodes recursively', () => {
    render(<OrgStructure nodes={nodes} />);
    expect(screen.getByText('Grace Hopper')).toBeInTheDocument();
    expect(screen.getByText('Alan Turing')).toBeInTheDocument();
  });

  it('renders nothing when the tree is empty', () => {
    render(<OrgStructure nodes={[]} />);
    expect(screen.queryByText('Ada Lovelace')).not.toBeInTheDocument();
    expect(screen.getByTestId('org-structure').children).toHaveLength(1);
  });
});
