import { render, screen, within } from '@testing-library/react';
import { SentTemplate } from '../SentTemplate';

describe('SentTemplate', () => {
  it('renders sent messages with status badges', () => {
    render(<SentTemplate />);
    expect(screen.getByRole('heading', { name: 'Sent' })).toBeInTheDocument();
    expect(screen.getByText('5 sent messages')).toBeInTheDocument();
    expect(screen.getByText('alice@acme.com')).toBeInTheDocument();
    expect(screen.getByText('Q3 roadmap review')).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Read')).toHaveLength(3);
    expect(within(table).getAllByText('Delivered')).toHaveLength(2);
  });
});
