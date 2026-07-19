import { render } from '@testing-library/react';

import { SortIcon } from '@/components/atoms/SortIcon';

jest.mock('react-icons/fi', () => ({
  FiChevronUp: () => <span data-testid="chev-up">Up</span>,
  FiChevronDown: () => <span data-testid="chev-down">Down</span>,
}));

describe('SortIcon', () => {
  it('renders chevrons-up-down when not active', () => {
    const { container } = render(<SortIcon active={false} dir={0} />);
    expect(
      container.querySelector('[data-testid="chev-up"]')
    ).toBeInTheDocument();
    expect(
      container.querySelector('[data-testid="chev-down"]')
    ).toBeInTheDocument();
  });

  it('renders chev-up when active and dir is 1', () => {
    const { container } = render(<SortIcon active={true} dir={1} />);
    expect(
      container.querySelector('[data-testid="chev-up"]')
    ).toBeInTheDocument();
    expect(
      container.querySelector('[data-testid="chev-down"]')
    ).not.toBeInTheDocument();
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
