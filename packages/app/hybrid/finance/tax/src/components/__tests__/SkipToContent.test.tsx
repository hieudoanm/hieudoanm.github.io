import { render, screen } from '@testing-library/react';
import SkipToContent from '../SkipToContent';

describe('SkipToContent', () => {
  it('renders skip link', () => {
    render(<SkipToContent />);
    const link = screen.getByText('Skip to content');
    expect(link).toBeTruthy();
    expect(link.getAttribute('href')).toBe('#main-content');
  });
});
