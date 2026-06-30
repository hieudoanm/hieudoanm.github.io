import { render, screen } from '@testing-library/react';
import { FormsSection } from '../FormsSection';

describe('FormsSection', () => {
  it('renders section heading', () => {
    render(<FormsSection />);
    expect(screen.getByText('Form controls')).toBeInTheDocument();
    expect(screen.getByText("Forms that don't frustrate")).toBeInTheDocument();
  });

  it('renders text inputs', () => {
    render(<FormsSection />);
    expect(screen.getByPlaceholderText('Jane')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Doe')).toBeInTheDocument();
  });

  it('renders email input', () => {
    render(<FormsSection />);
    expect(screen.getByPlaceholderText('jane@forma.io')).toBeInTheDocument();
  });

  it('renders select', () => {
    render(<FormsSection />);
    expect(screen.getByText('Designer')).toBeInTheDocument();
    expect(screen.getByText('Engineer')).toBeInTheDocument();
  });

  it('renders checkboxes', () => {
    render(<FormsSection />);
    expect(screen.getByText('Send email notifications')).toBeInTheDocument();
    expect(screen.getByText('Weekly digest')).toBeInTheDocument();
    expect(screen.getByText('Product updates')).toBeInTheDocument();
  });

  it('renders radio buttons', () => {
    render(<FormsSection />);
    expect(screen.getByText('Monthly billing')).toBeInTheDocument();
    expect(screen.getByText('Annual billing (save 20%)')).toBeInTheDocument();
  });

  it('renders toggles', () => {
    render(<FormsSection />);
    expect(screen.getByText('Dark mode')).toBeInTheDocument();
    expect(screen.getByText('Auto-save')).toBeInTheDocument();
  });

  it('renders submit button', () => {
    render(<FormsSection />);
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('to match snapshot', () => {
    const { container } = render(<FormsSection />);
    expect(container).toMatchSnapshot();
  });
});
