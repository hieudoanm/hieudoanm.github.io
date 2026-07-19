jest.mock('@/lib/db', () => require('@/test-helpers').mockDbModule);
jest.mock(
  'next/navigation',
  () => require('@/test-helpers').mockNextNavigation
);
jest.mock('next/link', () => require('@/test-helpers').mockLinkModule);

import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '@/test-helpers';
import SplitBillPage from '../page';

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

describe('SplitBillPage', () => {
  it('splits a bill equally', async () => {
    renderWithProviders(<SplitBillPage />);
    expect(
      await screen.findByText('Split a bill with your contacts')
    ).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Total Bill Amount'), {
      target: { value: '120' },
    });
    expect(await screen.findByText('Total Bill')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Sarah Wilson'));
    expect(screen.getAllByText('$60.00').length).toBeGreaterThan(0);
    expect(screen.getByText('Split with 1 people')).toBeInTheDocument();

    fireEvent.click(
      screen.getAllByText('Split Bill', { selector: 'button' })[0]
    );
    expect(await screen.findByText('Bill Split!')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Split Another Bill'));
    expect(
      await screen.findByText('Split a bill with your contacts')
    ).toBeInTheDocument();
  });

  it('splits a bill with custom amounts', async () => {
    renderWithProviders(<SplitBillPage />);
    await screen.findByText('Split a bill with your contacts');

    fireEvent.change(screen.getByLabelText('Total Bill Amount'), {
      target: { value: '200' },
    });
    await screen.findByText('Total Bill');

    fireEvent.click(screen.getByText('Custom Amounts'));
    fireEvent.click(screen.getByText('Michael Chen'));

    const customInput = screen.getAllByRole('spinbutton')[1];
    fireEvent.change(customInput, { target: { value: '150' } });

    expect(screen.getByText('$50.00')).toBeInTheDocument();

    fireEvent.click(
      screen.getAllByText('Split Bill', { selector: 'button' })[0]
    );
    expect(await screen.findByText('Bill Split!')).toBeInTheDocument();
  });

  it('disables split when custom amounts exceed total', async () => {
    renderWithProviders(<SplitBillPage />);
    await screen.findByText('Split a bill with your contacts');

    fireEvent.change(screen.getByLabelText('Total Bill Amount'), {
      target: { value: '100' },
    });
    await screen.findByText('Total Bill');

    fireEvent.click(screen.getByText('Custom Amounts'));
    fireEvent.click(screen.getByText('Emily Davis'));
    fireEvent.change(screen.getAllByRole('spinbutton')[1], {
      target: { value: '120' },
    });

    const splitBtn = screen
      .getAllByText('Split Bill', { selector: 'button' })[0]
      .closest('button') as HTMLButtonElement;
    expect(splitBtn).toBeDisabled();
  });
});
