import { fireEvent, render, screen } from '@testing-library/react';
import { BrowseSpread } from '../../components/components/BrowseSpread';
import { makeEvent } from '../../testing/fixtures';

const events = [
  makeEvent('century', 1901, 'Federation'),
  makeEvent('decade', 1991, 'Web goes live'),
];

describe('BrowseSpread', () => {
  it('renders century and decade dividers between year rows', () => {
    render(
      <BrowseSpread events={events} selectedId={null} onSelect={jest.fn()} />
    );
    expect(screen.getByText('20th century')).toBeInTheDocument();
    expect(screen.getByText('1990s')).toBeInTheDocument();
    expect(screen.getByText('1901')).toBeInTheDocument();
    expect(screen.getByText('1991')).toBeInTheDocument();
    expect(screen.getByText('Federation')).toBeInTheDocument();
  });

  it('selects an event on click', () => {
    const onSelect = jest.fn();
    render(
      <BrowseSpread events={events} selectedId={null} onSelect={onSelect} />
    );
    fireEvent.click(screen.getByText('Web goes live'));
    expect(onSelect).toHaveBeenCalledWith(events[1]);
  });
});
