import { render, screen, fireEvent } from '@solidjs/testing-library';
import { InflationModal } from '../InflationModal';

describe('InflationModal', () => {
  it('renders Options and Result tabs', () => {
    render(() => <InflationModal onClose={() => {}} />);
    expect(screen.getByText(/Options/)).toBeInTheDocument();
    expect(screen.getByText(/Result/)).toBeInTheDocument();
  });

  it('renders Country selector', () => {
    render(() => <InflationModal onClose={() => {}} />);
    expect(screen.getByText(/Country/)).toBeInTheDocument();
  });

  it('renders Currency selector', () => {
    render(() => <InflationModal onClose={() => {}} />);
    expect(screen.getByText(/Currency/)).toBeInTheDocument();
  });

  it('renders Calculate button', () => {
    render(() => <InflationModal onClose={() => {}} />);
    expect(screen.getByText(/Calculate/)).toBeInTheDocument();
  });
});
