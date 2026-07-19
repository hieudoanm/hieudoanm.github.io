import { fireEvent, render, screen } from '@testing-library/react';
import ReviewsPage from '@/app/(templates)/store/reviews/page';
import { ReviewsTemplate } from '../ReviewsTemplate';

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
