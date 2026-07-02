import { render, fireEvent, screen } from '@testing-library/react';
import { ViewControls } from '../ViewControls';

jest.mock('../../fonts', () => ({
  FONTS: [
    { id: 'sans', name: 'Sans', className: 'font-sans' },
    { id: 'serif', name: 'Serif', className: 'font-serif' },
  ],
}));

describe('ViewControls', () => {
  const props = {
    viewMode: 'split' as const,
    showToc: false,
    showLineNumbers: false,
    restored: false,
    fontId: 'sans',
    onViewModeChange: jest.fn(),
    onTocToggle: jest.fn(),
    onLineNumbersToggle: jest.fn(),
    onFontChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders view mode buttons', () => {
    render(<ViewControls {...props} />);
    expect(screen.getByText('Split')).toBeInTheDocument();
    expect(screen.getByText('Editor')).toBeInTheDocument();
    expect(screen.getByText('Preview')).toBeInTheDocument();
  });

  it('calls onViewModeChange on click', () => {
    render(<ViewControls {...props} />);
    fireEvent.click(screen.getByText('Preview'));
    expect(props.onViewModeChange).toHaveBeenCalledWith('preview');
  });

  it('renders ToC button', () => {
    render(<ViewControls {...props} />);
    expect(screen.getByText('ToC')).toBeInTheDocument();
  });

  it('calls onTocToggle on ToC click', () => {
    render(<ViewControls {...props} />);
    fireEvent.click(screen.getByText('ToC'));
    expect(props.onTocToggle).toHaveBeenCalled();
  });

  it('renders #Line button', () => {
    render(<ViewControls {...props} />);
    expect(screen.getByText('#Line')).toBeInTheDocument();
  });

  it('calls onLineNumbersToggle on #Line click', () => {
    render(<ViewControls {...props} />);
    fireEvent.click(screen.getByText('#Line'));
    expect(props.onLineNumbersToggle).toHaveBeenCalled();
  });

  it('shows draft restored badge when restored', () => {
    render(<ViewControls {...props} restored={true} />);
    expect(screen.getByText('Draft restored')).toBeInTheDocument();
  });

  it('renders font select', () => {
    render(<ViewControls {...props} />);
    expect(screen.getByDisplayValue('Sans')).toBeInTheDocument();
  });

  it('calls onFontChange on font select change', () => {
    render(<ViewControls {...props} />);
    fireEvent.change(screen.getByDisplayValue('Sans'), {
      target: { value: 'serif' },
    });
    expect(props.onFontChange).toHaveBeenCalledWith('serif');
  });
});
