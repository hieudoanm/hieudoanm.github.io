import { render, screen } from '@testing-library/react';
import { SkillLevel } from '../SkillLevel';

describe('SkillLevel', () => {
  it('renders the skill name and level', () => {
    render(<SkillLevel skill="TypeScript" level={4} />);
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('4/5')).toBeInTheDocument();
  });

  it('clamps the level to the max', () => {
    render(<SkillLevel skill="React" level={9} />);
    expect(screen.getByText('5/5')).toBeInTheDocument();
  });

  it('renders a progress bar with the level value', () => {
    render(<SkillLevel skill="CSS" level={3} />);
    const progress = screen.getByRole('progressbar');
    expect(progress).toHaveAttribute('value', '3');
    expect(progress).toHaveAttribute('max', '5');
  });
});
