import { render, screen } from '@solidjs/testing-library';
import { ChatFooter } from '../ChatFooter';

describe('ChatFooter', () => {
  it('renders default disclaimer', () => {
    render(() => <ChatFooter />);
    expect(screen.getByText(/AI responses are generated/i)).toBeInTheDocument();
  });

  it('renders custom disclaimer', () => {
    render(() => <ChatFooter disclaimer="Custom message" />);
    expect(screen.getByText('Custom message')).toBeInTheDocument();
  });
});
