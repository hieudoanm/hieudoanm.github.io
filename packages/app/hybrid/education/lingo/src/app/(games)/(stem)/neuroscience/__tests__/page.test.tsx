import { render, screen } from '@testing-library/react';

import NeurosciencePage from '@/app/(games)/(stem)/neuroscience/page';

describe('NeurosciencePage', () => {
  it('links to the brain atlas as a single Neuroanatomy card', () => {
    render(<NeurosciencePage />);
    const card = screen.getByTestId('neuroscience-brain-atlas');
    expect(card).toHaveAttribute('href', '/neuroscience/brain-atlas');
    expect(
      screen.getByRole('heading', { name: 'Neuroanatomy' })
    ).toBeInTheDocument();
  });

  it('still links the existing models, methods, and tasks', () => {
    render(<NeurosciencePage />);
    [
      'neuroscience-drift-diffusion-model',
      'neuroscience-eeg',
      'neuroscience-mri',
      'neuroscience-stroop-task',
    ].forEach((id) => expect(screen.getByTestId(id)).toBeInTheDocument());
  });
});
