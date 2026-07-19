import { fireEvent, render, screen } from '@testing-library/react';
import { CategoryList } from '../CategoryList';

describe('CategoryList', () => {
  it('renders all categories with counts', () => {
    render(
      <CategoryList
        categories={[{ label: 'React', count: 4 }, { label: 'TypeScript' }]}
      />
    );
    expect(screen.getByRole('button', { name: 'React 4' })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'TypeScript' })
    ).toBeInTheDocument();
  });

  it('marks the active category as primary', () => {
    render(
      <CategoryList
        categories={[{ label: 'React' }, { label: 'CSS' }]}
        active="React"
      />
    );
    expect(screen.getByRole('button', { name: 'React' })).toHaveClass(
      'badge-primary'
    );
    expect(screen.getByRole('button', { name: 'CSS' })).toHaveClass(
      'badge-ghost'
    );
  });

  it('calls onSelect and updates selection on click', () => {
    const onSelect = jest.fn();
    render(
      <CategoryList categories={[{ label: 'React' }]} onSelect={onSelect} />
    );
    fireEvent.click(screen.getByRole('button', { name: 'React' }));
    expect(onSelect).toHaveBeenCalledWith('React');
    expect(screen.getByRole('button', { name: 'React' })).toHaveClass(
      'badge-primary'
    );
  });
});
