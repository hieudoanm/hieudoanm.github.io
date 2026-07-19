import { render, screen } from '@testing-library/react';
import FormsShowcasePage from '@/app/(templates)/hr/forms/page';

describe('FormsShowcasePage', () => {
  it('renders the forms showcase page', () => {
    render(<FormsShowcasePage />);
    expect(
      screen.getByRole('heading', { name: 'Forms showcase' })
    ).toBeInTheDocument();
  });
});
