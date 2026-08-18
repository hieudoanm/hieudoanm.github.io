import { render, screen } from '@testing-library/react';
import { SWProvider } from '@/components/SWProvider';

describe('SWProvider', () => {
  it('renders children', () => {
    render(
      <SWProvider>
        <span>hello</span>
      </SWProvider>
    );
    expect(screen.getByText('hello')).toBeInTheDocument();
  });
});
