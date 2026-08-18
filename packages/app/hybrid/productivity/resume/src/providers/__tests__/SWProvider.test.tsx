import { render, screen } from '@testing-library/react';
import { SWProvider } from '../SWProvider';

describe('SWProvider', () => {
  it('renders its children', () => {
    render(
      <SWProvider>
        <p>hello</p>
      </SWProvider>
    );
    expect(screen.getByText('hello')).toBeInTheDocument();
  });
});
