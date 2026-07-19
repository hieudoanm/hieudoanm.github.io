import { render, screen } from '@testing-library/react';
import { MetadataPanel } from '@/components/molecules/MetadataPanel';
import type { SeriesMetadata } from '@/lib/api/types';

const metadata: SeriesMetadata = {
  series: {
    id: 'series://1/s1',
    datasetId: 'dataset://1',
    studyUid: '1.2.3',
    studyDate: '20260101',
    seriesUid: '9.9.1',
    modality: 'MR',
    seriesDescription: 'T2 FLAIR AX',
    kind: 'dicom',
    fileCount: 20,
    rows: 512,
    columns: 512,
    sliceCount: 20,
    bitsAllocated: 16,
    signedPixels: true,
    voxelX: 0.5,
    voxelY: 0.5,
    voxelZ: 3,
    sliceThickness: 3,
    orientation: 'Axial',
    teMs: 90,
    trMs: 6000,
    flipAngle: 150,
    fieldStrengthT: 3,
    manufacturer: 'Siemens',
    model: 'Prisma',
  },
  normalized: {
    modality: 'MR',
    contrast: 'FLAIR',
    sequenceFamily: 'structural',
    dimensionality: null,
    inference: 'inferred-from-naming',
  },
  originalTags: [
    { path: '(0008,0060)', name: 'Modality', value: 'MR' },
    {
      path: '(7FE0,0010)',
      name: 'PixelData',
      binaryLength: 524288,
      value: null,
    },
  ],
  classification: [
    {
      sequence: 'FLAIR',
      confidence: 0.95,
      evidence: ['description contains "flair"'],
    },
  ],
};

describe('MetadataPanel', () => {
  it('shows normalized concepts with the inference marker', () => {
    render(<MetadataPanel metadata={metadata} />);
    expect(screen.getAllByText('FLAIR').length).toBeGreaterThan(0);
    expect(screen.getByText('structural')).toBeInTheDocument();
    expect(screen.getByText('inferred from naming')).toBeInTheDocument();
    expect(screen.getByText('—')).toBeInTheDocument();
  });

  it('shows geometry facts', () => {
    render(<MetadataPanel metadata={metadata} />);
    expect(screen.getByText('20 (20 files)')).toBeInTheDocument();
    expect(screen.getByText('512 × 512')).toBeInTheDocument();
    expect(screen.getByText('16 / yes')).toBeInTheDocument();
    expect(screen.getByText('0.5 × 0.5 × 3')).toBeInTheDocument();
    expect(screen.getByText('Axial')).toBeInTheDocument();
    expect(screen.getByText('3 T')).toBeInTheDocument();
    expect(screen.getByText('Siemens Prisma')).toBeInTheDocument();
  });

  it('shows sequence candidates with confidence', () => {
    render(<MetadataPanel metadata={metadata} />);
    const panel = screen.getByTestId('classification-panel');
    expect(panel).toBeInTheDocument();
    expect(panel).toHaveTextContent('FLAIR');
    expect(screen.getByText('95%')).toBeInTheDocument();
    expect(
      screen.getByText('inferred — not authoritative')
    ).toBeInTheDocument();
  });

  it('omits the classification panel without candidates', () => {
    render(<MetadataPanel metadata={{ ...metadata, classification: [] }} />);
    expect(screen.queryByTestId('classification-panel')).toBeNull();
  });

  it('falls back to dashes for unknown acquisition facts', () => {
    const sparse: SeriesMetadata = {
      ...metadata,
      series: {
        ...metadata.series,
        orientation: '',
        fieldStrengthT: 0,
        manufacturer: '',
        model: '',
      },
    };
    render(<MetadataPanel metadata={sparse} />);
    const panel = screen.getByTestId('metadata-panel');
    expect(panel).toHaveTextContent('Orientation—');
    expect(panel).toHaveTextContent('Field strength—');
    expect(panel).toHaveTextContent('Scanner—');
  });

  it('preserves the full original tag dump', () => {
    render(<MetadataPanel metadata={metadata} />);
    const dump = JSON.parse(
      screen.getByTestId('original-tags-json').textContent ?? 'null'
    );
    expect(dump).toHaveLength(2);
    expect(dump[1].binaryLength).toBe(524288);
  });
});
