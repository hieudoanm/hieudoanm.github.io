import { render, screen } from '@testing-library/react';
import AccordionPage from '@/app/(templates)/hr/accordion/page';

describe('AccordionPage', () => {
  it('renders the accordion page', () => {
    render(<AccordionPage />);
    expect(
      screen.getByRole('heading', { name: 'Accordion showcase' })
    ).toBeInTheDocument();
  });
});
