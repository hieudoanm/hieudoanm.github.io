import { render, fireEvent, screen } from '@testing-library/react';
import { ConverterModal } from '../ConverterModal';

jest.mock('../ConverterModal/tabs/math/Angle', () => ({
  Angle: () => <div>Angle Tab</div>,
}));
jest.mock('../ConverterModal/tabs/math/Base', () => ({
  Base: () => <div>Base Tab</div>,
}));
jest.mock('../ConverterModal/tabs/math/Roman', () => ({
  Roman: () => <div>Roman Tab</div>,
}));
jest.mock('../ConverterModal/tabs/math/Data', () => ({
  Data: () => <div>Data Tab</div>,
}));
jest.mock('../ConverterModal/tabs/physical/Length', () => ({
  Length: () => <div>Length Tab</div>,
}));
jest.mock('../ConverterModal/tabs/physical/Temperature', () => ({
  Temperature: () => <div>Temperature Tab</div>,
}));
jest.mock('../ConverterModal/tabs/physical/Time', () => ({
  Time: () => <div>Time Tab</div>,
}));
jest.mock('../ConverterModal/tabs/physical/Weight', () => ({
  Weight: () => <div>Weight Tab</div>,
}));

describe('ConverterModal', () => {
  const onClose = jest.fn();

  it('renders modal title', () => {
    render(<ConverterModal onClose={onClose} />);
    expect(screen.getByText('Converter')).toBeInTheDocument();
  });

  it('renders Math section tabs', () => {
    render(<ConverterModal onClose={onClose} />);
    expect(screen.getByText('Math')).toBeInTheDocument();
    expect(screen.getByText('Angle')).toBeInTheDocument();
    expect(screen.getByText('Base')).toBeInTheDocument();
    expect(screen.getByText('Roman')).toBeInTheDocument();
    expect(screen.getByText('Data')).toBeInTheDocument();
  });

  it('renders Physical section tabs', () => {
    render(<ConverterModal onClose={onClose} />);
    expect(screen.getByText('Physical')).toBeInTheDocument();
    expect(screen.getByText('Length')).toBeInTheDocument();
    expect(screen.getByText('Weight')).toBeInTheDocument();
    expect(screen.getByText('Temperature')).toBeInTheDocument();
    expect(screen.getByText('Time')).toBeInTheDocument();
  });

  it('renders Angle tab by default', () => {
    render(<ConverterModal onClose={onClose} />);
    expect(screen.getByText('Angle Tab')).toBeInTheDocument();
  });

  it('switches to Base tab on click', () => {
    render(<ConverterModal onClose={onClose} />);
    fireEvent.click(screen.getByText('Base'));
    expect(screen.getByText('Base Tab')).toBeInTheDocument();
    expect(screen.queryByText('Angle Tab')).not.toBeInTheDocument();
  });

  it('switches to Roman tab on click', () => {
    render(<ConverterModal onClose={onClose} />);
    fireEvent.click(screen.getByText('Roman'));
    expect(screen.getByText('Roman Tab')).toBeInTheDocument();
  });

  it('switches to Data tab on click', () => {
    render(<ConverterModal onClose={onClose} />);
    fireEvent.click(screen.getByText('Data'));
    expect(screen.getByText('Data Tab')).toBeInTheDocument();
  });

  it('switches to Length tab on click', () => {
    render(<ConverterModal onClose={onClose} />);
    fireEvent.click(screen.getByText('Length'));
    expect(screen.getByText('Length Tab')).toBeInTheDocument();
  });

  it('switches to Temperature tab on click', () => {
    render(<ConverterModal onClose={onClose} />);
    fireEvent.click(screen.getByText('Temperature'));
    expect(screen.getByText('Temperature Tab')).toBeInTheDocument();
  });

  it('switches to Time tab on click', () => {
    render(<ConverterModal onClose={onClose} />);
    fireEvent.click(screen.getByText('Time'));
    expect(screen.getByText('Time Tab')).toBeInTheDocument();
  });

  it('switches to Weight tab on click', () => {
    render(<ConverterModal onClose={onClose} />);
    fireEvent.click(screen.getByText('Weight'));
    expect(screen.getByText('Weight Tab')).toBeInTheDocument();
  });

  it('active tab has tab-active class', () => {
    render(<ConverterModal onClose={onClose} />);
    const angleTab = screen.getByText('Angle').closest('[role="tab"]');
    expect(angleTab).toHaveClass('tab-active');
    fireEvent.click(screen.getByText('Base'));
    expect(screen.getByText('Base').closest('[role="tab"]')).toHaveClass(
      'tab-active'
    );
    expect(angleTab).not.toHaveClass('tab-active');
  });
});
