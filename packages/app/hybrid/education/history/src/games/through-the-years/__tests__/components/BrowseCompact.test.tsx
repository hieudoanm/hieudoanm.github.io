import { fireEvent, render, screen } from '@testing-library/react';
import { BrowseCompact } from '../../components/components/BrowseCompact';
import { EVENT_A, EVENT_B, EVENT_BC, makeEvent } from '../../testing/fixtures';

describe('BrowseCompact', () => {
  it('groups events by century with labels and counts', () => {
    render(
      <BrowseCompact
        events={[EVENT_A, EVENT_B, EVENT_BC]}
        selectedId={null}
        onSelect={jest.fn()}
      />
    );
    expect(screen.getByText('5th century BC')).toBeInTheDocument();
    expect(screen.getByText('19th century')).toBeInTheDocument();
    expect(screen.getByText('20th century')).toBeInTheDocument();
  });

  it('selects an event on click', () => {
    const onSelect = jest.fn();
    render(
      <BrowseCompact
        events={[EVENT_A, EVENT_B]}
        selectedId={null}
        onSelect={onSelect}
      />
    );
    fireEvent.click(screen.getByText('1950'));
    expect(onSelect).toHaveBeenCalledWith(EVENT_B);
  });

  it('highlights the selected event', () => {
    render(
      <BrowseCompact
        events={[makeEvent('d', 1955)]}
        selectedId="d"
        onSelect={jest.fn()}
      />
    );
    const chip = screen.getByRole('button');
    expect(chip.className).toContain('bg-primary');
  });
});
