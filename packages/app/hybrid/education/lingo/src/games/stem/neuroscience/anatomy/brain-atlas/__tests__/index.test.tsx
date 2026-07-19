import { fireEvent, render, screen } from '@testing-library/react';
import { BrainAtlasExplorer } from '../index';
import { REGIONS } from '../atlas';

const slider = (label: string): HTMLInputElement => {
  const input = screen
    .getAllByRole('slider')
    .find((el) => el.closest('div')?.textContent?.includes(label));
  if (!input) throw new Error(`no slider labelled ${label}`);
  return input as HTMLInputElement;
};

describe('BrainAtlasExplorer', () => {
  it('starts with the whole brain exposed', () => {
    render(<BrainAtlasExplorer />);
    expect(screen.getByText('Structures exposed')).toBeInTheDocument();
    expect(
      screen.getByText(`${REGIONS.length}/${REGIONS.length}`)
    ).toBeInTheDocument();
  });

  it('lists every division from the outline', () => {
    render(<BrainAtlasExplorer />);
    ['Cerebrum', 'Diencephalon', 'Cerebellum', 'Brainstem'].forEach((name) =>
      expect(
        screen.getByRole('button', { name: new RegExp(name) })
      ).toBeInTheDocument()
    );
  });

  it('hides deep structures when the cut is raised to the surface', () => {
    render(<BrainAtlasExplorer />);
    fireEvent.change(slider('Depth below'), { target: { value: '0.1' } });
    expect(screen.getByText('5/24')).toBeInTheDocument();
    expect(screen.getByText('Deepest exposed')).toBeInTheDocument();
  });

  it('reports the depth band of the deepest exposed structure', () => {
    render(<BrainAtlasExplorer />);
    const value = screen.getByText('Deepest exposed').previousElementSibling;
    expect(value).toHaveTextContent('Brainstem');
  });

  it('shows the selected structure with its breadcrumb', () => {
    render(<BrainAtlasExplorer />);
    fireEvent.click(screen.getByRole('button', { name: /Amygdala/ }));
    expect(
      screen.getByText(/Cerebrum › Limbic Structures/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/An almond-shaped nucleus sitting just anterior/)
    ).toBeInTheDocument();
  });

  it('links the selected structure to its reference page', () => {
    render(<BrainAtlasExplorer />);
    fireEvent.click(screen.getByRole('button', { name: /Hippocampus/ }));
    expect(
      screen.getByRole('link', { name: /Read the Hippocampus reference/ })
    ).toHaveAttribute('href', '/neuroscience/brain-atlas/limbic-structures');
  });

  it('links a division to its own page', () => {
    render(<BrainAtlasExplorer />);
    fireEvent.click(screen.getByRole('button', { name: /Cerebral Cortex/ }));
    expect(
      screen.getByRole('link', { name: /Read the Cerebral Cortex reference/ })
    ).toHaveAttribute('href', '/neuroscience/brain-atlas/cerebral-cortex');
  });

  it('surfaces the cross-link a structure carries', () => {
    render(<BrainAtlasExplorer />);
    fireEvent.click(screen.getByRole('button', { name: /Hippocampus/ }));
    expect(
      screen.getByRole('link', { name: 'Memory Recognition' })
    ).toBeInTheDocument();
  });

  it('draws the lateral view canvas', () => {
    const { container } = render(<BrainAtlasExplorer />);
    expect(container.querySelector('canvas')).toBeInTheDocument();
  });

  it('marks the selected structure as current', () => {
    render(<BrainAtlasExplorer />);
    fireEvent.click(screen.getByRole('button', { name: /Thalamus/ }));
    expect(screen.getByRole('button', { name: /Thalamus/ })).toHaveAttribute(
      'aria-current',
      'true'
    );
  });
});
