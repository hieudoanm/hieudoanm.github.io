import { fireEvent, render, screen } from '@testing-library/react';
import { AddressBookTemplate } from '../AddressBookTemplate';

describe('AddressBookTemplate', () => {
  it('renders addresses with a default badge', () => {
    render(<AddressBookTemplate />);
    expect(screen.getByText('Address book (2)')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('456 Oak Ave')).toBeInTheDocument();
    expect(screen.getByText('+1 555-0102')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe').parentElement).toHaveTextContent(
      'Default'
    );
    expect(
      screen.getAllByRole('button', { name: 'Set as default' })
    ).toHaveLength(1);
  });

  it('adds an address via the modal', () => {
    render(<AddressBookTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Add address' }));
    expect(
      screen.getByRole('heading', { name: 'Add address' })
    ).toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText('Full name'), {
      target: { value: 'Ada Lovelace' },
    });
    fireEvent.change(screen.getByPlaceholderText('Street address'), {
      target: { value: '1 Analytical Way' },
    });
    fireEvent.change(screen.getByPlaceholderText('City'), {
      target: { value: 'London' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    expect(screen.getByText('Ada Lovelace')).toBeInTheDocument();
    expect(screen.getByText('+1 555-0000')).toBeInTheDocument();
    expect(screen.getByText('Address book (3)')).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: 'Add address' })
    ).not.toBeInTheDocument();
  });

  it('edits an address with pre-filled fields', () => {
    render(<AddressBookTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Edit' })[1]);
    expect(
      screen.getByRole('heading', { name: 'Edit address' })
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Full name')).toHaveValue('John Smith');
    expect(screen.getByPlaceholderText('Street address')).toHaveValue(
      '456 Oak Ave'
    );
    expect(screen.getByPlaceholderText('City')).toHaveValue('Portland');
    fireEvent.change(screen.getByPlaceholderText('Full name'), {
      target: { value: 'Johnny Smith' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    expect(screen.getByText('Johnny Smith')).toBeInTheDocument();
    expect(screen.queryByText('John Smith')).not.toBeInTheDocument();
  });

  it('deleting a non-default address keeps the default unchanged', () => {
    render(<AddressBookTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Delete' })[1]);
    expect(screen.queryByText('John Smith')).not.toBeInTheDocument();
    expect(screen.getByText('Jane Doe').parentElement).toHaveTextContent(
      'Default'
    );
    expect(
      screen.queryAllByRole('button', { name: 'Set as default' })
    ).toHaveLength(0);
  });

  it('promotes the next address when the default is deleted', () => {
    render(<AddressBookTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Delete' })[0]);
    expect(screen.queryByText('Jane Doe')).not.toBeInTheDocument();
    expect(screen.getByText('John Smith').parentElement).toHaveTextContent(
      'Default'
    );
    expect(
      screen.queryAllByRole('button', { name: 'Set as default' })
    ).toHaveLength(0);
  });

  it('promotes the first remaining address when a default with others is deleted', () => {
    render(<AddressBookTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Add address' }));
    fireEvent.change(screen.getByPlaceholderText('Full name'), {
      target: { value: 'Ada Lovelace' },
    });
    fireEvent.change(screen.getByPlaceholderText('Street address'), {
      target: { value: '1 Analytical Way' },
    });
    fireEvent.change(screen.getByPlaceholderText('City'), {
      target: { value: 'London' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    fireEvent.click(screen.getAllByRole('button', { name: 'Delete' })[0]);
    expect(screen.getByText('John Smith').parentElement).toHaveTextContent(
      'Default'
    );
    expect(
      screen.getByText('Ada Lovelace').parentElement
    ).not.toHaveTextContent('Default');
    expect(
      screen.getAllByRole('button', { name: 'Set as default' })
    ).toHaveLength(1);
  });

  it('updates the default badge via set as default', () => {
    render(<AddressBookTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Set as default' }));
    expect(screen.getByText('John Smith').parentElement).toHaveTextContent(
      'Default'
    );
    expect(screen.getByText('Jane Doe').parentElement).not.toHaveTextContent(
      'Default'
    );
    expect(
      screen.getAllByRole('button', { name: 'Set as default' })
    ).toHaveLength(1);
  });

  it('shows empty state and marks the first added address as default', () => {
    render(<AddressBookTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Delete' })[0]);
    fireEvent.click(screen.getAllByRole('button', { name: 'Delete' })[0]);
    expect(screen.getByText('No saved addresses yet')).toBeInTheDocument();
    fireEvent.click(
      screen.getByRole('button', { name: 'Add your first address' })
    );
    fireEvent.change(screen.getByPlaceholderText('Full name'), {
      target: { value: 'Ada Lovelace' },
    });
    fireEvent.change(screen.getByPlaceholderText('Street address'), {
      target: { value: '1 Analytical Way' },
    });
    fireEvent.change(screen.getByPlaceholderText('City'), {
      target: { value: 'London' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    expect(screen.getByText('Address book (1)')).toBeInTheDocument();
    expect(screen.getByText('Ada Lovelace').parentElement).toHaveTextContent(
      'Default'
    );
  });
});
