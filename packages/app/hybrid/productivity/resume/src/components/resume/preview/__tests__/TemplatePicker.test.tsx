import { fireEvent, render, screen, within } from '@testing-library/react';
import { RESUME_TEMPLATES } from '../../templates';
import { TemplatePicker } from '../TemplatePicker';

describe('TemplatePicker', () => {
  const onSelect = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  const results = () => screen.getByLabelText('Template results');
  const categoryChips = () => screen.getByLabelText('Filter by category');

  const renderPicker = (selectedId = 'classic') =>
    render(<TemplatePicker selectedId={selectedId} onSelect={onSelect} />);

  it('renders every template by default', () => {
    renderPicker();
    expect(within(results()).getAllByRole('button')).toHaveLength(
      RESUME_TEMPLATES.length
    );
    RESUME_TEMPLATES.forEach((template) => {
      expect(
        within(results()).getAllByText(template.name).length
      ).toBeGreaterThan(0);
    });
  });

  it('selects a template on click', () => {
    renderPicker();
    fireEvent.click(within(results()).getByText('Nova'));
    expect(onSelect).toHaveBeenCalledWith('nova');
  });

  it('marks the selected template with aria-pressed', () => {
    renderPicker('nova');
    const button = within(results()).getByText('Nova').closest('button');
    expect(button).toHaveAttribute('aria-pressed', 'true');
    expect(
      within(results()).getByText('Classic').closest('button')
    ).toHaveAttribute('aria-pressed', 'false');
  });

  it('filters templates by search query', () => {
    renderPicker();
    const input = screen.getByLabelText('Search templates');
    fireEvent.change(input, { target: { value: 'serif' } });
    expect(within(results()).getByText('Classic')).toBeInTheDocument();
    expect(within(results()).getByText('Elegant')).toBeInTheDocument();
    expect(within(results()).queryByText('Nova')).not.toBeInTheDocument();
  });

  it('filters templates by category chip', () => {
    renderPicker();
    fireEvent.click(within(categoryChips()).getByText('Monospace'));
    expect(within(results()).getByText('Technical')).toBeInTheDocument();
    expect(within(results()).getByText('Pulse')).toBeInTheDocument();
    expect(within(results()).queryByText('Classic')).not.toBeInTheDocument();
  });

  it('toggling the active category chip clears the filter', () => {
    renderPicker();
    const chip = within(categoryChips()).getByText('Dark');
    fireEvent.click(chip);
    expect(within(results()).queryByText('Classic')).not.toBeInTheDocument();
    fireEvent.click(chip);
    expect(within(results()).getByText('Classic')).toBeInTheDocument();
  });

  it('combines search and category filters', () => {
    renderPicker();
    fireEvent.click(within(categoryChips()).getByText('Dark'));
    const input = screen.getByLabelText('Search templates');
    fireEvent.change(input, { target: { value: 'navy' } });
    expect(within(results()).getAllByText('Sterling').length).toBeGreaterThan(
      0
    );
    expect(within(results()).getAllByText('Summit').length).toBeGreaterThan(0);
    expect(within(results()).getAllByText('Beacon').length).toBeGreaterThan(0);
    expect(within(results()).queryByText('Classic')).not.toBeInTheDocument();
  });

  it('shows an empty state when nothing matches', () => {
    renderPicker();
    const input = screen.getByLabelText('Search templates');
    fireEvent.change(input, { target: { value: 'zzz-no-match' } });
    expect(
      screen.getByText('No templates match your search.')
    ).toBeInTheDocument();
    expect(within(results()).queryAllByRole('button')).toHaveLength(0);
  });

  it('shows every category as a chip', () => {
    renderPicker();
    const chips = within(categoryChips()).getAllByRole('button');
    expect(chips.length).toBe(6);
    expect(chips.map((chip) => chip.textContent)).toEqual([
      'Serif',
      'Monospace',
      'Dark',
      'Colorful',
      'Minimal',
      'Professional',
    ]);
  });
});
