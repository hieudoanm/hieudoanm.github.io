import { render, screen } from '@testing-library/react';
import { SWProvider } from '@/providers/SWProvider';

describe('SWProvider', () => {
  it('renders children', () => {
    render(
      <SWProvider>
        <div>sw child</div>
      </SWProvider>
    );
    expect(screen.getByText('sw child')).toBeInTheDocument();
  });
});
