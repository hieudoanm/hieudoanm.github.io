import { render, screen } from '@testing-library/react';
import { BracketPill } from '../BracketPill';
import type { BracketNode } from '@/data/touraments/types/bracket';

const leafNode: BracketNode = {
  kind: 'leaf',
  team: 'BRA',
  angle: 0,
  angleIndex: 0,
};

const matchNode: BracketNode = {
  kind: 'match',
  id: 'm0',
  level: 1,
  kids: [leafNode, { kind: 'leaf', team: 'ARG', angle: 180, angleIndex: 1 }],
  winner: null,
  angle: 90,
};

describe('BracketPill', () => {
  it('renders with team info', () => {
    render(
      <BracketPill
        node={leafNode}
        pos={{ x: 50, y: 50 }}
        team="BRA"
        info={{ id: 'BRA', name: 'Brazil', iso: 'br', flag: '' }}
        eliminated={false}
        canPick={false}
        invited={false}
        decided={false}
        onPick={jest.fn()}
      />,
    );
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('renders eliminated style', () => {
    render(
      <BracketPill
        node={leafNode}
        pos={{ x: 50, y: 50 }}
        team="BRA"
        info={{ id: 'BRA', name: 'Brazil', iso: 'br', flag: '' }}
        eliminated={true}
        canPick={false}
        invited={false}
        decided={false}
        onPick={jest.fn()}
      />,
    );
    const pill = screen.getByRole('img').closest('div')!;
    expect(pill.className).toContain('scale-75');
  });

  it('renders decided style', () => {
    render(
      <BracketPill
        node={leafNode}
        pos={{ x: 50, y: 50 }}
        team="BRA"
        info={{ id: 'BRA', name: 'Brazil', iso: 'br', flag: '' }}
        eliminated={false}
        canPick={false}
        invited={false}
        decided={true}
        onPick={jest.fn()}
      />,
    );
    const pill = screen.getByRole('img').closest('div')!;
    expect(pill.className).toContain('shadow-amber-400');
  });

  it('renders invited (pulsing) style', () => {
    render(
      <BracketPill
        node={leafNode}
        pos={{ x: 50, y: 50 }}
        team="BRA"
        info={{ id: 'BRA', name: 'Brazil', iso: 'br', flag: '' }}
        eliminated={false}
        canPick={true}
        invited={true}
        decided={false}
        onPick={jest.fn()}
      />,
    );
    const pill = screen.getByRole('img').closest('div')!;
    expect(pill.className).toContain('animate-pulse');
  });

  it('renders canPick cursor', () => {
    render(
      <BracketPill
        node={leafNode}
        pos={{ x: 50, y: 50 }}
        team="BRA"
        info={{ id: 'BRA', name: 'Brazil', iso: 'br', flag: '' }}
        eliminated={false}
        canPick={true}
        invited={false}
        decided={false}
        onPick={jest.fn()}
      />,
    );
    const pill = screen.getByRole('img').closest('div')!;
    expect(pill.className).toContain('cursor-pointer');
  });

  it('renders champion trophy', () => {
    render(
      <BracketPill
        node={leafNode}
        pos={{ x: 50, y: 50 }}
        team="BRA"
        info={{ id: 'BRA', name: 'Brazil', iso: 'br', flag: '' }}
        eliminated={false}
        canPick={false}
        invited={false}
        decided={false}
        isChampion={true}
        onPick={jest.fn()}
      />,
    );
    expect(screen.getByText('🏆')).toBeInTheDocument();
  });

  it('renders leaf label with id', () => {
    render(
      <BracketPill
        node={leafNode}
        pos={{ x: 50, y: 50 }}
        team="BRA"
        info={{ id: 'BRA', name: 'Brazil', iso: 'br', flag: '' }}
        eliminated={false}
        canPick={false}
        invited={false}
        decided={false}
        onPick={jest.fn()}
      />,
    );
    expect(screen.getByText('BRA')).toBeInTheDocument();
  });

  it('renders leaf label without info returns empty string', () => {
    const { container } = render(
      <BracketPill
        node={leafNode}
        pos={{ x: 50, y: 50 }}
        team="BRA"
        info={null}
        eliminated={false}
        canPick={false}
        invited={false}
        decided={false}
        onPick={jest.fn()}
      />,
    );
    const label = container.querySelector('.absolute.-bottom-4');
    expect(label).toBeInTheDocument();
    expect(label?.textContent).toBe('');
  });

  it('renders with no team (empty state)', () => {
    const { container } = render(
      <BracketPill
        node={{ ...leafNode, team: null }}
        pos={{ x: 50, y: 50 }}
        team={null}
        info={null}
        eliminated={false}
        canPick={false}
        invited={false}
        decided={false}
        onPick={jest.fn()}
      />,
    );
    const img = container.querySelector('img');
    expect(img).not.toBeInTheDocument();
  });

  it('renders match node (no leaf label)', () => {
    const { container } = render(
      <BracketPill
        node={matchNode}
        pos={{ x: 50, y: 50 }}
        team="BRA"
        info={null}
        eliminated={false}
        canPick={false}
        invited={false}
        decided={false}
        onPick={jest.fn()}
      />,
    );
    expect(container.querySelector('.absolute.-bottom-4')).not.toBeInTheDocument();
  });

  it('eliminated leaf shows strikethrough', () => {
    render(
      <BracketPill
        node={leafNode}
        pos={{ x: 50, y: 50 }}
        team="BRA"
        info={{ id: 'BRA', name: 'Brazil', iso: 'br', flag: '' }}
        eliminated={true}
        canPick={false}
        invited={false}
        decided={false}
        onPick={jest.fn()}
      />,
    );
    expect(screen.getByText('BRA').className).toContain('line-through');
  });
});
