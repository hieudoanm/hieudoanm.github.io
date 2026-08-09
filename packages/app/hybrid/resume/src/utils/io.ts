import { parse as parseYaml, stringify as stringifyYaml } from 'yaml';
import type { ResumeData } from '../types/resume';
import { collectContact } from './contact';
import { splitComma, splitLines } from './text';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isString = (value: unknown): value is string => typeof value === 'string';

const REQUIRED_ARRAY_KEYS = [
  'experience',
  'education',
  'projects',
  'skills',
  'certifications',
  'languages',
] as const;

const collectStringRecordProblems = (key: string, value: unknown): string[] => {
  if (!isRecord(value)) return [`${key} must be an object.`];
  return Object.entries(value)
    .filter(([, fieldValue]) => !isString(fieldValue))
    .map(([field]) => `${key}.${field} must be a string.`);
};

const collectArrayProblems = (key: string, value: unknown): string[] => {
  if (!Array.isArray(value)) return [`${key} must be an array.`];
  return value.flatMap((item, index) =>
    collectStringRecordProblems(`${key}[${index}]`, item)
  );
};

export const collectResumeDataProblems = (value: unknown): string[] => {
  if (!isRecord(value)) return ['The file must contain a top-level object.'];
  const problems = collectStringRecordProblems('personal', value.personal);
  if (!isString(value.summary)) problems.push('summary must be a string.');
  if (!isString(value.interests)) problems.push('interests must be a string.');
  for (const key of REQUIRED_ARRAY_KEYS) {
    problems.push(...collectArrayProblems(key, value[key]));
  }
  return problems;
};

export const isResumeData = (value: unknown): value is ResumeData =>
  collectResumeDataProblems(value).length === 0;

export const serializeResumeJson = (data: ResumeData): string =>
  JSON.stringify(data, null, 2);

export const serializeResumeYaml = (data: ResumeData): string =>
  stringifyYaml(data);

const parseStructured = (text: string): unknown => {
  try {
    return JSON.parse(text);
  } catch {
    return parseYaml(text);
  }
};

export const parseResumeData = (input: string): ResumeData => {
  const text = input.trim();
  if (!text) {
    throw new Error('The file is empty.');
  }
  let parsed: unknown;
  try {
    parsed = parseStructured(text);
  } catch {
    throw new Error('The file is not valid JSON or YAML.');
  }
  if (!isResumeData(parsed)) {
    const problems = collectResumeDataProblems(parsed);
    throw new Error(
      `The file is not a valid resume:\n${problems
        .map((problem) => `- ${problem}`)
        .join('\n')}`
    );
  }
  return parsed;
};

export const stripExtension = (fileName: string): string =>
  fileName.replace(/\.(json|yaml|yml)$/i, '');

export const resumeFileName = (data: ResumeData, hint?: string): string => {
  const name = (hint ?? data.personal.fullName).trim().toLowerCase();
  const slug = name.replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  return slug || 'resume';
};

export const dateStamp = (date: Date = new Date()): string => {
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}`;
};

export const serializeResumeText = (data: ResumeData): string => {
  const { personal, summary, interests } = data;
  const lines: string[] = [personal.fullName];
  if (personal.jobTitle) lines.push(personal.jobTitle);
  const contacts = collectContact(data);
  if (contacts.length > 0) lines.push(contacts.join(' | '));
  lines.push('');

  if (summary) lines.push('SUMMARY', summary, '');

  const pushSection = (title: string, items: string[]): void => {
    if (items.length === 0) return;
    lines.push(title, ...items, '');
  };

  pushSection(
    'EXPERIENCE',
    data.experience.flatMap((item) => [
      `${item.role} — ${item.company}`,
      [
        item.location,
        [item.startDate, item.endDate].filter(Boolean).join(' – '),
      ]
        .filter(Boolean)
        .join(' | '),
      ...splitLines(item.description).map((line) => `- ${line}`),
      '',
    ])
  );

  pushSection(
    'EDUCATION',
    data.education.flatMap((item) => [
      `${item.degree}${item.field ? ` in ${item.field}` : ''} — ${item.school}`,
      [item.startDate, item.endDate].filter(Boolean).join(' – '),
      ...splitLines(item.description).map((line) => `- ${line}`),
      '',
    ])
  );

  pushSection(
    'PROJECTS',
    data.projects.flatMap((item) => [
      `${item.name}${item.link ? ` (${item.link})` : ''}`,
      item.technologies,
      item.description,
      '',
    ])
  );

  pushSection(
    'SKILLS',
    data.skills.flatMap((group) => [`${group.category}: ${group.items}`, ''])
  );

  pushSection(
    'CERTIFICATIONS',
    data.certifications.map(
      (item) =>
        `${item.name}${item.issuer ? ` — ${item.issuer}` : ''}${
          item.date ? ` (${item.date})` : ''
        }`
    )
  );

  pushSection(
    'LANGUAGES',
    data.languages.map(
      (item) =>
        `${item.name}${item.proficiency ? ` — ${item.proficiency}` : ''}`
    )
  );

  if (interests) lines.push('INTERESTS', splitComma(interests).join(', '));

  return lines.join('\n').trim() + '\n';
};

export const copyToClipboard = async (text: string): Promise<void> => {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
};

export const downloadTextFile = (
  content: string,
  filename: string,
  mimeType: string
): void => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
