import { fireEvent, render, screen } from '@testing-library/react';
import { MagazineGridTemplate } from '../MagazineGridTemplate';

describe('MagazineGridTemplate', () => {
  it('renders feature cards with read times', () => {
    render(<MagazineGridTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Magazine' })
    ).toBeInTheDocument();
    expect(screen.getByText('6 features')).toBeInTheDocument();
    expect(screen.getByText('The Silicon Valley Exodus')).toBeInTheDocument();
    expect(screen.getByText('12 min read')).toBeInTheDocument();
    expect(screen.getByText('Priya Raman')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Save' })).toHaveLength(6);
  });

  it('saves a feature card', () => {
    render(<MagazineGridTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Save' })[0]);
    expect(screen.getByRole('button', { name: 'Saved' })).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Save' })).toHaveLength(5);
  });

  it('unsaves a feature card when toggled again', () => {
    render(<MagazineGridTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Save' })[3]);
    fireEvent.click(screen.getByRole('button', { name: 'Saved' }));
    expect(screen.getAllByRole('button', { name: 'Save' })).toHaveLength(6);
  });
});
