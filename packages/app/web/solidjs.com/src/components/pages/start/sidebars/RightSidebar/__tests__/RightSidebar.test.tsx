import { render, screen, fireEvent } from '@solidjs/testing-library';
import { RightSidebar } from '../index';

vi.mock(
  '@hieudoanm.github.io/components/pages/start/sidebars/RightSidebar/tabs/CurrencyTab',
  () => ({
    CurrencyTab: () => <div data-testid="tab-currency">CurrencyTab</div>,
  })
);

vi.mock(
  '@hieudoanm.github.io/components/pages/start/sidebars/RightSidebar/tabs/DateTimeTab',
  () => ({
    DateTimeTab: (props: { times: string[] }) => (
      <div data-testid="tab-datetime">DateTimeTab</div>
    ),
  })
);

vi.mock(
  '@hieudoanm.github.io/components/pages/start/sidebars/RightSidebar/tabs/PassportTab',
  () => ({
    PassportTab: () => <div data-testid="tab-passport">PassportTab</div>,
  })
);

describe('RightSidebar', () => {
  it('renders all three tab buttons', () => {
    render(() => <RightSidebar times={['10:00:00']} />);
    expect(screen.getByText('Currency')).toBeInTheDocument();
    expect(screen.getByText('Date/Time')).toBeInTheDocument();
    expect(screen.getByText('Passport')).toBeInTheDocument();
  });

  it('renders Date/Time tab by default', () => {
    render(() => <RightSidebar times={['10:00:00']} />);
    expect(screen.getByText('DateTimeTab')).toBeInTheDocument();
  });

  it('applies active class to the default tab', () => {
    render(() => <RightSidebar times={['10:00:00']} />);
    const dtBtn = screen.getByText('Date/Time');
    expect(dtBtn.className).toContain('border-primary');
  });
});
