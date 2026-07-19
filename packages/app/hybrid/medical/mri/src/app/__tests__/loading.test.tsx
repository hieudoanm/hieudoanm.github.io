import { render, screen } from '@testing-library/react';
import LoadingPage from '@/app/loading';

describe('LoadingPage', () => {
  it('renders a spinner', () => {
    render(<LoadingPage />);
    expect(document.querySelector('.loading')).toBeInTheDocument();
  });
});
