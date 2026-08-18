import { render, screen } from '@testing-library/react';
import { AboutTemplate } from '../AboutTemplate';

describe('AboutTemplate', () => {
  const defaultProps = {
    name: 'Test App',
    description: 'A test application',
    version: 'v1.0.0',
    items: [
      { label: 'Framework', value: 'Next.js' },
      { label: 'Language', value: 'TypeScript' },
    ],
  };

  it('renders name', () => {
    render(<AboutTemplate {...defaultProps} />);
    expect(screen.getByText('Test App')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(<AboutTemplate {...defaultProps} />);
    expect(screen.getByText('A test application')).toBeInTheDocument();
  });

  it('renders version badge', () => {
    render(<AboutTemplate {...defaultProps} />);
    expect(screen.getByText('v1.0.0')).toBeInTheDocument();
  });

  it('renders info items', () => {
    render(<AboutTemplate {...defaultProps} />);
    expect(screen.getByText('Framework')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
    expect(screen.getByText('Language')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('renders Stable badge', () => {
    render(<AboutTemplate {...defaultProps} />);
    expect(screen.getByText('Stable')).toBeInTheDocument();
  });

  it('renders About label', () => {
    render(<AboutTemplate {...defaultProps} />);
    expect(screen.getByText('About')).toBeInTheDocument();
  });
});
