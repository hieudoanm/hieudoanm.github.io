import { render, screen } from '@testing-library/react';
import OpinionPage from '@/app/(templates)/news/opinion/page';

describe('OpinionPage', () => {
  it('renders the OpinionPage', () => {
    render(<OpinionPage />);
    expect(screen.getByText('6 columns')).toBeInTheDocument();
  });
});
