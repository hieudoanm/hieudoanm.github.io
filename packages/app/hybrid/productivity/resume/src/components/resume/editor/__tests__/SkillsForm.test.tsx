import { fireEvent, render, screen } from '@testing-library/react';
import { seedResumeData } from '../../../../data/seed';
import { SkillsForm } from '../SkillsForm';

describe('SkillsForm', () => {
  it('adds and updates items', () => {
    const onChange = jest.fn();
    render(<SkillsForm value={seedResumeData.skills} onChange={onChange} />);
    fireEvent.change(screen.getAllByLabelText('Category')[0], {
      target: { value: 'DevOps' },
    });
    expect(onChange).toHaveBeenCalledWith([
      expect.objectContaining({ category: 'DevOps' }),
      expect.anything(),
      expect.anything(),
    ]);
    fireEvent.click(screen.getByRole('button', { name: /add skill group/i }));
    expect(onChange).toHaveBeenLastCalledWith(expect.any(Array));
  });

  it('removes an item', () => {
    const onChange = jest.fn();
    render(<SkillsForm value={seedResumeData.skills} onChange={onChange} />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Remove' })[0]);
    expect(onChange).toHaveBeenCalledWith([
      expect.anything(),
      expect.anything(),
    ]);
  });

  it('updates the items field', () => {
    const onChange = jest.fn();
    render(<SkillsForm value={seedResumeData.skills} onChange={onChange} />);
    fireEvent.change(screen.getAllByLabelText('Skills (comma separated)')[0], {
      target: { value: 'Go, Rust' },
    });
    expect(onChange).toHaveBeenCalledWith([
      expect.objectContaining({ items: 'Go, Rust' }),
      expect.anything(),
      expect.anything(),
    ]);
  });
});
