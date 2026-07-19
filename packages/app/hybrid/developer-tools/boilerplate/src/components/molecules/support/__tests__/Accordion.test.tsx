import { fireEvent, render, screen } from '@testing-library/react';
import { Accordion } from '../Accordion';

describe('Accordion', () => {
  const items = [
    { id: 'a', title: 'First', content: 'First body' },
    { id: 'b', title: 'Second', content: 'Second body' },
  ];

  it('collapses all items initially', () => {
    render(<Accordion items={items} />);
    expect(screen.queryByText('First body')).not.toBeInTheDocument();
    expect(screen.queryByText('Second body')).not.toBeInTheDocument();
  });

  it('opens an item on title click', () => {
    render(<Accordion items={items} />);
    fireEvent.click(screen.getByRole('button', { name: 'First' }));
    expect(screen.getByText('First body')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'First' })).toHaveAttribute(
      'aria-expanded',
      'true'
    );
  });

  it('allows only one open item by default', () => {
    render(<Accordion items={items} />);
    fireEvent.click(screen.getByRole('button', { name: 'First' }));
    fireEvent.click(screen.getByRole('button', { name: 'Second' }));
    expect(screen.queryByText('First body')).not.toBeInTheDocument();
    expect(screen.getByText('Second body')).toBeInTheDocument();
  });

  it('allows multiple open items when multiple', () => {
    render(<Accordion items={items} multiple />);
    fireEvent.click(screen.getByRole('button', { name: 'First' }));
    fireEvent.click(screen.getByRole('button', { name: 'Second' }));
    expect(screen.getByText('First body')).toBeInTheDocument();
    expect(screen.getByText('Second body')).toBeInTheDocument();
  });
});
