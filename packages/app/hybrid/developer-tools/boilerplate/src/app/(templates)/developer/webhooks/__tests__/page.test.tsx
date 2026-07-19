import { render, screen } from '@testing-library/react';
import WebhooksPage from '@/app/(templates)/developer/webhooks/page';

describe('WebhooksPage', () => {
  it('renders the WebhooksPage', () => {
    render(<WebhooksPage />);
    expect(screen.getByText('Deployments')).toBeInTheDocument();
  });
});
