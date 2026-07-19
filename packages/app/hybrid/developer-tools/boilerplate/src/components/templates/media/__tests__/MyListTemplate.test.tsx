import { fireEvent, render, screen } from '@testing-library/react';
import { MyListTemplate } from '../MyListTemplate';

describe('MyListTemplate', () => {
  it('renders saved titles with type badges', () => {
    render(<MyListTemplate />);
    expect(
      screen.getByRole('heading', { name: 'My List' })
    ).toBeInTheDocument();
    expect(screen.getByText('4 titles')).toBeInTheDocument();
    expect(screen.getByText('Starfall Protocol')).toBeInTheDocument();
    expect(screen.getAllByText('Movie')).toHaveLength(2);
    expect(screen.getAllByText('Series')).toHaveLength(2);
  });

  it('removes a title from the list', () => {
    render(<MyListTemplate />);
    fireEvent.click(
      screen.getByRole('button', { name: 'Remove Starfall Protocol' })
    );
    expect(screen.getByText('3 titles')).toBeInTheDocument();
    expect(screen.queryByText('Starfall Protocol')).not.toBeInTheDocument();
  });

  it('shows an empty state after removing every title', () => {
    render(<MyListTemplate />);
    while (screen.queryAllByRole('button', { name: /^Remove / }).length > 0) {
      screen
        .getAllByRole('button', { name: /^Remove / })
        .forEach((button) => fireEvent.click(button));
    }
    expect(screen.getByText('0 titles')).toBeInTheDocument();
    expect(screen.getByText('Your list is empty')).toBeInTheDocument();
  });
});
