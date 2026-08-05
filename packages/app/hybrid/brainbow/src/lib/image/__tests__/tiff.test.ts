import {
  TiffError,
  isTiff,
  parseOmeXml,
  parseTiff,
  parseTiffStack,
} from '@/lib/image/tiff';

interface TiffOptions {
  width: number;
  height: number;
  samples: number;
  bits?: number;
  photometric?: number;
  compression?: number;
  planar?: number;
  strips: Uint8Array[];
  rowsPerStrip?: number;
  imageDescription?: string;
  bigEndian?: boolean;
}

const TYPE_SIZE: Record<number, number> = { 2: 1, 3: 2, 4: 4 };

interface BuildEntry {
  tag: number;
  type: number;
  count: number;
  values: number[] | string;
  blockOffset: number;
}

const buildTiff = (options: TiffOptions): Uint8Array => {
  const {
    width,
    height,
    samples,
    bits = 8,
    photometric = 1,
    compression = 1,
    planar = 1,
    strips,
    rowsPerStrip = height,
    imageDescription,
    bigEndian = false,
  } = options;

  const entries: BuildEntry[] = [];
  const add = (tag: number, type: number, values: number[] | string): void => {
    entries.push({
      tag,
      type,
      count: typeof values === 'string' ? values.length + 1 : values.length,
      values,
      blockOffset: 0,
    });
  };
  add(256, 4, [width]);
  add(257, 4, [height]);
  add(258, 3, Array(samples).fill(bits));
  add(259, 3, [compression]);
  add(262, 3, [photometric]);
  add(277, 3, [samples]);
  add(278, 4, [rowsPerStrip]);
  add(273, 4, Array(strips.length).fill(0));
  add(
    279,
    4,
    strips.map((strip) => strip.length)
  );
  if (planar !== 1) add(284, 3, [planar]);
  if (imageDescription) add(270, 2, imageDescription);

  const ifdSize = 2 + entries.length * 12 + 4;
  let cursor = 8 + ifdSize;
  for (const entry of entries) {
    const size = TYPE_SIZE[entry.type] * entry.count;
    if (size <= 4) continue;
    entry.blockOffset = cursor;
    cursor += size;
  }
  const stripDataStart = cursor;
  const stripOffsets: number[] = [];
  let next = stripDataStart;
  for (const strip of strips) {
    stripOffsets.push(next);
    next += strip.length;
  }
  const stripOffsetsEntry = entries.find((entry) => entry.tag === 273)!;
  stripOffsetsEntry.values = stripOffsets;

  const total = next;
  const bytes = new Uint8Array(total);
  const view = new DataView(bytes.buffer);
  const little = !bigEndian;
  bytes[0] = little ? 0x49 : 0x4d;
  bytes[1] = little ? 0x49 : 0x4d;
  bytes[2] = little ? 0x2a : 0x00;
  bytes[3] = little ? 0x00 : 0x2a;
  view.setUint32(4, 8, little);

  const writeNumber = (pos: number, size: number, value: number): void => {
    if (size === 1) view.setUint8(pos, value);
    else if (size === 2) view.setUint16(pos, value, little);
    else view.setUint32(pos, value, little);
  };

  const writeField = (
    pos: number,
    type: number,
    count: number,
    values: number[] | string,
    external: number
  ): void => {
    if (typeof values === 'string') {
      const chars: number[] = [];
      for (let i = 0; i < count; i += 1) {
        chars.push(i < values.length ? values.charCodeAt(i) : 0);
      }
      const target = external > 0 ? external : pos;
      const base = little ? target : target + 4 - count;
      chars.forEach((char, i) => view.setUint8(base + i, char));
      return;
    }
    const size = TYPE_SIZE[type];
    if (size * count <= 4) {
      const base = little ? pos : pos + 4 - size * count;
      values.forEach((value, i) => writeNumber(base + i * size, size, value));
    } else {
      values.forEach((value, i) =>
        writeNumber(external + i * size, size, value)
      );
    }
  };

  view.setUint16(8, entries.length, little);
  const ifdEntriesStart = 10;
  entries.forEach((entry, i) => {
    const pos = ifdEntriesStart + i * 12;
    const size = TYPE_SIZE[entry.type] * entry.count;
    view.setUint16(pos, entry.tag, little);
    view.setUint16(pos + 2, entry.type, little);
    view.setUint32(pos + 4, entry.count, little);
    if (size > 4) {
      view.setUint32(pos + 8, entry.blockOffset, little);
    } else {
      writeField(pos + 8, entry.type, entry.count, entry.values, 0);
    }
  });
  view.setUint32(ifdEntriesStart + entries.length * 12, 0, little);

  for (const entry of entries) {
    const size = TYPE_SIZE[entry.type] * entry.count;
    if (size > 4)
      writeField(0, entry.type, entry.count, entry.values, entry.blockOffset);
  }

  let dataCursor = stripDataStart;
  strips.forEach((strip) => {
    bytes.set(strip, dataCursor);
    dataCursor += strip.length;
  });
  return bytes;
};

