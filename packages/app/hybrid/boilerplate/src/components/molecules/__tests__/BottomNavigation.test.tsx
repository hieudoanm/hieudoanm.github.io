import { fireEvent, render, screen } from '@testing-library/react';
import { BottomNavigation } from '../BottomNavigation';

describe('BottomNavigation', () => {
  const items = [
    { label: 'Home', value: 'home' },
    { label: 'Mail', value: 'mail' },
  ];

  it('renders items and marks the active one', () => {
    render(
      <BottomNavigation items={items} value="home" onChange={jest.fn()} />
    );
    expect(screen.getByRole('button', { name: 'Home' })).toHaveAttribute(
      'aria-current',
      'page'
    );
    expect(screen.getByRole('button', { name: 'Home' })).toHaveClass('active');
    expect(screen.getByRole('button', { name: 'Mail' })).not.toHaveAttribute(
      'aria-current'
    );
  });

  it('calls onChange with the selected value', () => {
    const onChange = jest.fn();
    render(<BottomNavigation items={items} value="home" onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Mail' }));
    expect(onChange).toHaveBeenCalledWith('mail');
  });
});
