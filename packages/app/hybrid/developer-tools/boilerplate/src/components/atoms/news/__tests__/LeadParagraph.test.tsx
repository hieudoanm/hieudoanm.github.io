import { render, screen } from '@testing-library/react';
import { LeadParagraph } from '../LeadParagraph';

describe('LeadParagraph', () => {
  it('renders the lead text', () => {
    render(<LeadParagraph>This is the lede.</LeadParagraph>);
    expect(screen.getByTestId('lead-paragraph')).toHaveTextContent(
      'This is the lede.'
    );
  });

  it('applies lead sizing class', () => {
    render(<LeadParagraph>This is the lede.</LeadParagraph>);
    expect(screen.getByTestId('lead-paragraph')).toHaveClass('text-lg');
  });

  it('renders child elements', () => {
    render(
      <LeadParagraph>
        <strong>Bold</strong> text
      </LeadParagraph>
    );
    expect(screen.getByTestId('lead-paragraph')).toContainElement(
      screen.getByText('Bold')
    );
  });
});
