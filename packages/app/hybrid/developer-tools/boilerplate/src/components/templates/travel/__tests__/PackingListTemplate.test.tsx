import { fireEvent, render, screen } from '@testing-library/react';
import { PackingListTemplate } from '../PackingListTemplate';

describe('PackingListTemplate', () => {
  it('renders items with category badges', () => {
    render(<PackingListTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Packing List' })
    ).toBeInTheDocument();
    expect(screen.getByText('What to pack.')).toBeInTheDocument();
    expect(screen.getByText('6 items')).toBeInTheDocument();
    expect(screen.getByText('0 of 6 packed')).toBeInTheDocument();
    expect(screen.getByLabelText('Passport')).toBeInTheDocument();
    expect(screen.getByLabelText('Camera')).toBeInTheDocument();
    expect(screen.getAllByText('Essentials')).toHaveLength(2);
    expect(screen.getAllByText('Tech')).toHaveLength(2);
  });

  it('toggles a checkbox and updates the packed summary', () => {
    render(<PackingListTemplate />);
    fireEvent.click(screen.getByLabelText('Passport'));
    expect(screen.getByText('1 of 6 packed')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Passport'));
    expect(screen.getByText('0 of 6 packed')).toBeInTheDocument();
  });

  it('adds an item and tracks its packed state', () => {
    render(<PackingListTemplate />);
    fireEvent.change(screen.getByLabelText('Item name'), {
      target: { value: 'Sunglasses' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add' }));
    expect(screen.getByText('7 items')).toBeInTheDocument();
    expect(screen.getByText('0 of 7 packed')).toBeInTheDocument();
    expect(screen.getByLabelText('Sunglasses')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Sunglasses'));
    expect(screen.getByText('1 of 7 packed')).toBeInTheDocument();
  });
});
