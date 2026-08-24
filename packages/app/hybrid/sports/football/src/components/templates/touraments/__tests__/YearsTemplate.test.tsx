import { render, screen } from '@testing-library/react';
import { YearsTemplate } from '../YearsTemplate';

describe('YearsTemplate', () => {
  it('renders world-cup years by default', () => {
    render(<YearsTemplate />);
    expect(screen.getByText('Tournaments')).toBeInTheDocument();
    expect(screen.getAllByText('FIFA World Cup').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/Browse every edition of the FIFA World Cup/)).toBeInTheDocument();
  });

  it('renders euro years', () => {
    render(<YearsTemplate tournament="euro" />);
    expect(screen.getAllByText('UEFA European Championship').length).toBeGreaterThanOrEqual(1);
  });

  it('renders copa-america years', () => {
    render(<YearsTemplate tournament="copa-america" />);
    expect(screen.getAllByText('CONMEBOL Copa América').length).toBeGreaterThanOrEqual(1);
  });

  it('renders afcon years', () => {
    render(<YearsTemplate tournament="afcon" />);
    expect(screen.getAllByText('Africa Cup of Nations').length).toBeGreaterThanOrEqual(1);
  });

  it('renders afc years', () => {
    render(<YearsTemplate tournament="afc" />);
    expect(screen.getAllByText('AFC Asian Cup').length).toBeGreaterThanOrEqual(1);
  });

  it('renders concacaf years', () => {
    render(<YearsTemplate tournament="concacaf" />);
    expect(screen.getAllByText('CONCACAF Gold Cup').length).toBeGreaterThanOrEqual(1);
  });

  it('renders asean years', () => {
    render(<YearsTemplate tournament="asean" />);
    expect(screen.getAllByText('ASEAN Championship').length).toBeGreaterThanOrEqual(1);
  });

  it('renders premier-league years', () => {
    render(<YearsTemplate tournament="premier-league" />);
    expect(screen.getAllByText('English Premier League').length).toBeGreaterThanOrEqual(1);
  });

  it('renders la-liga years', () => {
    render(<YearsTemplate tournament="la-liga" />);
    expect(screen.getAllByText('Spanish La Liga').length).toBeGreaterThanOrEqual(1);
  });

  it('renders bundesliga years', () => {
    render(<YearsTemplate tournament="bundesliga" />);
    expect(screen.getAllByText('German Bundesliga').length).toBeGreaterThanOrEqual(1);
  });

  it('renders champions-league years', () => {
    render(<YearsTemplate tournament="champions-league" />);
    expect(screen.getAllByText('UEFA Champions League').length).toBeGreaterThanOrEqual(1);
  });

  it('renders winners and runners-up stats', () => {
    render(<YearsTemplate />);
    expect(screen.getByText('Winners')).toBeInTheDocument();
    expect(screen.getByText('Runners-up')).toBeInTheDocument();
  });
});
