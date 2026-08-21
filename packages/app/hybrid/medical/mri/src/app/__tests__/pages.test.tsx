import { fireEvent, render, screen } from '@testing-library/react';
import DefaultPage from '@/app/default';
import ErrorPage from '@/app/error';
import ForbiddenPage from '@/app/forbidden';
import GlobalError from '@/app/global-error';
import LoadingPage from '@/app/loading';
import NotFoundPage from '@/app/not-found';
import UnauthorizedPage from '@/app/unauthorized';
import PageTransitionTemplate from '@/app/template';
import RootLayout, { metadata, viewport } from '@/app/layout';
import StudiesPage from '@/app/(app)/studies/page';
import ViewerPage from '@/app/(app)/viewer/page';
import WorkspacePage from '@/app/(app)/workspace/page';
import { api } from '@/lib/api/client';

const searchParams = new URLSearchParams();

jest.mock('next/navigation', () => ({
  useSearchParams: () => searchParams,
}));

jest.mock('@/lib/api/client', () => ({
  DESKTOP_REQUIRED_MESSAGE: 'desktop required',
  isDesktopRuntime: () => true,
  api: {
    pickScanFiles: jest.fn(),
    importFiles: jest.fn(),
    listDatasets: jest.fn(),
    getDatasetDetail: jest.fn(),
    deleteDataset: jest.fn(),
    getSeriesMetadata: jest.fn(),
    getProvenance: jest.fn(),
    readSlice: jest.fn(),
    getStudyAnalysis: jest.fn(),
    listProtocols: jest.fn(),
    createProtocol: jest.fn(),
    deleteProtocol: jest.fn(),
    validateDataset: jest.fn(),
    runQc: jest.fn(),
    compareCompatibility: jest.fn(),
  },
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => <a href={href}>{children}</a>,
}));

