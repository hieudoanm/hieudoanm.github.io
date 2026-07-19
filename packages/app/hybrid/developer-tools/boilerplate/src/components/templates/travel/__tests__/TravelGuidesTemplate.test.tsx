import { fireEvent, render, screen } from '@testing-library/react';
import { TravelGuidesTemplate } from '../TravelGuidesTemplate';

describe('TravelGuidesTemplate', () => {
  it('renders guides with a count summary', () => {
    render(<TravelGuidesTemplate />);
    expect(screen.getByRole('heading', { name: 'Guides' })).toBeInTheDocument();
    expect(screen.getByText('Travel tips and guides.')).toBeInTheDocument();
    expect(screen.getByText('5 guides')).toBeInTheDocument();
    expect(screen.getByText('Street Food Tour of Hanoi')).toBeInTheDocument();
    expect(screen.getByText('Hanoi, Vietnam')).toBeInTheDocument();
    expect(screen.getByText('8 min read')).toBeInTheDocument();
    expect(screen.getAllByText('Culture')).toHaveLength(2);
    expect(screen.getAllByText('Outdoors')).toHaveLength(2);
    expect(screen.getAllByRole('button', { name: 'Save guide' })).toHaveLength(
      5
    );
  });

  it('saves a guide card', () => {
    render(<TravelGuidesTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Save guide' })[0]);
    expect(screen.getAllByText('Saved')).toHaveLength(1);
    expect(screen.getByText('Saved')).toHaveClass('badge-success');
  });
});
