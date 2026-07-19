import { render, screen, fireEvent } from '@testing-library/react';
import GlobalError from '../global-error';

describe('global-error', () => {
  it('renders error content', () => {
    render(<GlobalError />);
    expect(screen.getByText('Error')).toBeTruthy();
    expect(screen.getByText('A critical error occurred')).toBeTruthy();
  });

  it('has try again button that reloads', () => {
    render(<GlobalError />);
    const btn = screen.getByText('Try Again');
    expect(btn).toBeTruthy();
    fireEvent.click(btn);
  });
});
