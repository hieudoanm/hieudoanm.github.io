import type { Calibration, ChannelPlane, StackSlice } from '@/types/image';

export class TiffError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TiffError';
  }
}

export interface TiffMetadata {
  width: number;
  height: number;
  samples: number;
  bits: number;
  photometric: number;
  compression: number;
  planarConfiguration: number;
  rowsPerStrip: number;
  offsets: number[];
  counts: number[];
}

export interface ParsedTiff {
  width: number;
  height: number;
  planes: ChannelPlane[];
  calibration: Calibration;
  bits: number;
}

export interface ParsedTiffStack {
  width: number;
  height: number;
  slices: StackSlice[];
  calibration: Calibration;
  bits: number;
}

export interface OmeChannels {
  channels: { id: string; name: string }[];
  pixelsPerMicron: number | null;
}

interface TiffEntry {
  type: number;
  count: number;
  offset: number;
}

interface TiffReader {
  bytes: Uint8Array;
  little: boolean;
}

const typeSize = (type: number): number => {
  switch (type) {
    case 1:
    case 2:
    case 6:
    case 7:
      return 1;
    case 3:
    case 8:
      return 2;
    case 4:
    case 9:
    case 11:
      return 4;
    case 5:
    case 10:
    case 12:
      return 8;
    default:
      return 1;
  }
};

const readAt = (reader: TiffReader, offset: number, size: number): number => {
  const view = new DataView(reader.bytes.buffer, reader.bytes.byteOffset);
  switch (size) {
    case 1:
      return view.getUint8(offset);
    case 2:
      return view.getUint16(offset, reader.little);
    case 4:
      return view.getUint32(offset, reader.little);
    default:
      return 0;
  }
};

export const isTiff = (bytes: Uint8Array): boolean => {
  if (bytes.length < 8) return false;
  const little =
    bytes[0] === 0x49 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x2a &&
    bytes[3] === 0x00;
  const big =
    bytes[0] === 0x4d &&
    bytes[1] === 0x4d &&
    bytes[2] === 0x00 &&
    bytes[3] === 0x2a;
  return little || big;
};

export const parseOmeXml = (xml: string): OmeChannels => {
  const channels: { id: string; name: string }[] = [];
  const physicalMatch = xml.match(/<Pixels[^>]*PhysicalSizeX="([^"]+)"/i);
  const physical = physicalMatch ? Number.parseFloat(physicalMatch[1]) : NaN;
  const pixelsPerMicron =
    Number.isFinite(physical) && physical > 0 ? 1 / physical : null;
  for (const match of xml.matchAll(/<Channel\b([^>]*)\/>/gi)) {
    const attrs = match[1];
    const id = attrs.match(/\bid="([^"]+)"/i)?.[1] ?? '';
    const name = attrs.match(/\bName="([^"]+)"/i)?.[1] ?? id;
    channels.push({ id, name });
  }
  return { channels, pixelsPerMicron };
};

const parseIfd = (
  reader: TiffReader,
  offset: number
): Map<number, TiffEntry> => {
  const view = new DataView(reader.bytes.buffer, reader.bytes.byteOffset);
  const count = view.getUint16(offset, reader.little);
  const entries = new Map<number, TiffEntry>();
  for (let i = 0; i < count; i += 1) {
    const pos = offset + 2 + i * 12;
    entries.set(view.getUint16(pos, reader.little), {
      type: view.getUint16(pos + 2, reader.little),
      count: view.getUint32(pos + 4, reader.little),
      offset: pos + 8,
    });
  }
  return entries;
};

const entryValues = (reader: TiffReader, entry: TiffEntry): number[] => {
  const size = typeSize(entry.type);
  const count = entry.count;
  const inline = size * count <= 4;
  let base: number;
  if (inline) {
    base = entry.offset + (reader.little ? 0 : 4 - size * count);
  } else {
    base = readAt(reader, entry.offset, 4);
  }
  const step = inline && size === 1 ? 1 : size;
  const values: number[] = [];
  for (let i = 0; i < count; i += 1) {
    values.push(readAt(reader, base + i * step, size));
  }
  return values;
};

const entryString = (reader: TiffReader, entry: TiffEntry): string => {
  const inline = entry.count <= 4;
  const base = inline
    ? entry.offset + (reader.little ? 0 : 4 - entry.count)
    : readAt(reader, entry.offset, 4);
  const chars: number[] = [];
  for (let i = 0; i < entry.count; i += 1) {
    const byte = readAt(reader, base + i, 1);
    if (byte === 0) break;
    chars.push(byte);
  }
  return String.fromCharCode(...chars);
};

const required = (entry: TiffEntry | undefined, tag: string): TiffEntry => {
  if (!entry) throw new TiffError(`Missing required tag: ${tag}`);
  return entry;
};

