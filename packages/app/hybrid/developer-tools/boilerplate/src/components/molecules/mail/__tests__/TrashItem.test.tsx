import { fireEvent, render, screen } from '@testing-library/react';
import { TrashItem } from '../TrashItem';

describe('TrashItem', () => {
  it('renders sender, subject and time', () => {
    render(
      <TrashItem
        from="Old Sender"
        subject="Old email"
        preview="From 2023"
        time="Jan 5"
      />
    );
    const item = screen.getByTestId('trash-item');
    expect(item).toHaveTextContent('Old Sender');
    expect(item).toHaveTextContent('Old email');
    expect(screen.getByText('Jan 5')).toBeInTheDocument();
  });

  it('calls onRestore when restore clicked', () => {
    const onRestore = jest.fn();
    render(
      <TrashItem
        from="Old Sender"
        subject="S"
        preview="P"
        time="Jan 5"
        onRestore={onRestore}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Restore' }));
    expect(onRestore).toHaveBeenCalledTimes(1);
  });

  it('calls onDeleteForever when delete clicked', () => {
    const onDeleteForever = jest.fn();
    render(
      <TrashItem
        from="Old Sender"
        subject="S"
        preview="P"
        time="Jan 5"
        onDeleteForever={onDeleteForever}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    expect(onDeleteForever).toHaveBeenCalledTimes(1);
  });
});
