import { fireEvent, render, screen, within } from '@testing-library/react';
import { CampaignsTemplate } from '../CampaignsTemplate';

describe('CampaignsTemplate', () => {
  it('renders all campaigns and the summary', () => {
    render(<CampaignsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Campaigns' })
    ).toBeInTheDocument();
    expect(screen.getByText('5 campaigns')).toBeInTheDocument();
    expect(screen.getByText('12,400 sent')).toBeInTheDocument();
    expect(screen.getByText('23,000 sent')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Launch' })).toHaveLength(2);
  });

  it('filters campaigns by status', () => {
    render(<CampaignsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Completed' }));
    expect(screen.getByText('2 campaigns')).toBeInTheDocument();
    expect(screen.getByText('Brand Awareness')).toBeInTheDocument();
    expect(screen.queryByText('Spring Newsletter')).not.toBeInTheDocument();
  });

  it('launches a draft campaign', () => {
    render(<CampaignsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Launch' })[0]);
    expect(screen.getAllByRole('button', { name: 'Launch' })).toHaveLength(1);
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Running')).toHaveLength(2);
    expect(within(table).getAllByText('Draft')).toHaveLength(1);
  });
});
