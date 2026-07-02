import { describe, it, expect } from 'vitest';
import { render, screen } from '@solidjs/testing-library';

describe('example', () => {
  it('renders a greeting', () => {
    render(() => <h1>Hello, Solid!</h1>);

    expect(screen.getByText('Hello, Solid!')).toBeInTheDocument();
  });
});
