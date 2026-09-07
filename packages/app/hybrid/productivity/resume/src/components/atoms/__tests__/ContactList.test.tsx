import { render, screen } from '@testing-library/react';
import { ContactList } from '../ContactList';

describe('ContactList', () => {
  it('filters blank contact items', () => {
    render(<ContactList items={['a@b.com', '  ']} />);
    expect(screen.getByText('a@b.com')).toBeInTheDocument();
  });
});
