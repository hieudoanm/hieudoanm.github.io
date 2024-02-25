import { getLanguages } from '@sunil/common/clients/github/github.client';
import { Language } from '@sunil/common/clients/github/github.dto';
import { NextResponse } from 'next/server';

type LanguagesResponse = { total: number; languages: Language[] };

export const GET = async () => {
  const languages = await getLanguages();
  const total = languages.length;
  return NextResponse.json<LanguagesResponse>(
    { total, languages },
    {
      status: 200,
    }
  );
};
