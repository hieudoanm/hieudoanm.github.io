import { render, screen } from '@testing-library/react';
import { WindowMockup } from '../WindowMockup';

describe('WindowMockup', () => {
  it('renders title and children', () => {
    render(<WindowMockup title="Terminal">Output</WindowMockup>);
    expect(screen.getByText('Terminal')).toBeInTheDocument();
    expect(screen.getByText('Output')).toBeInTheDocument();
  });

  it('renders the top bar without a title', () => {
    const { container } = render(<WindowMockup>Body</WindowMockup>);
    expect(
      container.querySelector('.window-mockup-top-bar')
    ).toBeInTheDocument();
  });
});
