import { render, screen } from '@testing-library/react';
import { ChatFooter } from '../ChatFooter';

describe('ChatFooter', () => {
  it('to match snapshot', () => {
    const { container } = render(<ChatFooter />);
    expect(container).toMatchSnapshot();
  });

  it('renders default disclaimer', () => {
    render(<ChatFooter />);
    expect(screen.getByText(/AI responses are generated/)).toBeInTheDocument();
  });

  it('renders custom disclaimer', () => {
    render(<ChatFooter disclaimer="Custom notice" />);
    expect(screen.getByText('Custom notice')).toBeInTheDocument();
  });
});
