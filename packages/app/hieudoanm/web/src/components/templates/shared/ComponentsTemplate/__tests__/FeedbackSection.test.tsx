import { render, screen } from '@testing-library/react';
import { FeedbackSection } from '../FeedbackSection';

describe('FeedbackSection', () => {
  it('renders section heading', () => {
    render(<FeedbackSection />);
    expect(screen.getByText('Feedback & display')).toBeInTheDocument();
    expect(screen.getByText('Communicate every state')).toBeInTheDocument();
  });

  it('renders alerts', () => {
    render(<FeedbackSection />);
    expect(screen.getByText('Changes saved')).toBeInTheDocument();
    expect(screen.getByText('Payment failed')).toBeInTheDocument();
    expect(screen.getByText('Trial ending soon')).toBeInTheDocument();
    expect(screen.getByText('Scheduled maintenance')).toBeInTheDocument();
  });

  it('renders progress bars', () => {
    render(<FeedbackSection />);
    expect(screen.getByText('Uploading files')).toBeInTheDocument();
    expect(screen.getByText('Processing')).toBeInTheDocument();
    expect(screen.getByText('Indexing')).toBeInTheDocument();
  });

  it('renders steps', () => {
    render(<FeedbackSection />);
    expect(screen.getByText('Account')).toBeInTheDocument();
    expect(screen.getByText('Billing')).toBeInTheDocument();
  });

  it('renders skeletons', () => {
    render(<FeedbackSection />);
    expect(screen.getByText('Loading your workspace…')).toBeInTheDocument();
  });

  it('renders empty state', () => {
    render(<FeedbackSection />);
    expect(screen.getByText('No components yet')).toBeInTheDocument();
    expect(screen.getByText('Add component')).toBeInTheDocument();
  });

  it('to match snapshot', () => {
    const { container } = render(<FeedbackSection />);
    expect(container).toMatchSnapshot();
  });
});
