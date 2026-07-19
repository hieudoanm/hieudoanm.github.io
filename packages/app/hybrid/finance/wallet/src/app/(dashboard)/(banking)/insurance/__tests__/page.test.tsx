jest.mock('@/lib/db', () => require('@/test-helpers').mockDbModule);
jest.mock(
  'next/navigation',
  () => require('@/test-helpers').mockNextNavigation
);
jest.mock('next/link', () => require('@/test-helpers').mockLinkModule);

import { screen, fireEvent, within } from '@testing-library/react';
import { renderWithProviders } from '@/test-helpers';
import InsurancePage from '../page';

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

describe('InsurancePage', () => {
  it('renders coverage stats and policy cards', async () => {
    renderWithProviders(<InsurancePage />);
    expect(await screen.findByText('Manage your policies')).toBeInTheDocument();

    expect(screen.getAllByText('$650,000.00').length).toBe(2);
    expect(screen.getByText('$445.00')).toBeInTheDocument();

    expect(screen.getByText('Term Life Insurance')).toBeInTheDocument();
    expect(screen.getByText('SecureLife')).toBeInTheDocument();
    expect(screen.getByText('SL-2024-88421')).toBeInTheDocument();
    expect(screen.getByText('Health Plus')).toBeInTheDocument();
    expect(screen.getByText('Auto Shield')).toBeInTheDocument();
    expect(screen.getByText('DriveSafe')).toBeInTheDocument();
    expect(screen.getByText('$45.00/monthly')).toBeInTheDocument();
    expect(screen.getAllByText('active').length).toBe(3);
    expect(screen.getAllByText('life').length).toBe(2);
    expect(screen.getAllByText('Pay Premium').length).toBe(3);
  });

  it('pays a premium with a toast', async () => {
    renderWithProviders(<InsurancePage />);
    await screen.findByText('Manage your policies');

    const termLife = screen
      .getByText('Term Life Insurance')
      .closest('.card') as HTMLElement;
    fireEvent.click(within(termLife).getByText('Pay Premium'));
    expect(
      await screen.findByText('Term Life Insurance premium payment simulated')
    ).toBeInTheDocument();
  });
});
