import { render, screen } from '@testing-library/react';

import { Markdown } from '@/components/organisms/Markdown';

jest.mock('@/utils/mermaid', () => ({
  renderErDiagram: jest.fn(() => ({
    svg: '<svg data-testid="er-svg"><g data-table="A"/></svg>',
    width: 10,
    height: 10,
  })),
}));

describe('Markdown', () => {
  it('renders a level-1 heading', () => {
    render(<Markdown source={'# Northwind'} />);
    expect(
      screen.getByRole('heading', { level: 1, name: 'Northwind' })
    ).toBeInTheDocument();
  });

  it('renders a blockquote description', () => {
    render(<Markdown source={'> a classic sample'} />);
    expect(screen.getByText('a classic sample')).toBeInTheDocument();
  });

  it('renders bold and inline code', () => {
    render(<Markdown source={'The **total** key is `UserID`'} />);
    expect(screen.getByText('total')).toBeInTheDocument();
    expect(screen.getByText('UserID')).toBeInTheDocument();
  });

  it('renders a pipe table', () => {
    const source = ['| T | PK |', '| --- | --- |', '| `A` | `id` |'].join('\n');
    render(<Markdown source={source} />);
    expect(screen.getByText('T')).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();
  });

  it('renders a sql code block', () => {
    render(<Markdown source={'```sql\nSELECT 1;\n```'} />);
    expect(screen.getByText('SELECT 1;')).toBeInTheDocument();
  });

  it('renders a list with inline formatting', () => {
    render(<Markdown source={'- **Composite** primary key\n- plain item'} />);
    expect(screen.getByText('Composite')).toBeInTheDocument();
    expect(screen.getByText('plain item')).toBeInTheDocument();
  });

  it('renders a mermaid diagram via renderErDiagram', () => {
    render(<Markdown source={'```mermaid\nA ||--o{ B : has\n```'} />);
    expect(screen.getByTestId('er-svg')).toBeInTheDocument();
  });
});
