import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

export interface PostAnswer {
  question: string;
  paragraphs: string[];
}

export type PostDifficulty = 'easy' | 'medium' | 'hard';

export interface Post {
  slug: string;
  title: string;
  description: string;
  difficulty: PostDifficulty;
  category: string;
  author: string;
  tags: string[];
  questions: string[];
  answers: PostAnswer[];
  diagramText: string;
}

export interface PostSummary {
  slug: string;
  title: string;
  description: string;
  difficulty: PostDifficulty;
  category: string;
  tags: string[];
}

interface Section {
  heading: string;
  lines: string[];
}

interface AnswerBlock {
  question: string;
  lines: string[];
}

const POSTS_DIR = join(process.cwd(), 'src', 'posts');

const SLUG_PATTERN = /^[a-z0-9][a-z0-9-]*$/i;

const splitSections = (lines: string[]): Section[] => {
  const sections: Section[] = [];
  let current: Section | null = null;
  for (const line of lines) {
    if (line.startsWith('## ')) {
      current = { heading: line.slice(3).trim(), lines: [] };
      sections.push(current);
      continue;
    }
    if (current) current.lines.push(line);
  }
  return sections;
};

const findSection = (
  sections: Section[],
  heading: string
): Section | undefined => sections.find((s) => s.heading === heading);

const extractDiagram = (lines: string[]): string => {
  const fence = lines.findIndex((line) => line.trim().startsWith('```'));
  if (fence === -1) return '';
  const body: string[] = [];
  for (let i = fence + 1; i < lines.length; i++) {
    if (lines[i].trim().startsWith('```')) break;
    body.push(lines[i]);
  }
  return body.join('\n').trim();
};

const groupParagraphs = (lines: string[]): string[] => {
  const paragraphs: string[] = [];
  let current: string[] = [];
  const flush = (): void => {
    if (current.length > 0) {
      paragraphs.push(current.join(' ').trim());
      current = [];
    }
  };
  for (const line of lines) {
    if (line.trim()) {
      current.push(line.trim());
    } else {
      flush();
    }
  }
  flush();
  return paragraphs.filter(Boolean);
};

const stripQuestionPrefix = (heading: string): string =>
  heading.replace(/^Q\d+\.\s*/, '').trim();

const parseAnswers = (lines: string[]): PostAnswer[] => {
  const blocks: AnswerBlock[] = [];
  let current: AnswerBlock | null = null;
  for (const line of lines) {
    if (line.startsWith('### ')) {
      current = {
        question: stripQuestionPrefix(line.slice(4)),
        lines: [],
      };
      blocks.push(current);
      continue;
    }
    if (current) current.lines.push(line);
  }
  return blocks.map((block) => ({
    question: block.question,
    paragraphs: groupParagraphs(block.lines),
  }));
};

const parseDescription = (lines: string[]): string => {
  const firstSection = lines.findIndex((line) => line.startsWith('## '));
  const slice = firstSection === -1 ? lines : lines.slice(0, firstSection);
  return groupParagraphs(slice.slice(1)).join(' ');
};

interface ParsedFrontmatter {
  title?: string;
  difficulty?: string;
  category?: string;
  author?: string;
  tags: string[];
  rest: string[];
}

const DEFAULT_DIFFICULTY: PostDifficulty = 'medium';
const DEFAULT_CATEGORY = 'system-design';
const DEFAULT_AUTHOR = 'Hieu Doan';
const DIFFICULTIES = new Set<PostDifficulty>(['easy', 'medium', 'hard']);

const isDifficulty = (value: string | undefined): value is PostDifficulty =>
  value !== undefined && DIFFICULTIES.has(value as PostDifficulty);

const parseFrontmatter = (lines: string[]): ParsedFrontmatter => {
  if (lines[0]?.trim() !== '---') return { tags: [], rest: lines };
  const end = lines.slice(1).findIndex((line) => line.trim() === '---');
  if (end === -1) return { tags: [], rest: lines };
  const block = lines.slice(1, 1 + end);
  const read = (key: string): string | undefined => {
    const line = block.find((item) => item.trim().startsWith(`${key}:`));
    if (!line) return undefined;
    return line.slice(line.indexOf(':') + 1).trim();
  };
  const tags = (read('tags') ?? '')
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);
  const rest = lines.slice(2 + end);
  const firstContent = rest.findIndex((line) => line.trim() !== '');
  return {
    title: read('title'),
    difficulty: read('difficulty'),
    category: read('category'),
    author: read('author'),
    tags,
    rest: firstContent === -1 ? [] : rest.slice(firstContent),
  };
};

export const parsePost = (source: string, slug: string): Post => {
  const rawLines = source.split(/\r?\n/);
  const {
    title,
    difficulty,
    category,
    author,
    tags,
    rest: lines,
  } = parseFrontmatter(rawLines);
  const titleLine = lines.find((line) => line.startsWith('# '));
  const resolvedTitle =
    title ?? (titleLine ? titleLine.slice(2).trim() : 'Untitled');
  const sections = splitSections(lines);
  const questionLines =
    findSection(sections, 'Interview Questions')?.lines ?? [];
  const questions = questionLines
    .filter((line) => line.startsWith('- '))
    .map((line) => line.slice(2).trim());
  const answers = parseAnswers(findSection(sections, 'Answers')?.lines ?? []);
  const diagramText = extractDiagram(
    findSection(sections, 'Source')?.lines ?? []
  );
  return {
    slug,
    title: resolvedTitle,
    description: parseDescription(lines),
    difficulty: isDifficulty(difficulty) ? difficulty : DEFAULT_DIFFICULTY,
    category: category || DEFAULT_CATEGORY,
    author: author || DEFAULT_AUTHOR,
    tags,
    questions,
    answers,
    diagramText,
  };
};

export const listPosts = (): Post[] => {
  const slugs = readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.slice(0, -3));
  return slugs
    .map((slug) =>
      parsePost(readFileSync(join(POSTS_DIR, `${slug}.md`), 'utf8'), slug)
    )
    .sort((a, b) => a.title.localeCompare(b.title));
};

export const getPost = (slug: string): Post | undefined => {
  if (!SLUG_PATTERN.test(slug)) return undefined;
  const file = join(POSTS_DIR, `${slug}.md`);
  if (!existsSync(file)) return undefined;
  return parsePost(readFileSync(file, 'utf8'), slug);
};

export const listPostSummaries = (): PostSummary[] =>
  listPosts().map(
    ({ slug, title, description, difficulty, category, tags }) => ({
      slug,
      title,
      description,
      difficulty,
      category,
      tags,
    })
  );
