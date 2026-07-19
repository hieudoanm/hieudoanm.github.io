import { fireEvent, render, screen, within } from '@testing-library/react';
import { MusicHomeTemplate } from '../MusicHomeTemplate';

describe('MusicHomeTemplate', () => {
  it('renders the home feed with new releases', () => {
    render(<MusicHomeTemplate />);
    expect(screen.getByRole('heading', { name: 'Music' })).toBeInTheDocument();
    expect(screen.getByText('Home feed.')).toBeInTheDocument();
    expect(screen.getByText('3 new releases')).toBeInTheDocument();
    expect(screen.getByText('Neon Tides')).toBeInTheDocument();
    expect(screen.getByText('Luna Vega')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Play' })).toHaveLength(3);
  });

  it('toggles a release card to Now playing', () => {
    render(<MusicHomeTemplate />);
    const card = screen.getByText('Neon Tides').closest('.card');
    expect(card).not.toBeNull();
    fireEvent.click(
      within(card as HTMLElement).getByRole('button', { name: 'Play' })
    );
    expect(
      within(card as HTMLElement).getByText('Now playing')
    ).toBeInTheDocument();
    expect(
      within(card as HTMLElement).getByRole('button', { name: 'Pause' })
    ).toBeInTheDocument();
    fireEvent.click(
      within(card as HTMLElement).getByRole('button', { name: 'Pause' })
    );
    expect(
      within(card as HTMLElement).queryByText('Now playing')
    ).not.toBeInTheDocument();
  });

  it('keeps Now playing on a single card at a time', () => {
    render(<MusicHomeTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Play' })[0]);
    fireEvent.click(screen.getAllByRole('button', { name: 'Play' })[1]);
    expect(screen.getAllByText('Now playing')).toHaveLength(1);
  });
});
