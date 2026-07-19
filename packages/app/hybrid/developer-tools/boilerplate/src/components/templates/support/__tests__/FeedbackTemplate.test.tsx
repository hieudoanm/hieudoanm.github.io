import { fireEvent, render, screen } from '@testing-library/react';
import { FeedbackTemplate } from '../FeedbackTemplate';

describe('FeedbackTemplate', () => {
  it('renders the rating buttons and default summary', () => {
    render(<FeedbackTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Feedback' })
    ).toBeInTheDocument();
    expect(screen.getByText('Rating —/5')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Rate 1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Rate 5' })).toBeInTheDocument();
  });

  it('shows an error when submitting without a rating', () => {
    render(<FeedbackTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Select a rating first'
    );
    expect(
      screen.queryByText('Thanks for your feedback')
    ).not.toBeInTheDocument();
  });

  it('submits feedback with a rating', () => {
    render(<FeedbackTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Rate 4' }));
    expect(screen.getByText('Rating 4/5')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    expect(screen.getByText('Thanks for your feedback')).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
