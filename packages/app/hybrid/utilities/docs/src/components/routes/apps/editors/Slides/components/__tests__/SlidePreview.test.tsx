import { render, screen } from '@testing-library/react';
import { SlidePreview } from '../SlidePreview';

jest.mock('../TextBlock', () => ({
  TextBlock: ({ text }: { text: string }) => <span>{text}</span>,
}));

jest.mock('../CenterBlock', () => ({
  CenterBlock: ({ block }: any) => (
    <div>
      {block.type === 'pricing-plan'
        ? `${block.name} ${block.price}`
        : block.text}
    </div>
  ),
}));

describe('SlidePreview', () => {
  const baseSlide = {
    blocks: [
      { type: 'title' as const, text: 'Slide Title' },
      { type: 'subtitle' as const, text: 'Slide Subtitle' },
    ],
  };

  it('renders slide title', () => {
    render(<SlidePreview slide={baseSlide} index={0} />);
    expect(screen.getByText('Slide Title')).toBeInTheDocument();
  });

  it('renders slide subtitle', () => {
    render(<SlidePreview slide={baseSlide} index={0} />);
    expect(screen.getByText('Slide Subtitle')).toBeInTheDocument();
  });

  it('renders slide number', () => {
    render(<SlidePreview slide={baseSlide} index={0} />);
    expect(screen.getByText('1 / 5')).toBeInTheDocument();
  });

  it('renders kicker when provided', () => {
    const slide = { ...baseSlide, kicker: 'Kicker Text' };
    render(<SlidePreview slide={slide} index={0} />);
    expect(screen.getByText('Kicker Text')).toBeInTheDocument();
  });

  it('renders text block', () => {
    const slide = { blocks: [{ type: 'text' as const, text: 'Text Content' }] };
    render(<SlidePreview slide={slide} index={0} />);
    expect(screen.getByText('Text Content')).toBeInTheDocument();
  });

  it('renders bullet items', () => {
    const slide = {
      blocks: [
        {
          type: 'bullets' as const,
          items: [{ emoji: '⭐', title: 'Item 1', description: 'Desc 1' }],
        },
      ],
    };
    render(<SlidePreview slide={slide} index={0} />);
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Desc 1')).toBeInTheDocument();
  });

  it('renders center block without pricing plans', () => {
    const slide = {
      blocks: [
        {
          type: 'center' as const,
          blocks: [{ type: 'text' as const, text: 'Center Content' }],
        },
      ],
    };
    render(<SlidePreview slide={slide} index={0} />);
    expect(screen.getByText('Center Content')).toBeInTheDocument();
  });

  it('renders center block with pricing plans', () => {
    const slide = {
      blocks: [
        {
          type: 'center' as const,
          blocks: [
            {
              type: 'pricing-plan' as const,
              name: 'Pro',
              price: '$99',
              frequency: 'monthly',
            },
            {
              type: 'pricing-plan' as const,
              name: 'Enterprise',
              price: '$299',
              frequency: 'monthly',
            },
          ],
        },
      ],
    };
    render(<SlidePreview slide={slide} index={0} />);
    expect(screen.getByText('Pro $99')).toBeInTheDocument();
    expect(screen.getByText('Enterprise $299')).toBeInTheDocument();
  });

  it('renders highlight block as null (does not render)', () => {
    const slide = {
      blocks: [{ type: 'highlight' as const, text: 'Highlight' }],
    };
    const { container } = render(<SlidePreview slide={slide} index={0} />);
    expect(container.textContent).not.toContain('Highlight');
  });

  it('renders pricing-plan block as null (does not render)', () => {
    const slide = {
      blocks: [
        {
          type: 'pricing-plan' as const,
          name: 'Free',
          price: '$0',
          frequency: 'never',
        },
      ],
    };
    render(<SlidePreview slide={slide} index={0} />);
    expect(screen.queryByText('Free')).not.toBeInTheDocument();
  });

  it('renders bullets without description', () => {
    const slide = {
      blocks: [
        {
          type: 'bullets' as const,
          items: [{ emoji: '⚡', title: 'Fast' }],
        },
      ],
    };
    render(<SlidePreview slide={slide} index={0} />);
    expect(screen.getByText('Fast')).toBeInTheDocument();
  });
});
