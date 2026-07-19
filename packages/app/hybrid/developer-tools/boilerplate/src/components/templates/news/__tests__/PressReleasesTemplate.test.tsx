import { fireEvent, render, screen } from '@testing-library/react';
import { PressReleasesTemplate } from '../PressReleasesTemplate';

describe('PressReleasesTemplate', () => {
  it('renders press releases with dates and summary', () => {
    render(<PressReleasesTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Press Releases' })
    ).toBeInTheDocument();
    expect(screen.getByText('5 press releases')).toBeInTheDocument();
    expect(
      screen.getByText('Acme Corp Launches Renewable Energy Division')
    ).toBeInTheDocument();
    expect(screen.getByText('Jul 30, 2026')).toBeInTheDocument();
    expect(
      screen.getAllByRole('button', { name: 'Read release' })
    ).toHaveLength(5);
  });

  it('expands a press release summary', () => {
    render(<PressReleasesTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Read release' })[0]);
    expect(
      screen.getByText(/Acme Corp announced a new division/)
    ).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Close' })).toHaveLength(1);
    expect(
      screen.getAllByRole('button', { name: 'Read release' })
    ).toHaveLength(4);
  });
});
