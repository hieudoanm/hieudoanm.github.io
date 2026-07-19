import { render, screen } from '@testing-library/react';
import { AnalysisCard } from '../AnalysisCard';

describe('AnalysisCard', () => {
  it('renders the title and analysis badge', () => {
    render(<AnalysisCard title="Rate cut outlook" />);
    expect(screen.getByText('Rate cut outlook')).toBeInTheDocument();
    expect(screen.getByText('Analysis')).toBeInTheDocument();
  });

  it('renders summary when provided', () => {
    render(<AnalysisCard title="Outlook" summary="Markets expect a hold." />);
    expect(screen.getByText('Markets expect a hold.')).toBeInTheDocument();
  });

  it('renders tags with hash prefix', () => {
    render(<AnalysisCard title="Outlook" tags={['rates', 'fed']} />);
    expect(screen.getByText('#rates')).toBeInTheDocument();
    expect(screen.getByText('#fed')).toBeInTheDocument();
  });

  it('renders author and time when provided', () => {
    render(<AnalysisCard title="Outlook" author="Minh" time="2h ago" />);
    expect(screen.getByText('Minh')).toBeInTheDocument();
    expect(screen.getByText('2h ago')).toBeInTheDocument();
  });
});