const expectPlane = (
  parsed: ReturnType<typeof parseTiff>,
  index: number,
  id: string,
  name: string,
  expected: number[]
): void => {
  expect(parsed.width).toBe(2);
  expect(parsed.height).toBe(1);
  expect(parsed.planes[index]).toMatchObject({ id, name });
  expect(Array.from(parsed.planes[index].data)).toEqual(expected);
};

const buildTiffStack = (strips: Uint8Array[]): Uint8Array => {
  const samples = 1;
  const bits = 8;
  const entries = 9;
  const ifdSize = 2 + entries * 12 + 4;
  const pageCount = strips.length;
  const total =
    8 +
    ifdSize * pageCount +
    strips.reduce((sum, strip) => sum + strip.length, 0);
  const bytes = new Uint8Array(total);
  const view = new DataView(bytes.buffer);
  bytes[0] = 0x49;
  bytes[1] = 0x49;
  bytes[2] = 0x2a;
  bytes[3] = 0x00;
  view.setUint32(4, 8, true);
  let ifdOffset = 8;
  let stripOffset = 8 + ifdSize * pageCount;
  strips.forEach((strip, pageIndex) => {
    const next = pageIndex === pageCount - 1 ? 0 : ifdOffset + ifdSize;
    view.setUint16(ifdOffset, entries, true);
    const start = ifdOffset + 2;
    const write = (
      pos: number,
      tag: number,
      type: number,
      count: number,
      value: number
    ): void => {
      view.setUint16(pos, tag, true);
      view.setUint16(pos + 2, type, true);
      view.setUint32(pos + 4, count, true);
      if (type === 3) view.setUint16(pos + 8, value, true);
      else view.setUint32(pos + 8, value, true);
    };
    write(start, 256, 4, 1, 2);
    write(start + 12, 257, 4, 1, 1);
    write(start + 24, 258, 3, 1, bits);
    write(start + 36, 259, 3, 1, 1);
    write(start + 48, 262, 3, 1, 1);
    write(start + 60, 277, 3, 1, samples);
    write(start + 72, 278, 4, 1, 1);
    write(start + 84, 273, 4, 1, stripOffset);
    write(start + 96, 279, 4, 1, strip.length);
    view.setUint32(ifdOffset + 2 + entries * 12, next, true);
    bytes.set(strip, stripOffset);
    stripOffset += strip.length;
    ifdOffset += ifdSize;
  });
  return bytes;
};

describe('isTiff', () => {
  it('detects little- and big-endian magic bytes', () => {
    expect(isTiff(new Uint8Array([0x49, 0x49, 0x2a, 0x00, 0, 0, 0, 0]))).toBe(
      true
    );
    expect(isTiff(new Uint8Array([0x4d, 0x4d, 0x00, 0x2a, 0, 0, 0, 0]))).toBe(
      true
    );
  });

  it('rejects non-TIFF bytes and short buffers', () => {
    expect(isTiff(new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0, 0, 0, 0]))).toBe(
      false
    );
    expect(isTiff(new Uint8Array([0x49, 0x49]))).toBe(false);
  });
});