describe('ErrorPage', () => {
  it('renders the 500 template and resets', () => {
    const reset = jest.fn();
    render(<ErrorPage error={new Error('boom')} reset={reset} />);
    expect(screen.getByText('500')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Try again'));
    expect(reset).toHaveBeenCalled();
  });
});

describe('GlobalError', () => {
  it('renders the 500 template inside an html document', () => {
    const reset = jest.fn();
    render(<GlobalError error={new Error('boom')} reset={reset} />);
    expect(screen.getByText('500')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Try again'));
    expect(reset).toHaveBeenCalled();
  });
});

describe('ForbiddenPage', () => {
  it('renders the 403 template', () => {
    render(<ForbiddenPage />);
    expect(screen.getByText('403')).toBeInTheDocument();
    expect(
      screen.getByText('You do not have permission to access this page.')
    ).toBeInTheDocument();
  });
});

describe('UnauthorizedPage', () => {
  it('renders the 401 template', () => {
    render(<UnauthorizedPage />);
    expect(screen.getByText('401')).toBeInTheDocument();
    expect(
      screen.getByText('You must be authenticated to access this page.')
    ).toBeInTheDocument();
  });
});

describe('DefaultPage', () => {
  it('renders nothing', () => {
    const { container } = render(<DefaultPage />);
    expect(container).toBeEmptyDOMElement();
  });
});

describe('LoadingPage', () => {
  it('renders a spinner', () => {
    render(<LoadingPage />);
    expect(document.querySelector('.loading')).toBeInTheDocument();
  });
});

describe('PageTransitionTemplate', () => {
  it('renders children with the page-in animation class', () => {
    render(
      <PageTransitionTemplate>
        <div data-testid="page">page content</div>
      </PageTransitionTemplate>
    );
    expect(screen.getByTestId('page')).toBeInTheDocument();
    expect(screen.getByTestId('page').parentElement).toHaveClass(
      'animate-page-in'
    );
  });

  it('removes the animation class on animationend', () => {
    const { container } = render(
      <PageTransitionTemplate>
        <div>page content</div>
      </PageTransitionTemplate>
    );
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).toHaveClass('animate-page-in');
    fireEvent.animationEnd(wrapper);
    expect(wrapper).not.toHaveClass('animate-page-in');
  });

  it('ignores repeated animationend events', () => {
    const { container } = render(
      <PageTransitionTemplate>
        <div>page content</div>
      </PageTransitionTemplate>
    );
    const wrapper = container.firstElementChild as HTMLElement;
    fireEvent.animationEnd(wrapper);
    expect(() => fireEvent.animationEnd(wrapper)).not.toThrow();
    expect(wrapper).not.toHaveClass('animate-page-in');
  });
});

describe('NotFoundPage', () => {
  it('renders the 404 template with a home link', () => {
    render(<NotFoundPage />);
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(
      screen.getByText('The page you are looking for does not exist.')
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Go home' })).toHaveAttribute(
      'href',
      '/'
    );
  });
});

describe('StudiesPage', () => {
  it('warns when no dataset is selected', () => {
    searchParams.delete('dataset');
    render(<StudiesPage />);
    expect(screen.getByText(/No dataset selected/)).toBeInTheDocument();
  });

  it('renders the studies browser for a dataset', async () => {
    searchParams.set('dataset', 'dataset://1');
    (api.getDatasetDetail as jest.Mock).mockResolvedValue({
      dataset: { id: 'dataset://1', name: 'Study A' },
      studies: [],
      series: [
        {
          id: 'series://1/s1',
          datasetId: 'dataset://1',
          studyUid: '',
          studyDate: '',
          seriesUid: '9.9.1',
          modality: 'MR',
          seriesDescription: 'T1',
          kind: 'nifti',
          fileCount: 1,
          rows: 2,
          columns: 2,
          sliceCount: 2,
          bitsAllocated: 16,
          signedPixels: false,
          voxelX: 0,
          voxelY: 0,
          voxelZ: 0,
          sliceThickness: 0,
          orientation: '',
          teMs: 0,
          trMs: 0,
          flipAngle: 0,
          fieldStrengthT: 0,
          manufacturer: '',
          model: '',
        },
      ],
    });
    (api.getProvenance as jest.Mock).mockResolvedValue([]);
    render(<StudiesPage />);
    await screen.findByText('Study A');
    expect(screen.getByText('T1')).toBeInTheDocument();
  });
});

describe('ViewerPage', () => {
  it('warns when no series is selected', () => {
    searchParams.delete('series');
    render(<ViewerPage />);
    expect(screen.getByText(/No series selected/)).toBeInTheDocument();
  });

  it('renders the viewer for a selected series', async () => {
    searchParams.set('series', 'series://1/s1');
    (api.getSeriesMetadata as jest.Mock).mockResolvedValue({
      series: {
        id: 'series://1/s1',
        datasetId: 'dataset://1',
        studyUid: '',
        studyDate: '',
        seriesUid: '9.9.1',
        modality: 'MR',
        seriesDescription: 'T1',
        kind: 'nifti',
        fileCount: 1,
        rows: 2,
        columns: 2,
        sliceCount: 2,
        bitsAllocated: 16,
        signedPixels: false,
        voxelX: 1,
        voxelY: 1,
        voxelZ: 1,
        sliceThickness: 1,
        orientation: '',
        teMs: 0,
        trMs: 0,
        flipAngle: 0,
        fieldStrengthT: 0,
        manufacturer: '',
        model: '',
      },
      normalized: {
        modality: 'MR',
        contrast: null,
        sequenceFamily: null,
        dimensionality: null,
        inference: 'inferred-from-naming',
      },
      originalTags: {},
      classification: [],
    });
    (api.readSlice as jest.Mock).mockResolvedValue(new ArrayBuffer(8));
    render(<ViewerPage />);
    await screen.findByText('1/2');
  });
});

describe('WorkspacePage', () => {
  it('renders the workspace template', async () => {
    (
      window as unknown as { __TAURI_INTERNALS__?: unknown }
    ).__TAURI_INTERNALS__ = {
      invoke: jest.fn(),
    };
    render(<WorkspacePage />);
    expect(screen.getByText('Workspace')).toBeInTheDocument();
    delete (window as unknown as { __TAURI_INTERNALS__?: unknown })
      .__TAURI_INTERNALS__;
  });
});

describe('ProtocolsPage', () => {
  it('renders the protocols workspace', async () => {
    (api.listProtocols as jest.Mock).mockResolvedValue([]);
    (api.listDatasets as jest.Mock).mockResolvedValue([]);
    const { default: ProtocolsPage } =
      await import('@/app/(app)/protocols/page');
    render(<ProtocolsPage />);
    await screen.findByText('Protocols');
    expect(screen.getByTestId('protocol-form')).toBeInTheDocument();
  });
});

describe('ComparePage', () => {
  it('warns when series are missing', async () => {
    searchParams.delete('left');
    searchParams.delete('right');
    const { default: ComparePage } = await import('@/app/(app)/compare/page');
    render(<ComparePage />);
    expect(
      screen.getByText(/Provide two series to compare/)
    ).toBeInTheDocument();
  });

  it('warns when only one series is provided', async () => {
    searchParams.set('left', 'series://1/s1');
    searchParams.delete('right');
    const { default: ComparePage } = await import('@/app/(app)/compare/page');
    render(<ComparePage />);
    expect(
      screen.getByText(/Provide two series to compare/)
    ).toBeInTheDocument();
  });

  it('renders the comparison view for two series', async () => {
    searchParams.set('left', 'series://1/s1');
    searchParams.set('right', 'series://1/s2');
    const seriesMeta = (id: string) => ({
      series: {
        id,
        datasetId: 'dataset://1',
        studyUid: '',
        studyDate: '',
        seriesUid: '9.9.1',
        modality: 'MR',
        seriesDescription: 'T1',
        kind: 'nifti',
        fileCount: 1,
        rows: 2,
        columns: 2,
        sliceCount: 2,
        bitsAllocated: 16,
        signedPixels: false,
        voxelX: 1,
        voxelY: 1,
        voxelZ: 1,
        sliceThickness: 1,
        orientation: '',
        teMs: 0,
        trMs: 0,
        flipAngle: 0,
        fieldStrengthT: 0,
        manufacturer: '',
        model: '',
      },
      normalized: {
        modality: 'MR',
        contrast: null,
        sequenceFamily: null,
        dimensionality: null,
        inference: 'inferred-from-naming',
      },
      originalTags: {},
      classification: [],
    });
    (api.getSeriesMetadata as jest.Mock).mockImplementation((id: string) =>
      Promise.resolve(seriesMeta(id))
    );
    (api.compareCompatibility as jest.Mock).mockResolvedValue({
      compatible: false,
      reasons: ['matrix differs: 2x2 vs 4x4'],
    });
    (api.readSlice as jest.Mock).mockResolvedValue(new ArrayBuffer(8));
    const { default: ComparePage } = await import('@/app/(app)/compare/page');
    render(<ComparePage />);
    await screen.findByText('Compare series');
    expect(
      screen.getByText(/Geometry differs — registration is not applied yet/)
    ).toBeInTheDocument();
  });
});

describe('RootLayout', () => {
  it('exposes layout metadata', () => {
    expect(metadata).toMatchObject({
      title: 'MRI',
      description: 'MRI research workspace and orchestration layer',
      manifest: '/manifest.json',
    });
    expect(metadata.appleWebApp).toMatchObject({
      capable: true,
      title: 'MRI',
    });
  });

  it('exposes a fixed viewport', () => {
    expect(viewport).toEqual({
      width: 'device-width',
      initialScale: 1,
      maximumScale: 1,
    });
  });

  it('renders children inside the theme shell', () => {
    render(
      <RootLayout>
        <div data-testid="page">page content</div>
      </RootLayout>
    );
    expect(screen.getByTestId('page')).toBeInTheDocument();
    expect(document.documentElement).toHaveAttribute('lang', 'en');
    expect(document.documentElement).toHaveAttribute('data-theme', 'nothing');
  });
});
