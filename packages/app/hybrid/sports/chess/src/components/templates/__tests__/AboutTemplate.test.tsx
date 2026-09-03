import { render, screen } from '@testing-library/react';
import { AboutTemplate } from '../AboutTemplate';

describe('AboutTemplate', () => {
  it('renders name, description, items and version', () => {
    render(
      <AboutTemplate
        name="Chess Master"
        description="Play chess against the engine"
        version="v1.4.0"
        items={[
          { label: 'Engine', value: 'Stockfish' },
          { label: 'Board', value: '8x8' },
        ]}
      />
    );
    expect(screen.getByText('Chess Master')).toBeInTheDocument();
    expect(
      screen.getByText('Play chess against the engine')
    ).toBeInTheDocument();
    expect(screen.getByText('Engine')).toBeInTheDocument();
    expect(screen.getByText('Stockfish')).toBeInTheDocument();
    expect(screen.getByText('Board')).toBeInTheDocument();
    expect(screen.getByText('8x8')).toBeInTheDocument();
    expect(screen.getByText('v1.4.0')).toBeInTheDocument();
    expect(screen.getByText('Stable')).toBeInTheDocument();
  });
});
