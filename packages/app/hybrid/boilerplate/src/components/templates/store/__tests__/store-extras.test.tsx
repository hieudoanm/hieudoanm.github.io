import { fireEvent, render, screen } from '@testing-library/react';
import { CategoriesTemplate } from '../CategoriesTemplate';
import { DealsTemplate } from '../DealsTemplate';
import { GiftCardsTemplate } from '../GiftCardsTemplate';
import { ReviewsTemplate } from '../ReviewsTemplate';
import { SupportTemplate } from '../SupportTemplate';
import CategoriesPage from '@/app/(main)/store/categories/page';
import DealsPage from '@/app/(main)/store/deals/page';
import GiftCardsPage from '@/app/(main)/store/gift-cards/page';
import ReviewsPage from '@/app/(main)/store/reviews/page';
import SupportPage from '@/app/(main)/store/support/page';

describe('DealsTemplate', () => {
  it('renders deals with discounts and expiry', () => {
    render(<DealsTemplate />);
    expect(screen.getByText('40% OFF')).toBeInTheDocument();
    expect(screen.getByText('Ergonomic Chair')).toBeInTheDocument();
    expect(screen.getByText('$349')).toBeInTheDocument();
    expect(screen.getByText('$209')).toBeInTheDocument();
    expect(screen.getByText('Ends Aug 20, 2026')).toBeInTheDocument();
    expect(screen.getByText('0 deals claimed')).toBeInTheDocument();
  });

  it('claims a deal and updates the summary', () => {
    render(<DealsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Claim deal' })[0]);
    expect(screen.getByText('1 deals claimed')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Claimed' })).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: 'Claim deal' })).toHaveLength(
      3
    );
  });

  it('claims all deals', () => {
    render(<DealsTemplate />);
    const buttons = screen.getAllByRole('button', { name: 'Claim deal' });
    buttons.forEach((button) => fireEvent.click(button));
    expect(screen.getByText('4 deals claimed')).toBeInTheDocument();
    expect(
      screen.queryAllByRole('button', { name: 'Claim deal' })
    ).toHaveLength(0);
    expect(screen.getAllByRole('button', { name: 'Claimed' })).toHaveLength(4);
  });

  it('renders the DealsPage', () => {
    render(<DealsPage />);
    expect(screen.getByText('40% OFF')).toBeInTheDocument();
  });
});

describe('CategoriesTemplate', () => {
  it('renders categories with counts', () => {
    render(<CategoriesTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Browse categories' })
    ).toBeInTheDocument();
    expect(screen.getByText('4 categories')).toBeInTheDocument();
    expect(screen.getByText('Electronics')).toBeInTheDocument();
    expect(screen.getByText('24 items')).toBeInTheDocument();
  });

  it('filters categories by search', () => {
    render(<CategoriesTemplate />);
    fireEvent.change(screen.getByPlaceholderText('Search categories'), {
      target: { value: 'audio' },
    });
    expect(screen.getByText('Audio')).toBeInTheDocument();
    expect(screen.queryByText('Electronics')).not.toBeInTheDocument();
    expect(screen.getByText('1 categories')).toBeInTheDocument();
  });

  it('expands a category to show its products', () => {
    render(<CategoriesTemplate />);
    expect(screen.queryByText('Wireless Mouse')).not.toBeInTheDocument();
    fireEvent.click(
      screen.getByRole('button', { name: 'Electronics 24 items' })
    );
    expect(screen.getByText('Wireless Mouse')).toBeInTheDocument();
    fireEvent.click(
      screen.getByRole('button', { name: 'Electronics 24 items' })
    );
    expect(screen.queryByText('Wireless Mouse')).not.toBeInTheDocument();
  });

  it('shows the empty state when no category matches', () => {
    render(<CategoriesTemplate />);
    fireEvent.change(screen.getByPlaceholderText('Search categories'), {
      target: { value: 'zzz' },
    });
    expect(screen.getByText('No categories found')).toBeInTheDocument();
  });

  it('renders the CategoriesPage', () => {
    render(<CategoriesPage />);
    expect(screen.getByText('4 categories')).toBeInTheDocument();
  });
});

describe('ReviewsTemplate', () => {
  it('renders reviews with a rating summary', () => {
    render(<ReviewsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Product reviews' })
    ).toBeInTheDocument();
    expect(screen.getByText('4.2 / 5')).toBeInTheDocument();
    expect(screen.getByText('5 reviews')).toBeInTheDocument();
    expect(screen.getByText('Minh Tran')).toBeInTheDocument();
    expect(screen.getByText('Dan Lee')).toBeInTheDocument();
  });

  it('increments the helpful count', () => {
    render(<ReviewsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Helpful (12)' }));
    expect(
      screen.getByRole('button', { name: 'Helpful (13)' })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Helpful (12)' })
    ).not.toBeInTheDocument();
  });

  it('filters to critical reviews', () => {
    render(<ReviewsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Critical' }));
    expect(screen.getByText('Dan Lee')).toBeInTheDocument();
    expect(screen.queryByText('Minh Tran')).not.toBeInTheDocument();
  });

  it('filters to positive reviews', () => {
    render(<ReviewsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Positive' }));
    expect(screen.getByText('Minh Tran')).toBeInTheDocument();
    expect(screen.getByText('Sara Kim')).toBeInTheDocument();
    expect(screen.queryByText('Dan Lee')).not.toBeInTheDocument();
  });

  it('renders the ReviewsPage', () => {
    render(<ReviewsPage />);
    expect(screen.getByText('4.2 / 5')).toBeInTheDocument();
  });
});

describe('SupportTemplate', () => {
  it('renders FAQ questions and the contact form', () => {
    render(<SupportTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Support' })
    ).toBeInTheDocument();
    expect(
      screen.getByText('How long does shipping take?')
    ).toBeInTheDocument();
    expect(screen.getByText('What is your return policy?')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Subject')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Describe your issue')
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Send message' })
    ).toBeInTheDocument();
  });

  it('validates the contact form', () => {
    render(<SupportTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Send message' }));
    expect(
      screen.getByText('Subject and message are required')
    ).toBeInTheDocument();
  });

  it('shows a confirmation after sending a message', () => {
    render(<SupportTemplate />);
    fireEvent.change(screen.getByPlaceholderText('Subject'), {
      target: { value: 'Shipping delay' },
    });
    fireEvent.change(screen.getByPlaceholderText('Describe your issue'), {
      target: { value: 'My order is late.' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Send message' }));
    expect(
      screen.getByText('Message sent, we reply within 24h')
    ).toBeInTheDocument();
  });

  it('toggles the chat panel', () => {
    render(<SupportTemplate />);
    expect(
      screen.queryByText('Hi! How can we help you today?')
    ).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Chat with us' }));
    expect(
      screen.getByText('Hi! How can we help you today?')
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Chat with us' }));
    expect(
      screen.queryByText('Hi! How can we help you today?')
    ).not.toBeInTheDocument();
  });

  it('renders the SupportPage', () => {
    render(<SupportPage />);
    expect(
      screen.getByRole('heading', { name: 'Support' })
    ).toBeInTheDocument();
  });
});

describe('GiftCardsTemplate', () => {
  it('renders amount options and the form', () => {
    render(<GiftCardsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Gift cards' })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '$25' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '$50' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '$100' })).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('friend@example.com')
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Buy gift card' })
    ).toBeInTheDocument();
  });

  it('highlights the selected amount', () => {
    render(<GiftCardsTemplate />);
    expect(screen.getByRole('button', { name: '$50' })).toHaveClass(
      'btn-primary'
    );
    fireEvent.click(screen.getByRole('button', { name: '$100' }));
    expect(screen.getByRole('button', { name: '$100' })).toHaveClass(
      'btn-primary'
    );
    expect(screen.getByRole('button', { name: '$50' })).not.toHaveClass(
      'btn-primary'
    );
  });

  it('shows an error when the email is empty', () => {
    render(<GiftCardsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Buy gift card' }));
    expect(screen.getByText('Enter a valid email')).toBeInTheDocument();
  });

  it('shows an error for an invalid email', () => {
    render(<GiftCardsTemplate />);
    fireEvent.change(screen.getByPlaceholderText('friend@example.com'), {
      target: { value: 'not-an-email' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Buy gift card' }));
    expect(screen.getByText('Enter a valid email')).toBeInTheDocument();
  });

  it('purchases a gift card with the selected amount', () => {
    render(<GiftCardsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: '$100' }));
    fireEvent.change(screen.getByPlaceholderText('friend@example.com'), {
      target: { value: 'jane@example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Buy gift card' }));
    expect(
      screen.getByRole('heading', { name: 'Gift card purchased' })
    ).toBeInTheDocument();
    expect(
      screen.getByText('A $100 gift card is on its way to jane@example.com.')
    ).toBeInTheDocument();
  });

  it('renders the GiftCardsPage', () => {
    render(<GiftCardsPage />);
    expect(
      screen.getByRole('heading', { name: 'Gift cards' })
    ).toBeInTheDocument();
  });
});
