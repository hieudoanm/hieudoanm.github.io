import { render, screen } from '@testing-library/react';
import { SkillBar } from '../SkillBar';

describe('SkillBar', () => {
  it('renders a label and progress bar', () => {
    render(<SkillBar label="React" value={80} />);
    expect(screen.getByText('React')).toBeInTheDocument();
    const bar = screen.getByRole('progressbar', { name: 'React' });
    expect(bar).toHaveValue(80);
  });

  it('shows the percentage when requested', () => {
    render(<SkillBar label="React" value={80} showValue />);
    expect(screen.getByText('80%')).toBeInTheDocument();
  });

  it('hides the percentage when showValue is false', () => {
    render(<SkillBar label="React" value={80} showValue={false} />);
    expect(screen.queryByText('80%')).not.toBeInTheDocument();
  });
});