const values = (
  reader: TiffReader,
  entry: TiffEntry | undefined,
  fallback: number
): number => (entry ? (entryValues(reader, entry)[0] ?? fallback) : fallback);

const readMetadata = (
  reader: TiffReader,
  entries: Map<number, TiffEntry>
): TiffMetadata => {
  const width = values(reader, entries.get(256), 0);
  const height = values(reader, entries.get(257), 0);
  const samples = values(reader, entries.get(277), 1);
  const bits = values(reader, entries.get(258), 8);
  if (bits !== 8 && bits !== 16)
    throw new TiffError(`Unsupported bit depth: ${bits}`);
  const photometric = values(reader, entries.get(262), 1);
  const compression = values(reader, entries.get(259), 1);
  const planarConfiguration = values(reader, entries.get(284), 1);
  const rowsPerStrip = values(reader, entries.get(278), height);
  const offsets = entryValues(
    reader,
    required(entries.get(273), 'StripOffsets')
  );
  const counts = entryValues(
    reader,
    required(entries.get(279), 'StripByteCounts')
  );
  return {
    width,
    height,
    samples,
    bits,
    photometric,
    compression,
    planarConfiguration,
    rowsPerStrip,
    offsets,
    counts,
  };
};

const decodePackBits = (input: Uint8Array, expected: number): Uint8Array => {
  const out = new Uint8Array(expected);
  let ip = 0;
  let op = 0;
  while (ip < input.length && op < expected) {
    const header = input[ip];
    ip += 1;
    if (header >= 128) {
      const run = 257 - header;
      const value = input[ip];
      ip += 1;
      for (let i = 0; i < run && op < expected; i += 1)
        ((out[op] = value), (op += 1));
    } else {
      const literal = header + 1;
      for (let i = 0; i < literal && op < expected; i += 1)
        ((out[op] = input[ip + i]), (op += 1));
      ip += literal;
    }
  }
  return out;
};

const decodeStrip = (
  reader: TiffReader,
  offset: number,
  count: number,
  expected: number,
  compression: number
): Uint8Array => {
  const raw = reader.bytes.subarray(offset, offset + count);
  if (compression === 1) return raw;
  if (compression === 5 || compression === 32773)
    return decodePackBits(raw, expected);
  throw new TiffError(`Unsupported compression: ${compression}`);
};

const sampleValue = (
  raw: Uint8Array,
  base: number,
  bytes: number,
  little: boolean
): number => {
  if (bytes === 1) return raw[base];
  return little
    ? raw[base] | (raw[base + 1] << 8)
    : (raw[base] << 8) | raw[base + 1];
};

const fillSamples = (
  raw: Uint8Array,
  frames: Uint8ClampedArray[],
  startRow: number,
  rows: number,
  width: number,
  samples: number,
  bytes: number,
  bits: number,
  little: boolean
): void => {
  const stride = samples * bytes;
  for (let row = 0; row < rows; row += 1) {
    const rowBase = row * width * stride;
    const outRow = (startRow + row) * width;
    for (let x = 0; x < width; x += 1) {
      const pixelBase = rowBase + x * stride;
      for (let s = 0; s < samples; s += 1) {
        const value = sampleValue(raw, pixelBase + s * bytes, bytes, little);
        frames[s][outRow + x] = bits === 16 ? value >> 8 : value;
      }
    }
  }
};

const fillPlane = (
  raw: Uint8Array,
  frame: Uint8ClampedArray,
  startRow: number,
  rows: number,
  width: number,
  bytes: number,
  bits: number,
  little: boolean
): void => {
  for (let row = 0; row < rows; row += 1) {
    const rowBase = row * width * bytes;
    const outRow = (startRow + row) * width;
    for (let x = 0; x < width; x += 1) {
      const value = sampleValue(raw, rowBase + x * bytes, bytes, little);
      frame[outRow + x] = bits === 16 ? value >> 8 : value;
    }
  }
};

const decodeChunky = (
  reader: TiffReader,
  meta: TiffMetadata,
  frames: Uint8ClampedArray[]
): void => {
  const bytes = meta.bits / 8;
  const stride = meta.samples * bytes;
  const rowBytes = meta.width * stride;
  let decodedRows = 0;
  for (let i = 0; i < meta.offsets.length; i += 1) {
    const rows = Math.min(meta.rowsPerStrip, meta.height - decodedRows);
    const expected = rows * rowBytes;
    const raw = decodeStrip(
      reader,
      meta.offsets[i],
      meta.counts[i],
      expected,
      meta.compression
    );
    fillSamples(
      raw,
      frames,
      decodedRows,
      rows,
      meta.width,
      meta.samples,
      bytes,
      meta.bits,
      reader.little
    );
    decodedRows += rows;
  }
};

