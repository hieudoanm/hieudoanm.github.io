import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import Link from 'next/link';
import { Languages } from '@/games/languages';
import {
  FlashCard,
  formatLanguage,
  getLanguages,
} from '@/games/languages/utils';

interface Params {
  language: string;
}

export const generateStaticParams = (): Params[] => {
  const raw = readFileSync(
    join(process.cwd(), 'public/data/words.json'),
    'utf8'
  );
  const cards = JSON.parse(raw) as FlashCard[];
  return getLanguages(cards).map((language) => ({ language }));
};

interface Props {
  params: Promise<Params>;
}

const LanguagePage = async ({ params }: Props) => {
  const { language } = await params;
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 p-6">
      <Link href="/languages" className="text-primary text-sm font-semibold">
        ← All languages
      </Link>
      <h1 className="text-primary text-2xl font-bold tracking-tight">
        {formatLanguage(language)}
      </h1>
      <Languages language={language} />
    </div>
  );
};

export default LanguagePage;
