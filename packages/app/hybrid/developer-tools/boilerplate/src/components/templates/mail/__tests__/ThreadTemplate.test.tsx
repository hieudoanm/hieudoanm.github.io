import { fireEvent, render, screen } from '@testing-library/react';
import { ThreadTemplate } from '../ThreadTemplate';

describe('ThreadTemplate', () => {
  it('renders the conversation and summary', () => {
    render(<ThreadTemplate />);
    expect(screen.getByRole('heading', { name: 'Thread' })).toBeInTheDocument();
    expect(screen.getByText('3 messages')).toBeInTheDocument();
    expect(
      screen.getByText('GitHub: Build passed for the latest commit.')
    ).toBeInTheDocument();
    expect(screen.getByText('You: Thanks for the update.')).toBeInTheDocument();
  });

  it('sends a reply and ignores empty replies', () => {
    render(<ThreadTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Reply' }));
    expect(screen.getByText('3 messages')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Reply'), {
      target: { value: 'Great work team.' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Reply' }));
    expect(screen.getByText('You: Great work team.')).toBeInTheDocument();
    expect(screen.getByText('4 messages')).toBeInTheDocument();
  });
});
