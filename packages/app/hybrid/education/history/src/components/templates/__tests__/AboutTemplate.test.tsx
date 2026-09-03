import { render, screen } from '@testing-library/react';
import { AboutTemplate } from '../AboutTemplate';

const PROPS = {
  appName: 'History',
  name: 'Through the Years',
  description: 'Historical timeline game',
  version: 'v0.0.1',
  items: [
    { label: 'Framework', value: 'Next.js 16' },
    { label: 'Shell', value: 'Tauri' },
  ],
};

describe('AboutTemplate', () => {
  it('renders appName in the header', () => {
    render(<AboutTemplate {...PROPS} />);
    expect(screen.getByText('History')).toBeInTheDocument();
  });

  it('renders a back link to the home page', () => {
    const { container } = render(<AboutTemplate {...PROPS} />);
    const backLink = container.querySelector('a[href="/"]');
    expect(backLink).not.toBeNull();
  });

  it('renders name and description', () => {
    render(<AboutTemplate {...PROPS} />);
    expect(screen.getByText('Through the Years')).toBeInTheDocument();
    expect(screen.getByText('Historical timeline game')).toBeInTheDocument();
  });

  it('renders item labels and values', () => {
    render(<AboutTemplate {...PROPS} />);
    expect(screen.getByText('Framework')).toBeInTheDocument();
    expect(screen.getByText('Next.js 16')).toBeInTheDocument();
    expect(screen.getByText('Shell')).toBeInTheDocument();
    expect(screen.getByText('Tauri')).toBeInTheDocument();
  });

  it('renders version and stable badge', () => {
    render(<AboutTemplate {...PROPS} />);
    expect(screen.getByText('v0.0.1')).toBeInTheDocument();
    expect(screen.getByText('Stable')).toBeInTheDocument();
  });
});
