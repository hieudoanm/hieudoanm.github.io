import { fireEvent, render, screen } from '@testing-library/react';
import { Tag } from '../Tag';

describe('Tag', () => {
  it('renders label with default variant', () => {
    render(<Tag label="React" />);
    expect(screen.getByText('React')).toHaveClass('badge-neutral');
  });

  it('applies variant class', () => {
    render(<Tag label="React" variant="primary" />);
    expect(screen.getByText('React')).toHaveClass('badge-primary');
  });

  it('renders remove button and calls onRemove', () => {
    const onRemove = jest.fn();
    render(<Tag label="React" onRemove={onRemove} />);
    fireEvent.click(screen.getByRole('button', { name: 'Remove React tag' }));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });
});
