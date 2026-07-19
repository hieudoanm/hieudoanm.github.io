import { render } from '@testing-library/react';
import { SortIcon } from '../SortIcon';

jest.mock('../../icons', () => ({
  IcoChevUp: () => <span data-testid="chev-up">Up</span>,
  IcoChevDown: () => <span data-testid="chev-down">Down</span>,
  IcoChevronsUpDown: ({ className }: { className?: string }) => (
    <span data-testid="chevrons" className={className}>
      UpDown
    </span>
  ),
}));

describe('SortIcon', () => {
  it('renders chevrons-up-down when not active', () => {
    const { container } = render(<SortIcon active={false} dir={0} />);
    expect(
      container.querySelector('[data-testid="chevrons"]')
    ).toBeInTheDocument();
  });

  it('renders chev-up when active and dir is 1', () => {
    const { container } = render(<SortIcon active={true} dir={1} />);
    expect(
      container.querySelector('[data-testid="chev-up"]')
    ).toBeInTheDocument();
  });

  it('renders chev-down when active and dir is -1', () => {
    const { container } = render(<SortIcon active={true} dir={-1} />);
    expect(
      container.querySelector('[data-testid="chev-down"]')
    ).toBeInTheDocument();
  });

  it('renders chev-down when active and dir is 0', () => {
    const { container } = render(<SortIcon active={true} dir={0} />);
    expect(
      container.querySelector('[data-testid="chev-down"]')
    ).toBeInTheDocument();
  });
});
