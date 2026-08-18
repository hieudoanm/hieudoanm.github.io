import { CATEGORIES, TOOLS, type VideoToolConfig } from '@/data/video-tools';

describe('CATEGORIES', () => {
  it('lists the four video tool categories in order', () => {
    expect(CATEGORIES.map((c) => c.key)).toEqual([
      'convert',
      'edit',
      'audio',
      'download',
    ]);
  });

  it('gives every category a label and emoji', () => {
    for (const cat of CATEGORIES) {
      expect(cat.label.length).toBeGreaterThan(0);
      expect(cat.emoji.length).toBeGreaterThan(0);
    }
  });
});

describe('TOOLS', () => {
  it('contains at least one tool per category', () => {
    for (const cat of CATEGORIES) {
      expect(TOOLS.some((t) => t.category === cat.key)).toBe(true);
    }
  });

  it('has unique tool ids', () => {
    const ids = TOOLS.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('gives every tool a title, emoji, and description', () => {
    for (const tool of TOOLS) {
      expect(tool.title.length).toBeGreaterThan(0);
      expect(tool.emoji.length).toBeGreaterThan(0);
      expect(tool.description.length).toBeGreaterThan(0);
    }
  });

  it('declares a valid category for every tool', () => {
    const valid = new Set(CATEGORIES.map((c) => c.key));
    for (const tool of TOOLS) {
      expect(valid.has(tool.category)).toBe(true);
    }
  });
});

describe('convert tools', () => {
  const converts = TOOLS.filter((t) => t.category === 'convert');

  it('defines an output extension for every convert tool', () => {
    for (const tool of converts) {
      expect(tool.outputExt).toBeDefined();
      expect(tool.outputExt).toMatch(/^[a-z0-9]+$/);
    }
  });

  it('defines a mime type for every convert tool', () => {
    for (const tool of converts) {
      expect(tool.mimeType).toBeDefined();
    }
  });

  it('accepts files matching the input format when declared', () => {
    const withInput = converts.filter((t) => t.inputFormat);
    for (const tool of withInput) {
      expect(tool.accept).toContain(tool.inputFormat!.toLowerCase());
    }
  });

  it('replaces the output extension on the original file name', () => {
    const tool = TOOLS.find(
      (t) => t.id === 'video-aac-to-mp3'
    ) as VideoToolConfig;
    const name = 'song.aac';
    expect(name.replace(/\.[^.]+$/, `.${tool.outputExt}`)).toBe('song.mp3');
  });
});

describe('download tools', () => {
  const downloads = TOOLS.filter((t) => t.category === 'download');

  it('declares a platform for every download tool', () => {
    for (const tool of downloads) {
      expect(tool.platform).toBeDefined();
      expect(tool.platform?.length).toBeGreaterThan(0);
    }
  });

  it('covers the major social platforms', () => {
    const platforms = downloads.map((t) => t.platform);
    expect(platforms).toContain('Facebook');
    expect(platforms).toContain('Instagram');
    expect(platforms).toContain('TikTok');
    expect(platforms).toContain('YouTube');
  });
});
