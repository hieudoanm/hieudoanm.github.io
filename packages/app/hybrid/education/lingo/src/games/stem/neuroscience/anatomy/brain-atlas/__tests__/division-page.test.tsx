import { render, screen } from '@testing-library/react';
import { DivisionPage } from '../division-page';
import { DIVISION_ROUTES, childrenOf, regionById } from '../atlas';

describe('DivisionPage', () => {
  it('renders the division name, summary, function, and note', () => {
    const region = regionById('cerebral-cortex')!;
    render(
      <DivisionPage divisionId="cerebral-cortex" subtitle="Why it matters" />
    );
    expect(
      screen.getByRole('heading', { level: 1, name: region.name })
    ).toBeInTheDocument();
    expect(screen.getByText(region.summary)).toBeInTheDocument();
    expect(screen.getByText(region.function)).toBeInTheDocument();
    expect(screen.getByText(region.note)).toBeInTheDocument();
  });

  it('lists every structure the division contains', () => {
    const kids = childrenOf('cerebral-cortex');
    expect(kids.length).toBeGreaterThan(0);
    render(
      <DivisionPage divisionId="cerebral-cortex" subtitle="Why it matters" />
    );
    kids.forEach((child) =>
      expect(
        screen.getByRole('heading', { name: child.name })
      ).toBeInTheDocument()
    );
  });

  it('links out to a related page when a structure names one', () => {
    const linked = childrenOf('cerebral-cortex').find((c) => c.seeAlso);
    expect(linked?.seeAlso).toBeDefined();
    render(
      <DivisionPage divisionId="cerebral-cortex" subtitle="Why it matters" />
    );
    expect(
      screen.getByRole('link', { name: linked!.seeAlso!.label })
      // next/link normalises away the trailing slash the data carries.
    ).toHaveAttribute('href', linked!.seeAlso!.href.replace(/\/$/, ''));
  });

  it('throws on an unknown division so a typo fails the build', () => {
    const spy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);
    expect(() =>
      render(<DivisionPage divisionId="not-a-region" subtitle="x" />)
    ).toThrow(/not-a-region/);
    spy.mockRestore();
  });

  it('has a route registered for every division it renders', () => {
    DIVISION_ROUTES.forEach(({ id }) => expect(regionById(id)).toBeDefined());
  });
});
