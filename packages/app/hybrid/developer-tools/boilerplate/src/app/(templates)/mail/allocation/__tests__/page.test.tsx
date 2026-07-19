import { render, screen } from '@testing-library/react';
import AllocationPage from '@/app/(templates)/mail/allocation/page';

describe('AllocationPage', () => {
  it('renders the AllocationPage', () => {
    render(<AllocationPage />);
    expect(
      screen.getByRole('heading', { name: 'Allocation' })
    ).toBeInTheDocument();
    expect(screen.getByText('100% allocated')).toBeInTheDocument();
  });
});
