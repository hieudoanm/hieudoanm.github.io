import {
  AI_MODELS,
  MOCK_RESPONSES,
  MOCK_TITLES,
  SYSTEM_PROMPT_TEMPLATES,
} from '@/data/models';

describe('AI_MODELS', () => {
  it('exposes four models with complete metadata', () => {
    expect(AI_MODELS).toHaveLength(4);
    for (const model of AI_MODELS) {
      expect(model.id).toBeTruthy();
      expect(model.name).toBeTruthy();
      expect(model.badge).toBeTruthy();
      expect(model.badgeColor).toBeTruthy();
      expect(model.description).toBeTruthy();
      expect(model.contextWindow).toBeTruthy();
      expect(model.capabilities.length).toBeGreaterThan(0);
      expect(model.responseStyle).toBeTruthy();
    }
  });

  it('has unique ids', () => {
    const ids = AI_MODELS.map((m) => m.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('MOCK_RESPONSES', () => {
  it('provides non-empty responses for every model', () => {
    for (const model of AI_MODELS) {
      expect(MOCK_RESPONSES[model.id].length).toBeGreaterThan(0);
    }
  });
});

describe('MOCK_TITLES', () => {
  it('provides a list of seed titles', () => {
    expect(MOCK_TITLES).toHaveLength(10);
    expect(MOCK_TITLES[0]).toBe('Getting Started with TypeScript');
  });
});

describe('SYSTEM_PROMPT_TEMPLATES', () => {
  it('provides named prompt templates', () => {
    expect(SYSTEM_PROMPT_TEMPLATES).toHaveLength(4);
    for (const tpl of SYSTEM_PROMPT_TEMPLATES) {
      expect(tpl.name).toBeTruthy();
      expect(tpl.prompt.length).toBeGreaterThan(0);
    }
  });
});
