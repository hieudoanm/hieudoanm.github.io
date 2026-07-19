import { render, screen } from '@testing-library/react';
import FaqPage from '@/app/(templates)/support/faqs/page';

describe('FaqPage', () => {
  it('renders the FaqPage', () => {
    render(<FaqPage />);
    expect(screen.getByText('5 FAQs')).toBeInTheDocument();
  });
});
