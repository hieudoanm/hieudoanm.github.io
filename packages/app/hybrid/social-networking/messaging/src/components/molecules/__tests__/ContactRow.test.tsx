import { render, screen, fireEvent } from '@testing-library/react';
import { ContactRow } from '@/components/molecules/ContactRow';
import type { Contact } from '@/types';

const contact: Contact = {
  id: 'alice',
  name: 'Alice Nguyen',
  phone: '+1 555 010 1001',
  username: 'alice',
  avatarColor: '#4da3ff',
  online: true,
  lastSeenAt: 1000,
  blocked: false,
  starred: true,
};

describe('ContactRow', () => {
  it('renders the name, online status and a star for starred contacts', () => {
    render(<ContactRow contact={contact} onSelect={jest.fn()} />);
    expect(screen.getByText('Alice Nguyen')).toBeInTheDocument();
    expect(screen.getAllByLabelText('online').length).toBeGreaterThan(0);
    expect(screen.getByLabelText('Starred')).toBeInTheDocument();
  });

  it('shows last seen for offline contacts', () => {
    render(
      <ContactRow
        contact={{
          ...contact,
          online: false,
          lastSeenAt: Date.now() - 10 * 60 * 1000,
        }}
        onSelect={jest.fn()}
      />
    );
    expect(screen.getByText(/last seen 10m ago/)).toBeInTheDocument();
  });

  it('calls onSelect with the contact id on click', () => {
    const onSelect = jest.fn();
    render(<ContactRow contact={contact} onSelect={onSelect} />);
    fireEvent.click(screen.getByLabelText('Start chat with Alice Nguyen'));
    expect(onSelect).toHaveBeenCalledWith('alice');
  });
});
