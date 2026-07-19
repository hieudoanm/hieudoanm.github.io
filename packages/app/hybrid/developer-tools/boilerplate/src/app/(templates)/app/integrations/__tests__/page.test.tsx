import { render, screen } from '@testing-library/react';
import IntegrationsPage from '@/app/(templates)/app/integrations/page';

describe('IntegrationsPage', () => {
  it('renders the IntegrationsPage', () => {
    render(<IntegrationsPage />);
    expect(screen.getByText('GitHub')).toBeInTheDocument();
  });
});
