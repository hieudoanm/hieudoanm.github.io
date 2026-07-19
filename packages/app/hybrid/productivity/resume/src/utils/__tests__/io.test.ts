import { seedResumeData } from '../../data/seed';
import {
  collectResumeDataProblems,
  copyToClipboard,
  dateStamp,
  downloadTextFile,
  isResumeData,
  parseResumeData,
  resumeFileName,
  serializeResumeJson,
  serializeResumeText,
  serializeResumeYaml,
  stripExtension,
} from '../io';

describe('io utils', () => {
  it('serializes resume data to JSON', () => {
    const json = serializeResumeJson(seedResumeData);
    expect(JSON.parse(json)).toEqual(seedResumeData);
  });

  it('serializes resume data to YAML', () => {
    const yaml = serializeResumeYaml(seedResumeData);
    expect(yaml).toContain('fullName: John Smith');
    expect(yaml).toContain('summary:');
  });

  it('parses a JSON export back to resume data', () => {
    const json = serializeResumeJson(seedResumeData);
    expect(parseResumeData(json)).toEqual(seedResumeData);
  });

  it('parses a YAML export back to resume data', () => {
    const yaml = serializeResumeYaml(seedResumeData);
    expect(parseResumeData(yaml)).toEqual(seedResumeData);
  });

  it('throws on empty input', () => {
    expect(() => parseResumeData('   ')).toThrow('empty');
  });

  it('throws on invalid structured content', () => {
    expect(() => parseResumeData('{not valid json')).toThrow(
      'not valid JSON or YAML'
    );
  });

  it('throws when content is not a resume', () => {
    expect(() => parseResumeData('hello: world')).toThrow('not a valid resume');
  });

  it('lists each problem when the resume is invalid', () => {
    const invalid = {
      personal: { fullName: 42 },
      summary: null,
      experience: 'nope',
      education: [],
      projects: [],
      skills: [],
      certifications: [],
      languages: [],
      interests: 'Open source',
    };
    expect(() => parseResumeData(JSON.stringify(invalid))).toThrow(
      'The file is not a valid resume:\n- personal.fullName must be a string.\n- summary must be a string.\n- experience must be an array.'
    );
  });

  it('reports the exact field that is not a string in an array item', () => {
    const invalid = {
      ...seedResumeData,
      experience: [{ ...seedResumeData.experience[0], company: 123 }],
    };
    expect(collectResumeDataProblems(invalid)).toEqual([
      'experience[0].company must be a string.',
    ]);
  });

  it('reports a missing top-level object', () => {
    expect(collectResumeDataProblems('not an object')).toEqual([
      'The file must contain a top-level object.',
    ]);
  });

  it('reports no problems for well-formed resume data', () => {
    expect(collectResumeDataProblems(seedResumeData)).toEqual([]);
  });

  it('throws when required arrays are missing', () => {
    const { experience: _experience, ...rest } = seedResumeData;
    expect(() => parseResumeData(JSON.stringify(rest))).toThrow(
      'experience must be an array.'
    );
  });

  it('validates well-formed resume data', () => {
    expect(isResumeData(seedResumeData)).toBe(true);
  });

  it('rejects malformed resume data', () => {
    expect(isResumeData({ ...seedResumeData, personal: null })).toBe(false);
    expect(isResumeData({ ...seedResumeData, experience: 'nope' })).toBe(false);
  });

  it('builds a slug file name from the full name', () => {
    expect(resumeFileName(seedResumeData)).toBe('john-smith');
    expect(
      resumeFileName({
        ...seedResumeData,
        personal: { ...seedResumeData.personal, fullName: '' },
      })
    ).toBe('resume');
  });

  it('downloads text files through a temporary anchor', () => {
    const createObjectURL = jest.fn(() => 'blob:mock');
    const revokeObjectURL = jest.fn();
    URL.createObjectURL = createObjectURL as typeof URL.createObjectURL;
    URL.revokeObjectURL = revokeObjectURL as typeof URL.revokeObjectURL;
    const clickSpy = jest
      .spyOn(HTMLAnchorElement.prototype, 'click')
      .mockImplementation(() => {});

    downloadTextFile('{ "a": 1 }', 'data.json', 'application/json');

    expect(createObjectURL).toHaveBeenCalled();
    expect(clickSpy).toHaveBeenCalled();
    expect(revokeObjectURL).toHaveBeenCalled();
  });

  it('serializes resume data to plain text with all sections', () => {
    const text = serializeResumeText(seedResumeData);
    expect(text).toContain('John Smith');
    expect(text).toContain('SUMMARY');
    expect(text).toContain('EXPERIENCE');
    expect(text).toContain('EDUCATION');
    expect(text).toContain('PROJECTS');
    expect(text).toContain('SKILLS');
    expect(text).toContain('CERTIFICATIONS');
    expect(text).toContain('LANGUAGES');
    expect(text).toContain('INTERESTS');
  });

  it('omits empty sections from the plain text export', () => {
    const text = serializeResumeText({
      ...seedResumeData,
      summary: '',
      certifications: [],
      languages: [],
      interests: '',
      projects: [],
      skills: [],
      education: [],
      experience: [],
    });
    expect(text).toContain('John Smith');
    expect(text).not.toContain('SUMMARY');
    expect(text).not.toContain('INTERESTS');
  });

  it('strips the extension from a file name', () => {
    expect(stripExtension('resume.json')).toBe('resume');
    expect(stripExtension('resume.yaml')).toBe('resume');
    expect(stripExtension('resume.YML')).toBe('resume');
    expect(stripExtension('resume')).toBe('resume');
  });

  it('formats a date as YYYY-MM-DD', () => {
    const date = new Date(2025, 0, 7);
    expect(dateStamp(date)).toBe('2025-01-07');
  });

  it('copies text through the clipboard API when available', async () => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });

    await copyToClipboard('hello');

    expect(writeText).toHaveBeenCalledWith('hello');
  });

  it('falls back to execCommand when the clipboard API is missing', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: undefined,
      configurable: true,
    });
    const execCommand = jest.fn();
    document.execCommand = execCommand as typeof document.execCommand;

    await copyToClipboard('hello');

    expect(execCommand).toHaveBeenCalledWith('copy');
    expect(document.querySelector('textarea')).not.toBeInTheDocument();
  });
});
