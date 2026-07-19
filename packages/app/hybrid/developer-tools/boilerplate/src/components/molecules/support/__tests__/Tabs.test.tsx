import { fireEvent, render, screen } from '@testing-library/react';
import { Tabs } from '../Tabs';

describe('Tabs', () => {
  const tabs = [
    { label: 'Tab A', value: 'a' },
    { label: 'Tab B', value: 'b' },
  ];

  it('renders tabs and highlights active value', () => {
    render(<Tabs tabs={tabs} value="a" onChange={jest.fn()} />);
    expect(screen.getByRole('button', { name: 'Tab A' })).toHaveClass(
      'text-primary'
    );
    expect(screen.getByRole('button', { name: 'Tab B' })).not.toHaveClass(
      'text-primary'
    );
  });

  it('calls onChange when tab is clicked', () => {
    const onChange = jest.fn();
    render(<Tabs tabs={tabs} value="a" onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Tab B' }));
    expect(onChange).toHaveBeenCalledWith('b');
  });
});
