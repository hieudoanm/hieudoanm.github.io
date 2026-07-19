import { render, screen, fireEvent } from '@testing-library/react';
import Error from '../error';

describe('error', () => {
  it('renders error content', () => {
    render(<Error />);
    expect(screen.getByText('Error')).toBeTruthy();
    expect(screen.getByText('Something went wrong')).toBeTruthy();
  });

  it('has try again button that reloads', () => {
    render(<Error />);
    const btn = screen.getByText('Try Again');
    expect(btn).toBeTruthy();
    fireEvent.click(btn);
  });
});
