import { render, screen } from '@testing-library/react';
import QuoteBuilderPage from '@/app/(templates)/crm/quote-builder/page';

describe('QuoteBuilderPage', () => {
  it('renders the QuoteBuilderPage', () => {
    render(<QuoteBuilderPage />);
    expect(screen.getByText('No items yet')).toBeInTheDocument();
  });
});
