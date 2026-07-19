import { fireEvent, render, screen } from '@testing-library/react';
import { DraftItem } from '../DraftItem';

describe('DraftItem', () => {
  it('renders recipient, subject, preview and timestamp', () => {
    render(
      <DraftItem
        to="Alice"
        subject="Ideas"
        preview="Quick thoughts"
        updatedAt="2h ago"
      />
    );
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Ideas')).toBeInTheDocument();
    expect(screen.getByText(/Quick thoughts/)).toBeInTheDocument();
    expect(screen.getByText('2h ago')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = jest.fn();
    render(
      <DraftItem
        to="Alice"
        subject="Ideas"
        preview="P"
        updatedAt="2h"
        onClick={onClick}
      />
    );
    fireEvent.click(screen.getByTestId('draft-item'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
