import { fireEvent, render, screen } from '@testing-library/react';
import { seedResumeData } from '../../../../data/seed';
import { ProjectForm } from '../ProjectForm';

describe('ProjectForm', () => {
  it('adds and updates items', () => {
    const onChange = jest.fn();
    render(<ProjectForm value={seedResumeData.projects} onChange={onChange} />);
    fireEvent.change(screen.getAllByLabelText('Name')[0], {
      target: { value: 'App' },
    });
    expect(onChange).toHaveBeenCalledWith([
      expect.objectContaining({ name: 'App' }),
      expect.anything(),
    ]);
    fireEvent.click(screen.getByRole('button', { name: /add project/i }));
    expect(onChange).toHaveBeenLastCalledWith(expect.any(Array));
  });

  it('removes an item', () => {
    const onChange = jest.fn();
    render(<ProjectForm value={seedResumeData.projects} onChange={onChange} />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Remove' })[0]);
    expect(onChange).toHaveBeenCalledWith([expect.anything()]);
  });

  it('updates the remaining fields', () => {
    const onChange = jest.fn();
    render(<ProjectForm value={seedResumeData.projects} onChange={onChange} />);
    fireEvent.change(screen.getAllByLabelText('Link')[0], {
      target: { value: 'https://x.dev' },
    });
    expect(onChange).toHaveBeenLastCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ link: 'https://x.dev' }),
      ])
    );
    fireEvent.change(screen.getAllByLabelText('Technologies')[0], {
      target: { value: 'Next.js' },
    });
    expect(onChange).toHaveBeenLastCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ technologies: 'Next.js' }),
      ])
    );
    fireEvent.change(screen.getAllByLabelText('Description')[0], {
      target: { value: 'Built it' },
    });
    expect(onChange).toHaveBeenLastCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ description: 'Built it' }),
      ])
    );
  });
});