describe('parseTiff', () => {
  it('decodes an uncompressed RGB chunky strip into r/g/b planes', () => {
    const pixels = new Uint8Array([255, 0, 0, 0, 128, 255]);
    const bytes = buildTiff({
      width: 2,
      height: 1,
      samples: 3,
      photometric: 2,
      strips: [pixels],
    });
    const parsed = parseTiff(bytes);
    expectPlane(parsed, 0, 'r', 'Red', [255, 0]);
    expectPlane(parsed, 1, 'g', 'Green', [0, 128]);
    expectPlane(parsed, 2, 'b', 'Blue', [0, 255]);
  });

  it('downshifts 16-bit grayscale samples to 8 bits', () => {
    const pixels = new Uint8Array([0xcd, 0xab, 0x00, 0xff]);
    const parsed = parseTiff(
      buildTiff({ width: 2, height: 1, samples: 1, bits: 16, strips: [pixels] })
    );
    expect(Array.from(parsed.planes[0].data)).toEqual([0xab, 0xff]);
  });

  it('decodes PackBits-compressed data', () => {
    const packBits = new Uint8Array([252, 200, 2, 1, 2, 3]);
    const parsed = parseTiff(
      buildTiff({
        width: 8,
        height: 1,
        samples: 1,
        compression: 5,
        strips: [packBits],
      })
    );
    expect(Array.from(parsed.planes[0].data)).toEqual([
      200, 200, 200, 200, 200, 1, 2, 3,
    ]);
  });

  it('reassembles multiple strips across rows', () => {
    const first = new Uint8Array([1, 2, 3, 4]);
    const second = new Uint8Array([5, 6, 7, 8]);
    const parsed = parseTiff(
      buildTiff({
        width: 2,
        height: 4,
        samples: 1,
        rowsPerStrip: 2,
        strips: [first, second],
      })
    );
    expect(Array.from(parsed.planes[0].data)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it('reads big-endian files', () => {
    const pixels = new Uint8Array([10, 20, 30, 40]);
    const parsed = parseTiff(
      buildTiff({
        width: 4,
        height: 1,
        samples: 1,
        strips: [pixels],
        bigEndian: true,
      })
    );
    expect(Array.from(parsed.planes[0].data)).toEqual([10, 20, 30, 40]);
  });

  it('applies OME channel names and physical size calibration', () => {
    const pixels = new Uint8Array([1, 2]);
    const xml =
      '<OME><Image><Pixels PhysicalSizeX="0.160" PhysicalSizeUnit="µm">' +
      '<Channel id="Channel:0:0" Name="DAPI"/><Channel id="Channel:0:1" Name="Alexa"/>' +
      '</Pixels></Image></OME>';
    const parsed = parseTiff(
      buildTiff({
        width: 2,
        height: 1,
        samples: 2,
        photometric: 0,
        strips: [pixels],
        imageDescription: xml,
      })
    );
    expect(parsed.planes[0].name).toBe('DAPI');
    expect(parsed.planes[1].name).toBe('Alexa');
    expect(parsed.calibration.pixelsPerMicron).toBeCloseTo(6.25);
  });

  it('falls back to generic plane names without OME metadata', () => {
    const pixels = new Uint8Array([1, 2]);
    const parsed = parseTiff(
      buildTiff({ width: 2, height: 1, samples: 2, strips: [pixels] })
    );
    expect(parsed.planes.map((plane) => plane.name)).toEqual([
      'Channel 1',
      'Channel 2',
    ]);
    expect(parsed.calibration.pixelsPerMicron).toBeNull();
  });

  it('throws for non-TIFF input', () => {
    expect(() => parseTiff(new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7]))).toThrow(
      TiffError
    );
  });

  it('throws for unsupported compression', () => {
    const pixels = new Uint8Array([0]);
    expect(() =>
      parseTiff(
        buildTiff({
          width: 1,
          height: 1,
          samples: 1,
          compression: 7,
          strips: [pixels],
        })
      )
    ).toThrow(TiffError);
  });
});

describe('parseTiffStack', () => {
  it('groups multiple IFD pages into z-ordered slices', () => {
    const parsed = parseTiffStack(
      buildTiffStack([
        new Uint8Array([1, 1]),
        new Uint8Array([2, 2]),
        new Uint8Array([3, 3]),
      ])
    );
    expect(parsed.width).toBe(2);
    expect(parsed.height).toBe(1);
    expect(parsed.slices).toHaveLength(3);
    expect(parsed.slices.map((slice) => slice.z)).toEqual([0, 1, 2]);
    expect(Array.from(parsed.slices[0].planes[0].data)).toEqual([1, 1]);
    expect(Array.from(parsed.slices[2].planes[0].data)).toEqual([3, 3]);
  });

  it('assigns sequential ids and null frames', () => {
    const parsed = parseTiffStack(buildTiffStack([new Uint8Array([1])]));
    expect(parsed.slices[0].id).toBe('slice-0');
    expect(parsed.slices[0].frame).toBeNull();
  });

  it('returns a single-slice stack for single-page files', () => {
    const parsed = parseTiffStack(buildTiffStack([new Uint8Array([7])]));
    expect(parsed.slices).toHaveLength(1);
  });

  it('stops at the zero IFD terminator', () => {
    const parsed = parseTiffStack(
      buildTiffStack([new Uint8Array([1]), new Uint8Array([2])])
    );
    expect(parsed.slices).toHaveLength(2);
  });
});

describe('parseOmeXml', () => {
  it('extracts channels and ignores missing physical size', () => {
    const result = parseOmeXml(
      '<OME><Channel id="C0" Name="Red"/><Channel id="C1"/></OME>'
    );
    expect(result.channels).toEqual([
      { id: 'C0', name: 'Red' },
      { id: 'C1', name: 'C1' },
    ]);
    expect(result.pixelsPerMicron).toBeNull();
  });
});
