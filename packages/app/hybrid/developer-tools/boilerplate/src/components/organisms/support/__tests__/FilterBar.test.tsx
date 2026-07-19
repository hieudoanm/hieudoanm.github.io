import { fireEvent, render, screen } from '@testing-library/react';
import { FilterBar } from '../FilterBar';

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

describe('FilterBar', () => {
  it('renders the query input with the placeholder', () => {
    render(
      <FilterBar query="" onQueryChange={jest.fn()} placeholder="Find…" />
    );
    expect(screen.getByLabelText('Search')).toHaveAttribute(
      'placeholder',
      'Find…'
    );
  });

  it('reflects the controlled query value', () => {
    render(<FilterBar query="react" onQueryChange={jest.fn()} />);
    expect(screen.getByLabelText('Search')).toHaveValue('react');
  });

  it('notifies query changes', () => {
    const onQueryChange = jest.fn();
    render(<FilterBar query="" onQueryChange={onQueryChange} />);
    fireEvent.change(screen.getByLabelText('Search'), {
      target: { value: 'next' },
    });
    expect(onQueryChange).toHaveBeenCalledWith('next');
  });

  it('renders children as filter controls', () => {
    render(
      <FilterBar query="" onQueryChange={jest.fn()}>
        <button type="button">Advanced</button>
      </FilterBar>
    );
    expect(
      screen.getByRole('button', { name: 'Advanced' })
    ).toBeInTheDocument();
  });
});
