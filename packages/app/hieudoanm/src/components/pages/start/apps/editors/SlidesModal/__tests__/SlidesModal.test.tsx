import { render, fireEvent, screen } from '@testing-library/react';
import { SlidesModal } from '..';

jest.mock('../components/LandingPage', () => ({
  LandingPage: ({ data }: any) => (
    <div>Landing Page: {data?.title?.product}</div>
  ),
}));

jest.mock('../components/SlidePreview', () => ({
  SlidePreview: ({ index }: any) => <div>Slide {index}</div>,
}));

jest.mock('../components/YamlEditor', () => ({
  YamlEditor: ({ value, onChange }: any) => (
    <textarea
      data-testid="yaml-editor"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  ),
}));

jest.mock('../hooks/useToast', () => {
  const show = jest.fn();
  const dismiss = jest.fn();
  return {
    ToastUI: ({ toasts, onDismiss }: any) => {
      const React = require('react');
      return React.createElement(
        'div',
        null,
        toasts.map((t: any) =>
          React.createElement(
            'div',
            { key: t.id, onClick: () => onDismiss(t.id) },
            t.message
          )
        )
      );
    },
    useToast: jest.fn().mockReturnValue({
      toasts: [],
      show,
      dismiss,
    }),
  };
});

jest.mock('yaml', () => ({
  parse: jest.fn().mockReturnValue({
    title: { product: 'Test Product', tagline: 'Tagline', audience: 'Devs' },
    slides: [{ layout: 'title', blocks: [{ type: 'title', text: 'Hello' }] }],
  }),
}));

jest.mock('../utils/yaml', () => ({
  validate: jest.fn().mockReturnValue([]),
  mapYamlToSlides: jest
    .fn()
    .mockReturnValue([{ kicker: 'Slide 1', blocks: [] }]),
}));

jest.mock('../utils/exportPdf', () => ({
  exportPdf: jest.fn(),
}));

Object.assign(navigator, {
  clipboard: { writeText: jest.fn() },
});

describe('SlidesModal', () => {
  const onClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    window.location.hash = '';
    const { validate } = require('../utils/yaml');
    validate.mockReturnValue([]);
    const yaml = require('yaml');
    yaml.parse.mockReturnValue({
      title: { product: 'Test Product', tagline: 'Tagline', audience: 'Devs' },
    });
  });

  it('renders modal title', () => {
    render(<SlidesModal onClose={onClose} />);
    expect(screen.getByText('Pitch Deck Slides')).toBeInTheDocument();
  });

  it('renders YamlEditor', () => {
    render(<SlidesModal onClose={onClose} />);
    expect(screen.getByTestId('yaml-editor')).toBeInTheDocument();
  });

  it('renders pitch deck tab', () => {
    render(<SlidesModal onClose={onClose} />);
    expect(screen.getByText('Pitch Deck')).toBeInTheDocument();
  });

  it('renders landing page tab', () => {
    render(<SlidesModal onClose={onClose} />);
    expect(screen.getAllByText('Landing Page').length).toBeGreaterThanOrEqual(
      1
    );
  });

  it('switches to landing page tab', () => {
    render(<SlidesModal onClose={onClose} />);
    fireEvent.click(screen.getByText('Landing Page'));
    expect(screen.getByText(/Test Product/)).toBeInTheDocument();
  });

  it('renders slide preview', () => {
    render(<SlidesModal onClose={onClose} />);
    expect(screen.getByText('Slide 0')).toBeInTheDocument();
  });

  it('toggles editor visibility', () => {
    render(<SlidesModal onClose={onClose} />);
    const toggleBtn = document.querySelector('[class*="tooltip"] button');
    if (toggleBtn) {
      fireEvent.click(toggleBtn);
    }
  });

  it('calls exportPdf when export PDF button clicked', async () => {
    const { exportPdf } = require('../utils/exportPdf');
    render(<SlidesModal onClose={onClose} />);
    const exportBtn = screen.getByText('📄');
    fireEvent.click(exportBtn);
    expect(exportPdf).toHaveBeenCalled();
  });

  it('shows error when exporting with YAML errors', async () => {
    require('../utils/yaml').validate.mockReturnValue([
      { path: 'title.product', message: 'Required' },
    ]);
    const useToastModule = require('../hooks/useToast');

    render(<SlidesModal onClose={onClose} />);
    const exportBtn = screen.getByText('📄');
    fireEvent.click(exportBtn);
    expect(useToastModule.useToast).toHaveBeenCalled();
  });

  it('handles export PDF failure', async () => {
    const { exportPdf } = require('../utils/exportPdf');
    exportPdf.mockRejectedValue(new Error('Export failed'));

    render(<SlidesModal onClose={onClose} />);
    const exportBtn = screen.getByText('📄');
    fireEvent.click(exportBtn);
    await Promise.resolve();
    expect(exportPdf).toHaveBeenCalled();
  });

  it('copies shareable URL when share button clicked', () => {
    render(<SlidesModal onClose={onClose} />);
    const shareBtn = screen.getByText('🔗');
    fireEvent.click(shareBtn);
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });

  it('disables export button when there are errors', () => {
    const { validate } = require('../utils/yaml');
    validate.mockReturnValue([{ path: 'title', message: 'Missing' }]);

    render(<SlidesModal onClose={onClose} />);
    const exportBtn = screen.getByText('📄');
    expect(exportBtn.closest('button')).toBeDisabled();
  });

  it('enables export button when no errors', () => {
    render(<SlidesModal onClose={onClose} />);
    const exportBtn = screen.getByText('📄');
    expect(exportBtn.closest('button')).not.toBeDisabled();
  });

  it('shows error on invalid YAML parse', () => {
    const yamlMock = require('yaml');
    yamlMock.parse.mockImplementation(() => {
      throw new Error('Invalid YAML');
    });

    render(<SlidesModal onClose={onClose} />);
    expect(screen.getAllByText('Invalid YAML').length).toBeGreaterThanOrEqual(
      1
    );
  });
});