const decodePlanar = (
  reader: TiffReader,
  meta: TiffMetadata,
  frames: Uint8ClampedArray[]
): void => {
  const bytes = meta.bits / 8;
  const stripsPerSample = meta.offsets.length / meta.samples;
  for (let s = 0; s < meta.samples; s += 1) {
    let decodedRows = 0;
    for (let k = 0; k < stripsPerSample; k += 1) {
      const index = s * stripsPerSample + k;
      const rows = Math.min(meta.rowsPerStrip, meta.height - decodedRows);
      const expected = rows * meta.width * bytes;
      const raw = decodeStrip(
        reader,
        meta.offsets[index],
        meta.counts[index],
        expected,
        meta.compression
      );
      fillPlane(
        raw,
        frames[s],
        decodedRows,
        rows,
        meta.width,
        bytes,
        meta.bits,
        reader.little
      );
      decodedRows += rows;
    }
  }
};

const defaultNames = (samples: number, photometric: number): string[] => {
  if (photometric === 2 && samples === 3) return ['Red', 'Green', 'Blue'];
  return Array.from({ length: samples }, (_, i) => `Channel ${i + 1}`);
};

const defaultIds = (samples: number, photometric: number): string[] => {
  if (photometric === 2 && samples === 3) return ['r', 'g', 'b'];
  return Array.from({ length: samples }, (_, i) => `sample-${i}`);
};

const nextIfdOffset = (
  reader: TiffReader,
  ifdOffset: number,
  count: number
): number => readAt(reader, ifdOffset + 2 + count * 12, 4);

const decodePage = (
  reader: TiffReader,
  ifdOffset: number
): { meta: TiffMetadata; frames: Uint8ClampedArray[]; next: number } => {
  const entries = parseIfd(reader, ifdOffset);
  const meta = readMetadata(reader, entries);
  const frames = Array.from(
    { length: meta.samples },
    () => new Uint8ClampedArray(meta.width * meta.height)
  );
  if (meta.planarConfiguration === 2) {
    decodePlanar(reader, meta, frames);
  } else {
    decodeChunky(reader, meta, frames);
  }
  return {
    meta,
    frames,
    next: nextIfdOffset(reader, ifdOffset, entries.size),
  };
};

const planesOf = (
  frames: Uint8ClampedArray[],
  meta: TiffMetadata,
  names: string[],
  ids: string[]
): ChannelPlane[] =>
  frames.map((data, i) => ({
    id: ids[i],
    name: names[i],
    data,
  }));

export const parseTiff = (bytes: Uint8Array): ParsedTiff => {
  if (!isTiff(bytes)) throw new TiffError('Not a TIFF file');
  const reader: TiffReader = { bytes, little: bytes[0] === 0x49 };
  const { meta, frames } = decodePage(reader, readAt(reader, 4, 4));
  const description = (() => {
    const entries = parseIfd(reader, readAt(reader, 4, 4));
    return entries.get(270);
  })();
  const ome = parseOmeXml(description ? entryString(reader, description) : '');
  const names =
    ome.channels.length > 0
      ? ome.channels.map((channel) => channel.name)
      : defaultNames(meta.samples, meta.photometric);
  const ids =
    ome.channels.length > 0
      ? ome.channels.map((channel) => channel.id)
      : defaultIds(meta.samples, meta.photometric);
  return {
    width: meta.width,
    height: meta.height,
    planes: planesOf(frames, meta, names, ids),
    calibration: { pixelsPerMicron: ome.pixelsPerMicron },
    bits: meta.bits,
  };
};

export const parseTiffStack = (bytes: Uint8Array): ParsedTiffStack => {
  if (!isTiff(bytes)) throw new TiffError('Not a TIFF file');
  const reader: TiffReader = { bytes, little: bytes[0] === 0x49 };
  const firstIfd = readAt(reader, 4, 4);
  const firstEntries = parseIfd(reader, firstIfd);
  const description = firstEntries.get(270);
  const ome = parseOmeXml(description ? entryString(reader, description) : '');
  const names =
    ome.channels.length > 0
      ? ome.channels.map((channel) => channel.name)
      : null;
  const ids =
    ome.channels.length > 0 ? ome.channels.map((channel) => channel.id) : null;
  const slices: StackSlice[] = [];
  let ifdOffset = firstIfd;
  let bits = 8;
  let width = 0;
  let height = 0;
  while (ifdOffset !== 0 && slices.length < 1024) {
    const { meta, frames, next } = decodePage(reader, ifdOffset);
    bits = meta.bits;
    width = meta.width;
    height = meta.height;
    const sliceIds = ids ?? defaultIds(meta.samples, meta.photometric);
    const sliceNames = names ?? defaultNames(meta.samples, meta.photometric);
    slices.push({
      id: `slice-${slices.length}`,
      z: slices.length,
      frame: null,
      planes: planesOf(frames, meta, sliceNames, sliceIds),
    });
    ifdOffset = next;
  }
  return {
    width,
    height,
    slices,
    calibration: { pixelsPerMicron: ome.pixelsPerMicron },
    bits,
  };
};
