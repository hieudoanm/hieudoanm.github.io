import { render, screen } from '@testing-library/react';
import CampaignsPage from '@/app/(templates)/crm/campaigns/page';

describe('CampaignsPage', () => {
  it('renders the CampaignsPage', () => {
    render(<CampaignsPage />);
    expect(screen.getByText('5 campaigns')).toBeInTheDocument();
  });
});
