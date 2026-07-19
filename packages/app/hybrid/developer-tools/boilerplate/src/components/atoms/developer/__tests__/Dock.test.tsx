import { fireEvent, render, screen } from '@testing-library/react';
import { Dock } from '../Dock';

describe('Dock', () => {
  const items = [
    { key: 'home', label: 'Home', icon: '🏠', active: true },
    { key: 'mail', label: 'Mail', icon: '✉️' },
  ];

  it('renders items with icons and labels', () => {
    render(<Dock items={items} />);
    expect(
      screen.getByRole('navigation', { name: 'Dock' })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Mail' })).toBeInTheDocument();
  });

  it('marks the active item as pressed', () => {
    render(<Dock items={items} />);
    expect(screen.getByRole('button', { name: 'Home' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    expect(screen.getByRole('button', { name: 'Mail' })).toHaveAttribute(
      'aria-pressed',
      'false'
    );
  });

  it('calls onClick for an item', () => {
    const onClick = jest.fn();
    render(
      <Dock items={[{ key: 'home', label: 'Home', icon: '🏠', onClick }]} />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Home' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders a custom dock label', () => {
    render(<Dock items={items} label="App launcher" />);
    expect(screen.getByText('App launcher')).toBeInTheDocument();
  });
});
