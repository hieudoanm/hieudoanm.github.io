import { fireEvent, render, screen } from '@testing-library/react';
import { ChartsGalleryTemplate } from '../ChartsGalleryTemplate';

describe('ChartsGalleryTemplate', () => {
  it('renders all chart sections with weekly data', () => {
    render(<ChartsGalleryTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Charts gallery' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Bar chart' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Line chart' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Donut chart' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Progress bars' })
    ).toBeInTheDocument();
    expect(screen.getByText('Dataset: Weekly — 7 values')).toBeInTheDocument();
    expect(screen.getAllByText('30').length).toBeGreaterThan(0);
    expect(screen.getByRole('button', { name: 'Weekly' })).toHaveClass(
      'btn-primary'
    );
  });

  it('switches to monthly dataset', () => {
    render(<ChartsGalleryTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Monthly' }));
    expect(screen.getByText('Dataset: Monthly — 9 values')).toBeInTheDocument();
    expect(screen.getAllByText('120').length).toBeGreaterThan(0);
    expect(screen.getByRole('button', { name: 'Monthly' })).toHaveClass(
      'btn-primary'
    );
    expect(screen.getByRole('button', { name: 'Weekly' })).not.toHaveClass(
      'btn-primary'
    );
  });

  it('switches back to weekly dataset', () => {
    render(<ChartsGalleryTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Monthly' }));
    fireEvent.click(screen.getByRole('button', { name: 'Weekly' }));
    expect(screen.getByText('Dataset: Weekly — 7 values')).toBeInTheDocument();
    expect(screen.getAllByText('30').length).toBeGreaterThan(0);
  });
});
