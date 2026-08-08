import { fireEvent, render, screen } from '@testing-library/react';
import { AccordionTemplate } from '../AccordionTemplate';

describe('AccordionTemplate', () => {
  it('renders four accordion items in the closed state', () => {
    render(<AccordionTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Accordion showcase' })
    ).toBeInTheDocument();
    expect(screen.getByText('What is this boilerplate?')).toBeInTheDocument();
    expect(screen.getByText('How do I add a new route?')).toBeInTheDocument();
    expect(
      screen.getByText('Can I use these templates in the desktop app?')
    ).toBeInTheDocument();
    expect(screen.getByText('How are tests organized?')).toBeInTheDocument();
    expect(screen.getAllByText('Closed')).toHaveLength(4);
    expect(screen.getByText('0 of 4 open')).toBeInTheDocument();
  });

  it('opens and closes an item when clicked', () => {
    render(<AccordionTemplate />);
    fireEvent.click(screen.getByText('What is this boilerplate?'));
    expect(screen.getAllByText('Open')).toHaveLength(1);
    expect(screen.getByText('1 of 4 open')).toBeInTheDocument();
    fireEvent.click(screen.getByText('What is this boilerplate?'));
    expect(screen.getAllByText('Closed')).toHaveLength(4);
    expect(screen.getByText('0 of 4 open')).toBeInTheDocument();
  });

  it('toggles a specific item with the control button', () => {
    render(<AccordionTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Toggle question 2' }));
    expect(screen.getAllByText('Open')).toHaveLength(1);
    expect(screen.getByText('1 of 4 open')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Toggle question 2' }));
    expect(screen.getAllByText('Closed')).toHaveLength(4);
  });
});
