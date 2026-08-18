import { render, screen } from '@testing-library/react';
import { AboutTemplate } from '../AboutTemplate';

describe('AboutTemplate', () => {
  const defaultProps = {
    name: 'Store',
    description: 'An app store for all my projects',
    version: '2024.01.15',
    items: [
      { label: 'Apps', value: '43' },
      { label: 'Platform', value: 'Web' },
    ],
  };

  it('renders name', () => {
    render(<AboutTemplate {...defaultProps} />);
    expect(screen.getByText('Store')).toBeTruthy();
  });

  it('renders description', () => {
    render(<AboutTemplate {...defaultProps} />);
    expect(screen.getByText('An app store for all my projects')).toBeTruthy();
  });

  it('renders version', () => {
    render(<AboutTemplate {...defaultProps} />);
    expect(screen.getByText('2024.01.15')).toBeTruthy();
  });

  it('renders info items', () => {
    render(<AboutTemplate {...defaultProps} />);
    expect(screen.getByText('Apps')).toBeTruthy();
    expect(screen.getByText('43')).toBeTruthy();
    expect(screen.getByText('Platform')).toBeTruthy();
    expect(screen.getByText('Web')).toBeTruthy();
  });

  it('renders About heading', () => {
    render(<AboutTemplate {...defaultProps} />);
    expect(screen.getByText('About')).toBeTruthy();
  });

  it('renders Stable badge', () => {
    render(<AboutTemplate {...defaultProps} />);
    expect(screen.getByText('Stable')).toBeTruthy();
  });
});
