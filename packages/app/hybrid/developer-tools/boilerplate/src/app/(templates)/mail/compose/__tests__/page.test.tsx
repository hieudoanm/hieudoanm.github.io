import { render, screen } from '@testing-library/react';
import ComposePage from '@/app/(templates)/mail/compose/page';

describe('ComposePage', () => {
  it('renders the ComposePage', () => {
    render(<ComposePage />);
    expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument();
  });
});
