import { render, screen } from '@testing-library/react';
import { KanbanBoard } from '../KanbanBoard';

jest.mock('next/link', () => {
  return ({
    href,
    children,
    ...rest
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  );
});

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

const { usePathname } = jest.requireMock('next/navigation');

describe('KanbanBoard', () => {
  const columns = [
    {
      id: 'todo',
      title: 'To do',
      cards: [
        {
          id: '1',
          title: 'Draft plan',
          description: 'Write outline',
          tag: 'info',
        },
      ],
    },
    { id: 'done', title: 'Done', cards: [] },
  ];

  it('renders each column with its card count', () => {
    render(<KanbanBoard columns={columns} />);
    expect(screen.getByRole('heading', { name: 'To do' })).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('renders card titles and descriptions', () => {
    render(<KanbanBoard columns={columns} />);
    expect(screen.getByText('Draft plan')).toBeInTheDocument();
    expect(screen.getByText('Write outline')).toBeInTheDocument();
  });

  it('shows an empty state for empty columns', () => {
    render(<KanbanBoard columns={columns} />);
    expect(screen.getByText('Empty')).toBeInTheDocument();
  });

  it('falls back to a neutral tag class for unknown tags', () => {
    const custom = [
      {
        id: 'x',
        title: 'Column',
        cards: [{ id: '1', title: 'Card', tag: 'mystery' }],
      },
    ];
    render(<KanbanBoard columns={custom} />);
    expect(screen.getByText('mystery')).toHaveClass('badge-ghost');
  });
});
