import { render, screen } from '@testing-library/react';
import EndpointsPage from '@/app/(templates)/developer/endpoints/page';

describe('EndpointsPage', () => {
  it('renders the EndpointsPage', () => {
    render(<EndpointsPage />);
    expect(screen.getByText('8 endpoints')).toBeInTheDocument();
  });
});
