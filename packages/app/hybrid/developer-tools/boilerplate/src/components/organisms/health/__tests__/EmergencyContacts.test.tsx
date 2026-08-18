import { render, screen } from '@testing-library/react';
import { EmergencyContacts } from '../EmergencyContacts';

const contacts = [
  { id: '1', name: 'Jane Doe', relation: 'Partner', phone: '+1-555-0100' },
  { id: '2', name: 'Bob Lee', relation: 'Sibling', phone: '+1-555-0101' },
];

describe('EmergencyContacts', () => {
  it('renders each contact with relation and phone', () => {
    render(<EmergencyContacts contacts={contacts} />);
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('Partner')).toBeInTheDocument();
    expect(screen.getByText('+1-555-0100')).toBeInTheDocument();
  });

  it('links the call action to the phone number', () => {
    render(<EmergencyContacts contacts={contacts} />);
    expect(screen.getByTestId('call-1')).toHaveAttribute(
      'href',
      'tel:+1-555-0100'
    );
  });

  it('shows an empty state when there are no contacts', () => {
    render(<EmergencyContacts contacts={[]} />);
    expect(screen.getByTestId('empty')).toHaveTextContent(
      'No emergency contacts.'
    );
  });
});
