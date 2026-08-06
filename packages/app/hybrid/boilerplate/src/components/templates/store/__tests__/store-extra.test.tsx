import { fireEvent, render, screen } from '@testing-library/react';
import { AddressBookTemplate } from '../AddressBookTemplate';
import { CompareTemplate } from '../CompareTemplate';
import { OrderTrackingTemplate } from '../OrderTrackingTemplate';
import { PaymentMethodsTemplate } from '../PaymentMethodsTemplate';
import { WishlistTemplate } from '../WishlistTemplate';
import WishlistPage from '@/app/(main)/store/wishlist/page';
import ComparePage from '@/app/(main)/store/compare/page';
import AddressesPage from '@/app/(main)/store/addresses/page';
import PaymentMethodsPage from '@/app/(main)/store/payment-methods/page';
import TrackingPage from '@/app/(main)/store/tracking/page';

describe('WishlistTemplate', () => {
  it('renders wishlist products and count', () => {
    render(<WishlistTemplate />);
    expect(screen.getByText('Wishlist (3)')).toBeInTheDocument();
    expect(screen.getByText('Ergonomic Chair')).toBeInTheDocument();
    expect(screen.getByText('Studio Headphones')).toBeInTheDocument();
    expect(screen.getByText('$159')).toBeInTheDocument();
    expect(screen.getByText('Audio')).toBeInTheDocument();
  });

  it('moves a product to cart and shows confirmation', () => {
    render(<WishlistTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Move to cart' })[0]);
    expect(screen.queryByText('Ergonomic Chair')).not.toBeInTheDocument();
    expect(screen.getByText('Wishlist (2)')).toBeInTheDocument();
    expect(
      screen.getByText('Added Ergonomic Chair to your cart')
    ).toBeInTheDocument();
  });

  it('removes a product with the X button', () => {
    render(<WishlistTemplate />);
    fireEvent.click(
      screen.getByRole('button', { name: 'Remove Studio Headphones' })
    );
    expect(screen.queryByText('Studio Headphones')).not.toBeInTheDocument();
    expect(screen.getByText('Wishlist (2)')).toBeInTheDocument();
    expect(screen.queryByText(/Added .* to your cart/)).not.toBeInTheDocument();
  });

  it('shows empty state when all products are removed', () => {
    render(<WishlistTemplate />);
    fireEvent.click(
      screen.getByRole('button', { name: 'Remove Ergonomic Chair' })
    );
    fireEvent.click(
      screen.getByRole('button', { name: 'Remove Mechanical Keyboard' })
    );
    fireEvent.click(
      screen.getByRole('button', { name: 'Remove Studio Headphones' })
    );
    expect(screen.getByText('Your wishlist is empty')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Browse store' })).toHaveAttribute(
      'href',
      '/store'
    );
  });
});

describe('CompareTemplate', () => {
  it('renders comparison table with three products', () => {
    render(<CompareTemplate />);
    expect(screen.getByText('Compare (3)')).toBeInTheDocument();
    expect(screen.getByText('Ergonomic Chair')).toBeInTheDocument();
    expect(screen.getAllByText('$349').length).toBe(2);
    expect(screen.getByText('4.7 / 5')).toBeInTheDocument();
    expect(screen.getAllByText('In stock').length).toBe(2);
    expect(screen.getByText('Low stock')).toBeInTheDocument();
    expect(screen.getByText('Adjustable height')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /Remove / })).toHaveLength(3);
  });

  it('adds a fourth product column via the select', () => {
    render(<CompareTemplate />);
    fireEvent.change(screen.getByRole('combobox', { name: 'Add product' }), {
      target: { value: '4' },
    });
    expect(screen.getByText('Compare (4)')).toBeInTheDocument();
    expect(screen.getByText('Wireless Mouse')).toBeInTheDocument();
    expect(screen.getByText('Out of stock')).toBeInTheDocument();
    expect(screen.getByText('Silent clicks')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /Remove / })).toHaveLength(4);
  });

  it('removes a product column via the X button', () => {
    render(<CompareTemplate />);
    fireEvent.click(
      screen.getByRole('button', { name: 'Remove Mechanical Keyboard' })
    );
    expect(screen.getByText('Compare (2)')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Remove Mechanical Keyboard' })
    ).not.toBeInTheDocument();
  });

  it('re-adds a removed product via the select', () => {
    render(<CompareTemplate />);
    fireEvent.click(
      screen.getByRole('button', { name: 'Remove Mechanical Keyboard' })
    );
    fireEvent.change(screen.getByRole('combobox', { name: 'Add product' }), {
      target: { value: '2' },
    });
    expect(screen.getByText('Compare (3)')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Remove Mechanical Keyboard' })
    ).toBeInTheDocument();
  });

  it('ignores an empty select change', () => {
    render(<CompareTemplate />);
    fireEvent.change(screen.getByRole('combobox', { name: 'Add product' }), {
      target: { value: '' },
    });
    expect(screen.getByText('Compare (3)')).toBeInTheDocument();
  });

  it('shows empty state when all products are removed', () => {
    render(<CompareTemplate />);
    fireEvent.click(
      screen.getByRole('button', { name: 'Remove Ergonomic Chair' })
    );
    fireEvent.click(
      screen.getByRole('button', { name: 'Remove Mechanical Keyboard' })
    );
    fireEvent.click(
      screen.getByRole('button', { name: 'Remove Studio Headphones' })
    );
    expect(
      screen.getByText('Add products to start comparing')
    ).toBeInTheDocument();
  });
});

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

