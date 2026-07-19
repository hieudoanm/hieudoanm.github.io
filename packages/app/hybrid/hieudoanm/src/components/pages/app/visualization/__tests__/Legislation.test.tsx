import { fireEvent, render, screen } from '@testing-library/react';
import { Legislation } from '../LegislationModal';

jest.mock('../LegislationModal/components/Hemicycle', () => ({
  Hemicycle: () => <div data-testid="hemicycle" />,
}));

describe('Legislation', () => {
  it('should render United States by default', () => {
    render(<Legislation onClose={jest.fn()} />);
    expect(screen.getByText(/United States/)).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('51')).toBeInTheDocument();
  });

  it('should show chamber tabs when multiple chambers exist', () => {
    render(<Legislation onClose={jest.fn()} />);
    expect(screen.getByText('Senate')).toBeInTheDocument();
    expect(screen.getByText('House of Representatives')).toBeInTheDocument();
  });

  it('should switch between chambers', () => {
    render(<Legislation onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('House of Representatives'));
    expect(screen.getByText('435')).toBeInTheDocument();
  });

  it('should switch to another country', () => {
    render(<Legislation onClose={jest.fn()} />);
    fireEvent.click(screen.getByText(/United Kingdom/));
    expect(screen.getByText('House of Commons')).toBeInTheDocument();
  });

  it('should show hemicycle component', () => {
    render(<Legislation onClose={jest.fn()} />);
    expect(screen.getByTestId('hemicycle')).toBeInTheDocument();
  });

  it('should display party list with seats', () => {
    render(<Legislation onClose={jest.fn()} />);
    const seatElements = screen.getAllByText('53');
    expect(seatElements.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Republican')).toBeInTheDocument();
  });

  it('should show Majority badge for party with majority', () => {
    render(<Legislation onClose={jest.fn()} />);
    expect(screen.getByText('Majority')).toBeInTheDocument();
  });

  it('should display largest party seats', () => {
    render(<Legislation onClose={jest.fn()} />);
    const seatElements = screen.getAllByText('53');
    expect(seatElements.length).toBeGreaterThanOrEqual(1);
  });

  it('should display total seats for all countries', () => {
    render(<Legislation onClose={jest.fn()} />);
    expect(screen.getByText('Total seats')).toBeInTheDocument();
    expect(screen.getByText('For majority')).toBeInTheDocument();
    expect(screen.getByText('Largest party')).toBeInTheDocument();
  });

  it('should show data approximation note', () => {
    render(<Legislation onClose={jest.fn()} />);
    expect(screen.getByText(/Data approximate/)).toBeInTheDocument();
  });
});
