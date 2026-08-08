import { fireEvent, render, screen } from '@testing-library/react';
import { JsonViewer } from '../JsonViewer';

describe('JsonViewer', () => {
  const data = {
    name: 'Ada',
    age: 36,
    admin: true,
    tags: ['math', 'compiler'],
    nested: { ok: null },
  };

  it('renders the root label and container', () => {
    render(<JsonViewer data={data} name="user" />);
    expect(screen.getByText(/user/)).toBeInTheDocument();
    expect(document.querySelector('[role="tree"]')).toBeInTheDocument();
  });

  it('collapses children by default', () => {
    render(<JsonViewer data={data} name="user" />);
    expect(screen.queryByText('Ada')).not.toBeInTheDocument();
  });

  it('expands children when the node is clicked', () => {
    render(<JsonViewer data={data} name="user" />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('"Ada"')).toBeInTheDocument();
  });

  it('renders primitives with defaultExpanded', () => {
    render(<JsonViewer data={{ a: 1 }} defaultExpanded />);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('renders a non-JSON value with the default type style', () => {
    render(<JsonViewer data={{ u: undefined }} defaultExpanded />);
    expect(document.querySelector('.text-primary')).toBeInTheDocument();
  });

  it('toggles nested nodes independently', () => {
    render(<JsonViewer data={data} name="user" />);
    const rootToggle = screen.getByRole('button');
    fireEvent.click(rootToggle);
    const nestedToggle = screen.getByRole('button', { name: /nested/ });
    fireEvent.click(nestedToggle);
    expect(screen.getByText('null')).toBeInTheDocument();
  });
});
