import { render, screen } from '@testing-library/react';
import { DataSection } from '../DataSection';

describe('DataSection', () => {
  it('renders section heading', () => {
    render(<DataSection />);
    expect(screen.getByText('Data display')).toBeInTheDocument();
    expect(screen.getByText('Make data legible')).toBeInTheDocument();
  });

  it('renders bar chart', () => {
    render(<DataSection />);
    expect(screen.getByText('Monthly revenue')).toBeInTheDocument();
    expect(screen.getByText('$42k')).toBeInTheDocument();
    expect(screen.getByText('$78k')).toBeInTheDocument();
  });

  it('renders data table with rows', () => {
    render(<DataSection />);
    expect(screen.getByText('Button')).toBeInTheDocument();
    expect(screen.getByText('DataTable')).toBeInTheDocument();
    expect(screen.getByText('CommandMenu')).toBeInTheDocument();
    expect(screen.getByText('DateRangePicker')).toBeInTheDocument();
  });

  it('renders table headers', () => {
    render(<DataSection />);
    expect(screen.getByText('Component ↑')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Version')).toBeInTheDocument();
  });

  it('to match snapshot', () => {
    const { container } = render(<DataSection />);
    expect(container).toMatchSnapshot();
  });
});
