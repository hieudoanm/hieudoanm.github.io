import { get } from '@broca/common/clients/http';
import { BASE_URL } from '@broca/common/environments/environments';
import { LanguagesTemplate } from '@broca/templates/LanguagesTemplate';
import { Language } from '@prisma/client';
import { NextPage } from 'next';

type LanguagesData = { languages: Language[] };

type LanguagesPageProperties = {
  searchParams: { category: number; duolingo: boolean };
};

const LanguagesPage: NextPage<LanguagesPageProperties> = async ({
  searchParams,
}) => {
  const { category, duolingo } = searchParams;
  const queryParameters = new URLSearchParams();
  queryParameters.set('category', (category ?? 0).toString());
  queryParameters.set('duolingo', (duolingo ?? false).toString());
  const url = `${BASE_URL}/api/languages?${queryParameters.toString()}`;
  const data = await get<LanguagesData>(url);
  const { languages = [] } = data;

  return <LanguagesTemplate languages={languages} />;
};

export default LanguagesPage;
