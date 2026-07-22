import { render, screen } from '@testing-library/react';
import { DataProvider, useData } from '@/providers/DataProvider';
import { ToastProvider } from '@/providers/ToastProvider';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ replace: jest.fn(), push: jest.fn() }),
  usePathname: () => '/cards',
}));

function CardsHarness() {
  const { cards } = useData();

  return (
    <div>
      <span data-testid="cards-count">{cards.length}</span>
      {cards.map((card) => (
        <div key={card.id} data-testid={`card-${card.id}`}>
          <span data-testid={`card-name-${card.id}`}>{card.name}</span>
          <span data-testid={`card-frozen-${card.id}`}>
            {String(card.frozen)}
          </span>
        </div>
      ))}
    </div>
  );
}

describe('Cards data integration', () => {
  beforeEach(() => localStorage.clear());

  it('loads cards from DataProvider', () => {
    render(
      <DataProvider>
        <ToastProvider>
          <CardsHarness />
        </ToastProvider>
      </DataProvider>
    );
    expect(
      Number(screen.getByTestId('cards-count').textContent)
    ).toBeGreaterThan(0);
  });

  it('displays card names', () => {
    render(
      <DataProvider>
        <ToastProvider>
          <CardsHarness />
        </ToastProvider>
      </DataProvider>
    );
    expect(screen.getByText('Main Card')).toBeInTheDocument();
  });

  it('displays frozen status', () => {
    render(
      <DataProvider>
        <ToastProvider>
          <CardsHarness />
        </ToastProvider>
      </DataProvider>
    );
    const frozenStatuses = screen.getAllByText(/true|false/);
    expect(frozenStatuses.length).toBeGreaterThan(0);
  });
});