describe('PaymentMethodsTemplate', () => {
  it('renders saved cards with default and expired badges', () => {
    render(<PaymentMethodsTemplate />);
    expect(screen.getByText('Visa ending in 4242')).toBeInTheDocument();
    expect(
      screen.getByText('Visa ending in 4242').parentElement
    ).toHaveTextContent('Default');
    expect(
      screen.getByText('Mastercard ending in 5555').parentElement
    ).toHaveTextContent('Expired');
    expect(screen.getByText('Expires 12/27')).toBeInTheDocument();
    expect(
      screen.getAllByRole('button', { name: 'Set as default' })
    ).toHaveLength(1);
  });

  it('shows an error when the card number is empty', () => {
    render(<PaymentMethodsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Add card' }));
    expect(screen.getByText('Card number required')).toBeInTheDocument();
  });

  it('adds a Visa card', () => {
    render(<PaymentMethodsTemplate />);
    fireEvent.change(screen.getByPlaceholderText('1234 5678 9012 3456'), {
      target: { value: '4111 1111 1111 1234' },
    });
    fireEvent.change(screen.getByPlaceholderText('MM/YY'), {
      target: { value: '09/29' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add card' }));
    expect(screen.getByText('Visa ending in 1234')).toBeInTheDocument();
    expect(screen.getByText('Expires 09/29')).toBeInTheDocument();
    expect(screen.queryByText('Card number required')).not.toBeInTheDocument();
  });

  it('adds a Mastercard when the number does not start with 4', () => {
    render(<PaymentMethodsTemplate />);
    fireEvent.change(screen.getByPlaceholderText('1234 5678 9012 3456'), {
      target: { value: '5555 5555 5555 8888' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add card' }));
    expect(screen.getByText('Mastercard ending in 8888')).toBeInTheDocument();
  });

  it('adds a card with no digits using fallbacks', () => {
    render(<PaymentMethodsTemplate />);
    fireEvent.change(screen.getByPlaceholderText('1234 5678 9012 3456'), {
      target: { value: 'abc' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add card' }));
    expect(screen.getByText('Mastercard ending in 0000')).toBeInTheDocument();
    expect(screen.getByText('Expires MM/YY')).toBeInTheDocument();
  });

  it('removes a saved card', () => {
    render(<PaymentMethodsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Remove' })[1]);
    expect(
      screen.queryByText('Mastercard ending in 5555')
    ).not.toBeInTheDocument();
    expect(screen.getByText('Visa ending in 4242')).toBeInTheDocument();
  });

  it('updates the default badge via set as default', () => {
    render(<PaymentMethodsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Set as default' }));
    expect(
      screen.getByText('Mastercard ending in 5555').parentElement
    ).toHaveTextContent('Default');
    expect(
      screen.getByText('Visa ending in 4242').parentElement
    ).not.toHaveTextContent('Default');
  });

  it('shows empty state and marks the first added card as default', () => {
    render(<PaymentMethodsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Remove' })[0]);
    fireEvent.click(screen.getAllByRole('button', { name: 'Remove' })[0]);
    expect(screen.getByText('No saved payment methods')).toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText('1234 5678 9012 3456'), {
      target: { value: '4111 1111 1111 4321' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add card' }));
    expect(screen.getByText('Visa ending in 4321')).toBeInTheDocument();
    expect(
      screen.getByText('Visa ending in 4321').parentElement
    ).toHaveTextContent('Default');
  });
});

describe('OrderTrackingTemplate', () => {
  it('renders order header and timeline steps', () => {
    render(<OrderTrackingTemplate />);
    expect(screen.getByText('ORD-2026-0174')).toBeInTheDocument();
    expect(screen.getByText('Aug 2, 2026')).toBeInTheDocument();
    expect(screen.getByText('$746')).toBeInTheDocument();
    expect(screen.getByText('Processing')).toBeInTheDocument();
    expect(screen.getByText('Out for delivery')).toBeInTheDocument();
    expect(screen.getByText('In transit')).toBeInTheDocument();
    expect(screen.getByText('Pending')).toBeInTheDocument();
  });

  it('renders the progress bar at 75%', () => {
    const { container } = render(<OrderTrackingTemplate />);
    expect(screen.getByText('75%')).toBeInTheDocument();
    const bar = container.querySelector('.bg-primary');
    expect(bar).toHaveStyle('width: 75%');
  });

  it('toggles the map note', () => {
    render(<OrderTrackingTemplate />);
    expect(
      screen.queryByText('Map preview not available offline')
    ).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Track on map' }));
    expect(
      screen.getByText('Map preview not available offline')
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Track on map' }));
    expect(
      screen.queryByText('Map preview not available offline')
    ).not.toBeInTheDocument();
  });

  it('renders decorative action links', () => {
    render(<OrderTrackingTemplate />);
    expect(
      screen.getByRole('link', { name: 'Contact courier' })
    ).toHaveAttribute('href', '#');
    expect(screen.getByRole('link', { name: 'Need help?' })).toHaveAttribute(
      'href',
      '#'
    );
  });
});

describe('Store pages', () => {
  it('renders the wishlist page', () => {
    render(<WishlistPage />);
    expect(screen.getByText('Wishlist (3)')).toBeInTheDocument();
  });

  it('renders the compare page', () => {
    render(<ComparePage />);
    expect(screen.getByText('Compare (3)')).toBeInTheDocument();
  });

  it('renders the addresses page', () => {
    render(<AddressesPage />);
    expect(screen.getByText('Address book (2)')).toBeInTheDocument();
  });

  it('renders the payment methods page', () => {
    render(<PaymentMethodsPage />);
    expect(screen.getByText('Visa ending in 4242')).toBeInTheDocument();
  });

  it('renders the tracking page', () => {
    render(<TrackingPage />);
    expect(screen.getByText('ORD-2026-0174')).toBeInTheDocument();
  });
});
