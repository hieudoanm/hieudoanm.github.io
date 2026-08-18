import { preselectWriteTool, popPreselectedTool, TOOLS } from '../config';

describe('write config', () => {
  it('preselects and pops a tool id', () => {
    preselectWriteTool('write-article');
    expect(popPreselectedTool()).toBe('write-article');
  });

  it('returns null when nothing is preselected', () => {
    preselectWriteTool(null);
    expect(popPreselectedTool()).toBeNull();
  });

  it('returns null on repeated pops', () => {
    preselectWriteTool('write-essay');
    popPreselectedTool();
    expect(popPreselectedTool()).toBeNull();
  });

  it('exposes unique tool ids', () => {
    const ids = TOOLS.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(TOOLS.length).toBeGreaterThan(0);
  });

  it('has config fields for tone and translate tools', () => {
    const tone = TOOLS.find((t) => t.id === 'write-tone');
    expect(tone?.configFields?.[0].id).toBe('tone');
    const translate = TOOLS.find((t) => t.id === 'write-translate');
    expect(translate?.configFields?.[0].id).toBe('language');
  });
});
